'use client'

import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import Image from 'next/image'

interface AnimeItem {
  id: number
  title: {
    romaji: string
    english?: string
  }
  coverImage: {
    large: string
  }
  genres: string[]
  averageScore?: number
  episodes?: number
}

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [popularAnime, setPopularAnime] = useState<AnimeItem[]>([])
  const [searchResults, setSearchResults] = useState<AnimeItem[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchPopularAnime()
  }, [])

  const fetchPopularAnime = async () => {
    try {
      const response = await fetch('/api/anime/popular')
      const result = await response.json()
      if (result.success) {
        setPopularAnime(result.data)
      }
    } catch (error) {
      console.error('Failed to fetch popular anime:', error)
    }
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/anime/search?query=${encodeURIComponent(searchQuery)}`)
      const result = await response.json()
      if (result.success) {
        setSearchResults(result.data)
      }
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const AnimeGrid = ({ animes, title }: { animes: AnimeItem[], title: string }) => (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {animes.map((anime) => (
          <div 
            key={anime.id} 
            className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer"
            data-testid={`card-anime-${anime.id}`}
          >
            <div className="relative aspect-[3/4]">
              <Image
                src={anime.coverImage.large}
                alt={anime.title.english || anime.title.romaji}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-3">
              <h3 className="text-white text-sm font-medium truncate" data-testid={`text-title-${anime.id}`}>
                {anime.title.english || anime.title.romaji}
              </h3>
              <div className="flex justify-between items-center mt-2">
                {anime.averageScore && (
                  <span className="text-green-400 text-xs" data-testid={`text-score-${anime.id}`}>
                    {anime.averageScore}%
                  </span>
                )}
                {anime.episodes && (
                  <span className="text-gray-400 text-xs" data-testid={`text-episodes-${anime.id}`}>
                    {anime.episodes} eps
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Discover Anime
          </h1>
          <p className="text-xl text-gray-300">
            Find your next favorite anime
          </p>
        </div>

        <form onSubmit={handleSearch} className="mb-12">
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for anime..."
              className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-purple-500"
              data-testid="input-search"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-md transition-colors disabled:opacity-50"
              data-testid="button-search"
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {searchResults.length > 0 && (
          <AnimeGrid animes={searchResults} title="Search Results" />
        )}

        <AnimeGrid animes={popularAnime} title="Popular Anime" />
      </div>
    </div>
  )
}