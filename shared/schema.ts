import { pgTable, serial, text, timestamp, integer, boolean } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  username: text('username').unique(),
  anilistId: text('anilist_id').unique(),
  anilistUsername: text('anilist_username'),
  avatar: text('avatar'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const animeList = pgTable('anime_list', {
  id: serial('id').primaryKey(),
  anilistId: integer('anilist_id').notNull(),
  title: text('title').notNull(),
  titleEnglish: text('title_english'),
  titleRomaji: text('title_romaji'),
  description: text('description'),
  coverImage: text('cover_image'),
  bannerImage: text('banner_image'),
  genres: text('genres').array(),
  status: text('status'),
  episodes: integer('episodes'),
  duration: integer('duration'),
  season: text('season'),
  seasonYear: integer('season_year'),
  averageScore: integer('average_score'),
  popularity: integer('popularity'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const userAnimeList = pgTable('user_anime_list', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  animeId: integer('anime_id').references(() => animeList.id).notNull(),
  status: text('status').notNull(), // watching, completed, planning, dropped, paused
  progress: integer('progress').default(0),
  score: integer('score'),
  startedAt: timestamp('started_at'),
  completedAt: timestamp('completed_at'),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const watchRooms = pgTable('watch_rooms', {
  id: serial('id').primaryKey(),
  code: text('code').unique().notNull(),
  name: text('name').notNull(),
  hostId: integer('host_id').references(() => users.id).notNull(),
  animeId: integer('anime_id'),
  episode: integer('episode').default(1),
  playbackTime: integer('playback_time').default(0),
  isPlaying: boolean('is_playing').default(false),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const roomParticipants = pgTable('room_participants', {
  id: serial('id').primaryKey(),
  roomId: integer('room_id').references(() => watchRooms.id).notNull(),
  userId: integer('user_id').references(() => users.id).notNull(),
  joinedAt: timestamp('joined_at').defaultNow().notNull(),
})

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const insertAnimeSchema = createInsertSchema(animeList).omit({
  id: true,
  createdAt: true,
})

export const insertUserAnimeSchema = createInsertSchema(userAnimeList).omit({
  id: true,
  updatedAt: true,
})

export const insertWatchRoomSchema = createInsertSchema(watchRooms).omit({
  id: true,
  createdAt: true,
})

// Types
export type User = typeof users.$inferSelect
export type InsertUser = z.infer<typeof insertUserSchema>
export type Anime = typeof animeList.$inferSelect
export type InsertAnime = z.infer<typeof insertAnimeSchema>
export type UserAnime = typeof userAnimeList.$inferSelect
export type InsertUserAnime = z.infer<typeof insertUserAnimeSchema>
export type WatchRoom = typeof watchRooms.$inferSelect
export type InsertWatchRoom = z.infer<typeof insertWatchRoomSchema>