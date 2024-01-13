import * as THREE from 'three';

const rotatingPartGeometry = new THREE.BoxGeometry(0.5, 0.1, 0.5);
const rotatingPartMaterial = new THREE.MeshStandardMaterial({ color: '#ff33cc' });
export const setupTimeMachine = (scene) => {
    // Time Machine
    const timeMachineGroup = new THREE.Group();
    scene.add(timeMachineGroup);

    // Base
    const baseGeometry = new THREE.BoxGeometry(1.5, 0.2, 1.5);
    const baseMaterial = new THREE.MeshStandardMaterial({ color: '#3333ff' });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    timeMachineGroup.add(base);

    // Rotating Components
    const createRotatingPart = (position) => {
        const rotatingPart = new THREE.Mesh(rotatingPartGeometry, rotatingPartMaterial);
        rotatingPart.position.copy(position);
        timeMachineGroup.add(rotatingPart);
        return rotatingPart;
    };

    

    const rotatingPart1 = createRotatingPart(new THREE.Vector3(0, 0.25, 0.5));
    const rotatingPart2 = createRotatingPart(new THREE.Vector3(0, 0.25, -0.5));

    // Dynamic Lights
    const createLight = (color, position) => {
        const light = new THREE.PointLight(color, 1, 3);
        light.position.copy(position);
        timeMachineGroup.add(light);
        return light;
    };

    const timeMachineLight1 = createLight('#ffcc00', new THREE.Vector3(0, 0.35, 0.8));
    const timeMachineLight2 = createLight('#ffcc00', new THREE.Vector3(0, 0.35, -0.8));

    // Position beside the house
    timeMachineGroup.position.set(5, 0);

    // Add a subtle rotation animation to the rotating parts
    const rotateAnimation = () => {
        rotatingPart1.rotation.y += 0.03;
        rotatingPart2.rotation.y -= 0.03;
        requestAnimationFrame(rotateAnimation);
    };

    rotateAnimation();
}

