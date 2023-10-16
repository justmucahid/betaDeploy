
import { Engine, Scene } from "@babylonjs/core";
import React, { useRef, useEffect } from 'react'

 const BackData = (props) => {

  const appCanvas = useRef(null);
  const { anatialias, engineOptions, adatToRatio, sceneOptions, onRender, onSceneReady, ...rest } = props;

  useEffect(() => {
    if (appCanvas.current) {

      const engine = new Engine(appCanvas.current, anatialias, engineOptions, adatToRatio);
      const scene = new Scene(engine, sceneOptions, onRender, onSceneReady);

      if (scene.isReady()) {
        props.onSceneReady(scene)
      } else {
        scene.onReadyObservable.addOnce((scene) => props.onSceneReady(scene));
      }


      engine.runRenderLoop(() => {
        if (typeof onRender === 'function') {
          onRender(scene)
        }
        scene.render();
      })
      const resize = () => {
        scene.getEngine().resize();
      }
      if (window) {
        window.addEventListener('resize', resize)
      }

      return () => {
        scene.getEngine().dispose();
        if (window) {
          window.removeEventListener('resize', resize)

        }
      };
    }

  }, [appCanvas])



  return <canvas ref={appCanvas}{...rest}></canvas>
}
export default BackData