'use server';

import { db } from '@/db/db';
import { events } from '@/db/schema';
import { v4 as uuidV4 } from 'uuid';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  dates: z.array(z.string()),
});

type PossibleErrorKeys = keyof (typeof schema)['_def'];

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
      dates: fieldErrors.name?.join(', ') ?? '',
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
};
