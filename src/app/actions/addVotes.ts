'use server';

import { db } from '@/db/db';
import { events, timeSuggestions } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { appendUser, formatDate } from '../utils/utils';

const schema = z.object({
  suggestions: z
    .array(z.string())
    .nonempty({ message: 'Choose at least 1 date' }),
  eventId: z.string(),
  user: z.string().min(1, { message: 'Your name is required' }),
});

export type FormError = Partial<{
  suggestions: string;
  error: string;
  user: string;
}>;

export const addVotes = async (
  prevState: FormError | undefined,
  formData: FormData
) => {
  const formDataObject = Object.fromEntries(formData);
  const suggestions = formData.getAll('suggestions');

  const validatedFields = schema.safeParse({
    ...formDataObject,
    suggestions,
  });

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    return {
      suggestions: fieldErrors.suggestions?.join(', ') ?? '',
      user: fieldErrors.user?.join(', ') ?? '',
    };
  }

  const { eventId, suggestions: suggestionsData, user } = validatedFields.data;

  try {
    await db.transaction(async tx => {
      const event = await db.query.events.findFirst({
        where: (events, { eq }) => eq(events.id, eventId),
        with: {
          timeSuggestions: true,
        },
      });
      const eventSuggestions = event?.timeSuggestions;
      const normalizedUser = user.toLowerCase();

      for (const id of suggestionsData) {
        const currentSuggestion = eventSuggestions?.find(
          suggestion => suggestion.id === Number(id)
        );

        // check if suggestion exists
        if (!currentSuggestion) {
          throw new Error('Invalid suggestion');
        }

        // check if user already voted
        const hasVoted = currentSuggestion.users
          ?.split(',')
          .includes(normalizedUser);

        if (hasVoted) {
          throw new Error(
            `You already voted for date: ${formatDate(currentSuggestion.time)}`
          );
        }

        const updatedUsers = appendUser(
          currentSuggestion.users ?? '',
          normalizedUser
        );

        await tx
          .update(timeSuggestions)
          .set({
            votes: sql`${timeSuggestions.votes} + 1`,
            users: updatedUsers,
            updatedAt: new Date().toISOString(),
          })
          .where(eq(timeSuggestions.id, Number(id)))
          .run();
      }

      await tx.update(events).set({
        updatedAt: new Date().toISOString(),
      });
    });
  } catch (error) {
    console.log(`[ERROR ADD VOTES]: ${error}`);
    return {
      error:
        error instanceof Error
          ? error.message
          : `An error occurred while adding votes to the event`,
    };
  }

  revalidatePath(`/event/${eventId}`);
  revalidatePath(`/events`);
  redirect(`/event/${eventId}`);
};
