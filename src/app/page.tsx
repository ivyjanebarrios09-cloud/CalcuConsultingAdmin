import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SignedIn, SignedOut } from '@clerk/nextjs';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 flex justify-between items-center border-b">
        <h1 className="text-2xl font-bold text-primary">CalcuConsultingAdmin</h1>
        <SignedOut>
          <Button asChild>
            <Link href="/sign-in">Login</Link>
          </Button>
        </SignedOut>
        <SignedIn>
          <Button asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </SignedIn>
      </header>
      <main className="flex-grow flex items-center justify-center bg-background">
        <div className="text-center p-8 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Welcome to the Admin Panel
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Manage your applications, inquiries, and messages with ease. This is the central hub for all administrative tasks for CalcuConsulting.
          </p>
          <SignedOut>
            <Button asChild size="lg">
              <Link href="/sign-in">Get Started</Link>
            </Button>
          </SignedOut>
          <SignedIn>
             <Button asChild size="lg">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </SignedIn>
        </div>
      </main>
      <footer className="text-center p-4 border-t text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} CalcuConsulting. All rights reserved.</p>
      </footer>
    </div>
  );
}
