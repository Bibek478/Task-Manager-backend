import React, { useState } from "react";
import api from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.register({ name, email, password });
      navigate('/login');
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm block mb-1">Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div>
            <label className="text-sm block mb-1">Email</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div>
            <label className="text-sm block mb-1">Password</label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          {error && <div className="text-sm text-destructive">{error}</div>}

          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
