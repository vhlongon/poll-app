type EventPageProps = {
  params: {
    id: string;
  };
};

export default function Event({ params }: EventPageProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1>Event: {params.id}</h1>
    </main>
  );
}
