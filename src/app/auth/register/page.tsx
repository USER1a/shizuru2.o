'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        router.push('/auth/login?message=Registration successful')
      } else {
        setError(result.message || 'Registration failed')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-900 p-8">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-white text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-gray-400">Join the Shizuru community</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {error && (
            <div className="bg-red-900/20 border border-red-500 text-red-200 p-3 rounded-lg text-center text-sm" data-testid="text-error">
              {error}
            </div>
          )}

          <div className="relative flex items-center">
            <User className="absolute left-4 text-gray-500 z-10" size={20} />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              required
              className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
              data-testid="input-username"
            />
          </div>

          <div className="relative flex items-center">
            <Mail className="absolute left-4 text-gray-500 z-10" size={20} />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
              data-testid="input-email"
            />
          </div>

          <div className="relative flex items-center">
            <Lock className="absolute left-4 text-gray-500 z-10" size={20} />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full pl-12 pr-12 py-4 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
              data-testid="input-password"
            />
            <button
              type="button"
              className="absolute right-4 text-gray-500 hover:text-purple-400 transition-colors z-10"
              onClick={() => setShowPassword(!showPassword)}
              data-testid="button-toggle-password"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="relative flex items-center">
            <Lock className="absolute left-4 text-gray-500 z-10" size={20} />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              className="w-full pl-12 pr-12 py-4 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
              data-testid="input-confirm-password"
            />
            <button
              type="button"
              className="absolute right-4 text-gray-500 hover:text-purple-400 transition-colors z-10"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              data-testid="button-toggle-confirm-password"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg font-semibold transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            data-testid="button-submit"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="text-center mt-4">
          <span className="text-gray-400 text-sm">Already have an account? </span>
          <Link href="/auth/login" className="text-purple-400 hover:text-purple-300 text-sm transition-colors" data-testid="link-login">
            Sign in
          </Link>
        </div>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-700"></div>
          <span className="px-4 text-gray-500 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-700"></div>
        </div>

        <Link href="/api/auth/anilist" className="flex items-center justify-center gap-3 w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-200 hover:-translate-y-0.5" data-testid="link-anilist-register">
          <svg viewBox="0 0 172 172" className="w-5 h-5 fill-current">
            <path d="M111.322,111.157 L111.322,41.029 C111.322,37.010 109.105,34.792 105.086,34.792 L91.365,34.792 C87.346,34.792 85.128,37.010 85.128,41.029 L85.128,111.157 L111.322,111.157 Z M24.234,111.157 L49.322,111.157 L73.870,111.157 L49.322,155.444 L24.234,111.157 Z"/>
          </svg>
          Sign up with AniList
        </Link>
      </div>
    </div>
  )
}