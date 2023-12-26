import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'




// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//fog
// const fog = new THREE.Fog('#262837', 1 , 15)
// scene.fog = fog

/**
 * Textures
 */


const textureLoader = new THREE.TextureLoader()

function loadTexture(path) {
    const texture = textureLoader.load(path);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
}
const matcapTexture = loadTexture('/textures/matcaps/5.png')
const matcapTexture1 = loadTexture('/textures/matcaps/9.png')
const windowColorTexture = textureLoader.load('textures/window/windowframe6.png')
const doorColorTexture = loadTexture('/textures/door/color.jpg')
const doorAlphaTexture = loadTexture('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = loadTexture('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = loadTexture('/textures/door/height.jpg')
const doorNormalTexture = loadTexture('/textures/door/normal.jpg')
const doorMetalnessTexture = loadTexture('/textures/door/metalness.jpg')
const doorRoughnessTexture = loadTexture('/textures/door/roughness.jpg')

const bricksColorTexture =loadTexture('/textures/bricks/color.jpg')
const bricksAmbientOcclusionTexture = loadTexture('/textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture =loadTexture('/textures/bricks/normal.jpg')
const bricksRoughnessTexture = loadTexture('/textures/bricks/roughness.jpg')

const grassColorTexture = loadTexture('/textures/grass/color.jpg')
const grassAmbientOcclusionTexture = loadTexture('/textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = loadTexture('/textures/grass/normal.jpg')
const grassRoughnessTexture =loadTexture('/textures/grass/roughness.jpg')

grassColorTexture.repeat.set(8, 8)
grassAmbientOcclusionTexture.repeat.set(8, 8)
grassNormalTexture.repeat.set(8, 8)
grassRoughnessTexture.repeat.set(8, 8)

grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping

/**
 * House
 */
// Define reusable materials
const brickMaterial = new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture
});

const doorMaterial = new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.1,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture
});


const roofMaterial = new THREE.MeshStandardMaterial({ color: '#b35f45' });

const rotatingPartMaterial = new THREE.MeshStandardMaterial({ color: '#ff33cc' });

const windowMaterial = new THREE.MeshStandardMaterial({
    map: windowColorTexture,
    color: 'gray',
});

const floorMaterial = new THREE.MeshStandardMaterial({       
    map: grassAmbientOcclusionTexture,
    aoMap: grassAmbientOcclusionTexture,
    normalMap: grassNormalTexture,
    roughnessMap: grassRoughnessTexture });

// Define reusable geometries
const wallGeometry = new THREE.BoxGeometry(4, 2.5, 4);
const roofGeometry = new THREE.ConeGeometry(3.5, 1, 4);
const window1Geometry = new THREE.BoxGeometry(0.6, 0.8, 0.1);
const window2Geometry = new THREE.BoxGeometry(-0.6, 0.8, -0.1);
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const rotatingPartGeometry = new THREE.BoxGeometry(0.5, 0.1, 0.5);


//Group
const house = new THREE.Group()
scene.add(house)

//wall
const walls = new THREE.Mesh(wallGeometry, brickMaterial);
walls.position.y = 1.25;
house.add(walls);

//roof
const roof = new THREE.Mesh(roofGeometry, roofMaterial);
roof.rotation.y = Math.PI * 0.25;
roof.position.y = 2.5 + 0.5;
house.add(roof);

//Door

const doorGeometry = new THREE.PlaneGeometry(2.2, 2.2, 100, 100);
const door = new THREE.Mesh(doorGeometry, doorMaterial);
door.position.y = 1;
door.position.z = 2 + 0.01;
house.add(door);

// Roadway
const roadwayGeometry = new THREE.PlaneGeometry( 2.2, 10);
const roadwayMaterial = new THREE.MeshStandardMaterial({ color: '#808080', side: THREE.DoubleSide });
const roadway = new THREE.Mesh(roadwayGeometry, roadwayMaterial);
roadway.rotation.x = -Math.PI / 2; 
roadway.position.set(0, 0.01, 5);
scene.add(roadway);

// White Lines
const lineGeometry = new THREE.PlaneGeometry(0.1, 1); 
const lineMaterial = new THREE.MeshStandardMaterial({ color: '#ffffff' }); 
const numberOfLines = 4; 

