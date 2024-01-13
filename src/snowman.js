import * as THREE from 'three';

// Snowman body and head
const snowmanBodyGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const snowmanHeadGeometry = new THREE.SphereGeometry(0.3, 32, 32);
const snowmanMaterial = new THREE.MeshStandardMaterial({ color: '#ffffff' });

export const snowman =(scene) =>
{
const snowmanBody = new THREE.Mesh(snowmanBodyGeometry, snowmanMaterial);
snowmanBody.position.set(5, 0.5, 5);
scene.add(snowmanBody);

const snowmanHead = new THREE.Mesh(snowmanHeadGeometry, snowmanMaterial);
snowmanHead.position.set(5, 1.3, 5);
scene.add(snowmanHead);

// Nose
const noseGeometry = new THREE.ConeGeometry(0.08, 0.5, 32);
const noseMaterial = new THREE.MeshStandardMaterial({ color: '#ff6600' });

const nose = new THREE.Mesh(noseGeometry, noseMaterial);
nose.rotation.x = Math.PI / 2;
nose.position.set(5, 1.2, 5.2);
scene.add(nose);

// Cap
const capGeometry = new THREE.ConeGeometry(0.35, 0.2, 32);
const capMaterial = new THREE.MeshStandardMaterial({ color: '#ff0000' });

const cap = new THREE.Mesh(capGeometry, capMaterial);
cap.rotation.x = Math.PI / 2;
cap.position.set(5, 1.6, 5);
scene.add(cap);
}

export const fountainLight = (scene) =>
{
    const fountainBase = createCylinder('#8B4513', 1, 0.2, 5, 0.2, 5);
    scene.add(fountainBase);

    // Function to create a cylinder
function createCylinder(color, radiusTop, height, x, y, z) {
    const geometry = new THREE.CylinderGeometry(radiusTop, radiusTop, height, 16);
    const material = new THREE.MeshStandardMaterial({ color });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    return mesh;
}

    // Function to create colored lights for the fountain
function createFountainLights(count, intensity, distance, radius, x, y) {
    const lights = [];

    for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const sinValue = Math.sin(angle);
        const cosValue = Math.cos(angle);

        const light = new THREE.PointLight(Math.random() * 0xffffff, intensity, distance);
        light.position.set(sinValue * radius + x, y, cosValue * radius + y);
        scene.add(light);
        lights.push(light);
    }

    return lights;
}

// Colored Lights for the Fountain
const fountainLights = createFountainLights(8, 1, 2, 1.2, 5, 0.4);

// Animate Fountain Lights
const animateFountainLights = () => {
    const time = performance.now() * 0.001;

    for (let i = 0; i < fountainLights.length; i++) {
        const light = fountainLights[i];
        const angle = time * (1 + i * 0.1);
        const radius = 1.2;

        const sinValue = Math.sin(angle);
        const cosValue = Math.cos(angle);

        light.position.set(sinValue * radius + 5, 0.4, cosValue * radius + 5);
    }
    requestAnimationFrame(animateFountainLights);
};

animateFountainLights();
}
