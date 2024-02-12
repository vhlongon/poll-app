'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const schema = z.object({
  suggestions: z
    .array(z.string())
    .nonempty({ message: 'Choose at least 1 date' }),
  eventId: z.string(),
  author: z.string().min(1, { message: 'Your name is required' }),
});

export type FormError = Partial<{
  suggestions: string;
  error: string;
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
      error: undefined,
    };
  }

  const { eventId } = validatedFields.data;

  try {
    console.log(validatedFields.data);
    // add logic to update the timeSuggestions on the db
  } catch (error) {
    return {
      suggestions: undefined,
      error: 'An error occurred while adding votes to the event',
    };
  }

  revalidatePath(`/event/${eventId}`);
  redirect(`/event/${eventId}`);
};
