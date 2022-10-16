import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import GUI from 'lil-gui'

/**
 * Debug
 */
const gui = new GUI({width: 400, title: "loo"})

const parameters = {
    spinX: () =>{
        gsap.to(mesh1.rotation, {duration: 1, x: mesh1.rotation.x + 10})
    },
    spinY: () =>{
        gsap.to(mesh1.rotation, {duration: 1, y: mesh1.rotation.y + 10})
    }
}

window.addEventListener("keydown", (event) =>{
    if(event.key === "h"){
        if(gui._hidden){
            gui.show()
        }else{
            gui.hide()
        }
    }
})

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry1 = new THREE.BoxGeometry(1, 1, 1)
const material1 = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh1 = new THREE.Mesh(geometry1, material1)
scene.add(mesh1)

/* const geometry2 = new THREE.BoxGeometry(1, 1, 1)
const material2 = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh2 = new THREE.Mesh(geometry2, material2)
material2.color.set(0x00ff00)
mesh2.position.x = 2
scene.add(mesh2)*/ 

// Debug

gui.add(mesh1.position, "y").min(-3).max(3).step(0.01).name("elevation")
// gui.add(mesh.position, "x", -3, 3, 0.01)
// gui.add(mesh.position, "z", -3, 3, 0.01)

gui.add(mesh1, "visible")

gui.add(material1, "wireframe")

gui.addColor(material1, "color")

gui.add(parameters, "spinX")
gui.add(parameters, "spinY")

/* gui.add(mesh2.position, "y").min(-3).max(3).step(0.01).name("elevation")
// gui.add(mesh.position, "x", -3, 3, 0.01)
// gui.add(mesh.position, "z", -3, 3, 0.01)

gui.add(mesh2, "visible")

gui.add(material2, "wireframe")

gui.addColor(material2, "color")*/

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()