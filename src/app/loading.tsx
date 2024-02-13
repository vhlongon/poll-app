import { Dragon } from './components/Dragon';

export default function LoadingScreen() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 dragon-bg">
      <Dragon />
    </main>
  );
}