for (let i = 0; i < numberOfLines; i++) {
    const line = new THREE.Mesh(lineGeometry, lineMaterial);
    line.rotation.x = -Math.PI / 2; 
    line.position.set(0, 0.05, 9 - i * 2); 
    scene.add(line);
}

// Window
const window1 = new THREE.Mesh(window1Geometry, windowMaterial);
window1.position.y = 1.5;
window1.position.x = -1.3;
window1.position.z = 2;
house.add(window1);

const window2 = new THREE.Mesh(window2Geometry, windowMaterial);
window2.position.y = 1.5;
window2.position.x = 1.3;
window2.position.z = 2;
house.add(window2);

// Tree
const trunkMaterial = new THREE.MeshStandardMaterial({ color: '#8b4513' });
const leavesMaterial = new THREE.MeshStandardMaterial({ color: '#228b22' });
const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1, 8);
const leavesGeometry = new THREE.SphereGeometry(1, 16, 16);
const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
leaves.position.y = 1;
const tree = new THREE.Group();
tree.add(trunk, leaves);
tree.position.set(-3, 0.5, 3);
scene.add(tree);

// Christmas lights on the tree
const lights = [];

for (let i = 0; i < 50; i++) {
    const lightGeometry = new THREE.SphereGeometry(0.1);
    const lightMaterial = new THREE.MeshStandardMaterial({ color: Math.random() * 0xffffff });
    const light = new THREE.Mesh(lightGeometry, lightMaterial);

    const angle = (i / 50) * Math.PI * 2;
    const radius = 2;
    const x = Math.sin(angle) * radius;
    const y = 1.5 + Math.cos(angle) * radius;
    const z = 3;

    light.position.set(x, y, z);
    scene.add(light);
    lights.push(light);
}

// Star on top of the tree
    const starGeometry = new THREE.TetrahedronGeometry(0.5);
    const starMaterial = new THREE.MeshStandardMaterial({ color: 'gold' });
    const star = new THREE.Mesh(starGeometry, starMaterial);
    star.position.set(-3, 2.5, 3); 
    scene.add(star);



// Function to create a Christmas tree with LED lights and gifts
function createChristmasTreeWithLEDs(x, z) {
    // Christmas tree trunk
    const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1, 8);
    const trunkMaterial = new THREE.MeshStandardMaterial({ color: '#8B4513' });
    const trunkMesh = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunkMesh.position.set(-6, 0.5, 6);
    scene.add(trunkMesh);

    // Christmas tree leaves (cone shape)
    const treeGeometry = new THREE.ConeGeometry(1.5, 3, 8);
    const treeMaterial = new THREE.MeshStandardMaterial({ color: '#228B22' });
    const treeMesh = new THREE.Mesh(treeGeometry, treeMaterial);
    treeMesh.position.set(-6, 2.3, 6);
    scene.add(treeMesh);

    // Gifts under the tree
    for (let l = 0; l < 5; l++) {
        const giftGeometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
        const giftMaterial = new THREE.MeshStandardMaterial({ color: '#ff0000' });
        const giftMesh = new THREE.Mesh(giftGeometry, giftMaterial);
        const giftX = x + (Math.random() - 0.5) * 2;
        const giftY = 0.2;
        const giftZ = z + (Math.random() - 0.5) * 2;
        giftMesh.position.set(giftX, giftY, giftZ);
        scene.add(giftMesh);
    }
}

// Create a Christmas tree with LEDs and gifts at a location far from the house
createChristmasTreeWithLEDs(-7, 6);


//bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({ color:'#89c854'})

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5,0.5)
bush1.position.set(0.8, 0.2, 2.2)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(- 0.8, 0.1, 2.2)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15,0.15)
bush4.position.set(- 1, 0.05, 2.6)


house.add(bush1, bush2, bush3, bush4)

// Create a group to hold the flowers
const flowers = new THREE.Group();
scene.add(flowers);

const flowerGeometries = [
  new THREE.SphereGeometry(0.2, 8, 8),   
  new THREE.ConeGeometry(0.2, 0.5, 8),   
];

const flowerMaterials = [
  new THREE.MeshStandardMaterial({ color: '#ff6347' }),  
  new THREE.MeshStandardMaterial({ color: 'Skyblue' }),  

];

const numGeometries = flowerGeometries.length;
const numMaterials = flowerMaterials.length;
const numFlowers = 100;

