import React from 'react';
import { ArcRotateCamera, Vector3, HemisphericLight, SceneLoader, MeshBuilder } from '@babylonjs/core'
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

        const camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new Vector3(0, 12, -6));
        camera.attachControl(canvas, true);
        const light = new HemisphericLight("light", new Vector3(1, 1, 0));

        const ground = MeshBuilder.CreateGround("ground", { width: 0.2, height: 0.2 }, scene)
        ground.position.y = 0

        const globeMesh = await SceneLoader.ImportMeshAsync("", "src/assets/box/", 'anime.gltf',
            scene, function (meshes) {
            });
        const anima = globeMesh.meshes[0]
        anima.scaling = new Vector3(1, 1, 1)
        anima.rotation = new Vector3(0, 3, 0)
        console.log(globeMesh);


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
    return <Smple onSceneReady={createScene}{...props} id='base-canvas' />
}
export default Canvas
