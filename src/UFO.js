import * as THREE from 'three';

const ufoDiscGeometry = new THREE.TorusGeometry(1.5, 0.4, 16, 32);
const ufoDiscMaterial = new THREE.MeshStandardMaterial({
    color: 0x8B4513,
    emissive: 0x8B4513,
    emissiveIntensity: 0.5,
    metalness: 0.9,
    roughness: 0.1,
    side: THREE.DoubleSide
});

const ufoDomeGeometry = new THREE.SphereGeometry(1, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);
const ufoDomeMaterial = new THREE.MeshStandardMaterial({
    color: 0x8B4513,
    emissive: 0x8B4513,
    emissiveIntensity: 0.5,
    metalness: 0.9,
    roughness: 0.1,
    side: THREE.DoubleSide
});

const alienGeometry = new THREE.SphereGeometry(0.2, 32, 32);
const alienMaterial = new THREE.MeshStandardMaterial({
    color: '#ff00ff',
    emissive: '#000000',
    emissiveIntensity: 0.5,
    metalness: 0.7,
    roughness: 0.2
});

export const ufo = (scene) => {
    const ufoDisc = new THREE.Mesh(ufoDiscGeometry, ufoDiscMaterial);
    ufoDisc.rotation.x = Math.PI / 2; 
    ufoDisc.position.set(-5, 4, -12);
    scene.add(ufoDisc);


    const ufoDome = new THREE.Mesh(ufoDomeGeometry, ufoDomeMaterial);
    ufoDome.position.y = 0.4; 
    ufoDisc.add(ufoDome); 

    for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2;
        const radius = 1.2;
        const alien = new THREE.Mesh(alienGeometry, alienMaterial);
        alien.position.set(Math.cos(angle) * radius, 0.5, Math.sin(angle) * radius);
        ufoDisc.add(alien); 
    }
}

export const hotAirBaloon = (scene) =>
{
    const balloon1Geometry = new THREE.SphereGeometry(0.5, 18, 18);
    const balloon1Material = new THREE.MeshStandardMaterial({ color: 'red', metalness: 0.3, roughness: 0.7, emissive: 'red', emissiveIntensity: 0.5});
    const balloon = new THREE.Mesh(balloon1Geometry, balloon1Material);
    balloon.position.set(8, 5, -8);
    scene.add(balloon);

     // Create basket
     const basketGeometry = new THREE.CylinderGeometry(0.5, 0.6, 0.4, 16);
     const basketMaterial = new THREE.MeshStandardMaterial({ color: '#8B4513', metalness: 0.5, roughness: 0.5, emissive: '#8B4513', emissiveIntensity: 0.5});
     const basket = new THREE.Mesh(basketGeometry, basketMaterial);
     basket.position.set(8, 4.6, -8);
     scene.add(basket);
     }