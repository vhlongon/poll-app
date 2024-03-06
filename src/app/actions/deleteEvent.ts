'use server';

import { db } from '@/db/db';
import { events, timeSuggestions } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const schema = z.object({
  id: z.string(),
});

export type FormError = Partial<{
  error: string;
  name: string;
  dates: string;
}>;

export const deleteEvent = async (
  prevState: FormError | undefined,
  formData: FormData
) => {
  const validatedFields = schema.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
    return {
      error: 'Event id is required',
    };
  }

  const { id } = validatedFields.data;

  try {
    await db.delete(timeSuggestions).where(eq(timeSuggestions.eventId, id));
    await db.delete(events).where(eq(events.id, id));
  } catch (error) {
    console.log(`[ERROR DELETE EVENT]: ${error}`);
    return {
      error:
        error instanceof Error
          ? error.message
          : `An error occurred while deleting the event`,
    };
  }

  revalidatePath('/events');
  redirect(`/events`);
};
