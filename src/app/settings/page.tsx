'use client'

import { useState } from 'react'
import { User, Mail, Lock, Save } from 'lucide-react'

export default function SettingsPage() {
  const [userSettings, setUserSettings] = useState({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserSettings(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      // TODO: Implement profile update API call
      setMessage('Profile updated successfully!')
    } catch (error) {
      setMessage('Failed to update profile')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (userSettings.newPassword !== userSettings.confirmPassword) {
      setMessage('New passwords do not match')
      return
    }

    setIsLoading(true)
    setMessage('')

    try {
      // TODO: Implement password change API call
      setMessage('Password changed successfully!')
      setUserSettings(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }))
    } catch (error) {
      setMessage('Failed to change password')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Account Settings
          </h1>
          <p className="text-xl text-gray-300">
            Manage your Shizuru account preferences
          </p>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg text-center ${
            message.includes('successfully') 
              ? 'bg-green-900 border border-green-600 text-green-200' 
              : 'bg-red-900 border border-red-600 text-red-200'
          }`} data-testid="text-message">
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Settings */}
          <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              <User size={24} />
              Profile Information
            </h2>
            
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Username</label>
                <input
                  type="text"
                  name="username"
                  value={userSettings.username}
                  onChange={handleInputChange}
                  placeholder="Your username"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                  data-testid="input-username"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    name="email"
                    value={userSettings.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-purple-500"
                    data-testid="input-email"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                data-testid="button-save-profile"
              >
                <Save size={18} />
                {isLoading ? 'Saving...' : 'Save Profile'}
              </button>
            </form>
          </div>

          {/* Password Settings */}
          <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              <Lock size={24} />
              Change Password
            </h2>
            
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={userSettings.currentPassword}
                  onChange={handleInputChange}
                  placeholder="Enter current password"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                  data-testid="input-current-password"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={userSettings.newPassword}
                  onChange={handleInputChange}
                  placeholder="Enter new password"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                  data-testid="input-new-password"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={userSettings.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm new password"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                  data-testid="input-confirm-password"
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                data-testid="button-change-password"
              >
                <Lock size={18} />
                {isLoading ? 'Changing...' : 'Change Password'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}