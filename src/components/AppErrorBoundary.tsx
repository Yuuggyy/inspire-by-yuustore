import { Component, type ReactNode } from "react";

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class AppErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: unknown) {
    console.error("App crashed:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#121218", color: "#e8e8ef", padding: "2rem", fontFamily: "monospace" }}>
          <div style={{ maxWidth: "600px" }}>
            <h1 style={{ color: "#e59d02", fontSize: "1.5rem", marginBottom: "1rem" }}>Erreur de chargement</h1>
            <p style={{ color: "#9a9ab0", marginBottom: "1rem" }}>L'application a rencontré une erreur:</p>
            <pre style={{ background: "#1a1a24", padding: "1rem", borderRadius: "8px", overflow: "auto", fontSize: "0.85rem", border: "1px solid #333" }}>
              {this.state.error?.message}
              {"\n\n"}
              {this.state.error?.stack}
            </pre>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
