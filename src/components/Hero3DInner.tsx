import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, Torus, Icosahedron } from "@react-three/drei";
import { useRef, Suspense } from "react";
import type * as THREE from "three";

function FloatingShape({ position, color, shape = "sphere", scale = 1, speed = 2 }: {
  position: [number, number, number];
  color: string;
  shape?: "sphere" | "torus" | "ico";
  scale?: number;
  speed?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.15;
      ref.current.rotation.y = state.clock.elapsedTime * 0.25;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={1.5} floatIntensity={2.5}>
      {shape === "sphere" && (
        <Sphere ref={ref} args={[1, 64, 64]} position={position} scale={scale}>
          <MeshDistortMaterial
            color={color}
            distort={0.5}
            speed={3}
            roughness={0.1}
            metalness={0.9}
            emissive={color}
            emissiveIntensity={0.3}
          />
        </Sphere>
      )}
      {shape === "torus" && (
        <Torus ref={ref} args={[0.8, 0.3, 32, 64]} position={position} scale={scale}>
          <MeshDistortMaterial
            color={color}
            distort={0.4}
            speed={2}
            roughness={0.15}
            metalness={0.85}
            emissive={color}
            emissiveIntensity={0.25}
          />
        </Torus>
      )}
      {shape === "ico" && (
        <Icosahedron ref={ref} args={[1, 0]} position={position} scale={scale}>
          <meshStandardMaterial
            color={color}
            wireframe
            emissive={color}
            emissiveIntensity={0.4}
          />
        </Icosahedron>
      )}
    </Float>
  );
}

export default function Hero3DInner() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 55 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={2} color="#e59d02" />
          <directionalLight position={[-5, 3, 2]} intensity={1.5} color="#60a5fa" />
          <directionalLight position={[0, -5, 3]} intensity={1} color="#34d399" />
          <pointLight position={[0, 0, 3]} intensity={2} color="#e59d02" />
          <pointLight position={[-3, 2, 2]} intensity={1.5} color="#f5b32d" />
          <spotLight position={[0, 5, 5]} angle={0.5} intensity={2} color="#ffffff" penumbra={0.5} />

          <FloatingShape position={[-2.2, 0.8, 0]} color="#e59d02" shape="sphere" scale={0.9} speed={1.5} />
          <FloatingShape position={[2.2, -0.3, -0.5]} color="#60a5fa" shape="torus" scale={0.8} speed={2} />
          <FloatingShape position={[1.2, 1.5, -1.5]} color="#e59d02" shape="ico" scale={0.7} speed={2.5} />
          <FloatingShape position={[-1.5, -1.2, -0.8]} color="#34d399" shape="sphere" scale={0.5} speed={1.8} />
          <FloatingShape position={[0.5, 0.3, -2.5]} color="#e59d02" shape="torus" scale={0.6} speed={2.2} />
          <FloatingShape position={[-2.8, -0.5, -1]} color="#f5b32d" shape="ico" scale={0.4} speed={3} />
        </Suspense>
      </Canvas>
    </div>
  );
}
