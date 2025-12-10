import React, { useEffect, useState } from "react";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UserDashboard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api.getUserTasks()
      .then((response) => {
        if (mounted) {
          const taskData = response.data || response.tasks || response || [];
          setTasks(Array.isArray(taskData) ? taskData : []);
        }
      })
      .catch((err) => {
        console.error("Error fetching tasks:", err);
        setError(err?.response?.data?.message || 'Failed to fetch tasks');
      })
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, []);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>User Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 text-sm">Showing tasks for <strong>{user?.name}</strong></div>

          {loading && <div>Loading tasks...</div>}
          {error && <div className="text-destructive">{error}</div>}

          {!loading && !error && tasks.length === 0 && <div>No tasks assigned to you.</div>}

          <div className="space-y-3">
            {tasks.map((t) => (
              <div key={t._id || t.id} className="p-3 border rounded-md bg-muted/30">
                <div className="font-semibold">{t.title}</div>
                <div className="text-sm text-muted-foreground">{t.description}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Status: {t.status}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
