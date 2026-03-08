'use client'
import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

// Biome colors — each tile type has a top color + side (darker) color
const BIOMES = [
  { top: '#c8860a', side: '#7a4f06' },  // Desert/amber
  { top: '#2d7a3c', side: '#1a4a22' },  // Forest green
  { top: '#1a5c8a', side: '#0d3558' },  // Water blue
  { top: '#6a5a3a', side: '#3e3220' },  // Dirt/brown
  { top: '#8a4c2a', side: '#552a14' },  // Rocky orange
  { top: '#4a6a8a', side: '#2a3e58' },  // Deep water
  { top: '#3a7a4a', side: '#1e4a2a' },  // Dark forest
]

// Deterministic biome map — same pattern every render
function getBiome(col: number, row: number): typeof BIOMES[0] {
  const noise = Math.sin(col * 1.7 + row * 2.3) * 0.5 + Math.cos(col * 0.9 - row * 1.5) * 0.5
  const idx = Math.abs(Math.floor(noise * BIOMES.length)) % BIOMES.length
  return BIOMES[idx]
}

// Height variation per tile
function getTileHeight(col: number, row: number): number {
  const h = Math.sin(col * 1.2 + row * 0.8) * 0.5 + Math.cos(col * 0.6 + row * 1.4) * 0.3
  return 0.08 + Math.abs(h) * 0.32
}

type HexTileProps = {
  position: [number, number, number]
  tileHeight: number
  biome: typeof BIOMES[0]
  phase: number  // for bobbing offset
}

function HexTile({ position, tileHeight, biome, phase }: HexTileProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    groupRef.current.position.y = position[1] + Math.sin(t * 0.6 + phase) * 0.018
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Cylinder body */}
      <mesh>
        <cylinderGeometry args={[0.48, 0.48, tileHeight, 6, 1]} />
        <meshBasicMaterial color={biome.side} transparent opacity={0.85} />
      </mesh>
      {/* Top cap disc (slightly above cylinder top) */}
      <mesh position={[0, tileHeight / 2, 0]}>
        <cylinderGeometry args={[0.48, 0.48, 0.025, 6, 1]} />
        <meshBasicMaterial color={biome.top} transparent opacity={0.95} />
      </mesh>
    </group>
  )
}

function HexMap() {
  const COLS = 12
  const ROWS = 9

  const tiles = useMemo(() => {
    const result: HexTileProps[] = []
    const HEX_W = 0.88  // horizontal spacing
    const HEX_D = 0.76  // depth spacing

    for (let col = 0; col < COLS; col++) {
      for (let row = 0; row < ROWS; row++) {
        const x = (col - COLS / 2) * HEX_W
        const z = (row - ROWS / 2) * HEX_D + (col % 2) * (HEX_D / 2)
        const h = getTileHeight(col, row)
        const biome = getBiome(col, row)
        const phase = col * 0.4 + row * 0.7

        result.push({
          position: [x, -h / 2, z],
          tileHeight: h,
          biome,
          phase,
        })
      }
    }
    return result
  }, [])

  return (
    <>
      {tiles.map((t, i) => (
        <HexTile key={i} {...t} />
      ))}
    </>
  )
}

// Floating particle dust above the map
function MapDust() {
  const ref = useRef<THREE.Points>(null)
  const COUNT = 80

  const positions = useMemo(() => {
    const pos = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 9
      pos[i * 3 + 1] = Math.random() * 1.5
      pos[i * 3 + 2] = (Math.random() - 0.5) * 7
    }
    return pos
  }, [])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    const pos = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3 + 1] += 0.002
      pos[i * 3]     += Math.sin(t * 0.3 + i) * 0.001
      if (pos[i * 3 + 1] > 2) pos[i * 3 + 1] = 0
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#ffd700" transparent opacity={0.35} sizeAttenuation />
    </points>
  )
}

export default function BgGaming() {
  return (
    <Canvas
      camera={{ position: [0, 5, 5.5], fov: 55 }}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      gl={{ antialias: false, alpha: true }}
    >
      <HexMap />
      <MapDust />
      <EffectComposer>
        <Bloom luminanceThreshold={0.4} luminanceSmoothing={0.8} intensity={0.5} />
      </EffectComposer>
    </Canvas>
  )
}
