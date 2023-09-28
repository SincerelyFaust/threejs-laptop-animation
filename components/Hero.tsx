/* eslint-disable react/no-unknown-property */
/* https://github.com/jsx-eslint/eslint-plugin-react/issues/3423 */

import React, { Suspense, useState } from "react";
import { Loader, Laptop } from "./Laptop";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  Preload,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import useWindowSize from "../hooks/useWindowSize";

type Vector3 = [number, number, number];

const Hero = () => {
  const [open, setOpen] = useState(false);
  const size = useWindowSize();

  const BASE_WIDTH = 1000;
  const scaleFactor = size.width ? size.width / BASE_WIDTH : 1;

  const laptopScale: Vector3 = [
    7 * scaleFactor,
    7 * scaleFactor,
    7 * scaleFactor,
  ];

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
            <Laptop
              scale={size.width! > 700 ? laptopScale : [5, 5, 5]}
              isOpen={open}
            />
            <Environment preset={"sunset"} />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
};

export default Hero;
