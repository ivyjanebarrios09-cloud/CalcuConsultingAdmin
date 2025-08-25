import { MessagesClient } from './_components/client';
import { getContactMessages } from '@/lib/data';

export default async function MessagesPage() {
  const messages = await getContactMessages();

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Contact Messages</h1>
        <p className="text-muted-foreground">View and manage all contact messages.</p>
      </div>
      <MessagesClient data={messages} />
    </div>
  );
}
