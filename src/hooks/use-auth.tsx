"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import type { User } from "firebase/auth";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null | undefined;
  loading: boolean;
  error: Error | undefined;
  signOut: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: undefined,
  signOut: async () => false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [signOut, signOutLoading, signOutError] = useSignOut(auth);
  
  const handleSignOut = async () => {
    try {
      const success = await signOut();
      if (success) {
        // Clear session cookie
        await fetch('/api/auth/session', { method: 'DELETE' });
        router.push('/');
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, signOut: handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
