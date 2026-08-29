import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./lib/auth";
import { Toaster } from "sonner";
import { Loader2 } from "lucide-react";
import LandingPageMinimal from "./routes/LandingPageMinimal";
import AdminDashboard from "./routes/AdminDashboard";
import AppErrorBoundary from "./components/AppErrorBoundary";

function ProtectedAdmin({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-accent" /></div>;
  if (!user || !isAdmin) return <Navigate to="/" />;
  return <>{children}</>;
}

export default function App() {
  return (
    <AppErrorBoundary>
      <AuthProvider>
        <BrowserRouter basename="/inspire-by-yuustore">
          <Toaster
            position="top-center"
            toastOptions={{
              style: { background: "#13131a", color: "#e8e8ef", border: "1px solid #333" },
            }}
          />
          <Routes>
            <Route path="/" element={<LandingPageMinimal />} />
            <Route path="/admin" element={<ProtectedAdmin><AdminDashboard /></ProtectedAdmin>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </AppErrorBoundary>
  );
}
