import * as THREE from 'three';
import card from './models/card';

// instanciate renderer and add to DOM
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.VSMShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// create new scene
const scene = new THREE.Scene();

// instanciate new camera
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000);

// instanciate and define spot light 1
const slight1 = new THREE.SpotLight(0xfffaed)
slight1.intensity = 10
slight1.penumbra = 1
slight1.angle = Math.PI/3
slight1.castShadow = true;
slight1.shadow.mapSize = new THREE.Vector2(128, 128)
slight1.shadow.camera.near = 0.5; // default
slight1.shadow.camera.far = 25; // default
slight1.shadow.blurSamples = 25
slight1.shadow.radius = 5
slight1.shadow.focus = 2; // default

// instanciate and define spot light 2
const slight2 = new THREE.SpotLight(0x385928)
slight2.intensity = 2;
slight2.penumbra = 1;
slight2.castShadow = true

// instanciate and define spot light 3
const slight3 = new THREE.SpotLight(0xe5e0e0)
slight3.intensity = 1000;
slight3.penumbra = 1;

const slight4 = new THREE.SpotLight(0xe5e0e0)
slight4.intensity = 1000;
slight4.penumbra = 1;

const slight5 = new THREE.SpotLight(0xf7ebc9)
slight5.intensity = 20;
slight5.penumbra = 1.4;
slight5.angle = Math.PI/1

// set items position
camera.position.set(0, 0, 1);
const planeModel = new THREE.PlaneGeometry(100, 100)
const planeMaterial = new THREE.MeshPhysicalMaterial({
  color: 0x0a1008,
  roughness: 1,
}) 
const plane = new THREE.Mesh( planeModel, planeMaterial)
plane.position.set(0, 0, -1)

slight1.position.set(4, 4, 0);
slight2.position.set(-4, 2, 5);
slight3.position.set(10, 2, 40);
slight4.position.set(14, 14, 4);
slight4.target.position.set(0, 0, 0)
slight5.position.set(-1, -1, 5);
card.position.set(0, 0, 0)

/* scene.fog = new THREE.Fog( 0x686d71, 0, 50 ); */
scene.add(plane)
scene.add(slight1);
scene.add(slight2);
/* 
scene.add(slight3);
scene.add(slight4);
scene.add(slight5); */
scene.add(card)
plane.receiveShadow = true

// instanciate ray caster(for cursor intersect)
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

/**
 * catch cursor intersection on card, apply rotation to card based on cursor weight
 * @param {*} event 
 */
function onPointerMove(event) {

  /* get cursor position(x & y) */
  pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  
    /* instance raycaster and intersections catcher */
    raycaster.setFromCamera( pointer, camera );
    const intersects = raycaster.intersectObjects( scene.children );
    
    /* capture interception (cursor ON card) */
    for ( let i = 0; i < intersects.length; i ++ ) {
      
      if(intersects[i].object.name == 'overlay')
      {
        overCard = true

        /* scale card */
        if(card.scale.y <= 1.2) card.scale.y += .02
        if(card.scale.x <= 1.2) card.scale.x += .02
        
        /* apply weight to cursor -> change for more or less rotation */
        const weight = .8
  
        /* apply rotation of card based on weight */
        let x = intersects[i].point.x
        let y = intersects[i].point.y
  
        card.rotation.x = - y * weight *1.2
        card.rotation.y = x * weight /2
      }
    }
    /* reset card scale and position if no intersections */
    if(!intersects[0] || intersects[0].object.name != 'overlay')
    {
        if(overCard == true) overCard = 2
    }
}

function loop ()
{
  const limit = .25
  const stepX = .005 * (limit - Math.abs(rotateX / 1.2))
  const stepZ = .0023 * (limit - Math.abs(rotateZ / 2))

    if(rotateX > limit - 0.05) loopX = false
    if(rotateX < (limit - 0.05) * -1) loopX = true
    if(loopX)
    {
        card.rotation.x += stepX
        rotateX += stepX
    }
    if(!loopX)
    {
      card.rotation.x -= stepX
      rotateX -= stepX
    }

    if(rotateZ > limit - 0.005) loopZ = false
    if(rotateZ < (limit - 0.005) * -1) loopZ = true
    if(loopZ)
    {
      card.rotation.z += stepZ
      rotateZ+= stepZ
    }
    if(!loopZ)
    {
      card.rotation.z -= stepZ
      rotateZ -= stepZ
    }
}
function animate()
{
    requestAnimationFrame( animate );
    checkOverCard()
    render()
}
function checkOverCard()
{
  if(overCard == 2)
  {
    if(card.scale.y >= 1.04 && !card.scale.y <= 0) 
    {
      card.scale.y -= 0.04
    }
    if(card.scale.x >= 1.04 && !card.scale.x <= 0)
    {
      card.scale.x -= 0.04
    }
    else{
      overCard = false
      rotateX = 0
      rotateZ = 0
      card.rotation.x = 0
      card.rotation.y = 0
    }
  }
}
animate()
window.addEventListener('pointermove', onPointerMove)



