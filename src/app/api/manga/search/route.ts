import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')
  const page = parseInt(searchParams.get('page') || '1')

  if (!query) {
    return NextResponse.json({ success: false, message: 'Query parameter required' }, { status: 400 })
  }

  try {
    const response = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query ($page: Int, $search: String) {
            Page(page: $page, perPage: 20) {
              media(search: $search, type: MANGA) {
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
                chapters
                volumes
                averageScore
                popularity
              }
            }
          }
        `,
        variables: {
          search: query,
          page: page,
        },
      }),
    })

    const data = await response.json()
    return NextResponse.json({ success: true, data: data.data.Page.media })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to search manga' },
      { status: 500 }
    )
  }
}