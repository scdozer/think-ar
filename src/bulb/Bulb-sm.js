/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: AleixoAlonso (https://sketchfab.com/AleixoAlonso)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/low-poly-light-bulb-a7d27c2224d94c86a04083de8f9df7db
title: Low Poly Light Bulb
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import "./../components/shaders/hb3";

export default function Model(props) {
  const hb3 = useRef();
  const group = useRef();
  const { nodes, materials } = useGLTF("bulb-sm.glb");

  useFrame(({ clock }) => {
    hb3.current.time = clock.elapsedTime;
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group
        position={[0, 0, 0]}
        scale={[25, 25, 25]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <mesh
          geometry={
            nodes["#LMP0003_Light_Bulb_Low_Poly_#LMP0003_Textures_0"].geometry
          }
          material={materials.LMP0003_Textures}
        >
          <hb3
            ref={hb3}
            attach="material"
            // texture={texture1}
            toneMapped={false}
          />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("bulb-sm.glb");
