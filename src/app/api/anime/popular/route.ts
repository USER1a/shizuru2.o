import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')

  try {
    // Fetch popular anime from AniList
    const response = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query ($page: Int) {
            Page(page: $page, perPage: 20) {
              media(sort: POPULARITY_DESC, type: ANIME) {
                id
                title {
                  romaji
                  english
                  native
                }
                description
                coverImage {
                  large
                  medium
                }
                bannerImage
                genres
                status
                episodes
                duration
                season
                seasonYear
                averageScore
                popularity
              }
            }
          }
        `,
        variables: {
          page: page,
        },
      }),
    })

    const data = await response.json()
    return NextResponse.json({ success: true, data: data.data.Page.media })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch popular anime' },
      { status: 500 }
    )
  }
}