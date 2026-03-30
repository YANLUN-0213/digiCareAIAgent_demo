import { useState, useCallback } from 'react'
import { Button } from 'primereact/button'
import type { VpnUploadResult } from './case-tracking.types'

interface SubStep {
  label: string
  status: 'pending' | 'running' | 'done' | 'failed'
}

interface Props {
  onComplete: (result: VpnUploadResult) => void
  existingResult?: VpnUploadResult
}

const VpnUploadPanel = ({ onComplete, existingResult }: Props) => {
  const [subSteps, setSubSteps] = useState<SubStep[]>([
    { label: 'SAM 卡簽章', status: 'pending' },
    { label: '資料上傳健保署', status: 'pending' },
    { label: '下載檢核結果', status: 'pending' },
  ])
  const [started, setStarted] = useState(false)
  const [result, setResult] = useState<VpnUploadResult | undefined>(existingResult)

  const runUpload = useCallback(async () => {
    setStarted(true)

    for (let i = 0; i < 3; i++) {
      setSubSteps(prev => prev.map((s, idx) => idx === i ? { ...s, status: 'running' } : s))
      await new Promise(r => setTimeout(r, 800 + Math.random() * 600))
      setSubSteps(prev => prev.map((s, idx) => idx === i ? { ...s, status: 'done' } : s))
    }

    const vpnResult: VpnUploadResult = {
      opcode: `TW_TWPAS_${Date.now()}`,
      uploadTime: new Date().toLocaleString('sv-SE').replace('T', ' '),
      status: 'completed',
      rtnCode: '0000',
      txResultTxt: null,
    }
    setResult(vpnResult)
    onComplete(vpnResult)
  }, [onComplete])

  const statusIcon = (s: SubStep['status']) => {
    switch (s) {
      case 'done': return <i className="pi pi-check-circle" style={{ color: '#22c55e', fontSize: '1.2rem' }} />
      case 'running': return <i className="pi pi-spin pi-spinner" style={{ color: '#3b82f6', fontSize: '1.2rem' }} />
      case 'failed': return <i className="pi pi-times-circle" style={{ color: '#ef4444', fontSize: '1.2rem' }} />
      default: return <i className="pi pi-circle" style={{ color: '#d1d5db', fontSize: '1.2rem' }} />
    }
  }

  return (
    <div className="ct-vpn-panel">
      <h4 className="mt-0 mb-3">VPN 上傳作業</h4>

      <div className="flex flex-column gap-3 mb-3">
        {subSteps.map((ss, i) => (
          <div key={i} className="flex align-items-center gap-3">
            {statusIcon(ss.status)}
            <span style={{ fontWeight: ss.status === 'running' ? 600 : 400 }}>
              {`${i + 1}. ${ss.label}`}
            </span>
          </div>
        ))}
      </div>

      {!started && !result && (
        <Button
          label="開始上傳"
          icon="pi pi-upload"
          size="small"
          onClick={runUpload}
        />
      )}

      {result && (
        <div className="ct-vpn-result">
          <div className="flex flex-column gap-1 text-sm">
            <span><strong>Opcode：</strong>{result.opcode}</span>
            <span><strong>上傳時間：</strong>{result.uploadTime}</span>
            <span><strong>回傳代碼：</strong>{result.rtnCode}</span>
            <span><strong>檢核狀態：</strong>
              <span style={{ color: '#22c55e', fontWeight: 600 }}>通過</span>
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default VpnUploadPanel
