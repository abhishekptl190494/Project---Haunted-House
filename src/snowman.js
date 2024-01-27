import * as THREE from 'three';

export const snowman = (scene) => {
    const snowmanBodyGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const snowmanHeadGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const snowmanMaterial = new THREE.MeshStandardMaterial({ color: '#ffffff' });

    const snowmanBody = new THREE.Mesh(snowmanBodyGeometry, snowmanMaterial);
    snowmanBody.position.set(5, 0.5, 5);
    scene.add(snowmanBody);

    const snowmanHead = new THREE.Mesh(snowmanHeadGeometry, snowmanMaterial);
    snowmanHead.position.set(5, 1.3, 5);
    scene.add(snowmanHead);

    const noseGeometry = new THREE.ConeGeometry(0.08, 0.5, 32);
    const noseMaterial = new THREE.MeshStandardMaterial({ color: '#ff6600' });

    const nose = new THREE.Mesh(noseGeometry, noseMaterial);
    nose.rotation.x = Math.PI / 2;
    nose.position.set(5, 1.2, 5.2);
    scene.add(nose);

    const capGeometry = new THREE.ConeGeometry(0.35, 0.2, 32);
    const capMaterial = new THREE.MeshStandardMaterial({ color: '#ff0000' });

    const cap = new THREE.Mesh(capGeometry, capMaterial);
    cap.rotation.x = Math.PI / 2;
    cap.position.set(5, 1.6, 5);
    scene.add(cap);
}

export const fountainLight = (scene) => {
    const createCylinder = (color, radiusTop, height, x, y, z) => {
        const geometry = new THREE.CylinderGeometry(radiusTop, radiusTop, height, 16);
        const material = new THREE.MeshStandardMaterial({ color });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        return mesh;
    }

    const createFountainLight = (color, intensity, distance, radius, x, y) => {
        const light = new THREE.PointLight(color, intensity, distance);
        light.position.set(x, y, radius);
        scene.add(light);
        return light;
    }

    const fountainBase = createCylinder('#8B4513', 1, 0.2, 5, 0.2, 5);
    scene.add(fountainBase);

    const fountainLights = [
        createFountainLight('#ff0000', 1, 2, 1.2, 5, 0.4),
        createFountainLight('#00ff00', 1, 2, 1.2, 5, 0.4),
        createFountainLight('#0000ff', 1, 2, 1.2, 5, 0.4),
        createFountainLight('#ffff00', 1, 2, 1.2, 5, 0.4),
        createFountainLight('#ff00ff', 1, 2, 1.2, 5, 0.4),
        createFountainLight('#00ffff', 1, 2, 1.2, 5, 0.4),
        createFountainLight('#ffa500', 1, 2, 1.2, 5, 0.4),
        createFountainLight('#800080', 1, 2, 1.2, 5, 0.4)
    ];

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
