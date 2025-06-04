// context/UserContext.js

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data?.session || null);
      setUser(data?.session?.user || null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user || null);
    });

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, session, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// ✅ Safe fallback: prevents crash if used outside provider
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    console.warn("⚠️ useUser() called outside of <UserProvider>. Returning fallback.");
    return {
      user: null,
      session: null,
      loading: true,
    };
  }
  return context;
};
