// /src/hooks/useSupabaseProgress.js

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useUser } from '@/context/UserContext';

export function useSupabaseProgress() {
  const { user } = useUser();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch user's solver history
  const fetchHistory = async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('solver_history')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Error fetching history:', error.message);
    } else {
      setHistory(data);
    }

    setLoading(false);
  };

  // Save new entry to solver_history table
  const saveProgress = async ({ problem, result, visual, hintMode }) => {
    if (!user) return;

    const { error } = await supabase.from('solver_history').insert([
      {
        user_id: user.id,
        problem,
        result,
        visual,
        hint_mode: hintMode,
      },
    ]);

    if (error) {
      console.error('❌ Error saving progress:', error.message);
    } else {
      fetchHistory(); // Refresh after save
    }
  };

  // Auto-fetch when user is available
  useEffect(() => {
    if (user) {
      fetchHistory();
    }
  }, [user]);

  return {
    history,
    loading,
    fetchHistory,
    saveProgress,
  };
}
