'use server';

import { db } from '@/db/db';
import { timeSuggestions } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const schema = z.object({
  id: z.string(),
  users: z.array(z.string()),
  eventId: z.string(),
});

export type FormError = Partial<{
  error: string;
  name: string;
  dates: string;
}>;

export const editSuggestion = async (
  prevState: FormError | undefined,
  formData: FormData
) => {
  const formDataObject = Object.fromEntries(formData);
  const inputUsers = formData.getAll('users');

  const validatedFields = schema.safeParse({
    ...formDataObject,
    users: inputUsers,
  });

  if (!validatedFields.success) {
    return {
      error: 'suggestion id and users are required',
    };
  }

  const { id, users, eventId } = validatedFields.data;

  try {
    await db
      .update(timeSuggestions)
      .set({
        votes: users.length,
        users: users.join(','),
        updatedAt: new Date().toISOString(),
      })
      .where(eq(timeSuggestions.id, Number(id)));

    revalidatePath(`/events`);
    revalidatePath(`/event/${eventId}`);
    return {
      success: true,
    };
  } catch (error) {
    console.log(`[ERROR EDIT SUGGESTION]: ${error}`);
    return {
      error:
        error instanceof Error
          ? error.message
          : `An error occurred while editing time suggestion for the event ${eventId}`,
    };
  }
};
