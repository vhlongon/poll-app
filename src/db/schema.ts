import { relations, sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const events = sqliteTable('events', {
  id: text('text').notNull().primaryKey(),
  name: text('name').notNull(),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const timeSuggestions = sqliteTable('time_suggestions', {
  id: integer('id').notNull().primaryKey(),
  eventId: text('event_id')
    .notNull()
    .references(() => events.id),
  time: text('time').notNull(),
  author: text('author').notNull(),
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
