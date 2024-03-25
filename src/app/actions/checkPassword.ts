'use server';

import { cookies } from 'next/headers';
import { encode, isValidProtectPassword } from '../utils/protect';
import { redirect } from 'next/navigation';
import { z } from 'zod';

type FormError = Partial<{
  error: string;
}>;

const schema = z.object({
  password: z.string(),
  redirect: z.string().default('/home'),
});

export const checkPassword = async (
  prevState: FormError | undefined,
  formData: FormData
) => {
  const parsed = schema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return {
      error: 'Password is required',
    };
  }

  const { password, redirect: redirectPath } = parsed.data;

  const isValid = isValidProtectPassword(password);

  if (!isValid) {
    return {
      error: 'Password is not valid',
    };
  }

  cookies().set('protect-password', encode(password), {
    httpOnly: true,
    maxAge: 999999,
  });

  redirect(redirectPath);
};
