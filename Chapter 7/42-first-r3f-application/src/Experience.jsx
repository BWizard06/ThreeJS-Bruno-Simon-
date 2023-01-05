import { extend, useFrame, useThree } from "@react-three/fiber"
import { useRef } from "react"
import  { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import CustomObject from "./CustomObject"

extend({ OrbitControls: OrbitControls })

export default function Experience(){

    const {camera, gl} = useThree()
    const cubeRef = useRef()
    const groupRef = useRef()

    useFrame((state, delta) => {
        // make the camera move in a circle around the scene
        // const angle = state.clock.elapsedTime
        // camera.position.x = Math.sin(angle) * 8
        // camera.position.z = Math.cos(angle) * 8
        // camera.lookAt(0, 0, 0)

        // delta is the time which passed since the last frame
        // groupRef.current.rotation.y += delta
        cubeRef.current.rotation.y += delta
    })

    return(
        <>
            
            <orbitControls args={[camera, gl.domElement]} />

            <directionalLight position={[1, 2, 3]} intensity={1.5} />
            <ambientLight intensity={0.3} />
            
            <group ref={groupRef}>
                <mesh ref={ cubeRef} rotation-y={ Math.PI * 0.25 } position-x={ 2 } scale={ 1.5 }>
                    <boxGeometry scale={1.5}/>
                    <meshStandardMaterial color="red" />
                </mesh>

                <mesh position-x={-2}>
                    {/* args are the arguments which are passed in normal THREEJS in
                    the constructor it has to be an array*/}
                    <sphereGeometry scale={1.5}/>
                    <meshStandardMaterial color="orange" />
                </mesh>
            </group>

            <mesh position-y={ -1 } rotation-x={ - Math.PI * 0.5} scale={10}>
                <planeGeometry />
                <meshStandardMaterial color="greenyellow" />
            </mesh>

            <CustomObject />
        </>
    )
}