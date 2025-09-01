'use client'

import { useState } from 'react'
import { Users, Plus, Share2, Copy } from 'lucide-react'

export default function Watch2GetherPage() {
  const [roomName, setRoomName] = useState('')
  const [roomCode, setRoomCode] = useState('')
  const [createdRoom, setCreatedRoom] = useState<{ code: string; name: string } | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [isJoining, setIsJoining] = useState(false)
  const [message, setMessage] = useState('')

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!roomName.trim()) return

    setIsCreating(true)
    setMessage('')

    try {
      const response = await fetch('/api/rooms/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: roomName,
          hostId: 1, // TODO: Get actual user ID from auth
        }),
      })

      const result = await response.json()
      if (result.success) {
        setCreatedRoom(result.room)
        setRoomName('')
      } else {
        setMessage(result.message || 'Failed to create room')
      }
    } catch (error) {
      setMessage('An error occurred while creating the room')
    } finally {
      setIsCreating(false)
    }
  }

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!roomCode.trim()) return

    setIsJoining(true)
    setMessage('')

    try {
      const response = await fetch('/api/rooms/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: roomCode.toUpperCase(),
          userId: 1, // TODO: Get actual user ID from auth
        }),
      })

      const result = await response.json()
      if (result.success) {
        setMessage(`Successfully joined room: ${result.room.name}`)
        setRoomCode('')
      } else {
        setMessage(result.message || 'Failed to join room')
      }
    } catch (error) {
      setMessage('An error occurred while joining the room')
    } finally {
      setIsJoining(false)
    }
  }

  const copyRoomCode = () => {
    if (createdRoom) {
      navigator.clipboard.writeText(createdRoom.code)
      setMessage('Room code copied to clipboard!')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Watch Together
          </h1>
          <p className="text-xl text-gray-300">
            Enjoy anime with friends in synchronized viewing rooms
          </p>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg text-center max-w-2xl mx-auto ${
            message.includes('Successfully') || message.includes('copied')
              ? 'bg-green-900 border border-green-600 text-green-200' 
              : 'bg-red-900 border border-red-600 text-red-200'
          }`} data-testid="text-message">
            {message}
          </div>
        )}

        {createdRoom && (
          <div className="bg-purple-900 border border-purple-600 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Room Created!</h3>
              <p className="text-purple-200 mb-4">Share this code with your friends:</p>
              <div className="flex items-center justify-center gap-2 mb-4">
                <code className="bg-purple-800 text-purple-100 px-4 py-2 rounded-lg text-2xl font-mono" data-testid="text-room-code">
                  {createdRoom.code}
                </code>
                <button
                  onClick={copyRoomCode}
                  className="bg-purple-700 hover:bg-purple-600 text-white p-2 rounded-lg transition-colors"
                  data-testid="button-copy-code"
                >
                  <Copy size={20} />
                </button>
              </div>
              <p className="text-purple-300 text-sm">Room: {createdRoom.name}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              <Plus size={24} />
              Create Room
            </h2>
            <p className="text-gray-400 mb-6">
              Start a new watching session and invite your friends
            </p>
            
            <form onSubmit={handleCreateRoom} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Room Name</label>
                <input
                  type="text"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  placeholder="Enter room name"
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                  data-testid="input-room-name"
                />
              </div>
              
              <button 
                type="submit"
                disabled={isCreating}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                data-testid="button-create-room"
              >
                <Users size={18} />
                {isCreating ? 'Creating...' : 'Create New Room'}
              </button>
            </form>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              <Share2 size={24} />
              Join Room
            </h2>
            <p className="text-gray-400 mb-6">
              Enter a room code to join an existing session
            </p>
            
            <form onSubmit={handleJoinRoom} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Room Code</label>
                <input
                  type="text"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                  placeholder="Enter 6-character code"
                  maxLength={6}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 font-mono text-center text-lg"
                  data-testid="input-room-code"
                />
              </div>
              
              <button 
                type="submit"
                disabled={isJoining}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                data-testid="button-join-room"
              >
                <Users size={18} />
                {isJoining ? 'Joining...' : 'Join Room'}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 bg-gray-800 rounded-lg p-8 border border-gray-700">
          <h2 className="text-2xl font-semibold text-white mb-4">How it Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-purple-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Create or Join</h3>
              <p className="text-gray-400 text-sm">Start a new room or join an existing one with a room code</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Select Anime</h3>
              <p className="text-gray-400 text-sm">Choose what to watch together from our library</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Watch & Chat</h3>
              <p className="text-gray-400 text-sm">Enjoy synchronized viewing with real-time chat</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}