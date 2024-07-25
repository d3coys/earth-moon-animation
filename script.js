// Ensure the JavaScript is executing by adding a console log
console.log('JavaScript is running');

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
const earthTexture = textureLoader.load('https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/300px-The_Earth_seen_from_Apollo_17.jpg', () => {
    console.log('Earth texture loaded');
    animate();
});
const moonTexture = textureLoader.load('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/280px-FullMoon2010.jpg', () => {
    console.log('Moon texture loaded');
});

// Create the Earth geometry and material
const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
const earthMaterial = new THREE.MeshPhongMaterial({ map: earthTexture });
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earth);

// Create the Moon geometry and material
const moonGeometry = new THREE.SphereGeometry(0.27, 32, 32);
const moonMaterial = new THREE.MeshPhongMaterial({ map: moonTexture });
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
scene.add(moon);

// Position the Moon relative to the Earth
moon.position.set(2, 0, 0);

// Add a light source to the right of the Earth
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(5, 0, 0);
scene.add(light);

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

// Start the animation only after textures are loaded
// animate();
