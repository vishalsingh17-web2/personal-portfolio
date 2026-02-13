import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const STAR_COUNT = 400

function Stars() {
  const meshRef = useRef<THREE.Points>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  // Generate random star positions and sizes
  const { positions, sizes, colors } = useMemo(() => {
    const positions = new Float32Array(STAR_COUNT * 3)
    const sizes = new Float32Array(STAR_COUNT)
    const colors = new Float32Array(STAR_COUNT * 3)

    for (let i = 0; i < STAR_COUNT; i++) {
      // Spread stars across a large volume
      positions[i * 3] = (Math.random() - 0.5) * 50
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5

      sizes[i] = Math.random() * 2 + 0.5

      // Subtle color variation: white, light blue, light purple
      const colorChoice = Math.random()
      if (colorChoice < 0.5) {
        // White
        colors[i * 3] = 0.9 + Math.random() * 0.1
        colors[i * 3 + 1] = 0.9 + Math.random() * 0.1
        colors[i * 3 + 2] = 0.95 + Math.random() * 0.05
      } else if (colorChoice < 0.8) {
        // Light blue
        colors[i * 3] = 0.6 + Math.random() * 0.2
        colors[i * 3 + 1] = 0.7 + Math.random() * 0.2
        colors[i * 3 + 2] = 1.0
      } else {
        // Light purple
        colors[i * 3] = 0.8 + Math.random() * 0.15
        colors[i * 3 + 1] = 0.6 + Math.random() * 0.2
        colors[i * 3 + 2] = 1.0
      }
    }

    return { positions, sizes, colors }
  }, [])

  // Track mouse for parallax
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return

    const time = state.clock.elapsedTime

    // Gentle rotation based on mouse
    meshRef.current.rotation.x = mouseRef.current.y * 0.05 + Math.sin(time * 0.1) * 0.02
    meshRef.current.rotation.y = mouseRef.current.x * 0.08 + time * 0.015

    // Twinkle effect - modify sizes
    const sizeAttr = meshRef.current.geometry.attributes.size as THREE.BufferAttribute
    for (let i = 0; i < STAR_COUNT; i++) {
      const baseSize = sizes[i]
      const twinkle = Math.sin(time * (1.5 + i * 0.01) + i * 0.5) * 0.5 + 0.5
      sizeAttr.array[i] = baseSize * (0.4 + twinkle * 0.6)
    }
    sizeAttr.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        sizeAttenuation
        transparent
        opacity={0.7}
        vertexColors
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

// Shooting stars
function ShootingStars() {
  const lineRef = useRef<THREE.Group>(null)
  const shootingStars = useMemo(() => {
    return Array.from({ length: 3 }, (_, i) => ({
      id: i,
      delay: Math.random() * 8,
      duration: 1.5 + Math.random(),
      startX: -15 + Math.random() * 10,
      startY: 8 + Math.random() * 5,
      angle: -0.4 - Math.random() * 0.3,
    }))
  }, [])

  useFrame((state) => {
    if (!lineRef.current) return
    const time = state.clock.elapsedTime

    lineRef.current.children.forEach((child, i) => {
      const star = shootingStars[i]
      const cycle = (time + star.delay) % (star.duration + 6) // repeat every N seconds

      if (cycle < star.duration) {
        const t = cycle / star.duration
        const x = star.startX + t * 30
        const y = star.startY + t * 30 * Math.tan(star.angle)
        child.position.set(x, y, -8)
        child.visible = true
        // Fade in and out
        const opacity = t < 0.2 ? t / 0.2 : t > 0.7 ? (1 - t) / 0.3 : 1
        const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial
        mat.opacity = opacity * 0.6
      } else {
        child.visible = false
      }
    })
  })

  return (
    <group ref={lineRef}>
      {shootingStars.map((star) => (
        <mesh key={star.id} visible={false} rotation={[0, 0, star.angle]}>
          <planeGeometry args={[1.5, 0.01]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  )
}

export function StarField() {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        zIndex: 0,
        top: '-10%',
        left: '-10%',
        width: '120%',
        height: '120%',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
      >
        <Stars />
        <ShootingStars />
      </Canvas>
    </div>
  )
}

export default StarField
