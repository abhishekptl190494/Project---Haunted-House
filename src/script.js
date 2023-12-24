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
const matcapTexture = textureLoader.load('/textures/matcaps/5.png')
const matcapTexture1 = textureLoader.load('/textures/matcaps/9.png')
matcapTexture.colorSpace = THREE.SRGBColorSpace

const windowColorTexture = textureLoader.load('textures/window/windowframe6.png')
windowColorTexture.colorSpace = THREE.SRGBColorSpace

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
doorColorTexture.colorSpace = THREE.SRGBColorSpace
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
bricksColorTexture.colorSpace = THREE.SRGBColorSpace
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')

const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
grassColorTexture.colorSpace = THREE.SRGBColorSpace
const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')

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

//Group
const house = new THREE.Group()
scene.add(house)

//wall
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
         normalMap: bricksNormalTexture,
         roughnessMap: bricksRoughnessTexture
    })
)
walls.position.y = 1.25
house.add(walls)

//roof
 const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1, 4),
    new THREE.MeshStandardMaterial({color: '#b35f45'})
 )
 roof.rotation.y = Math.PI * 0.25
 roof.position.y = 2.5 + 0.5
 house.add(roof)

//Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture
    })
)
door.position.y = 1
door.position.z = 2 + 0.01
house.add(door)

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
const window1Geometry = new THREE.BoxGeometry(0.6, 0.8, 0.1);
const window1Material = new THREE.MeshStandardMaterial({ map:windowColorTexture});
const window1Mesh = new THREE.Mesh(window1Geometry, window1Material);
window1Mesh.position.set(0, 1.5, 2.01); 
house.add(window1Mesh);

window1Mesh.position.y = 1.5
window1Mesh.position.x = 1.3

const window2Geometry = new THREE.BoxGeometry(-0.6, 0.8, -0.1);
const window2Material = new THREE.MeshStandardMaterial({ map:windowColorTexture});
const window2Mesh = new THREE.Mesh(window2Geometry, window2Material);
window2Mesh.position.set(0, 1.5, 2.01); 
house.add(window2Mesh);

window2Mesh.position.y =1.5
window2Mesh.position.x =-1.3


// Tree trunk
const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1, 8);
const trunkMaterial = new THREE.MeshStandardMaterial({ color: '#8B4513' });
const trunkMesh = new THREE.Mesh(trunkGeometry, trunkMaterial);
trunkMesh.position.set(-3, 0.5, 3);
scene.add(trunkMesh);

// Tree leaves
const leavesGeometry = new THREE.SphereGeometry(1, 16, 16);
const leavesMaterial = new THREE.MeshStandardMaterial({ color: '#228B22' });
const leavesMesh = new THREE.Mesh(leavesGeometry, leavesMaterial);
leavesMesh.position.set(-3, 1.5, 3);
scene.add(leavesMesh);

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

for (let i = 0; i < 50; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = 3 + Math.random() * 6;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;


  const randomGeometry = flowerGeometries[Math.floor(Math.random() * flowerGeometries.length)];
  const randomMaterial = flowerMaterials[Math.floor(Math.random() * flowerMaterials.length)];

  const flower = new THREE.Mesh(randomGeometry, randomMaterial);
  flower.position.set(x, 0.3, z);
  flower.rotation.y = (Math.random() - 0.5) * 0.4;
  flower.rotation.z = (Math.random() - 0.5) * 0.4;
  flowers.add(flower);
}

// Floor
    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 20),
        new THREE.MeshStandardMaterial({
            map: grassAmbientOcclusionTexture,
            aoMap: grassAmbientOcclusionTexture,
            normalMap: grassNormalTexture,
            roughnessMap: grassRoughnessTexture
        })
    )
    floor.rotation.x = - Math.PI * 0.5
    floor.position.y = 0
    scene.add(floor)


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


