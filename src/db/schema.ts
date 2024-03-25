import { relations, sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const events = sqliteTable('events', {
  id: text('text').notNull().primaryKey(),
  name: text('name').notNull(),
  author: text('author'),
  updatedAt: text('updated_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  maxParticipants: integer('max_participants').default(0),
});

export const timeSuggestions = sqliteTable('time_suggestions', {
  id: integer('id').notNull().primaryKey(),
  eventId: text('event_id')
    .notNull()
    .references(() => events.id),
  time: text('time').notNull(),
  users: text('users').default(''),
  votes: integer('votes').notNull().default(0),
  updatedAt: text('updated_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const eventsRelations = relations(events, ({ many }) => ({
  timeSuggestions: many(timeSuggestions),
}));

export const timeSuggestionsRelations = relations(
  timeSuggestions,
  ({ one }) => ({
    event: one(events, {
      fields: [timeSuggestions.eventId],
      references: [events.id],
    }),
  })
);

export type TEvent = typeof events.$inferSelect;
export type TimeSuggestion = typeof timeSuggestions.$inferSelect;
