import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

const Cube = () => {
  const mountRef = useRef(null)

  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    camera.position.z = 2

    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(200, 200) // Set this to the size of the container
    mountRef.current.appendChild(renderer.domElement)

    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    const animate = function () {
      requestAnimationFrame(animate)
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
      renderer.render(scene, camera)
    }

    animate()
  }, [])

  return (
    <div
      ref={mountRef}
      style={{ width: '200px', height: '200px', position: 'relative' }}
    ></div>
  )
}

export default Cube
