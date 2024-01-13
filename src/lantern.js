import * as THREE from 'three';

// Function to create lanterns
const lanternGeometry = new THREE.CylinderGeometry(0.2, 0.2, 2, 8);
const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

export const makeLantern = (scene) => {
    const createLantern = () => {
        const lanternMaterial = new THREE.MeshStandardMaterial({ color: getRandomColor(),  });
        const lantern = new THREE.Mesh(lanternGeometry, lanternMaterial);
        const lanternX = Math.random() * 15 - 8;
        const lanternY = Math.random() * 6 + 4;
        const lanternZ = Math.random() * 10 - 5;
        lantern.position.set(lanternX, lanternY, lanternZ);
        scene.add(lantern);
    };

    // Create 15 lanterns
    for (let i = 0; i < 15; i++) {
        createLantern();
    }
};

const starsGeometry = new THREE.BufferGeometry();
const starsMaterial = new THREE.PointsMaterial({ color: 'red', size: 0.1 });
export const starrySky = (scene) =>
{ 

    const starsVertices = [];
    for (let i = 0; i < 1000; i++) {
        const x = (Math.random() - 0.5) * 50;
        const y = (Math.random() - 0.5) * 20;
        const z = (Math.random() - 0.5) * 50;
        starsVertices.push(x, y, z);
    }

    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);
}