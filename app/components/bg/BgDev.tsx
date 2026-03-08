'use client'
import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

const SHAPES = Array.from({ length: 9 }, (_, i) => ({
  geo: (['ico', 'oct', 'box'] as const)[i % 3],
  x: (Math.random() - 0.5) * 12,
  y: (Math.random() - 0.5) * 8,
  z: (Math.random() - 0.5) * 6,
  speed: 0.08 + Math.random() * 0.14,
  phase: Math.random() * Math.PI * 2,
}))

function Shape({ geo, x, y, z, speed, phase }: typeof SHAPES[0]) {
  const ref = useRef<THREE.Mesh>(null)
  const color = new THREE.Color('#2d5c38')

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    ref.current.position.y = y + Math.sin(t * speed + phase) * 0.7
    ref.current.rotation.x = t * speed * 0.5
    ref.current.rotation.z = t * speed * 0.3
  })

  return (
    <mesh ref={ref} position={[x, y, z]}>
      {geo === 'ico' && <icosahedronGeometry args={[0.45, 0]} />}
      {geo === 'oct' && <octahedronGeometry args={[0.45]} />}
      {geo === 'box' && <boxGeometry args={[0.55, 0.55, 0.55]} />}
      <meshBasicMaterial color={color} wireframe transparent opacity={0.18} />
    </mesh>
  )
}

function Grid() {
  const ref = useRef<THREE.LineSegments>(null)
  const positions = useMemo(() => {
    const lines: number[] = []
    const size = 14, step = 1.4
    for (let x = -size; x <= size; x += step) lines.push(x, -size, -4, x, size, -4)
    for (let y = -size; y <= size; y += step) lines.push(-size, y, -4, size, y, -4)
    return new Float32Array(lines)
  }, [])

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.z = clock.getElapsedTime() * 0.008
  })

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color={new THREE.Color('#2d5c38')} transparent opacity={0.05} />
    </lineSegments>
  )
}

export default function BgDev() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 55 }}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      gl={{ antialias: false, alpha: true }}
    >
      <Grid />
      {SHAPES.map((s, i) => <Shape key={i} {...s} />)}
      <EffectComposer>
        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} intensity={0.3} />
      </EffectComposer>
    </Canvas>
  )
}
