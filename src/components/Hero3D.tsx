/**
 * Hero3D - replaced with a lightweight CSS-based animated gradient background.
 * Three.js was causing runtime crashes on GitHub Pages. This gives a similar
 * premium visual effect without any heavy 3D library dependency.
 */
export default function Hero3D() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Base radial gradients */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(229,157,2,0.12) 0%, transparent 50%)," +
            "radial-gradient(ellipse at 70% 80%, rgba(96,165,250,0.08) 0%, transparent 50%)," +
            "radial-gradient(ellipse at 50% 50%, rgba(229,157,2,0.04) 0%, transparent 70%)",
        }}
      />
      {/* Animated floating orbs */}
      <div
        className="absolute"
        style={{
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(229,157,2,0.08) 0%, transparent 70%)",
          top: "10%",
          left: "15%",
          animation: "heroFloat1 20s ease-in-out infinite",
        }}
      />
      <div
        className="absolute"
        style={{
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(96,165,250,0.06) 0%, transparent 70%)",
          bottom: "15%",
          right: "20%",
          animation: "heroFloat2 25s ease-in-out infinite",
        }}
      />
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <style>{`
        @keyframes heroFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(60px, -40px) scale(1.1); }
          66% { transform: translate(-30px, 50px) scale(0.95); }
        }
        @keyframes heroFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-50px, 40px) scale(1.15); }
          66% { transform: translate(40px, -30px) scale(0.9); }
        }
      `}</style>
    </div>
  );
}
