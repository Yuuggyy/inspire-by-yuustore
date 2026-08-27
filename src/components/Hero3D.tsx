import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, Torus, Icosahedron } from "@react-three/drei";
import { useRef, Suspense } from "react";
import type * as THREE from "three";

function FloatingShape({ position, color, shape = "sphere", scale = 1 }: {
  position: [number, number, number];
  color: string;
  shape?: "sphere" | "torus" | "ico";
  scale?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.2;
      ref.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      {shape === "sphere" && (
        <Sphere ref={ref} args={[1, 64, 64]} position={position} scale={scale}>
          <MeshDistortMaterial color={color} distort={0.4} speed={2} roughness={0.2} metalness={0.8} />
        </Sphere>
      )}
      {shape === "torus" && (
        <Torus ref={ref} args={[0.8, 0.3, 32, 64]} position={position} scale={scale}>
          <MeshDistortMaterial color={color} distort={0.3} speed={1.5} roughness={0.3} metalness={0.7} />
        </Torus>
      )}
      {shape === "ico" && (
        <Icosahedron ref={ref} args={[1, 0]} position={position} scale={scale}>
          <meshStandardMaterial color={color} wireframe flatShading />
        </Icosahedron>
      )}
    </Float>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} color="#e59d02" />
          <directionalLight position={[-5, -5, 3]} intensity={0.5} color="#3b82f6" />
          <pointLight position={[0, 0, 3]} intensity={1} color="#e59d02" />

          <FloatingShape position={[-2.5, 1, 0]} color="#e59d02" shape="sphere" scale={0.8} />
          <FloatingShape position={[2.5, -0.5, -1]} color="#3b82f6" shape="torus" scale={0.7} />
          <FloatingShape position={[1.5, 1.5, -2]} color="#e59d02" shape="ico" scale={0.6} />
          <FloatingShape position={[-1.5, -1.5, -1]} color="#10b981" shape="sphere" scale={0.4} />
          <FloatingShape position={[0, 0.5, -3]} color="#e59d02" shape="torus" scale={0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
}
