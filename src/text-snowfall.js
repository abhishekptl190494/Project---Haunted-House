    import * as THREE from 'three';
    import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
    import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

    //FOnts
    const fontLoader = new FontLoader();

    export const createTextMesh = (scene, matcapTexture) => {
    

    fontLoader.load(
        '/fonts/helvetiker_regular.typeface.json',
        (font) =>
        {
            const textGeometry = new TextGeometry(
                'Abhishek  Patel',
                {
                    font: font,
                    size: 0.5,
                    height: 0.2,
                    curveSegments: 3,
                    bevelEnabled: true,
                    bevelThickness: 0.03,
                    bevelSize: 0.02,
                    bevelOffset: 0,
                    bevelSegments: 4
                }
            )
            textGeometry.center()

            const textMaterial = new THREE.MeshMatcapMaterial({matcap: matcapTexture})
            //textMaterial.wireframe = true
            const text = new THREE.Mesh(textGeometry, textMaterial)
            
            const circleCenter = new THREE.Vector3(0, 0, 0);
            const circleRadius = 6;
            const angle = -Math.PI / 4;
            const textDistance = circleRadius + 1; 
            const textX = circleCenter.x + textDistance * Math.cos(angle);
            const textY = 1; 
            const textZ = circleCenter.z + textDistance * Math.sin(angle);
            text.position.set(textX, textY, textZ);
            scene.add(text);

        }
        );
    }

    // Merry Christmas font
    export const createChristmasText = (scene, matcapTexture1) => {
    fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json', 
    (font) => 
    {
        const textGeometry1 = new TextGeometry('Welcome    2024', {
            font: font,
            size: 0.8,
            height: 0.2,
            curveSegments: 3,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 4
        });

        textGeometry1.center();
        const textMaterial1 = new THREE.MeshMatcapMaterial({matcap: matcapTexture1, color:'#ffffff'});

        // Create the mesh
        const textMesh = new THREE.Mesh(textGeometry1, textMaterial1);

        const circleCenter1 = new THREE.Vector3(-3, 0, 13);
        const circleRadius1 = 4;
        const angle1 = -Math.PI / 4;
        const textDistance1 = circleRadius1 + 2;
        const textX1 = circleCenter1.x + textDistance1 * Math.cos(angle1);
        const textY1 = 0.5;
        const textZ1 = circleCenter1.z + textDistance1 * Math.sin(angle1);
        textMesh.position.set(textX1, textY1, textZ1);
        scene.add(textMesh);
    }
    )
    }
    

        // Snowfall animation
export const animateSnowfall = (scene) => {
    const snowflakes = [];

    const snowflakeGeometry = new THREE.CircleGeometry(0.05, 6);
    const snowflakeMaterial = new THREE.MeshBasicMaterial({ color: '#ffffff' });

    for (let i = 0; i < 100; i++) {
        const snowflake = new THREE.Mesh(snowflakeGeometry, snowflakeMaterial);
        snowflake.position.set(Math.random() * 20 - 10, Math.random() * 5 + 5, Math.random() * 20 - 10);
        scene.add(snowflake);
        snowflakes.push(snowflake);
    }

    const animateSnowfallInternal = () => {
        requestAnimationFrame(animateSnowfallInternal);

        // Update snowflake positions
        for (const snowflake of snowflakes) {
            snowflake.position.y -= 0.1;
            if (snowflake.position.y < 0) {
                snowflake.position.y = 5;
            }
        }
    };
    animateSnowfallInternal();
};

// test.js
export const createSnowfall = (scene) => {
    const snowflakeGeometry = new THREE.BufferGeometry();
    const snowflakeMaterial = new THREE.PointsMaterial({ color: '#ffffff', size: 0.02 });

    const snowflakeVertices = [];
    for (let i = 0; i < 1000; i++) {
        const x = (Math.random() - 0.5) * 20;
        const y = Math.random() * 10;
        const z = (Math.random() - 0.5) * 20;
        snowflakeVertices.push(x, y, z);
    }

    snowflakeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(snowflakeVertices, 3));
    const snowfall = new THREE.Points(snowflakeGeometry, snowflakeMaterial);
    scene.add(snowfall);
}



