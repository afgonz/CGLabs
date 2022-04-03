const dispersion = 1.5;
const moveSpeed = 0.05;
const rotSpeed = 0.005;
const fadeSpeed = 0.01;
const initialColor = new THREE.Color(1,0,0);
const finalColor = new THREE.Color(1,1,0);

// Reset the particles to use it again in the animation
function resetParticle(particle)
{
    particle.position.set(0 + randomizeValue(dispersion, false),0+ randomizeValue(dispersion),0+ randomizeValue(dispersion, false));
    particle.material.color = initialColor;
    particle.scale.set(1,1,1);
}

// Randomize value between 0-1 or -0.5 and 0.5
function randomizeValue(value, positive = true)
{
    var rnd = Math.random();
    if (!positive)
    {
        rnd -= 0.5;
    }
    return value * rnd;
}

// Interpolate colors between red and yello and return the Hex value 
function getHexColorByDistance(distance)
{
    var newColor = new THREE.Color(1, distance / 10 , 0);
    return newColor.getHex();
}

// Randomize the next state of the particle
function animateParticle(particle)
{
    particle.rotation.y += randomizeValue(moveSpeed);
    particle.position.y += randomizeValue(moveSpeed);
    particle.material = particle.material.clone();
    particle.material.color.setHex(getHexColorByDistance(particle.position.y));
    particle.scale.set(particle.scale.x - randomizeValue(fadeSpeed), particle.scale.y - randomizeValue(fadeSpeed), particle.scale.z - randomizeValue(fadeSpeed));
    if (particle.scale.x < 0.1)
    {
        resetParticle(particle);
    }
}

// Loop to animate the scene
function animateScene()
{
    renderer.render(scene, camera);
    Icosahedron.forEach(animateParticle);
    requestAnimationFrame(animateScene);
}