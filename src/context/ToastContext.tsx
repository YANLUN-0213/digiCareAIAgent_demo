import { Toast, ToastMessage } from 'primereact/toast'
import { createContext, ReactNode, useContext, useRef } from 'react'

interface ToastContextValue {
  showSuccess: (title: string, detail?: string) => void
  showError: (title: string, detail?: string) => void
  showInfo: (title: string, detail?: string) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const toastRef = useRef<Toast | null>(null)

  const show = (severity: ToastMessage['severity'], title: string, detail?: string) => {
    toastRef.current?.show({
      severity,
      summary: detail ? title : (severity === 'error' ? '錯誤' : '成功'),
      detail: detail || title,
      life: 3000,
    })
  }

  return (
    <ToastContext.Provider value={{
      showSuccess: (t, d) => show('success', t, d),
      showError: (t, d) => show('error', t, d),
      showInfo: (t, d) => show('info', t, d),
    }}>
      <Toast ref={toastRef} position="bottom-right" />
      {children}
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
