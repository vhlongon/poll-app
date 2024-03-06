'use server';

import { cookies } from 'next/headers';
import { encode, isValidProtectPassword } from '../utils/protect';
import { redirect } from 'next/navigation';

type FormError = Partial<{
  error: string;
}>;

export const checkPassword = async (
  prevState: FormError | undefined,
  formData: FormData
) => {
  const password = formData.get('password');
  if (typeof password !== 'string') {
    return;
  }

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

  redirect('/home');
};
