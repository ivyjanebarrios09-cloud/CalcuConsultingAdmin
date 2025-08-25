import { InquiriesClient } from './_components/client';
import { inquiries } from '@/lib/data';

export default function InquiriesPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Client Inquiries</h1>
        <p className="text-muted-foreground">View and manage all client inquiries.</p>
      </div>
      <InquiriesClient data={inquiries} />
    </div>
  );
}
