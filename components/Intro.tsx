/* eslint-disable react/no-unknown-property */
/* https://github.com/jsx-eslint/eslint-plugin-react/issues/3423 */

import React, { Suspense, useState } from "react";
import { Loader, Laptop } from "./Laptop";
import {
  Bounds,
  ContactShadows,
  Environment,
  OrbitControls,
  Preload,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const Intro = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w-full h-full">
        <Canvas
          dpr={[1, 2]}
          camera={{ fov: 60 }}
          onClick={e => (e.stopPropagation(), setOpen(!open))}
        >
          <Preload all />
          <pointLight
            position={[10, 10, 10]}
            intensity={1.5}
            color={"#cdcdcd"}
          />
          <OrbitControls
            enableZoom={false}
            autoRotate={false}
            enableRotate={false}
            makeDefault={true}
            enablePan={false}
          />
          <ContactShadows
            position={[0, -4.5, 0]}
            opacity={0.4}
            scale={20}
            blur={1.75}
            far={4.5}
          />
          <Suspense fallback={<Loader />}>
            <Bounds fit observe>
              <Laptop scale={[7, 7, 7]} isOpen={open} />
              <Environment preset={"sunset"} />
            </Bounds>
          </Suspense>
        </Canvas>
      </div>
    </>
  );
};

export default Intro;
