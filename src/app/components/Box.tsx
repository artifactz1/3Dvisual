"use client";
import React, { FC } from "react";
// import { BoxBufferGeometry, Mesh, MeshBasicMaterial } from "three";

const Box: FC<{}> = () => {
  // Your component logic here

  return (
    <mesh>
      {/* <BoxBufferGeometry attach="geometry" /> */}
      <meshLambertMaterial attach="material" color={"blue"} />
    </mesh>
  );
};

export default Box;
