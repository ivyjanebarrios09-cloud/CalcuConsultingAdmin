"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
       <div className="flex flex-col min-h-screen items-center justify-center">
        <div className="text-2xl font-bold">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 flex justify-between items-center border-b">
        <h1 className="text-2xl font-bold text-foreground">CalcuConsultingAdmin</h1>
        {!user ? (
          <Button asChild>
            <Link href="/sign-in">Login</Link>
          </Button>
        ) : (
          <Button asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        )}
      </header>
      <main className="flex-grow flex items-center justify-center bg-background">
        <div className="text-center p-8 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Welcome to the Admin Panel
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Manage your applications, inquiries, and messages with ease. This is the central hub for all administrative tasks for CalcuConsulting.
          </p>
          {!user ? (
            <Button asChild size="lg">
              <Link href="/sign-in">Get Started</Link>
            </Button>
          ) : (
             <Button asChild size="lg">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          )}
        </div>
      </main>
      <footer className="text-center p-4 border-t text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} CalcuConsulting. All rights reserved.</p>
      </footer>
    </div>
  );
}
