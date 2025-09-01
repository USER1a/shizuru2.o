'use client'

import { useState } from 'react'
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // TODO: Implement forgot password API
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate API call
      setIsSubmitted(true)
    } catch (error) {
      setError('Failed to send reset email. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 flex items-center justify-center p-8">
        <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full text-center border border-gray-700">
          <CheckCircle className="mx-auto mb-4 text-green-400" size={48} />
          <h1 className="text-2xl font-bold text-white mb-4">
            Check Your Email
          </h1>
          <p className="text-gray-300 mb-6">
            We've sent a password reset link to <strong>{email}</strong>
          </p>
          <p className="text-gray-400 text-sm mb-6">
            If you don't see it in your inbox, check your spam folder.
          </p>
          <Link 
            href="/auth/login"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
            data-testid="link-back-to-login"
          >
            <ArrowLeft size={16} />
            Back to Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 flex items-center justify-center p-8">
      <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full border border-gray-700">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">
            Forgot Password?
          </h1>
          <p className="text-gray-300">
            Enter your email and we'll send you a reset link
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-900 border border-red-600 text-red-200 p-4 rounded-lg text-center" data-testid="text-error">
              {error}
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-purple-500"
              data-testid="input-email"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
            data-testid="button-send-reset"
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link 
            href="/auth/login"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
            data-testid="link-back-to-login"
          >
            <ArrowLeft size={16} />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}