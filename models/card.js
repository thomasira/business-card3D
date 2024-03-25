import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import { FontLoader } from 'three/addons/loaders/FontLoader.js'

// load card asset group
const loader = new GLTFLoader()
const cardData = await loader.loadAsync('asset/holographic_card.glb')

// set paper and overlay
const paper = cardData.scene.children[1]
const overlay = cardData.scene.children[0]

//set paper material
const papernormal = new THREE.TextureLoader().load('asset/Watercolor_Paper_001_NORM.jpg')

paper.material = new THREE.MeshPhysicalMaterial({
    color: 0xebfcff,
    normalMap: papernormal,
    normalScale: new THREE.Vector2( .02, .02 ),
    roughness: 1.2,
  })

// set overlay material
overlay.material = new THREE.MeshPhysicalMaterial({
    color: 0xb8c9ccff,
    transparent: true,
    transmission: 1,
    opacity:.6,
    roughness: .4,
    iridescence: 1,
    iridescenceIOR: 2.333,
  })

// set position of overlay over paper
overlay.position.set(0, -0.013, 0)

// instanciate a new card group
const card = new THREE.Group()

// add paper and overlay to card group
paper.castShadow = true
card.add(paper)
card.add(overlay)


// load font 
const fontloader = new FontLoader();
fontloader.load( 'fonts/helvetiker_regular.typeface.json', function (font) {
  const base = -Math.PI/2

  // create text geometry
  function type(string, size)
  {
    const geometry = new TextGeometry( string, {
      font: font,
      size: size,
      height: 0.003,
    } );
    const material = new THREE.MeshPhysicalMaterial( { 
      color: 0x080909,
      roughness: 0.25,
      normalMap: papernormal,
      normalScale: new THREE.Vector2( .04, .04 ),
    });
    const text =  new THREE.Mesh( geometry, material );
    return text.rotateX(-base)
  }


  const title = type('Thomas Aucoin-Lo', .3)
  const subtitle = type('Programmeur web', .2)
  
  
  
  
  
  
  
  title.position.set(-1.5, -0.002, .8)
  subtitle.position.set(-1.45, -0.002, .5)


  card.add(title)
  card.add(subtitle)
}); 








export default card