import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";

import birdScene from "../assets/3d/bird.glb";


export function Bird() {
  const birdRef = useRef();

  const { scene, animations } = useGLTF(birdScene);
 const { actions } = useAnimations(animations, birdRef);


  useEffect(() => {
    actions["Take 001"].play();
  }, []);

  useFrame(({ clock, camera }) => {
 
    birdRef.current.position.y = Math.sin(clock.elapsedTime) * 0.2 + 2;

    
    if (birdRef.current.position.x > camera.position.x + 10) {
      
      birdRef.current.rotation.y = Math.PI;
    } else if (birdRef.current.position.x < camera.position.x - 10) {

      birdRef.current.rotation.y = 0;
    }

    // Update the X and Z positions based on the direction
    if (birdRef.current.rotation.y === 0) {
      // Moving forward
      birdRef.current.position.x += 0.01;
      birdRef.current.position.z -= 0.01;
    } else {
      // Moving backward
      birdRef.current.position.x -= 0.01;
      birdRef.current.position.z += 0.01;
    }
  });

  return (
    // to create and display 3D objects
    <mesh 
    ref={birdRef} 
    position={[-5, 2, 1]} 
    scale={[0.003, 0.003, 0.003]}>
     
      <primitive object={scene} />
    </mesh>
  );
}

export default Bird;