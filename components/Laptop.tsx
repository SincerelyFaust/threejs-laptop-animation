/* eslint-disable react/no-unknown-property */
/* https://github.com/jsx-eslint/eslint-plugin-react/issues/3423 */

import * as THREE from "three";
import React, { useEffect, useState } from "react";
import { Html, useGLTF, useProgress } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { Variants } from "framer-motion";
import { motion } from "framer-motion-3d";

export function Loader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <p className="font-bold">{progress.toFixed()}%</p>
    </Html>
  );
}

type GLTFResult = GLTF & {
  nodes: {
    Body_Object: THREE.Mesh;
    Touchbar_Object: THREE.Mesh;
    Screen_Object: THREE.Mesh;
  };
  materials: {
    Laptop: THREE.MeshStandardMaterial;
  };
};

const variantBody: Variants = {
  visible: {
    rotateZ: Math.PI / 12,
    y: -Math.PI / 50,
  },
  hidden: {},
};

const variantScreen: Variants = {
  visible: {
    rotateZ: Math.PI / 90,
    y: -Math.PI / 150,
  },
  hidden: {},
};

export function Laptop(
  props: JSX.IntrinsicElements["group"] & { isOpen: boolean },
) {
  const [hovered, setHovered] = useState(false);
  const { nodes, materials } = useGLTF(
    "./3d/laptop.glb",
  ) as unknown as GLTFResult;

  useEffect(
    () => void (document.body.style.cursor = hovered ? "pointer" : "auto"),
    [hovered],
  );

  return (
    <group
      {...props}
      dispose={null}
      onPointerOver={e => (e.stopPropagation(), setHovered(true))}
      onPointerOut={() => setHovered(false)}
    >
      <group name="Scene">
        <group name="laptopglb">
          <group name="Scene_1">
            <group name="Laptop">
              <group name="Scene_1">
                <group name="Model" rotation={[-Math.PI / 2, 0, 1.57]}>
                  <group name="Root">
                    <group
                      name="GLTF_SceneRootNode"
                      rotation={[Math.PI / 2, 0, 0]}
                    >
                      <motion.group
                        name="Body"
                        variants={variantBody}
                        initial="hidden"
                        animate={props.isOpen ? "visible" : "hidden"}
                        transition={{
                          type: props.isOpen ? "spring" : "easeOut",
                          stiffness: 30,
                          duration: 1,
                        }}
                      >
                        <mesh
                          name="Body_Object"
                          castShadow
                          receiveShadow
                          geometry={nodes.Body_Object.geometry}
                          material={materials.Laptop}
                        />
                      </motion.group>
                      <motion.group
                        whileHover={{
                          rotateZ: Math.PI / 2.4,
                        }}
                        name="Screen"
                        position={[0.121, 0.007, 0]}
                        rotation={[0, 0, 1.573]}
                        variants={variantScreen}
                        initial="hidden"
                        animate={props.isOpen ? "visible" : "hidden"}
                        transition={{
                          type: props.isOpen ? "spring" : "easeOut",
                          stiffness: 30,
                          duration: 1,
                        }}
                      >
                        <group name="Touchbar">
                          <mesh
                            name="Touchbar_Object"
                            castShadow
                            receiveShadow
                            geometry={nodes.Touchbar_Object.geometry}
                            material={materials.Laptop}
                          />
                        </group>
                        <mesh
                          name="Screen_Object"
                          castShadow
                          receiveShadow
                          geometry={nodes.Screen_Object.geometry}
                          material={materials.Laptop}
                        />
                      </motion.group>
                    </group>
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("./3d/laptop.glb");
