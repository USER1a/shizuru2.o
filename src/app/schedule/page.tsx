'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, Star, Play } from 'lucide-react'
import Image from 'next/image'

interface ScheduleItem {
  id: number
  title: {
    romaji: string
    english?: string
  }
  coverImage: {
    large: string
  }
  episodes: number
  nextAiringEpisode?: {
    episode: number
    airingAt: number
  }
  genres: string[]
  averageScore?: number
}

export default function SchedulePage() {
  const [todayAnime, setTodayAnime] = useState<ScheduleItem[]>([])
  const [upcomingAnime, setUpcomingAnime] = useState<ScheduleItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchSchedule()
  }, [])

  const fetchSchedule = async () => {
    try {
      // Fetch from AniList API - currently airing anime
      const response = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query {
              today: Page(page: 1, perPage: 10) {
                media(status: RELEASING, sort: POPULARITY_DESC, type: ANIME) {
                  id
                  title {
                    romaji
                    english
                  }
                  coverImage {
                    large
                  }
                  episodes
                  nextAiringEpisode {
                    episode
                    airingAt
                  }
                  genres
                  averageScore
                }
              }
              upcoming: Page(page: 1, perPage: 10) {
                media(status: NOT_YET_RELEASED, sort: POPULARITY_DESC, type: ANIME) {
                  id
                  title {
                    romaji
                    english
                  }
                  coverImage {
                    large
                  }
                  episodes
                  nextAiringEpisode {
                    episode
                    airingAt
                  }
                  genres
                  averageScore
                }
              }
            }
          `,
        }),
      })

      const data = await response.json()
      setTodayAnime(data.data.today.media)
      setUpcomingAnime(data.data.upcoming.media)
    } catch (error) {
      console.error('Failed to fetch schedule:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const ScheduleGrid = ({ anime, title }: { anime: ScheduleItem[], title: string }) => (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Calendar size={24} />
        {title}
      </h2>
      {anime.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center">
          <Clock className="mx-auto mb-4 text-gray-400" size={48} />
          <p className="text-gray-400">No anime scheduled for this period</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {anime.map((item) => (
            <div 
              key={item.id} 
              className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform border border-gray-700"
              data-testid={`card-schedule-${item.id}`}
            >
              <div className="flex">
                <div className="relative w-20 h-28 flex-shrink-0">
                  <Image
                    src={item.coverImage.large}
                    alt={item.title.english || item.title.romaji}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 flex-1">
                  <h3 className="text-white font-medium mb-2 line-clamp-2" data-testid={`text-title-${item.id}`}>
                    {item.title.english || item.title.romaji}
                  </h3>
                  
                  {item.nextAiringEpisode && (
                    <div className="mb-2">
                      <p className="text-purple-400 text-sm font-medium" data-testid={`text-episode-${item.id}`}>
                        Episode {item.nextAiringEpisode.episode}
                      </p>
                      <p className="text-gray-400 text-xs" data-testid={`text-airtime-${item.id}`}>
                        {formatDate(item.nextAiringEpisode.airingAt)}
                      </p>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 text-xs">
                    {item.averageScore && (
                      <span className="flex items-center gap-1 text-green-400" data-testid={`text-score-${item.id}`}>
                        <Star size={12} />
                        {item.averageScore}%
                      </span>
                    )}
                    <span className="text-gray-400" data-testid={`text-episodes-${item.id}`}>
                      {item.episodes || '?'} eps
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.genres.slice(0, 2).map((genre) => (
                      <span 
                        key={genre} 
                        className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs"
                        data-testid={`text-genre-${genre}`}
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading schedule...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Anime Schedule
          </h1>
          <p className="text-xl text-gray-300">
            Keep track of your favorite anime releases
          </p>
        </div>

        <ScheduleGrid anime={todayAnime} title="Currently Airing" />
        <ScheduleGrid anime={upcomingAnime} title="Coming Soon" />
      </div>
    </div>
  )
}