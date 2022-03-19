//Create an icosahedron with radius, detail level and vector3 color
function createIcosahedron(radius, details, color) {
    var material = new THREE.MeshBasicMaterial();
    material.color = new THREE.Color(color);
    material.wireframe = false;
    var geometry = new THREE.IcosahedronGeometry(radius, details);
    var Icosahedron = new THREE.Mesh(geometry, material);
    return Icosahedron;
}

var earth = createIcosahedron(2, 0, new THREE.Vector3(0, 1, 0));
var moon = createIcosahedron(1, 0, new THREE.Vector3(0, 1, 0));

function addShapes() {
    scene.add(earth);
    scene.add(moon);
}