for (let i = 0; i < numFlowers; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 3 + Math.random() * 6;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;

    const randomGeometry = flowerGeometries[Math.floor(Math.random() * numGeometries)];
    const randomMaterial = flowerMaterials[Math.floor(Math.random() * numMaterials)];

  const flower = new THREE.Mesh(randomGeometry, randomMaterial);
  flower.position.set(x, 0.3, z);
  flower.rotation.y = (Math.random() - 0.5) * 0.4;
  flower.rotation.z = (Math.random() - 0.5) * 0.4;
  flowers.add(flower);
}

// Floor
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI * 0.5;
    floor.position.y = 0;
    scene.add(floor);

//FOnts
const fontLoader = new FontLoader()

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
    )

 // Merry Christmas font
fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
    // Create text geometry
    const textGeometry = new TextGeometry('Merry    Christmas', {
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

    textGeometry.center();
    const textMaterial = new THREE.MeshMatcapMaterial({matcap: matcapTexture1, color: 'white'});

    // Create the mesh
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);

    const circleCenter = new THREE.Vector3(-3, 0, 13);
    const circleRadius = 4;
    const angle = -Math.PI / 4;
    const textDistance = circleRadius + 2;
    const textX = circleCenter.x + textDistance * Math.cos(angle);
    const textY = 0.5;
    const textZ = circleCenter.z + textDistance * Math.sin(angle);
    textMesh.position.set(textX, textY, textZ);
    scene.add(textMesh);
   

    // Snowfall animation
    const snowflakes = [];

    for (let i = 0; i < 100; i++) {
        const snowflakeGeometry = new THREE.CircleGeometry(0.05, 6);
        const snowflakeMaterial = new THREE.MeshBasicMaterial({ color: 'white' });
        const snowflake = new THREE.Mesh(snowflakeGeometry, snowflakeMaterial);

        snowflake.position.set(Math.random() * 20 - 10, Math.random() * 5 + 5, Math.random() * 20 - 10);
        scene.add(snowflake);
        snowflakes.push(snowflake);
    }

    const animateSnowfall = () => {
        requestAnimationFrame(animateSnowfall);

        // Update snowflake positions
        for (const snowflake of snowflakes) {
            snowflake.position.y -= 0.1;
            if (snowflake.position.y < 0) {
                snowflake.position.y = 5;
            }
        }

        // Render the scene
        renderer.render(scene, camera);
    };

    animateSnowfall();
});

// Snowfall
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


// Snowman
// Snowman body and head
const snowmanBodyGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const snowmanHeadGeometry = new THREE.SphereGeometry(0.3, 32, 32);
const snowmanMaterial = new THREE.MeshStandardMaterial({ color: '#ffffff' });

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


 // UFO with Aliens

    const ufoDiscGeometry = new THREE.TorusGeometry(1.5, 0.4, 16, 32);
    const ufoDiscMaterial = new THREE.MeshStandardMaterial({
        color: '#00ff00',
        emissive: '#00ff00',
        metalness: 0.9,
        roughness: 0.1,
        side: THREE.DoubleSide
    });
    const ufoDisc = new THREE.Mesh(ufoDiscGeometry, ufoDiscMaterial);
    ufoDisc.rotation.x = Math.PI / 2; 
    ufoDisc.position.set(-5, 4, -12);
    scene.add(ufoDisc);

    const ufoDomeGeometry = new THREE.SphereGeometry(1, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);
    const ufoDomeMaterial = new THREE.MeshStandardMaterial({
        color: '#00ff00',
        emissive: '#00ff00',
        metalness: 0.9,
        roughness: 0.1,
        side: THREE.DoubleSide
    });
    const ufoDome = new THREE.Mesh(ufoDomeGeometry, ufoDomeMaterial);
    ufoDome.position.y = 0.4; 
    ufoDisc.add(ufoDome); 

    const alienGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    const alienMaterial = new THREE.MeshStandardMaterial({
        color: '#ff00ff',
        metalness: 0.7,
        roughness: 0.2
    });

    for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2;
        const radius = 1.2;
        const alien = new THREE.Mesh(alienGeometry, alienMaterial);
        alien.position.set(Math.cos(angle) * radius, 0.5, Math.sin(angle) * radius);
        ufoDisc.add(alien); 
    }

