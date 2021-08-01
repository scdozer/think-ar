import * as THREE from "three";
import React, { useMemo, useRef, useLayoutEffect } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import "./shaders/hb2";

export default function Text({
  children,
  vAlign = "center",
  hAlign = "center",
  size = 1.5,
  color = "#000000",
  ...props
}) {
  const font = useLoader(THREE.FontLoader, "bold.blob");
  const config = useMemo(
    () => ({
      font,
      size: 5,
      height: 0.000005,
      curveSegments: 10,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 0.05,
      bevelOffset: 0,
      bevelSegments: 32,
    }),
    [font]
  );
  const mesh = useRef();
  const hb3 = useRef();
  useLayoutEffect(() => {
    const size = new THREE.Vector3();
    mesh.current.geometry.computeBoundingBox();
    mesh.current.geometry.boundingBox.getSize(size);
    mesh.current.position.x =
      hAlign === "center" ? -size.x / 4 : hAlign === "right" ? 0 : -size.x;
    mesh.current.position.y =
      vAlign === "center" ? -size.y / 2 : vAlign === "top" ? 0 : -size.y;
  }, [children, hAlign, vAlign]);

  useFrame(({ clock }) => {
    hb3.current.time = clock.elapsedTime;
  });
  return (
    <group {...props} scale={[0.1 * size, 0.1 * size, 0.1]}>
      <mesh ref={mesh}>
        <textGeometry args={[children, config]} />
        {/* <meshNormalMaterial /> */}
        <hb3
          ref={hb3}
          attach="material"
          // texture={texture1}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
