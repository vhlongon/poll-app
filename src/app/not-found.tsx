'use client';

import Link from 'next/link';

export default function Error() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 dragon-bg">
      <div className="card min-w-72 max-w-lg bg-base-100 shadow-xl shadow-stone-950">
        <div className="card-body items-center">
          <h1 className="text-3xl font-bold text-center mb-2 card-title dnd-heading">
            Lo! The Path Hath Vanished!
          </h1>
          <>
            <div className="divider" />
            <Link className="btn btn-primary" href="/">
              Venture Forth to Begin!
            </Link>
          </>
        </div>
      </div>
    </main>
  );
}
