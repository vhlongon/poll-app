import { redirect } from 'next/navigation';
import { ProtectForm } from './components/ProtectForm';
import { isValidProtectPasswordInCookies } from './utils/protect';

export default function RootPage() {
  const isAuthorized = isValidProtectPasswordInCookies();

  if (isAuthorized) {
    redirect('/home');
  }

  return (
    <main>
      <ProtectForm />
    </main>
  );
}
