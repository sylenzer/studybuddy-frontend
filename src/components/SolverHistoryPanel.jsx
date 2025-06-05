// components/SolverHistoryPanel.jsx

import React, { useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useSupabaseProgress } from '@/hooks/useSupabaseProgress';
import { Button } from '@/components/ui/button';

const SolverHistoryPanel = ({ onLoadProblem }) => {
  const { user } = useUser();
  const { progress, fetchHistory, loading } = useSupabaseProgress();

  useEffect(() => {
    if (user?.id) fetchHistory(user.id);
  }, [user]);

  return (
    <div className="p-4 border rounded-xl shadow bg-muted/30 max-h-[400px] overflow-y-auto">
      <h3 className="text-lg font-semibold mb-3">🧠 Problem History</h3>
      {loading ? (
        <p>Loading...</p>
      ) : progress?.length ? (
        progress.map((item) => (
          <div
            key={item.id}
            className="mb-2 p-2 rounded bg-white shadow text-sm border border-gray-200"
          >
            <p className="mb-1 line-clamp-2">{item.problem}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onLoadProblem(item.problem)}
            >
              Load
            </Button>
          </div>
        ))
      ) : (
        <p>No problems saved yet.</p>
      )}
    </div>
  );
};

export default SolverHistoryPanel;
