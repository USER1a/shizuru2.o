'use client'

import React, { useState, useEffect } from 'react'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'

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

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'border-l-green-500 bg-green-900/20'
      case 'error':
        return 'border-l-red-500 bg-red-900/20'
      case 'warning':
        return 'border-l-yellow-500 bg-yellow-900/20'
      case 'info':
        return 'border-l-blue-500 bg-blue-900/20'
      case 'reminder':
        return 'border-l-purple-500 bg-purple-900/20'
      default:
        return 'border-l-gray-500 bg-gray-900/20'
    }
  }

  const getIconStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500/20 text-green-400'
      case 'error':
        return 'bg-red-500/20 text-red-400'
      case 'warning':
        return 'bg-yellow-500/20 text-yellow-400'
      case 'info':
        return 'bg-blue-500/20 text-blue-400'
      case 'reminder':
        return 'bg-purple-500/20 text-purple-400'
      default:
        return 'bg-gray-500/20 text-gray-400'
    }
  }

  return (
    <div 
      className={`flex items-start gap-3 min-w-80 max-w-md p-4 mb-3 rounded-lg border-l-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg animate-in slide-in-from-right ${getTypeStyles()}`}
      data-testid={`toast-${type}`}
    >
      <div className={`flex items-center justify-center w-6 h-6 rounded-full flex-shrink-0 ${getIconStyles()}`}>
        {getIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-white text-sm font-semibold mb-1" data-testid="text-toast-title">{title}</h4>
        {message && <p className="text-gray-300 text-sm leading-relaxed" data-testid="text-toast-message">{message}</p>}
        {actions && actions.length > 0 && (
          <div className="flex gap-2 mt-3">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded transition-colors"
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
        className="text-gray-400 hover:text-white p-1 rounded transition-colors flex-shrink-0"
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
      <div className="fixed top-5 right-5 z-50 pointer-events-none max-h-screen overflow-y-auto flex flex-col items-end">
        {toasts.map(toast => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast {...toast} />
          </div>
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