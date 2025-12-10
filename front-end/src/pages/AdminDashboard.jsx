import React, { useEffect, useState } from "react";
import api from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api.getAllTasks()
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
          <CardTitle>Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && <div>Loading tasks...</div>}
          {error && <div className="text-destructive">{error}</div>}

          {!loading && !error && tasks.length === 0 && <div>No tasks found.</div>}

          <div className="space-y-3">
            {tasks.map((t) => (
              <div key={t._id || t.id} className="p-3 border rounded-md bg-muted/30">
                <div className="font-semibold">{t.title}</div>
                <div className="text-sm text-muted-foreground">{t.description}</div>
                {t.userId && (
                  <div className="text-xs text-muted-foreground mt-1">
                    Owner: {t.userId.name || t.userId.email || t.userId}
                  </div>
                )}
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
