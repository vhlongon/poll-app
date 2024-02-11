'use server';

import { db } from '@/db/db';
import { events } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 as uuidV4 } from 'uuid';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  dates: z
    .array(
      z
        .string()
        .refine(value => !isNaN(Date.parse(value)), {
          message: 'Invalid date format',
        })
        .transform(str => new Date(str))
    )
    .nonempty({ message: 'At least one date is required' }),
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
  const validatedFields = schema.safeParse({
    name: formData.get('name'),
    dates: formData.getAll('dates'),
  });

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    return {
      name: fieldErrors.name?.join(', ') ?? '',
      dates: fieldErrors.dates?.join(', ') ?? '',
      error: undefined,
    };
  }

  const eventId = uuidV4();

  try {
    await db.insert(events).values({
      id: eventId,
      name: validatedFields.data.name,
    });
  } catch (error) {
    console.log(error);
    return {
      name: undefined,
      dates: undefined,
      error: 'An error occurred while creating the event',
    };
  }

  revalidatePath('/events');
  redirect(`/event/${eventId}`);
};
