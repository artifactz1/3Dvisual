// "use client";

// import { useEffect, useRef, useState } from "react";
// import { Canvas, useFrame, useLoader } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// // @ts-ignore
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { Mesh } from "three";
// import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

// function MeshComponent() {
//   const [width, setWidth] = useState<number>(window.innerWidth);

//   function handleWindowSizeChange() {
//     setWidth(window.innerWidth);
//   }

//   useEffect(() => {
//     window.addEventListener("resize", handleWindowSizeChange);
//     return () => {
//       window.removeEventListener("resize", handleWindowSizeChange);
//     };
//   }, []);

//   const isMobile = width <= 768;

//   const fileUrl = "/kermit_the_frog.glb";
//   const mesh = useRef<Mesh>(null!);
//   // const gltf = useLoader(GLTFLoader, fileUrl);
//   const gltf = useLoader(GLTFLoader, fileUrl, (loader) => {
//     // Load DRACOLoader
//     const dracoLoader = new DRACOLoader();
//     loader.dracoLoader = dracoLoader;
//     dracoLoader.setDecoderPath("/draco/");
//     dracoLoader.setDecoderConfig({ type: "js" });
//     loader.setDRACOLoader(dracoLoader);
//   });

//   useFrame(({ camera }) => {
//     mesh.current.rotation.y += 0.01;

//     // Rotate the scene 180 degrees around the X-axis to show it upside down
//     if (gltf.scene) {
//       gltf.scene.rotation.x = Math.PI; // 180 degrees in radians
//       gltf.scene.rotation.y = Math.PI; // 180 degrees in radians
//     }

//     camera.lookAt(0, -2, 0); // Look at the center of the model
//   });

//   return (
//     <mesh ref={mesh}>
//       <primitive object={gltf.scene} />
//     </mesh>
//   );
// }

// export function ThreeModel() {
//   return (
//     <Canvas>
//       <OrbitControls />
//       <ambientLight />
//       <pointLight position={[10, 10, 10]} />
//       <MeshComponent />
//     </Canvas>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
// @ts-ignore
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import THREE, { Mesh, Box3, Vector3 } from "three"; // Import Box3 and Vector3 from three

function MeshComponent() {
  const mesh = useRef<Mesh>(null!);
  const { camera } = useThree();
  const [width, setWidth] = useState<number>(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  const fileUrl = "/kermit_the_frog.glb";
  const gltf = useLoader(GLTFLoader, fileUrl, (loader) => {
    const dracoLoader = new DRACOLoader();
    loader.dracoLoader = dracoLoader;
    dracoLoader.setDecoderPath("/draco/");
    dracoLoader.setDecoderConfig({ type: "js" });
    loader.setDRACOLoader(dracoLoader);
  });

  useEffect(() => {
    if (gltf.scene) {
      const box = new Box3().setFromObject(gltf.scene);
      const center = new Vector3();
      box.getCenter(center);
      const size = new Vector3();
      box.getSize(size);

      const maxSize = Math.max(size.x, size.y, size.z);

      // Adjust the initial camera position and look at the center of the model
      camera.position.set(center.x, center.y, center.z + maxSize * 2);
      camera.lookAt(center.x, center.y, center.z);

      // Manually adjust the position of the model to center it
      gltf.scene.position.x = center.x;
      gltf.scene.position.y = center.y;
      gltf.scene.position.z = center.z;

      gltf.scene.rotation.x = Math.PI; // 180 degrees in radians

      // Manually adjust the position of the model to center it for kermit to be standing up
      //   gltf.scene.position.x = -center.x;
      //   gltf.scene.position.y = -center.y;
      //   gltf.scene.position.z = -center.z;
    }
  }, [gltf.scene, camera]);

  useFrame(() => {
    mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={mesh}>
      <primitive object={gltf.scene} />
    </mesh>
  );
}

export function ThreeModel() {
  return (
    <Canvas>
      <OrbitControls />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <MeshComponent />
    </Canvas>
  );
}
