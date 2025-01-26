"use client"

import { useRef, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { TextureLoader, PlaneGeometry, MeshBasicMaterial, Mesh } from "three"

function Background({ url }) {
  const texture = useRef()
  const { scene, gl } = useThree()

  useEffect(() => {
    const loader = new TextureLoader()
    loader.load(url, (loadedTexture) => {
      texture.current = loadedTexture
      updateBackgroundSize()
    })

    return () => texture.current?.dispose()
  }, [url])

  useEffect(() => {
    const handleResize = () => updateBackgroundSize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const updateBackgroundSize = () => {
    if (!texture.current) return

    const aspectRatio = gl.domElement.width / gl.domElement.height
    const imageAspectRatio = texture.current.image.width / texture.current.image.height

    let scale
    if (aspectRatio > imageAspectRatio) {
      scale = [aspectRatio / imageAspectRatio, 1]
    } else {
      scale = [1, imageAspectRatio / aspectRatio]
    }

    const geometry = new PlaneGeometry(2 * scale[0], 2 * scale[1])
    const material = new MeshBasicMaterial({ map: texture.current })
    const mesh = new Mesh(geometry, material)
    mesh.position.set(0, 0, -1)

    // Remove any existing background
    const existingBackground = scene.getObjectByName("background")
    if (existingBackground) scene.remove(existingBackground)

    mesh.name = "background"
    scene.add(mesh)
  }

  return null
}

function ParticleField({ count = 5000 }) {
  const ref = useRef()

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10
    ref.current.rotation.y -= delta / 15
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attachObject={["attributes", "position"]}
          count={count}
          itemSize={3}
          array={new Float32Array(count * 3).map(() => (Math.random() - 0.5) * 2)}
        />
      </bufferGeometry>
      <pointsMaterial size={0.005} color="#ffa0e0" transparent opacity={0.6} />
    </points>
  )
}

export default function CanvasBackgroundImage() {
  return (
    <div className="fixed inset-0">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Background url="/beach.jpeg" />
        {/* <ParticleField /> */}
      </Canvas>
    </div>
  )
}

