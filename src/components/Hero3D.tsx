import { Component, Suspense, lazy, type ReactNode } from "react";

const Hero3D = lazy(() => import("./Hero3DInner"));

class Hero3DErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: unknown) {
    console.warn("Hero3D failed to render:", error);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{
            background: "radial-gradient(ellipse at 30% 20%, rgba(229,157,2,0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(96,165,250,0.1) 0%, transparent 50%)",
          }} />
        </div>
      );
    }
    return <Suspense fallback={null}>{this.props.children}</Suspense>;
  }
}

export default function Hero3D() {
  return (
    <Hero3DErrorBoundary>
      <Hero3D />
    </Hero3DErrorBoundary>
  );
}
