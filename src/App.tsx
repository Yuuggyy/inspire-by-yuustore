import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./lib/auth";
import LandingPageMinimal from "./routes/LandingPageMinimal";
import AppErrorBoundary from "./components/AppErrorBoundary";

export default function App() {
  return (
    <AppErrorBoundary>
      <AuthProvider>
        <BrowserRouter basename="/inspire-by-yuustore">
          <Routes>
            <Route path="/" element={<LandingPageMinimal />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </AppErrorBoundary>
  );
}
