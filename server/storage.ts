import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import { eq, and } from 'drizzle-orm'
import { users, animeList, userAnimeList, watchRooms, roomParticipants } from '../shared/schema'
import type { User, InsertUser, Anime, InsertAnime, UserAnime, InsertUserAnime, WatchRoom, InsertWatchRoom } from '../shared/schema'

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

export interface IStorage {
  // User operations
  createUser(user: InsertUser): Promise<User>
  getUserById(id: number): Promise<User | null>
  getUserByEmail(email: string): Promise<User | null>
  getUserByAnilistId(anilistId: string): Promise<User | null>
  updateUser(id: number, updates: Partial<InsertUser>): Promise<User | null>
  
  // Anime operations
  createAnime(anime: InsertAnime): Promise<Anime>
  getAnimeById(id: number): Promise<Anime | null>
  getAnimeByAnilistId(anilistId: number): Promise<Anime | null>
  searchAnime(query: string): Promise<Anime[]>
  getPopularAnime(limit?: number): Promise<Anime[]>
  
  // User anime list operations
  addToUserList(userAnime: InsertUserAnime): Promise<UserAnime>
  getUserAnimeList(userId: number): Promise<UserAnime[]>
  updateUserAnime(userId: number, animeId: number, updates: Partial<InsertUserAnime>): Promise<UserAnime | null>
  removeFromUserList(userId: number, animeId: number): Promise<boolean>
  
  // Watch room operations
  createWatchRoom(room: InsertWatchRoom): Promise<WatchRoom>
  getWatchRoomByCode(code: string): Promise<WatchRoom | null>
  updateWatchRoom(id: number, updates: Partial<InsertWatchRoom>): Promise<WatchRoom | null>
  joinWatchRoom(roomId: number, userId: number): Promise<boolean>
  leaveWatchRoom(roomId: number, userId: number): Promise<boolean>
  getRoomParticipants(roomId: number): Promise<User[]>
}

export class DbStorage implements IStorage {
  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await db.insert(users).values(user).returning()
    return newUser
  }

  async getUserById(id: number): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.id, id))
    return user || null
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.email, email))
    return user || null
  }

  async getUserByAnilistId(anilistId: string): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.anilistId, anilistId))
    return user || null
  }

  async updateUser(id: number, updates: Partial<InsertUser>): Promise<User | null> {
    const [updatedUser] = await db.update(users).set(updates).where(eq(users.id, id)).returning()
    return updatedUser || null
  }

  async createAnime(anime: InsertAnime): Promise<Anime> {
    const [newAnime] = await db.insert(animeList).values(anime).returning()
    return newAnime
  }

  async getAnimeById(id: number): Promise<Anime | null> {
    const [anime] = await db.select().from(animeList).where(eq(animeList.id, id))
    return anime || null
  }

  async getAnimeByAnilistId(anilistId: number): Promise<Anime | null> {
    const [anime] = await db.select().from(animeList).where(eq(animeList.anilistId, anilistId))
    return anime || null
  }

  async searchAnime(query: string): Promise<Anime[]> {
    // Basic search implementation - can be enhanced with full-text search
    return await db.select().from(animeList).limit(20)
  }

  async getPopularAnime(limit: number = 20): Promise<Anime[]> {
    return await db.select().from(animeList).limit(limit)
  }

  async addToUserList(userAnime: InsertUserAnime): Promise<UserAnime> {
    const [newUserAnime] = await db.insert(userAnimeList).values(userAnime).returning()
    return newUserAnime
  }

  async getUserAnimeList(userId: number): Promise<UserAnime[]> {
    return await db.select().from(userAnimeList).where(eq(userAnimeList.userId, userId))
  }

  async updateUserAnime(userId: number, animeId: number, updates: Partial<InsertUserAnime>): Promise<UserAnime | null> {
    const [updated] = await db.update(userAnimeList)
      .set(updates)
      .where(and(eq(userAnimeList.userId, userId), eq(userAnimeList.animeId, animeId)))
      .returning()
    return updated || null
  }

  async removeFromUserList(userId: number, animeId: number): Promise<boolean> {
    const result = await db.delete(userAnimeList)
      .where(and(eq(userAnimeList.userId, userId), eq(userAnimeList.animeId, animeId)))
    return result.rowCount > 0
  }

  async createWatchRoom(room: InsertWatchRoom): Promise<WatchRoom> {
    const [newRoom] = await db.insert(watchRooms).values(room).returning()
    return newRoom
  }

  async getWatchRoomByCode(code: string): Promise<WatchRoom | null> {
    const [room] = await db.select().from(watchRooms).where(eq(watchRooms.code, code))
    return room || null
  }

  async updateWatchRoom(id: number, updates: Partial<InsertWatchRoom>): Promise<WatchRoom | null> {
    const [updated] = await db.update(watchRooms).set(updates).where(eq(watchRooms.id, id)).returning()
    return updated || null
  }

  async joinWatchRoom(roomId: number, userId: number): Promise<boolean> {
    try {
      await db.insert(roomParticipants).values({ roomId, userId })
      return true
    } catch {
      return false
    }
  }

  async leaveWatchRoom(roomId: number, userId: number): Promise<boolean> {
    const result = await db.delete(roomParticipants)
      .where(and(eq(roomParticipants.roomId, roomId), eq(roomParticipants.userId, userId)))
    return result.rowCount > 0
  }

  async getRoomParticipants(roomId: number): Promise<User[]> {
    const participants = await db.select({
      id: users.id,
      email: users.email,
      username: users.username,
      avatar: users.avatar,
    }).from(roomParticipants)
      .innerJoin(users, eq(roomParticipants.userId, users.id))
      .where(eq(roomParticipants.roomId, roomId))
    
    return participants as User[]
  }
}

export const storage = new DbStorage()