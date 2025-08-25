"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export default function SignUpPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
  const [isSignUpAllowed, setIsSignUpAllowed] = React.useState(false);
  const [checking, setChecking] = React.useState(true);

  React.useEffect(() => {
    const checkUserExists = async () => {
      try {
        const response = await fetch('/api/auth/check-user');
        const { hasUsers } = await response.json();
        if (hasUsers) {
          router.push('/sign-in');
          toast({
            title: 'Sign-up Disabled',
            description: 'An admin account already exists. Please sign in.',
            variant: 'destructive',
          });
        } else {
          setIsSignUpAllowed(true);
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Could not verify admin existence. Please try again.',
          variant: 'destructive',
        });
        router.push('/sign-in');
      } finally {
        setChecking(false);
      }
    };

    checkUserExists();
  }, [router, toast]);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await createUserWithEmailAndPassword(values.email, values.password);
      if (res) {
         // Set session cookie
        const token = await res.user.getIdToken();
        await fetch('/api/auth/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });
        toast({ title: "Account created successfully!" });
        router.push("/dashboard");
      }
    } catch (e: any) {
      toast({ title: "Error creating account", description: e.message, variant: "destructive" });
    }
  };

  React.useEffect(() => {
    if (error) {
      toast({ title: "Error creating account", description: error.message, variant: "destructive" });
    }
  }, [error, toast]);
  
  if (checking) {
    return (
       <div className="flex flex-col min-h-screen items-center justify-center">
        <div className="text-2xl font-bold">Checking admin status...</div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSignUpAllowed ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="m@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Creating account..." : "Create an account"}
                </Button>
              </form>
            </Form>
          ) : (
            <div className="text-center text-muted-foreground">
              Sign-up is disabled because an admin account already exists.
            </div>
          )}
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/sign-in" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
