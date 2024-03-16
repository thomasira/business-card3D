import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
const loader = new GLTFLoader();
const cardData = await loader.loadAsync('asset/holographic_card.glb');
const card = cardData.scene.children[0];
console.log(cardData)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });


renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const plight = new THREE.SpotLight(0xfffaed);
plight.size = 100
plight.penumbra = 6;
plight.intensity = 400;

const slight2 = new THREE.SpotLight(0xfffaed);
slight2.angle = .7;
slight2.penumbra = 1;
slight2.intensity = 200;

camera.position.set(0, 0, 25);
plight.position.set(-3, 1, 6);
slight2.position.set(2, -2, 5);

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

const testPlane = new THREE.PlaneGeometry(6,6)
const testMaterial = new THREE.MeshStandardMaterial(0xffffff)
const test = new THREE.Mesh(testPlane,testMaterial)
test.position.set(0, 0 ,-2)
scene.add(test)
const base = -Math.PI/2
card.material.transparent = true;
card.material.opacity =.3;

console.log(card)
card.rotateX(base)
scene.add(card)
scene.add(plight);
scene.add(slight2);

/* cardBack.rotateX(base)
scene.add(cardBack) */

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

        /* scale card */
/*         card.scale.y = 1.1
        card.scale.z = 1.1 */

        /* apply weight to cursor -> change for more or less rotation */
        const weight = 0.03

        /* apply rotation of card based on weight */
        let x = intersects[i].point.x
        let y = intersects[i].point.y
        card.rotation.z = x * weight
        card.rotation.x = base - (y * weight * 2)
    }
    render()

    /* reset card scale and position if no intersections */
    if(!intersects[0]) {
/*         card.scale.y = 1
        card.scale.z = 1 */
        card.rotation.x = base
        card.rotation.z = 0
    }
}

function render() {
    renderer.render( scene, camera );
}

/**
 * zoom on wheel event
 * @param {*} e 
 */
function scrollZoom(e) {

    /* zoom limits */
    const maxZoom = 5;
    const minZoom = 25;

    //scroll zoom
    if(e.deltaY > 0 && camera.position.z < minZoom) camera.position.z += 1;
    if(e.deltaY < 0 && camera.position.z > maxZoom) camera.position.z -= 1;

    //keyboard zoom
    if(e.keyCode == 38 && camera.position.z > maxZoom) camera.position.z -= 1;
    if(e.keyCode == 40 && camera.position.z < minZoom) camera.position.z += 1;
}


function loop () {
    console.log(card.rotation.x)
    const baseX = - 1.5707963267948963
    const limit = .2
    if(card.rotation.x > baseX - limit) card.rotation.x -= 0.01
    else if(card.rotation.z < limit) card.rotation.z += 0.01
    else if(card.rotation.x <= baseX - limit) card.rotation += 0.01
}
function animate() {
    requestAnimationFrame( animate );
    render()
}
animate()
window.addEventListener( 'pointermove', onPointerMove );
window.addEventListener('wheel', scrollZoom);
window.addEventListener('keydown', scrollZoom);

/**
 * resize renderer according to screen resize
*/
renderer.setPixelRatio(window.devicePixelRatio);
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


