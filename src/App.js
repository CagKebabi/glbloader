import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense } from "react";
// import { DragDropContext,Droppable,Draggable } from "react-beautiful-dnd";
import Draggable from "react-draggable";
import "./App.css"

export default function App() {
  const Model = () => {
  const gltf = useLoader(GLTFLoader, "./vito.glb");
  return (
    <>
      <primitive object={gltf.scene} scale={100} />
    </>
  );
};
  const nodeRef = useRef(null);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [position2, setPosition2] = useState({ x: 50, y: 50 });

  const [Opacity, setOpacity] = useState(false);
  const [Opacity2, setOpacity2] = useState(false);

  const trackPos = (data) => {
    setPosition({ x: data.x, y: data.y });
  };

  const trackPos2 = (data) => {
    setPosition2({ x: data.x, y: data.y });
  };

  const handleStart = () => {
    setOpacity(true);
  };
  const handleEnd = () => {
    setOpacity(false);
  };

  const handleStart2 = () => {
    setOpacity2(true);
  };
  const handleEnd2 = () => {
    setOpacity2(false);
  };

  return (
    <div className="App">
      <Draggable
        nodeRef={nodeRef}
        onDrag={(e, data) => trackPos(data)}
        onStart={handleStart}
        onStop={handleEnd}
      >
        <div
          ref={nodeRef}
          className="box"
          style={{ opacity: Opacity ? "0.6" : "1" }}
        >
          <Canvas>
              <Suspense fallback={null}>
                <Model />
                <OrbitControls />
                <Environment preset="sunset"  />
              </Suspense>
          </Canvas>
        </div>
      </Draggable>

      <Draggable
        nodeRef={nodeRef}
        onDrag={(e, data) => trackPos2(data)}
        onStart={handleStart2}
        onStop={handleEnd2}
        scale={2}
      >
        <div
          ref={nodeRef}
          className="box box2"
          style={{ opacity: Opacity2 ? "0.6" : "1" }}
        >
            <Canvas>
              <Suspense fallback={null}>
                <Model />
                <OrbitControls />
                <Environment preset="sunset"  />
              </Suspense>
            </Canvas>
        </div>
      </Draggable>
    </div>
  );
}

