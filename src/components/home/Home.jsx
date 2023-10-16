import React from 'react';
import { ArcRotateCamera, Vector3, HemisphericLight, SceneLoader  } from '@babylonjs/core'
import '@babylonjs/loaders'
import Smple from '../smple/Smple';
import './Home.css'
// const canva = {
//     width: '720px',
//     height: '360px'
// }


const Canvas = props => {

    const createScene = async function (scene) {
        //const scene = new Scene(engine);
        const canvas = scene.getEngine().getRenderingCanvas();

        const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new Vector3(0, 0, 0));
        camera.attachControl(canvas, true);
        const light = new HemisphericLight("light", new Vector3(1, 1, 0));
        
        await SceneLoader.ImportMeshAsync("", "/src/assets/box/", 'scene.babylon',
        scene, function(meshes){

            scene.createDefaultCameraOrLight(true,true,true);
            scene.createDefaultEnvironment();
        });


        // SceneLoader.ImportMeshAsync("", "https://assets.babylonjs.com/meshes/", "box.babylon");
        /*

        SceneLoader.Append("./scenes/", "obj.obj", scene, function (scene){
            // do something with the scene
          }); 

        SceneLoader.Append("./scenes/", "abc.glb", scene, function (newMeshes2) {
            playerMesh = newMeshes2 [0];
            playerMesh.scaling = new Vector3(1, 1, 1);
        });

        SceneLoader.ImportMesh(
            "", "./scenes/", 'obj.obj',
            scene, function(newMeshes2){
                playerMesh = newMeshes2 [0];
                playerMesh.scaling = new Vector3(1, 1, 1);
            }
        );
        */
        //return scene;
        //id ='base-canvas'
    };
    return <Smple onSceneReady = {createScene}{...props} id ='base-canvas' />
}
export default Canvas
