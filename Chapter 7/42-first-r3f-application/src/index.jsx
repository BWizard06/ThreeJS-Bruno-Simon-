import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import { Canvas } from "@react-three/fiber"
import Experience from './Experience.jsx'
import * as THREE from 'three'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Canvas
        // pixel ratio
        // dpr={ [1, 2] }
        flat
        gl={{
            // toneMapping: THREE.ACESFilmicToneMapping,
            // outputEncoding: THREE.LinearEncoding
        }}
        camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [3, 2, 6]
        }}
    >
        <Experience />
    </Canvas>
)


