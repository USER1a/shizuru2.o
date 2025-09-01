import Link from 'next/link'
import { Play, Search, Users, Calendar, BookOpen } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
              Shizuru
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Your ultimate anime streaming platform with social features, 
              watch together functionality, and AMOLED-optimized dark design
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/login"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center gap-2"
                data-testid="button-get-started"
              >
                <Play size={20} />
                Get Started
              </Link>
              <Link
                href="/discover"
                className="border border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center gap-2"
                data-testid="button-browse"
              >
                <Search size={20} />
                Browse Anime
              </Link>
            </div>
          </div>
        </div>
        
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20 pointer-events-none"></div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Everything You Need
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Stream anime, read manga, and connect with friends in one beautiful platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Anime Discovery */}
          <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center hover:border-purple-500 transition-colors">
            <div className="bg-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Search size={32} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Discover Anime</h3>
            <p className="text-gray-400">
              Explore thousands of anime with advanced search and filters
            </p>
          </div>

          {/* Watch Together */}
          <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center hover:border-purple-500 transition-colors">
            <div className="bg-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Users size={32} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Watch Together</h3>
            <p className="text-gray-400">
              Create rooms and watch anime synchronized with friends
            </p>
          </div>

          {/* Schedule Tracking */}
          <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center hover:border-purple-500 transition-colors">
            <div className="bg-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Calendar size={32} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Release Schedule</h3>
            <p className="text-gray-400">
              Never miss an episode with personalized release tracking
            </p>
          </div>

          {/* Manga Library */}
          <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center hover:border-purple-500 transition-colors">
            <div className="bg-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <BookOpen size={32} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Manga Library</h3>
            <p className="text-gray-400">
              Read manga with a beautiful, customizable reader interface
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-purple-900 to-blue-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Join thousands of anime fans in our growing community
          </p>
          <Link
            href="/auth/register"
            className="bg-white text-purple-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            data-testid="button-join-now"
          >
            Join Shizuru Today
            <Play size={20} />
          </Link>
        </div>
      </div>
    </div>
  )
}