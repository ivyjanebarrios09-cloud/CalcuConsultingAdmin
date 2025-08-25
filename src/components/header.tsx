import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export function Header() {
  const { user, signOut } = useAuth();
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className="w-full flex items-center justify-end gap-4">
        {user && <span className="text-sm text-muted-foreground">Welcome, {user.email}</span>}
         <Button variant="ghost" size="icon" onClick={signOut} aria-label="Sign out">
            <LogOut className="h-5 w-5" />
          </Button>
      </div>
    </header>
  );
}
