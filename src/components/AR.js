import React, { Suspense, useRef, useState } from "react";
import Model from "../bulb/Bulb-sm";
import Text from "./Text";
// import { Canvas } from "@react-three/fiber";
import {
  ZapparCamera,
  ImageTracker,
  ZapparCanvas,
} from "@zappar/zappar-react-three-fiber";
import targetFile from "./../bulb/bulb-art.zpt";
import { OrbitControls } from "@react-three/drei";

export default function ARScene() {
  const [show, setShow] = useState(false);
  const setIsVisible = () => {
    return setShow(!show);
  };

  function Jumbo() {
    const ref = useRef();
    return (
      <group ref={ref}>
        <Text hAlign="right" position={[1.25, 0.5, 0.5]} children="THINK" />
      </group>
    );
  }

  return (
    <div className="canvas">
      <ZapparCanvas colorManagement camera={{ fov: 12, position: [0, 1, 1] }}>
        <ZapparCamera rearCameraMirrorMode="css" />
        <ImageTracker
          onNotVisible={(anchor) => setIsVisible()}
          //   onNewAnchor={(anchor) => console.log(`New anchor ${anchor.id}`)}
          onVisible={(anchor) => setIsVisible}
          targetImage={targetFile}
        >
          {show && (
            <Suspense fallback={null}>
              <OrbitControls />
              <Model />
              <Jumbo />
            </Suspense>
          )}
        </ImageTracker>
        <ambientLight intensity={0.9} />
        <pointLight position={[-10, -10, -5]} intensity={5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />
        {/* <directionalLight position={[2.5, 8, 5]} intensity={1.5} /> */}
      </ZapparCanvas>
    </div>
  );
}
