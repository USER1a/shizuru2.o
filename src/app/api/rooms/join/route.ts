import { NextRequest, NextResponse } from 'next/server'
import { storage } from '../../../../../server/storage'
import { z } from 'zod'

const joinRoomSchema = z.object({
  code: z.string(),
  userId: z.number(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { code, userId } = joinRoomSchema.parse(body)

    // Find room by code
    const room = await storage.getWatchRoomByCode(code)
    if (!room) {
      return NextResponse.json(
        { success: false, message: 'Room not found' },
        { status: 404 }
      )
    }

    if (!room.isActive) {
      return NextResponse.json(
        { success: false, message: 'Room is no longer active' },
        { status: 400 }
      )
    }

    // Join the room
    const joined = await storage.joinWatchRoom(room.id, userId)
    if (!joined) {
      return NextResponse.json(
        { success: false, message: 'Already in room or failed to join' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      room: {
        id: room.id,
        code: room.code,
        name: room.name,
        episode: room.episode,
        playbackTime: room.playbackTime,
        isPlaying: room.isPlaying,
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Invalid input data' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, message: 'Failed to join room' },
      { status: 500 }
    )
  }
}