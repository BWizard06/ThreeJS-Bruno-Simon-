import {
    MeshReflectorMaterial,
    Float,
    Text,
    Html,
    PivotControls,
    TransformControls,
    OrbitControls,
} from "@react-three/drei";
import { useRef } from "react";

export default function Experience() {
    const cube = useRef();
    const sphere = useRef();

    return (
        <>
            <OrbitControls makeDefault />

            <directionalLight position={[1, 2, 3]} intensity={1.5} />
            <ambientLight intensity={0.5} />

            <PivotControls
                anchor={[0, 0, 0]}
                depthTest={false}
                lineWidth={4}
                axisColors={["#9381ff", "#ff4d6d", "#7ae582"]}
                scale={1}
            >
                <mesh ref={sphere} position-x={-2}>
                    <sphereGeometry />
                    <meshStandardMaterial color="orange" />
                    <Html
                        position={[1, 1, 0]}
                        wrapperClass="label"
                        center
                        distanceFactor={6}
                        occlude={[sphere, cube]}
                    >
                        That's a Sphere😎
                    </Html>
                </mesh>
            </PivotControls>

            <mesh ref={cube} position-x={2} scale={1.5}>
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" />
            </mesh>

            <TransformControls object={cube} mode="translate" />

            <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
                <planeGeometry />
                <MeshReflectorMaterial
                    resolution={1024}
                    blur={[1000, 1000]}
                    $
                    mixBlur={0}
                    mirror={0.75}
                    color="greenyellow"
                />
            </mesh>

            <Float speed={5} floatIntensity={4}>
                <Text
                    font={"./Explora-Regular.woff"}
                    fontSize={1}
                    color="black"
                    position-y={2}
                    maxWidth={2}
                    textAlign="center"
                    lineHeight={0.7}
                    outlineBlur={0.5}
                    outlineColor="#DF0101"
                >
                    I Love R3F
                </Text>
            </Float>
        </>
    );
}
