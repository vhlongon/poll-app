'use server';

import { db } from '@/db/db';
import { timeSuggestions } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { getSuggestionsUsers } from '../utils/utils';

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

const appendUser = (currentUsers: string, user: string) => {
  if (!currentUsers) {
    return user;
  }

  const normalizedUser = user.toLowerCase();
  let newUsers = currentUsers;

  if (!newUsers?.includes(normalizedUser)) {
    newUsers += (newUsers === '' ? '' : ',') + normalizedUser;
    newUsers = newUsers.replace(/,$/, '');
  }

  return newUsers;
};

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
      error: undefined,
    };
  }

  const { eventId, suggestions: suggestionsData, user } = validatedFields.data;

  try {
    await db.transaction(async tx => {
      const currentUsersResult = await tx
        .select({ users: timeSuggestions.users })
        .from(timeSuggestions)
        .where(eq(timeSuggestions.eventId, eventId))
        .get();

      const updatedUsers = appendUser(currentUsersResult?.users ?? '', user);
      const updatedVotes = getSuggestionsUsers(updatedUsers).length;

      for (const id of suggestionsData) {
        await tx
          .update(timeSuggestions)
          .set({
            votes: updatedVotes,
            users: updatedUsers,
          })
          .where(eq(timeSuggestions.id, Number(id)))
          .run();
      }
    });
  } catch (error) {
    console.log(`[ERROR ADD VOTES]: ${error}`);
    return {
      suggestions: undefined,
      user: undefined,
      error: 'An error occurred while adding votes to the event',
    };
  }

  revalidatePath(`/event/${eventId}`);
  redirect(`/event/${eventId}`);
};