// Hot Air Balloon
const balloon1Geometry = new THREE.SphereGeometry(0.5, 16, 16);
const balloon1Material = new THREE.MeshStandardMaterial({ color: '#ff6600', metalness: 0.3, roughness: 0.7 });
const balloon = new THREE.Mesh(balloon1Geometry, balloon1Material);
balloon.position.set(8, 5, -8);
scene.add(balloon);


// Moon
const moonGeometry = new THREE.SphereGeometry(1, 32, 32);
const moonMaterial = new THREE.MeshBasicMaterial({ color: '#e6e6e6', emissive: '#ffe4b5', emissiveIntensity: 0.5 });
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.set(10, 10, -10);
scene.add(moon);

// Create Fountain Base
const fountainBase = createCylinder('#8B4513', 1, 0.2, 5, 0.2, 5);
scene.add(fountainBase);

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
    rotatingPart1.rotation.y += 0.02;
    rotatingPart2.rotation.y -= 0.02;
    requestAnimationFrame(rotateAnimation);
};

rotateAnimation();

// Add a rainbow
const rainbowGeometry = new THREE.TorusGeometry(10, 0.1, 16, 100, Math.PI * 2);
const rainbowMaterial = new THREE.MeshStandardMaterial({ color: '#ff0000', emissive: '#ff9900', side: THREE.DoubleSide });
const rainbow = new THREE.Mesh(rainbowGeometry, rainbowMaterial);
rainbow.rotation.x = Math.PI / 3;
scene.add(rainbow);

// Floating Lanterns
const lanternGeometry = new THREE.CylinderGeometry(0.2, 0.2, 2, 8);
const lanternMaterial = new THREE.MeshStandardMaterial({ color: 'white', emissive: 'red' });

// Function to create lanterns
const createLantern = () => {
    const lantern = new THREE.Mesh(lanternGeometry, lanternMaterial);
    const lanternX = Math.random() * 10 - 5;
    const lanternY = Math.random() * 5 + 3;
    const lanternZ = Math.random() * 10 - 5;
    lantern.position.set(lanternX, lanternY, lanternZ);
    scene.add(lantern);
};

// Create 10 lanterns
for (let i = 0; i < 15; i++) {
    createLantern();
}


// Add a Starry Sky
const starsGeometry = new THREE.BufferGeometry();
const starsMaterial = new THREE.PointsMaterial({ color: 'red', size: 0.1 });

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


/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#a3e1ff', 0.12)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.26)
moonLight.position.set(4, 5, - 2)
scene.add(moonLight)

//door light
const doorLight = new THREE.PointLight('#ff7d46', 3, 7)
doorLight.position.set(0, 2.2, 2.7)
house.add(doorLight)

/**
 * Ghosts
 */
const ghost1 = new THREE.PointLight('#ff00ff', 6, 3)
scene.add(ghost1)

const ghost2 = new THREE.PointLight('#00ffff', 6, 3)
scene.add(ghost2)


const ghost3 = new THREE.PointLight('#ffff00', 6, 3)
scene.add(ghost3)

// Christmas lights surrounding the grass border
for (let i = 0; i < 50; i++) {
    const light = new THREE.PointLight('#ff0000', 1, 2);
    const angle = (i / 50) * Math.PI * 2;
    const radius = 8;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    light.position.set(x, 0.1, z);
    scene.add(light);
}


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#262837')

/**
 * Shadows
 */
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

moonLight.castShadow = true
doorLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

walls.castShadow = true
bush1.castShadow = true
bush2.castShadow = true
bush3.castShadow = true
bush4.castShadow = true

for(let i = 0; i < 50; i++)
{
    // ...
    flowers.castShadow = true
    // ...
}

floor.receiveShadow = true

doorLight.shadow.mapSize.width = 256
doorLight.shadow.mapSize.height = 256
doorLight.shadow.camera.far = 7

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 7

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 7

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 7

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    //ghosts
    const ghost1Angle = elapsedTime * 0.5
    ghost1.position.x = Math.cos(ghost1Angle) * 4
    ghost1.position.z = Math.sin(ghost1Angle) * 4
    ghost1.position.y = Math.sin(elapsedTime * 3)

    const ghost2Angle = - elapsedTime * 0.32
    ghost2.position.x = Math.cos(ghost2Angle) * 5
    ghost2.position.z = Math.sin(ghost2Angle) * 5
    ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

    
    const ghost3Angle = - elapsedTime * 0.18
    ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32))
    ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5))
    ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

  // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()