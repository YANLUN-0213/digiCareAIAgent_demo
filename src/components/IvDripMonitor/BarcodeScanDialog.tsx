import { useState, useCallback, useRef } from 'react'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Divider } from 'primereact/divider'
import { decodeBarcodeDemo, findPatientByWristband, DEMO_BARCODE, DEMO_WRISTBAND } from './iv-drip.mock'
import type { ScanStep, BarcodeScanResult } from './iv-drip.types'

interface Props {
  visible: boolean
  onHide: () => void
  onStartInfusion: (barcode: string) => void
}

const BarcodeScanDialog = ({ visible, onHide, onStartInfusion }: Props) => {
  const [step, setStep] = useState<ScanStep>('idle')
  const [barcodeInput, setBarcodeInput] = useState('')
  const [wristbandInput, setWristbandInput] = useState('')
  const [scanResult, setScanResult] = useState<BarcodeScanResult | null>(null)
  const [matchedPatientId, setMatchedPatientId] = useState<string | null>(null)
  const simulateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const reset = useCallback(() => {
    setStep('idle')
    setBarcodeInput('')
    setWristbandInput('')
    setScanResult(null)
    setMatchedPatientId(null)
    if (simulateTimerRef.current) clearTimeout(simulateTimerRef.current)
  }, [])

  const handleHide = useCallback(() => {
    reset()
    onHide()
  }, [reset, onHide])

  const handleBarcodeScan = useCallback(() => {
    const result = decodeBarcodeDemo(barcodeInput.trim())
    if (result) {
      setScanResult(result)
      setStep('medication_scanned')
    }
  }, [barcodeInput])

  const handleWristbandScan = useCallback(() => {
    const patientId = findPatientByWristband(wristbandInput.trim())
    setMatchedPatientId(patientId)
    if (patientId && scanResult && patientId === scanResult.patientId) {
      setStep('verified')
    } else {
      setStep('mismatch')
    }
  }, [wristbandInput, scanResult])

  const handleSimulateScan = useCallback(() => {
    setBarcodeInput('')
    let i = 0
    const typeChar = () => {
      if (i < DEMO_BARCODE.length) {
        const char = DEMO_BARCODE[i]
        setBarcodeInput(prev => prev + char)
        i++
        simulateTimerRef.current = setTimeout(typeChar, 50)
      }
    }
    typeChar()
  }, [])

  const handleSimulateWristband = useCallback(() => {
    setWristbandInput('')
    let i = 0
    const typeChar = () => {
      if (i < DEMO_WRISTBAND.length) {
        const char = DEMO_WRISTBAND[i]
        setWristbandInput(prev => prev + char)
        i++
        simulateTimerRef.current = setTimeout(typeChar, 50)
      }
    }
    typeChar()
  }, [])

  const handleStartInfusion = useCallback(() => {
    onStartInfusion(barcodeInput.trim())
    handleHide()
  }, [barcodeInput, onStartInfusion, handleHide])

  const stepNumClass = (targetStep: number) => {
    const currentNum = step === 'idle' ? 1 : step === 'medication_scanned' ? 2 : 3
    if (targetStep < currentNum) return 'iv-step-num iv-step-done'
    if (targetStep === currentNum) return 'iv-step-num iv-step-active'
    return 'iv-step-num'
  }

  return (
    <Dialog
      header="條碼掃描驗證"
      visible={visible}
      onHide={handleHide}
      style={{ width: '520px' }}
      modal
      closable
    >
      <div className="iv-scan">
        {/* Step indicators */}
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem' }}>
          <div className="iv-step-indicator">
            <span className={stepNumClass(1)}>1</span>
            <span>掃描藥袋條碼</span>
          </div>
          <div className="iv-step-indicator">
            <span className={stepNumClass(2)}>2</span>
            <span>掃描病患手圈</span>
          </div>
          <div className="iv-step-indicator">
            <span className={stepNumClass(3)}>3</span>
            <span>開始輸液</span>
          </div>
        </div>

        {/* Step 1: Barcode scan */}
        {(step === 'idle') && (
          <>
            <label htmlFor="barcode-input" style={{ fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
              <i className="pi pi-qrcode" style={{ marginRight: '0.4rem' }} />
              請掃描藥袋條碼
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <InputText
                id="barcode-input"
                className="iv-scan-input"
                value={barcodeInput}
                onChange={(e) => setBarcodeInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleBarcodeScan()}
                placeholder="掃描或輸入條碼..."
                style={{ flex: 1 }}
                autoFocus
              />
              <Button label="確認" icon="pi pi-check" onClick={handleBarcodeScan} disabled={!barcodeInput.trim()} />
            </div>
            <div style={{ marginTop: '0.5rem' }}>
              <Button label="模擬掃描" icon="pi pi-bolt" severity="secondary" text size="small" onClick={handleSimulateScan} />
            </div>
          </>
        )}

        {/* Step 1 result + Step 2 */}
        {(step === 'medication_scanned' || step === 'wristband_scanned' || step === 'verified' || step === 'mismatch') && scanResult && (
          <>
            <div className="iv-scan-result">
              <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#22c55e' }}>
                <i className="pi pi-check-circle" style={{ marginRight: '0.4rem' }} />
                藥袋條碼辨識成功
              </div>
              <div className="iv-scan-info-grid">
                <div><span style={{ color: '#6b7280' }}>病人姓名：</span>{scanResult.patientName}</div>
                <div><span style={{ color: '#6b7280' }}>病人 ID：</span>{scanResult.patientId}</div>
                <div><span style={{ color: '#6b7280' }}>藥品名稱：</span>{scanResult.medicationName}</div>
                <div><span style={{ color: '#6b7280' }}>劑量：</span>{scanResult.dosage}</div>
                <div><span style={{ color: '#6b7280' }}>醫囑編號：</span>{scanResult.orderId}</div>
                <div><span style={{ color: '#6b7280' }}>輸液類型：</span>{scanResult.ivType}</div>
              </div>
            </div>

            <Divider />

            {step === 'medication_scanned' && (
              <>
                <label htmlFor="wristband-input" style={{ fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
                  <i className="pi pi-id-card" style={{ marginRight: '0.4rem' }} />
                  請掃描病患手圈
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <InputText
                    id="wristband-input"
                    className="iv-scan-input"
                    value={wristbandInput}
                    onChange={(e) => setWristbandInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleWristbandScan()}
                    placeholder="掃描病患手圈..."
                    style={{ flex: 1 }}
                    autoFocus
                  />
                  <Button label="確認" icon="pi pi-check" onClick={handleWristbandScan} disabled={!wristbandInput.trim()} />
                </div>
                <div style={{ marginTop: '0.5rem' }}>
                  <Button label="模擬掃描" icon="pi pi-bolt" severity="secondary" text size="small" onClick={handleSimulateWristband} />
                </div>
              </>
            )}

            {step === 'verified' && (
              <div style={{ textAlign: 'center' }}>
                <div className="iv-verify-icon iv-verify-success">
                  <i className="pi pi-check-circle" />
                </div>
                <div style={{ fontWeight: 600, fontSize: '1.1rem', color: '#22c55e', marginBottom: '0.5rem' }}>
                  身份驗證成功
                </div>
                <div style={{ color: '#6b7280', marginBottom: '1rem' }}>
                  病患身份與藥袋條碼比對一致
                </div>
                <Button label="開始輸液" icon="pi pi-play" onClick={handleStartInfusion} />
              </div>
            )}

            {step === 'mismatch' && (
              <div style={{ textAlign: 'center' }}>
                <div className="iv-verify-icon iv-verify-fail">
                  <i className="pi pi-times-circle" />
                </div>
                <div style={{ fontWeight: 600, fontSize: '1.1rem', color: '#ef4444', marginBottom: '0.5rem' }}>
                  身份驗證失敗
                </div>
                <div style={{ color: '#6b7280', marginBottom: '1rem' }}>
                  病患手圈與藥袋條碼不符，請重新確認
                </div>
                <Button label="重新掃描" icon="pi pi-refresh" severity="warning" onClick={reset} />
              </div>
            )}
          </>
        )}
      </div>
    </Dialog>
  )
}

export default BarcodeScanDialog
