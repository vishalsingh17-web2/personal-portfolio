import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Trail, Float } from '@react-three/drei';
import * as THREE from 'three';

// Example skill icons as colored spheres (replace with textures or SVGs for real icons)
const skills = [
  { name: 'TypeScript', color: '#3178c6' },
  { name: 'React', color: '#61dafb' },
  { name: 'Node.js', color: '#3c873a' },
  { name: 'Prisma', color: '#0c344b' },
  { name: 'NestJS', color: '#ea2845' },
  { name: 'Tailwind', color: '#38bdf8' },
  { name: 'Vite', color: '#646cff' },
];

function getOrbit(i: number, t: number) {
  // Distribute icons in a circle, animate their orbits
  const angle = (i / skills.length) * Math.PI * 2 + t * 0.15;
  const radius = 3.5 + Math.sin(t * 0.3 + i) * 0.3;
  return [
    Math.cos(angle) * radius,
    Math.sin(angle) * radius * 0.5,
    Math.sin(angle * 1.5 + t * 0.2) * 0.7,
  ];
}

export function SkillIcons() {
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    skills.forEach((_, i) => {
      const mesh = meshRefs.current[i];
      if (mesh) {
        const [x, y, z] = getOrbit(i, t);
        mesh.position.set(x, y, z);
        mesh.rotation.y = t * 0.7 + i;
      }
    });
  });

  return (
    <group>
      {skills.map((skill, i) => (
        <Trail
          key={skill.name}
          width={2.5}
          length={8}
          color={new THREE.Color(skill.color)}
          attenuation={t => t * t}
        >
          <Float speed={2} floatIntensity={0.5} rotationIntensity={0.7}>
            <mesh ref={el => (meshRefs.current[i] = el)}>
              <sphereGeometry args={[0.28, 32, 32]} />
              <meshStandardMaterial
                color={skill.color}
                emissive={skill.color}
                emissiveIntensity={1.2}
                toneMapped={false}
                transparent
                opacity={0.95}
              />
            </mesh>
          </Float>
        </Trail>
      ))}
    </group>
  );
}
