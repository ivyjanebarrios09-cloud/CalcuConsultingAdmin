import { ApplicationsClient } from './_components/client';
import { getApplications } from '@/lib/data';

export default async function ApplicationsPage() {
  const applications = await getApplications();
  
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Job Applications</h1>
        <p className="text-muted-foreground">View and manage all job applications.</p>
      </div>
      <ApplicationsClient data={applications} />
    </div>
  );
}
