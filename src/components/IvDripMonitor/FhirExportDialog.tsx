import { useState, useCallback } from 'react'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { Tag } from 'primereact/tag'
import type { IvDripRecord } from './iv-drip.types'
import { buildFhirMedicationAdministration } from './iv-drip.mock'

interface Props {
  visible: boolean
  onHide: () => void
  drip: IvDripRecord | null
}

const FhirExportDialog = ({ visible, onHide, drip }: Props) => {
  const [copied, setCopied] = useState(false)
  const [syncStatus, setSyncStatus] = useState<'synced' | 'pending' | 'failed'>('pending')

  const fhirJson = drip ? JSON.stringify(buildFhirMedicationAdministration(drip), null, 2) : ''

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(fhirJson)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [fhirJson])

  const handleDownload = useCallback(() => {
    const blob = new Blob([fhirJson], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `MedicationAdministration-${drip?.id || 'export'}.json`
    a.click()
    URL.revokeObjectURL(url)
  }, [fhirJson, drip])

  const handleSync = useCallback(() => {
    setSyncStatus('pending')
    setTimeout(() => setSyncStatus('synced'), 1500)
  }, [])

  const syncSeverity = syncStatus === 'synced' ? 'success' : syncStatus === 'pending' ? 'warning' : 'danger'
  const syncLabel = syncStatus === 'synced' ? '已同步' : syncStatus === 'pending' ? '等待同步' : '同步失敗'

  return (
    <Dialog
      header="FHIR MedicationAdministration 匯出"
      visible={visible}
      onHide={onHide}
      style={{ width: '680px' }}
      modal
      maximizable
    >
      <div className="iv-fhir">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>
            FHIR R4 · MedicationAdministration Resource
          </span>
          <Tag value={syncLabel} severity={syncSeverity} />
        </div>

        <pre className="iv-fhir-json">{fhirJson}</pre>

        <div className="iv-fhir-actions">
          <Button
            label={copied ? '已複製!' : '複製 JSON'}
            icon={copied ? 'pi pi-check' : 'pi pi-copy'}
            severity={copied ? 'success' : 'info'}
            size="small"
            outlined
            onClick={handleCopy}
          />
          <Button
            label="匯出檔案"
            icon="pi pi-download"
            severity="info"
            size="small"
            outlined
            onClick={handleDownload}
          />
          <Button
            label="同步至 FHIR 平臺"
            icon="pi pi-cloud-upload"
            size="small"
            onClick={handleSync}
          />
        </div>
      </div>
    </Dialog>
  )
}

export default FhirExportDialog
