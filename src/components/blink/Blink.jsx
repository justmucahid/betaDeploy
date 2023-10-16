import React from 'react'
import './Blink.css'
import Smple from '../smple/Smple'
import { ArcRotateCamera, Vector3, HemisphericLight, MeshBuilder, SceneLoader } from '@babylonjs/core'
import '@babylonjs/loaders'

const Blink = (props) => {

    const restScene = async function main(scene) {
        const canvas = scene.getEngine().getRenderingCanvas()


        // Creates, angles, distances and targets the camera
        const camera = new ArcRotateCamera("main-camera",
            0, // alpha
            0, // beta
            10, // radius
            new Vector3(0, 0, 0), // target position
            scene)

        // This attaches the camera to the canvas
        camera.attachControl(canvas, true)

        const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;

        // Our built-in 'ground' shape.
        const ground = MeshBuilder.CreateGround("ground", { width: 0.2, height: 0.2 }, scene)
        ground.position.y = 0

        // İmport Model File
        const test = await SceneLoader.ImportMeshAsync("",
            "https://raw.githubusercontent.com/justmucahid/gh-pages-website/main/src/assets/",
            "main.gltf",
            scene, function () {

                scene.createDefaultCameraOrLight(true, true, true);
                // scene.createDefaultEnvironment();
                scene.activeCamera.alpha = 0
                scene.activeCamera.beta = 1.5
                scene.activeCamera.radius = 0.18

                scene.activeCamera.target.x = 0
                scene.activeCamera.target.y = 0.04
                scene.activeCamera.target.z = 0

                // scene.stopAllAnimations();

            })


        console.log(camera)


        const pCube1 = test.meshes[1]
        pCube1.setParent(null);
        test.meshes[0].dispose();

        pCube1.scaling = new Vector3(0.06, 0.06, 0.06)
        pCube1.position.y = 0.04
        pCube1.rotation = new Vector3(0, 0.45, 0)
        pCube1.morphTargetManager.getTarget(0).influence = 0.75

        scene.registerBeforeRender(() => {
            camera.alpha += 0.01;
            camera.radius += 0.02
        });


        // get the morph target influence on the cube. In this case there is only one available
        // const blend = pCube1.morphTargetManager.getTarget(0)

        // let testMorphTargets = await getMorphTargets(pCube1);

        // // new animation clip for morph targeting the "influence" property
        // const anima = new Animation("cubeSphereMorph", "influence", 60, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE)

        // // create key values for animation
        // test.keys = [
        //     {
        //         frame: 0,
        //         value: 0.0
        //     },
        //     {
        //         frame: 120,
        //         value: 1.0
        //     },
        //     {
        //         frame: 240,
        //         value: 0.0
        //     }
        // ];
        // // add keys to the animation
        // anima.setKeys(test.keys);


        // // add animation to the cube mesh
        // pCube1.animations.push(anima);

        // scene.beginAnimation(blend, 0, test.keys[test.keys.length - 1].frame, true);

    }

    // const getMorphTargets = async function (asset) {
    //     const testMorphTargets = [];
    //     for (let i = 0; i < asset.morphTargetManager.numTargets; i++) {
    //         testMorphTargets.push(asset.morphTargetManager.getTarget(i));
    //         return testMorphTargets;
    //     }
    //     return testMorphTargets;
    // }


    return (
        <Smple onSceneReady={restScene}{...props} id='rest-canvas' />
    )
}

export default Blink