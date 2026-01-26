import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { SkillIcons } from './SkillIcons';

// Node and edge data
const NODE_COUNT = 18;
const EDGE_COUNT = 32;

function randomInRange(a: number, b: number) {
  return a + Math.random() * (b - a);
}

function generateNetwork() {
  // Nodes in 3D space
  const nodes = Array.from({ length: NODE_COUNT }, (_, i) => ({
    position: [
      randomInRange(-5, 5),
      randomInRange(-2.5, 2.5),
      randomInRange(-2, 2),
    ] as [number, number, number],
    phase: Math.random() * Math.PI * 2,
    speed: randomInRange(0.2, 0.5),
  }));
  // Edges: random pairs
  const edges: [number, number][] = [];
  while (edges.length < EDGE_COUNT) {
    const a = Math.floor(Math.random() * NODE_COUNT);
    let b = Math.floor(Math.random() * NODE_COUNT);
    if (a !== b && !edges.find(([x, y]) => (x === a && y === b) || (x === b && y === a))) {
      edges.push([a, b]);
    }
  }
  return { nodes, edges };
}

function Network() {
  const { nodes, edges } = useMemo(() => generateNetwork(), []);
  const nodeRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    // Animate nodes in/out in a subtle breathing pattern
    nodes.forEach((node, i) => {
      const mesh = nodeRefs.current[i];
      if (mesh) {
        const t = clock.getElapsedTime();
        mesh.position.x = node.position[0] + Math.sin(t * node.speed + node.phase) * 0.25;
        mesh.position.y = node.position[1] + Math.cos(t * node.speed + node.phase) * 0.18;
        mesh.position.z = node.position[2] + Math.sin(t * node.speed * 0.7 + node.phase) * 0.12;
      }
    });
  });

  // Edges as lines between nodes
  const edgeGeometries = useMemo(() => {
    return edges.map(([a, b]) => {
      const geometry = new THREE.BufferGeometry();
      geometry.setFromPoints([
        new THREE.Vector3(...nodes[a].position),
        new THREE.Vector3(...nodes[b].position),
      ]);
      return geometry;
    });
  }, [edges, nodes]);

  return (
    <group>
      {/* Edges */}
      {edgeGeometries.map((geometry, i) => (
        <line key={i}>
          <primitive object={geometry} attach="geometry" />
          <lineBasicMaterial color="#38bdf8" transparent opacity={0.13} linewidth={1} />
        </line>
      ))}
      {/* Nodes */}
      {nodes.map((node, i) => (
        <mesh
          key={i}
          ref={el => (nodeRefs.current[i] = el)}
          position={node.position}
        >
          <sphereGeometry args={[0.13, 24, 24]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={0.7}
            toneMapped={false}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}

export function NeuralNetworkBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }} dpr={[1, 2]}>
        <color attach="background" args={["#09090b"]} />
        <ambientLight intensity={0.18} />
        <pointLight position={[0, 0, 10]} intensity={0.5} color="#38bdf8" />
        <Network />
        <SkillIcons />
        <EffectComposer>
          <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.7} intensity={1.2} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
