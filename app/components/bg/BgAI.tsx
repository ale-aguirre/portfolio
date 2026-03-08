'use client'
import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

function NeuralNetwork() {
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)

  const count = 90
  const { positions, linePositions } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 14
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    const lines: number[] = []
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = pos[i * 3] - pos[j * 3]
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1]
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2]
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < 2.8) {
          lines.push(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2])
          lines.push(pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2])
        }
      }
    }
    return { positions: pos, linePositions: new Float32Array(lines) }
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const rot = { y: t * 0.04, x: Math.sin(t * 0.025) * 0.15 }
    if (pointsRef.current) { pointsRef.current.rotation.y = rot.y; pointsRef.current.rotation.x = rot.x }
    if (linesRef.current)  { linesRef.current.rotation.y  = rot.y; linesRef.current.rotation.x  = rot.x }
  })

  const color = new THREE.Color('#6a52a0')

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.04} color={color} transparent opacity={0.4} sizeAttenuation />
      </points>
      {linePositions.length > 0 && (
        <lineSegments ref={linesRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color={color} transparent opacity={0.07} />
        </lineSegments>
      )}
    </>
  )
}

export default function BgAI() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      gl={{ antialias: false, alpha: true }}
    >
      <NeuralNetwork />
      <EffectComposer>
        <Bloom luminanceThreshold={0.4} luminanceSmoothing={0.9} intensity={0.4} />
      </EffectComposer>
    </Canvas>
  )
}