// Snowman
    const snowmanBodyGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const snowmanHeadGeometry = new THREE.SphereGeometry(0.3, 32, 32);

    const snowmanMaterial = new THREE.MeshStandardMaterial({ color: '#ffffff' });

    const snowmanBody = new THREE.Mesh(snowmanBodyGeometry, snowmanMaterial);
    snowmanBody.position.set(5, 0.5, 5);
    scene.add(snowmanBody);

    const snowmanHead = new THREE.Mesh(snowmanHeadGeometry, snowmanMaterial);
    snowmanHead.position.set(5, 1.3, 5);
    scene.add(snowmanHead);

    // Balloons
    const balloonGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const balloonMaterial = new THREE.MeshStandardMaterial({ color: 'silver' });

    const balloon1 = new THREE.Mesh(balloonGeometry, balloonMaterial);
    balloon1.position.set(-6, 4, 6);
    scene.add(balloon1);

    const balloon2 = new THREE.Mesh(balloonGeometry, balloonMaterial);
    balloon2.position.set(-7, 4, 7);
    scene.add(balloon2);

    const balloon3 = new THREE.Mesh(balloonGeometry, balloonMaterial);
    balloon3.position.set(-6.5, 4.5, 6.5);
    scene.add(balloon3);


// Sleigh with Reindeer
        const sleighGeometry = new THREE.BoxGeometry(1, 0.2, 0.2);
        const sleighMaterial = new THREE.MeshStandardMaterial({ color: '#964B00' });
        const sleigh = new THREE.Mesh(sleighGeometry, sleighMaterial);
        sleigh.position.set(-8, 1, 8);
        scene.add(sleigh);

        // Reindeer
        const reindeerGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.1);
        const reindeerMaterial = new THREE.MeshStandardMaterial({ color: '#8B4513' });

        const reindeer1 = new THREE.Mesh(reindeerGeometry, reindeerMaterial);
        reindeer1.position.set(-7.8, 1.2, 8);
        scene.add(reindeer1);

        const reindeer2 = new THREE.Mesh(reindeerGeometry, reindeerMaterial);
        reindeer2.position.set(-8.2, 1.2, 8);
        scene.add(reindeer2);


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

// Basket
const basketGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 16);
const basketMaterial = new THREE.MeshStandardMaterial({ color: '#8B4513', metalness: 0.7, roughness: 0.5 });
const basket = new THREE.Mesh(basketGeometry, basketMaterial);
basket.position.set(8, 4.6, -8);
scene.add(basket);

// Moon
const moonGeometry = new THREE.SphereGeometry(1, 32, 32);
const moonMaterial = new THREE.MeshBasicMaterial({ color: '#e6e6e6', emissive: '#ffe4b5', emissiveIntensity: 0.5 });
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.set(10, 10, -10);
scene.add(moon);

// Fountain Base
const fountainBaseGeometry = new THREE.CylinderGeometry(1, 1, 0.2, 16);
const fountainBaseMaterial = new THREE.MeshStandardMaterial({ color: '#8B4513' });
const fountainBase = new THREE.Mesh(fountainBaseGeometry, fountainBaseMaterial);
fountainBase.position.set(5, 0.2, 5);
scene.add(fountainBase);

// Water Jet
const waterJetGeometry = new THREE.CylinderGeometry(0.2, 0.15, 3, 16);
const waterJetMaterial = new THREE.MeshStandardMaterial({ color: '#add8e6' });
const waterJet = new THREE.Mesh(waterJetGeometry, waterJetMaterial);
waterJet.position.set(5, 1.5, 5);
scene.add(waterJet);

// Colored Lights for the Fountain
const fountainLights = [];

for (let i = 0; i < 8; i++) {
    const light = new THREE.PointLight(Math.random() * 0xffffff, 1, 2);
    const angle = (i / 8) * Math.PI * 2;
    const radius = 1.2;
    const x = Math.sin(angle) * radius + 5;
    const z = Math.cos(angle) * radius + 5;
    light.position.set(x, 0.4, z);
    scene.add(light);
    fountainLights.push(light);
}

// Animate Fountain Lights
const animateFountainLights = () => {
    const time = performance.now() * 0.001;

    for (let i = 0; i < fountainLights.length; i++) {
        const light = fountainLights[i];
        const angle = time * (1 + i * 0.1);
        const radius = 1.2;
        const x = Math.sin(angle) * radius + 5;
        const z = Math.cos(angle) * radius + 5;
        light.position.set(x, 0.4, z);
    }
    requestAnimationFrame(animateFountainLights);
};

animateFountainLights();

// Time Machine
const timeMachineGroup = new THREE.Group();
scene.add(timeMachineGroup);

// Base
const baseGeometry = new THREE.BoxGeometry(1.5, 0.2, 1.5);
const baseMaterial = new THREE.MeshStandardMaterial({ color: '#3333ff' });
const base = new THREE.Mesh(baseGeometry, baseMaterial);
timeMachineGroup.add(base);

