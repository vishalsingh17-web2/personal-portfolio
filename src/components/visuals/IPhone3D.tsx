import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Environment, ContactShadows, Float } from '@react-three/drei'
import { useRef, useState, useEffect, ReactNode } from 'react'
import * as THREE from 'three'

// iPhone 16 Pro dimensions (scaled)
const PHONE_WIDTH = 2.8
const PHONE_HEIGHT = 5.8
const PHONE_DEPTH = 0.3
const CORNER_RADIUS = 0.45
const SCREEN_BEZEL = 0.1
const DYNAMIC_ISLAND_WIDTH = 0.8
const DYNAMIC_ISLAND_HEIGHT = 0.18

// Create rounded rectangle shape
function createRoundedRectShape(width: number, height: number, radius: number) {
  const shape = new THREE.Shape()
  const x = -width / 2
  const y = -height / 2

  shape.moveTo(x + radius, y)
  shape.lineTo(x + width - radius, y)
  shape.quadraticCurveTo(x + width, y, x + width, y + radius)
  shape.lineTo(x + width, y + height - radius)
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  shape.lineTo(x + radius, y + height)
  shape.quadraticCurveTo(x, y + height, x, y + height - radius)
  shape.lineTo(x, y + radius)
  shape.quadraticCurveTo(x, y, x + radius, y)

  return shape
}

// iPhone Frame Component
function IPhoneFrame() {
  const frameRef = useRef<THREE.Group>(null)

  const frameShape = createRoundedRectShape(PHONE_WIDTH, PHONE_HEIGHT, CORNER_RADIUS)

  const extrudeSettings = {
    steps: 1,
    depth: PHONE_DEPTH,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelSegments: 3,
  }

  return (
    <group ref={frameRef}>
      {/* Main body */}
      <mesh position={[0, 0, -PHONE_DEPTH / 2]}>
        <extrudeGeometry args={[frameShape, extrudeSettings]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Titanium frame edge */}
      <mesh position={[0, 0, 0.001]}>
        <extrudeGeometry
          args={[
            frameShape,
            { ...extrudeSettings, depth: 0.01, bevelEnabled: false },
          ]}
        />
        <meshStandardMaterial
          color="#3d3d3d"
          metalness={1}
          roughness={0.2}
        />
      </mesh>

      {/* Screen glass */}
      <mesh position={[0, 0, 0.005]}>
        <extrudeGeometry
          args={[
            createRoundedRectShape(
              PHONE_WIDTH - SCREEN_BEZEL * 2,
              PHONE_HEIGHT - SCREEN_BEZEL * 2,
              CORNER_RADIUS - 0.05
            ),
            { depth: 0.001, bevelEnabled: false },
          ]}
        />
        <meshPhysicalMaterial
          color="#000000"
          metalness={0}
          roughness={0}
          transmission={0.1}
          thickness={0.5}
          clearcoat={1}
          clearcoatRoughness={0}
        />
      </mesh>

      {/* Dynamic Island */}
      <mesh position={[0, PHONE_HEIGHT / 2 - 0.45, 0.01]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[DYNAMIC_ISLAND_HEIGHT / 2, DYNAMIC_ISLAND_WIDTH - DYNAMIC_ISLAND_HEIGHT, 16, 8]} />
        <meshStandardMaterial color="#000000" metalness={0} roughness={0.3} />
      </mesh>

      {/* Camera bump on back */}
      <group position={[-PHONE_WIDTH / 2 + 0.55, PHONE_HEIGHT / 2 - 0.55, -PHONE_DEPTH - 0.05]}>
        <mesh>
          <boxGeometry args={[0.9, 0.9, 0.1]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Camera lenses */}
        {[
          [-0.22, 0.22],
          [0.22, 0.22],
          [-0.22, -0.22],
        ].map(([x, y], i) => (
          <mesh key={i} position={[x, y, 0.06]}>
            <cylinderGeometry args={[0.15, 0.15, 0.05, 32]} />
            <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} />
          </mesh>
        ))}
      </group>

      {/* Side buttons */}
      {/* Power button */}
      <mesh position={[PHONE_WIDTH / 2 + 0.02, 0.8, -PHONE_DEPTH / 2]}>
        <boxGeometry args={[0.03, 0.4, 0.08]} />
        <meshStandardMaterial color="#3d3d3d" metalness={1} roughness={0.2} />
      </mesh>
      {/* Volume buttons */}
      <mesh position={[-PHONE_WIDTH / 2 - 0.02, 0.9, -PHONE_DEPTH / 2]}>
        <boxGeometry args={[0.03, 0.25, 0.08]} />
        <meshStandardMaterial color="#3d3d3d" metalness={1} roughness={0.2} />
      </mesh>
      <mesh position={[-PHONE_WIDTH / 2 - 0.02, 0.5, -PHONE_DEPTH / 2]}>
        <boxGeometry args={[0.03, 0.25, 0.08]} />
        <meshStandardMaterial color="#3d3d3d" metalness={1} roughness={0.2} />
      </mesh>
      {/* Action button */}
      <mesh position={[-PHONE_WIDTH / 2 - 0.02, 1.3, -PHONE_DEPTH / 2]}>
        <boxGeometry args={[0.03, 0.12, 0.08]} />
        <meshStandardMaterial color="#3d3d3d" metalness={1} roughness={0.2} />
      </mesh>
    </group>
  )
}

// Screen Content with HTML
function ScreenContent({ children }: { children: ReactNode }) {
  return (
    <Html
      transform
      position={[0, 0, 0.007]}
      scale={0.29}
      style={{
        width: '375px',
        height: '812px',
        borderRadius: '40px',
        overflow: 'hidden',
        background: '#09090b',
        pointerEvents: 'auto',
      }}
    >
      <div
        style={{
          width: '375px',
          height: '812px',
          overflow: 'hidden',
          borderRadius: '40px',
          background: '#09090b',
          position: 'relative',
        }}
      >
        {children}
      </div>
    </Html>
  )
}

// Interactive Phone with mouse tracking
function InteractivePhone({ children }: { children: ReactNode }) {
  const groupRef = useRef<THREE.Group>(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const targetRotation = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(() => {
    if (!groupRef.current) return

    // Smooth rotation based on mouse position
    targetRotation.current.y = mouse.x * 0.15
    targetRotation.current.x = mouse.y * 0.1

    groupRef.current.rotation.y +=
      (targetRotation.current.y - groupRef.current.rotation.y) * 0.05
    groupRef.current.rotation.x +=
      (targetRotation.current.x - groupRef.current.rotation.x) * 0.05
  })

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef}>
        <IPhoneFrame />
        <ScreenContent>{children}</ScreenContent>
      </group>
    </Float>
  )
}

// Main Export
interface IPhone3DProps {
  children: ReactNode
  className?: string
}

export function IPhone3D({ children, className = '' }: IPhone3DProps) {
  return (
    <div className={`w-full h-full bg-transparent ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.4} />
        <spotLight
          position={[5, 10, 5]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          castShadow
        />
        <pointLight position={[-5, 5, 5]} intensity={0.5} color="#38bdf8" />
        <pointLight position={[5, -5, 5]} intensity={0.3} color="#8b5cf6" />

        <InteractivePhone>{children}</InteractivePhone>

        <ContactShadows
          position={[0, -3, 0]}
          opacity={0.4}
          scale={10}
          blur={2}
          far={4}
        />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}

export default IPhone3D
