'use client'

import React, { useState, useEffect } from 'react'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import styles from './Toast.module.css'

export interface ToastProps {
  id: string
  type: 'success' | 'error' | 'warning' | 'info' | 'reminder'
  title: string
  message?: string
  duration?: number
  actions?: Array<{
    label: string
    onClick: () => void
  }>
  onClose: (id: string) => void
}

export function Toast({ 
  id, 
  type, 
  title, 
  message, 
  duration = 5000, 
  actions, 
  onClose 
}: ToastProps) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [id, duration, onClose])

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={16} />
      case 'error':
        return <AlertCircle size={16} />
      case 'warning':
        return <AlertTriangle size={16} />
      case 'info':
        return <Info size={16} />
      case 'reminder':
        return <Info size={16} />
      default:
        return <Info size={16} />
    }
  }

  return (
    <div className={`${styles.toast} ${styles[type]}`} data-testid={`toast-${type}`}>
      <div className={styles.icon}>
        {getIcon()}
      </div>
      <div className={styles.content}>
        <h4 className={styles.title} data-testid="text-toast-title">{title}</h4>
        {message && <p className={styles.message} data-testid="text-toast-message">{message}</p>}
        {actions && actions.length > 0 && (
          <div className={styles.actions}>
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className={styles.actionButton}
                data-testid={`button-toast-action-${index}`}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
      <button
        onClick={() => onClose(id)}
        className={styles.closeButton}
        data-testid="button-close-toast"
      >
        <X size={16} />
      </button>
    </div>
  )
}

interface ToastContextType {
  showToast: (toast: Omit<ToastProps, 'id' | 'onClose'>) => void
}

export const ToastContext = React.createContext<ToastContextType | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const showToast = (toast: Omit<ToastProps, 'id' | 'onClose'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast: ToastProps = {
      ...toast,
      id,
      onClose: removeToast,
    }
    setToasts(prev => [...prev, newToast])
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className={styles.container}>
        {toasts.map(toast => (
          <Toast key={toast.id} {...toast} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}