import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PrivateRoute({ children, role }) {
    const { user } = useAuth();
    if (!user) return <Navigate to="/login" replace />;
    if (role && user.role !== role) return <Navigate to="/" replace />;
    return children;
}

function Nav() {
    const { user, logout } = useAuth();
    return (
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Task Dashboards</h1>
            <div className="flex items-center gap-3">
                {!user && (
                    <>
                        <Link to="/login">
                            <Button variant="outline">Login</Button>
                        </Link>
                        <Link to="/register">
                            <Button>Register</Button>
                        </Link>
                    </>
                )}

                {user && (
                    <>
                        <div className="text-sm">{user.name} • {user.role}</div>
                        <Button variant="destructive" onClick={logout}>Logout</Button>
                    </>
                )}
            </div>
        </div>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <div className="min-h-screen bg-background p-6 max-w-4xl mx-auto">
                    <Nav />
                    <Routes>
                        <Route path="/" element={<HomeRedirect />} />
                        <Route path="/login" element={<LoginWrapper />} />
                        <Route path="/register" element={<Register />} />

                        <Route
                            path="/user"
                            element={
                                <PrivateRoute role="user">
                                    <UserDashboard />
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path="/admin"
                            element={
                                <PrivateRoute role="admin">
                                    <AdminDashboard />
                                </PrivateRoute>
                            }
                        />

                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </div>
            </AuthProvider>
        </BrowserRouter>
    );
}

function LoginWrapper() {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            if (user.role === "admin") {
                navigate("/admin", { replace: true });
            } else {
                navigate("/user", { replace: true });
            }
        }
    }, [user, navigate]);

    if (user) return null;
    
    return <Login />;
}

function HomeRedirect() {
    const { user } = useAuth();
    
    if (!user) return <Navigate to="/login" replace />;
    
    if (user.role === "admin") {
        return <Navigate to="/admin" replace />;
    }
    
    return <Navigate to="/user" replace />;
}