// Rotating Components
const rotatingPartGeometry = new THREE.BoxGeometry(0.5, 0.1, 0.5);
const rotatingPartMaterial = new THREE.MeshStandardMaterial({ color: '#ff33cc' });

const rotatingPart1 = new THREE.Mesh(rotatingPartGeometry, rotatingPartMaterial);
rotatingPart1.position.set(0, 0.25, 0.5);
timeMachineGroup.add(rotatingPart1);

const rotatingPart2 = new THREE.Mesh(rotatingPartGeometry, rotatingPartMaterial);
rotatingPart2.position.set(0, 0.25, -0.5);
timeMachineGroup.add(rotatingPart2);

// Dynamic Lights
const timeMachineLight1 = new THREE.PointLight('#ffcc00', 1, 3);
timeMachineLight1.position.set(0, 0.35, 0.8);
timeMachineGroup.add(timeMachineLight1);

const timeMachineLight2 = new THREE.PointLight('#ffcc00', 1, 3);
timeMachineLight2.position.set(0, 0.35, -0.8);
timeMachineGroup.add(timeMachineLight2);

// Position beside the house
timeMachineGroup.position.set(5, 0 );

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


// Magical Portal
const portalGeometry = new THREE.CircleGeometry(2, 32);
const portalMaterial = new THREE.MeshStandardMaterial({ color: '#4B0082', emissive: '#9400D3', side: THREE.DoubleSide });
const portal = new THREE.Mesh(portalGeometry, portalMaterial);
portal.rotation.x = -Math.PI / 2;
portal.position.set(0, 0.2, -8);
scene.add(portal);

// Floating Lanterns
const lanternGeometry = new THREE.CylinderGeometry(0.2, 0.2, 2, 8);
const lanternMaterial = new THREE.MeshStandardMaterial({ color: 'white', emissive: 'red' });

for (let i = 0; i < 10; i++) {
    const lantern = new THREE.Mesh(lanternGeometry, lanternMaterial);
    const lanternX = Math.random() * 10 - 5;
    const lanternY = Math.random() * 5 + 3;
    const lanternZ = Math.random() * 10 - 5;
    lantern.position.set(lanternX, lanternY, lanternZ);
    scene.add(lantern);

    // Add a subtle rotation animation to the lanterns
    const lanternRotateAnimation = () => {
        lantern.rotation.y += 0.02;
        requestAnimationFrame(lanternRotateAnimation);
    };

    lanternRotateAnimation();
}

// Mystical Glow
const glowGeometry = new THREE.SphereGeometry(8, 32, 32);
const glowMaterial = new THREE.MeshBasicMaterial({ color: '#00FF00', transparent: true, opacity: 0.1 });
const glow = new THREE.Mesh(glowGeometry, glowMaterial);
glow.position.set(0, 0.2, 0);
scene.add(glow);

// Animate the glow
const animateGlow = () => {
    const time = performance.now() * 0.001;
    const glowIntensity = Math.sin(time) * 0.1 + 0.1;
    glowMaterial.opacity = glowIntensity;
    requestAnimationFrame(animateGlow);
};

animateGlow();

// Add a Snow Globe
const snowGlobeGeometry = new THREE.SphereGeometry(3, 32, 32);
const snowGlobeMaterial = new THREE.MeshStandardMaterial({ color: '#ffffff', transparent: true, opacity: 0.8 });
const snowGlobe = new THREE.Mesh(snowGlobeGeometry, snowGlobeMaterial);
snowGlobe.position.set(-10, 3, -10);
scene.add(snowGlobe);

// Create falling snow inside the snow globe
const snowflakesGeometry = new THREE.BufferGeometry();
const snowflakesMaterial = new THREE.PointsMaterial({ color: '#ffffff', size: 0.05, transparent: true, opacity: 0.5 });

const snowflakeVertices1 = [];
for (let i = 0; i < 500; i++) {
    const x = (Math.random() - 0.5) * 6;
    const y = (Math.random() - 0.5) * 6;
    const z = (Math.random() - 0.5) * 6;
    snowflakeVertices1.push(x, y, z);
}

snowflakesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(snowflakeVertices1, 3));
const snowfallInsideGlobe = new THREE.Points(snowflakesGeometry, snowflakesMaterial);
snowGlobe.add(snowfallInsideGlobe);

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