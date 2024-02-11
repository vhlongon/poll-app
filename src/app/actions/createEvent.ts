'use server';

import { db } from '@/db/db';
import { events } from '@/db/schema';
import { v4 as uuidV4 } from 'uuid';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
});

export type FormError = {
  error?: string;
};

export const createEvent = async (
  prevState: FormError | undefined,
  formData: FormData
) => {
  const validatedFields = schema.safeParse({
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    return {
      error: fieldErrors?.name?.join(','),
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
      error: 'An error occurred while creating the event',
    };
  }
};
