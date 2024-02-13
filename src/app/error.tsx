'use client';

export default function Error() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 dragon-bg">
      <div className="card min-w-72 max-w-lg bg-base-100 shadow-xl shadow-stone-950">
        <div className="card-body items-center">
          <h1 className="text-3xl font-bold mb-2 card-title dnd-heading">
            Error
          </h1>
          <p>There was an error. Please try again.</p>
          {window.location.pathname !== '/' && (
            <>
              <div className="divider">or</div>
              <button className="btn btn-primary">Go to start</button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
