// Create the scene
const scene = new THREE.Scene();

// Create the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load the textures
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load('https://upload.wikimedia.org/wikipedia/commons/c/cf/WorldMap-A_non-Frame.png', startAnimation);
const moonTexture = textureLoader.load('https://upload.wikimedia.org/wikipedia/commons/d/db/Moonmap_from_clementine_data.png');

// Create the Earth geometry and material
const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
const earthMaterial = new THREE.MeshPhongMaterial({
    map: earthTexture,
    emissive: 0x333333, // Add a bit of emission to make it brighter
    shininess: 10 // Add some shininess for brightness
});
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earth);

// Create the Moon geometry and material
const moonGeometry = new THREE.SphereGeometry(0.27, 32, 32);
const moonMaterial = new THREE.MeshPhongMaterial({
    map: moonTexture,
    emissive: 0x333333, // Add a bit of emission to make it brighter
    shininess: 10 // Add some shininess for brightness
});
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
scene.add(moon);

// Position the Moon relative to the Earth
moon.position.set(2, 0, 0);

// Add a directional light to simulate the sun
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5); // Increase the intensity of the light
directionalLight.position.set(5, 0, 0); // Position the light to the right of the Earth
scene.add(directionalLight);

// Add an ambient light to simulate scattered light in the atmosphere
const ambientLight = new THREE.AmbientLight(0x333333); // Lower intensity ambient light for overall brightness
scene.add(ambientLight);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the Earth on its axis
    earth.rotation.y += 0.001;

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
