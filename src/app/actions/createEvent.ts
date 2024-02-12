'use server';

import { db } from '@/db/db';
import { events, timeSuggestions } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 as uuidV4 } from 'uuid';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  author: z
    .string()
    .default('anonymous')
    .transform(value => value || 'anonymous'),
  dates: z
    .string()
    .refine(
      value => {
        const dates = value.split(',');
        const isValid = dates.every(date => {
          const dateObj = new Date(date);
          return !isNaN(dateObj.getTime());
        });

        return isValid;
      },
      {
        message: 'Invalid date format',
      }
    )
    .transform(value => value.split(',')),
});

export type FormError = Partial<{
  error: string;
  name: string;
  dates: string;
}>;

export const createEvent = async (
  prevState: FormError | undefined,
  formData: FormData
) => {
  const validatedFields = schema.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    return {
      name: fieldErrors.name?.join(', ') ?? '',
      dates: fieldErrors.dates?.join(', ') ?? '',
      error: undefined,
    };
  }

  const eventId = uuidV4();

  const { name, dates, author } = validatedFields.data;

  try {
    await db.insert(events).values({
      id: eventId,
      name,
      author,
    });

    await db.insert(timeSuggestions).values(
      dates.map(d => ({
        eventId,
        time: new Date(d).toISOString(),
      }))
    );
  } catch (error) {
    console.log(`[ERROR CREATE EVENT]: ${error}`);
    return {
      name: undefined,
      dates: undefined,
      error: 'An error occurred while creating the event',
    };
  }

  revalidatePath('/events');
  redirect(`/event/${eventId}`);
};
