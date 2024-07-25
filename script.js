// Create the scene
const scene = new THREE.Scene();

// Create the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3.5; // Move the camera closer by 30%

// Create the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load the textures
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load('https://upload.wikimedia.org/wikipedia/commons/c/cf/WorldMap-A_non-Frame.png', startAnimation);
const moonTexture = textureLoader.load('https://upload.wikimedia.org/wikipedia/commons/d/db/Moonmap_from_clementine_data.png');

// Load the bump maps
const earthBumpMap = textureLoader.load('https://upload.wikimedia.org/wikipedia/commons/c/cf/WorldMap-A_non-Frame.png');
const moonBumpMap = textureLoader.load('https://upload.wikimedia.org/wikipedia/commons/d/db/Moonmap_from_clementine_data.png');

// Create the Earth geometry and material
const earthGeometry = new THREE.SphereGeometry(1, 64, 64);
const earthMaterial = new THREE.MeshPhongMaterial({
    map: earthTexture,
    bumpMap: earthBumpMap,
    bumpScale: 0.010, // Reduced bump scale by 30%
    emissive: 0x080808, // Reduced emission by 50%
    shininess: 15 // Reduced shininess by 50%
});
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earth);

// Create the Moon geometry and material
const moonGeometry = new THREE.SphereGeometry(0.27, 64, 64);
const moonMaterial = new THREE.MeshPhongMaterial({
    map: moonTexture,
    bumpMap: moonBumpMap,
    bumpScale: 0.010, // Reduced bump scale by 30%
    emissive: 0x080808, // Reduced emission by 50%
    shininess: 15 // Reduced shininess by 50%
});
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
scene.add(moon);

// Position the Moon relative to the Earth
moon.position.set(2, 0, 0);

// Add a directional light to simulate the sun
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.05); // Reduced the intensity by 30%
directionalLight.position.set(10, 2, 5); // Position the light to the right and slightly above the Earth
scene.add(directionalLight);

// Add an ambient light to simulate scattered light in the atmosphere
const ambientLight = new THREE.AmbientLight(0x111111, 0.05); // Reduced ambient light by 50%
scene.add(ambientLight);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the Earth on its axis
    earth.rotation.y += 0.0025; // Increased rotation speed by 20%

    // Rotate the Moon on its axis and around the Earth
    moon.rotation.y += 0.001;
    moon.position.x = Math.cos(Date.now() * 0.001) * 2;
    moon.position.z = Math.sin(Date.now() * 0.001) * 2;

    // Render the scene
    renderer.render(scene, camera);
}

function startAnimation() {
    animate();
}
