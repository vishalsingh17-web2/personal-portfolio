import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei/web/Html'
import { useRef, useState, useEffect, useMemo, ReactNode } from 'react'
import { useReducedMotion } from 'framer-motion'
import * as THREE from 'three'

// iPhone 16 Pro dimensions (scaled)
const PHONE_WIDTH = 2.8
const PHONE_HEIGHT = 5.8
const PHONE_DEPTH = 0.3
const CORNER_RADIUS = 0.45
const SCREEN_BEZEL = 0.1
const DYNAMIC_ISLAND_WIDTH = 0.8
const DYNAMIC_ISLAND_HEIGHT = 0.18
const SCREEN_WIDTH = PHONE_WIDTH - SCREEN_BEZEL * 2
const SCREEN_HEIGHT = PHONE_HEIGHT - SCREEN_BEZEL * 2

// Match the DOM overlay to the 3D glass aspect ratio instead of using legacy phone dimensions.
const SCREEN_CONTENT_WIDTH = 390
const SCREEN_CONTENT_HEIGHT = Math.round(
  (SCREEN_HEIGHT / SCREEN_WIDTH) * SCREEN_CONTENT_WIDTH
)
const SCREEN_CONTENT_RADIUS = Math.round(
  ((CORNER_RADIUS - 0.05) / SCREEN_WIDTH) * SCREEN_CONTENT_WIDTH
)

// One calibration value controls how much of the glass the DOM should fill.
const SCREEN_CONTENT_SCALE = 0.294

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

  const frameShape = useMemo(() => createRoundedRectShape(PHONE_WIDTH, PHONE_HEIGHT, CORNER_RADIUS), [])

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
          color="#36383d"
          metalness={0.75}
          roughness={0.35}
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
          color="#747a84"
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>

      {/* Screen glass */}
      <mesh position={[0, 0, 0.005]}>
        <extrudeGeometry
          args={[
            createRoundedRectShape(
              SCREEN_WIDTH,
              SCREEN_HEIGHT,
              CORNER_RADIUS - 0.05
            ),
            { depth: 0.001, bevelEnabled: false },
          ]}
        />
        <meshStandardMaterial color="#000000" metalness={0} roughness={0.35} />
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
        <meshStandardMaterial color="#747a84" metalness={1} roughness={0.2} />
      </mesh>
      {/* Volume buttons */}
      <mesh position={[-PHONE_WIDTH / 2 - 0.02, 0.9, -PHONE_DEPTH / 2]}>
        <boxGeometry args={[0.03, 0.25, 0.08]} />
        <meshStandardMaterial color="#747a84" metalness={1} roughness={0.2} />
      </mesh>
      <mesh position={[-PHONE_WIDTH / 2 - 0.02, 0.5, -PHONE_DEPTH / 2]}>
        <boxGeometry args={[0.03, 0.25, 0.08]} />
        <meshStandardMaterial color="#747a84" metalness={1} roughness={0.2} />
      </mesh>
      {/* Action button */}
      <mesh position={[-PHONE_WIDTH / 2 - 0.02, 1.3, -PHONE_DEPTH / 2]}>
        <boxGeometry args={[0.03, 0.12, 0.08]} />
        <meshStandardMaterial color="#747a84" metalness={1} roughness={0.2} />
      </mesh>
    </group>
  )
}

// Screen Content with HTML
function ScreenContent({ children }: { children: ReactNode }) {
  return (
    <Html
      center
      transform
      position={[0, 0, 0.007]}
      scale={SCREEN_CONTENT_SCALE}
      style={{
        width: `${SCREEN_CONTENT_WIDTH}px`,
        height: `${SCREEN_CONTENT_HEIGHT}px`,
        borderRadius: `${SCREEN_CONTENT_RADIUS}px`,
        overflow: 'hidden',
        background: '#000000',
        pointerEvents: 'auto',
        boxShadow: '0 0 0 3px #15171b, 0 0 0 4px #626974, 0 24px 60px rgba(0,0,0,0.55)',
      }}
    >
      <div
        style={{
          width: `${SCREEN_CONTENT_WIDTH}px`,
          height: `${SCREEN_CONTENT_HEIGHT}px`,
          overflow: 'hidden',
          borderRadius: `${SCREEN_CONTENT_RADIUS}px`,
          background: '#000000',
          position: 'relative',
        }}
      >
        {children}
      </div>
    </Html>
  )
}

// Mouse input updates refs rather than rebuilding geometry on every pointer move.
function InteractivePhone({ children, visible }: { children: ReactNode; visible: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const activeUntil = useRef(0)
  const reduceMotion = useReducedMotion()
  const invalidate = useThree(state => state.invalidate)

  useEffect(() => {
    if (!visible) return
    activeUntil.current = performance.now() + 1200
    invalidate()
    if (reduceMotion) return

    const wake = () => {
      activeUntil.current = performance.now() + 1200
      invalidate()
    }
    const move = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1
      wake()
    }
    const leave = () => {
      mouse.current = { x: 0, y: 0 }
      wake()
    }
    window.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', leave)
    }
  }, [invalidate, reduceMotion, visible])

  useFrame((state, delta) => {
    const group = groupRef.current
    if (!group || !visible) return
    if (reduceMotion) {
      group.rotation.set(0, 0, 0)
      group.position.y = 0
      return
    }
    const active = performance.now() < activeUntil.current
    const targetX = mouse.current.y * 0.1
    const targetY = mouse.current.x * 0.15
    const targetBob = active ? Math.sin(state.clock.elapsedTime * 0.75) * 0.025 : 0
    const ease = 1 - Math.exp(-8 * Math.min(delta, 0.05))
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetX, ease)
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, targetY, ease)
    group.position.y = THREE.MathUtils.lerp(group.position.y, targetBob, ease)

    // Settle after interaction, then stop requesting frames while idle.
    if (active || Math.abs(group.rotation.x - targetX) > 0.0001 ||
      Math.abs(group.rotation.y - targetY) > 0.0001 || Math.abs(group.position.y) > 0.0001) invalidate()
  })

  return <group ref={groupRef}><IPhoneFrame /><ScreenContent>{children}</ScreenContent></group>
}

interface IPhone3DProps {
  children: ReactNode
  className?: string
}

export function IPhone3D({ children, className = '' }: IPhone3DProps) {
  const [visible, setVisible] = useState(() => !document.hidden)
  useEffect(() => {
    const update = () => setVisible(!document.hidden)
    document.addEventListener('visibilitychange', update)
    return () => document.removeEventListener('visibilitychange', update)
  }, [])

  return (
    <div className={`w-full h-full bg-transparent ${className}`}>
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]} frameloop={visible ? 'demand' : 'never'}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
        style={{ width: '100%', height: '100%' }}>
        <ambientLight intensity={0.75} />
        <spotLight position={[5, 10, 5]} angle={0.3} penumbra={1} intensity={1} />
        <directionalLight position={[-4, 5, 6]} intensity={2.5} color="#e3e9f2" />
        <directionalLight position={[4, -2, 3]} intensity={1.2} color="#ffffff" />
        <InteractivePhone visible={visible}>{children}</InteractivePhone>
      </Canvas>
    </div>
  )
}

export default IPhone3D
