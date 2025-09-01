import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    // Redirect to AniList OAuth
    const anilistAuthUrl = `https://anilist.co/api/v2/oauth/authorize?client_id=${process.env.ANILIST_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(process.env.NEXTAUTH_URL + '/api/auth/anilist')}`
    
    return NextResponse.redirect(anilistAuthUrl)
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://anilist.co/api/v2/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id: process.env.ANILIST_CLIENT_ID,
        client_secret: process.env.ANILIST_CLIENT_SECRET,
        redirect_uri: process.env.NEXTAUTH_URL + '/api/auth/anilist',
        code,
      }),
    })

    const { access_token } = await tokenResponse.json()

    // Get user info from AniList
    const userResponse = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        query: `
          query {
            Viewer {
              id
              name
              avatar {
                large
              }
            }
          }
        `,
      }),
    })

    const { data } = await userResponse.json()
    const anilistUser = data.Viewer

    // TODO: Create or update user in database with AniList info
    // For now, redirect to success page
    return NextResponse.redirect(process.env.NEXTAUTH_URL + '/auth/success?provider=anilist')
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'AniList authentication failed' },
      { status: 500 }
    )
  }
}