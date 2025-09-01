import { NextRequest, NextResponse } from 'next/server'
import { storage } from '../../../../../server/storage'
import { z } from 'zod'

const createRoomSchema = z.object({
  name: z.string().min(1),
  hostId: z.number(),
  animeId: z.number().optional(),
})

function generateRoomCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, hostId, animeId } = createRoomSchema.parse(body)

    // Generate unique room code
    let code = generateRoomCode()
    let existingRoom = await storage.getWatchRoomByCode(code)
    
    while (existingRoom) {
      code = generateRoomCode()
      existingRoom = await storage.getWatchRoomByCode(code)
    }

    const newRoom = await storage.createWatchRoom({
      code,
      name,
      hostId,
      animeId,
    })

    // Auto-join the host to the room
    await storage.joinWatchRoom(newRoom.id, hostId)

    return NextResponse.json({
      success: true,
      room: {
        id: newRoom.id,
        code: newRoom.code,
        name: newRoom.name,
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
      { success: false, message: 'Failed to create room' },
      { status: 500 }
    )
  }
}