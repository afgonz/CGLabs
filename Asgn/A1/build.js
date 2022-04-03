// Particles variables
const maxParticles = 30;
const particlesColor = new THREE.Color(1,0,0);
const particleTimeSpan = 50;

// Wood variables
const woodSize = new THREE.Vector3(1,1,5);              // radius, theta and height
const woodColor = new THREE.Color(0.462, 0.309, 0.196); // Color in RGB format
const woodYPosition = -0.5;

// Light variables
const ambientLightColor = new THREE.Color(0.5,1,0.5);   // Ambient Light color in RGB format
const ambientLightIntensity = 0.3;                      // Ambient Light intensity
const pointLightColor = new THREE.Color(1,1,1);         // Point Light color in RGB format
const pointLightIntensity = 0.8;                        // Point Light intensity
const pointLightPosition = new THREE.Vector3(60, 15, 5);// radius, theta and height

// Mesh properties
const isWireframe = false;                              // Use wireframe?

const particles = new THREE.Group();
const wood = new THREE.Group();
var particleIndex = 0;
var ambientLight = new THREE.Object3D();
var pointLight = new THREE.Object3D();
var Icosahedron = [];

// Create Icosahedron shape for the particles shape based on radius, details level and color
function createIcosahedron(radius, details, color)
{
    var material = new THREE.MeshToonMaterial(); //MeshToontMaterial
    material.color = new THREE.Color(color);
    material.wireframe = isWireframe;
    var geometry = new THREE.IcosahedronGeometry(radius, details);
    return new THREE.Mesh(geometry, material);
}

// Create a Cylinder shape based on radius, theta, height and color
function createCylinder(radius, theta, height, color)
{
    var material = new THREE.MeshToonMaterial();
    material.color = new THREE.Color(color);
    material.wireframe = isWireframe;
    var geometry = new THREE.CylinderGeometry(radius, theta, height);
    return new THREE.Mesh(geometry, material);
}

// Create a delay function for particle dispersion
function delay(time)
{
    return new Promise(resolve => setTimeout(resolve, time));
}

// Create particles and set a delay between them
function createParticles()
{
    if(particleIndex < maxParticles)
    {
        Icosahedron[particleIndex] = createIcosahedron(1, 1, particlesColor);
        resetParticle(Icosahedron[particleIndex]);
        particles.add(Icosahedron[particleIndex]);
    }

    delay(particleTimeSpan).then(() => 
    {
        particleIndex++;
        createParticles();
    });
}

// Convert an angle from degrees to radians
function degreesToRadians(degrees)
{
    return degrees * (Math.PI / 180);
}

// Create a couple of wood logs
function createWoodLogs()
{
    var woodLog = createCylinder(woodSize.x, woodSize.y, woodSize.z, woodColor);
    woodLog.rotateZ(degreesToRadians(90));
    woodLog.rotateX(degreesToRadians(90));
    woodLog.position.y = woodYPosition;
    wood.add(woodLog);
    var woodLog = createCylinder(woodSize.x, woodSize.y, woodSize.z, woodColor);
    woodLog.rotateZ(degreesToRadians(90));
    woodLog.rotateX(degreesToRadians(180));
    woodLog.position.y = woodYPosition;
    wood.add(woodLog);
}

// Create the point and ambient light
function createLighting()
{
    ambientLight = new THREE.AmbientLight(ambientLightColor, ambientLightIntensity);
    pointLight = new THREE.PointLight(pointLightColor, pointLightIntensity);
    pointLight.position.set(pointLightPosition.x, pointLightPosition.y, pointLightPosition.z);
}

// Add the created particles to the scene
function addShapes()
{
    createWoodLogs();
    createParticles();
    scene.add(wood);
    scene.add(particles);
}

// Create the lights and add it to the scene
function addLighting()
{
    createLighting();
    scene.add(pointLight);
    scene.add(ambientLight);
}