import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import { FontLoader } from 'three/addons/loaders/FontLoader.js'

// load card asset group
const loader = new GLTFLoader()
const cardData = await loader.loadAsync('asset/holographic_card2.glb')

// set paper and overlay
const overlay = cardData.scene.children[1]
const paper = cardData.scene.children[0]

//set paper material
const papernormal = new THREE.TextureLoader().load('asset/Watercolor_Paper_001_NORM.jpg')

paper.material = new THREE.MeshPhysicalMaterial({
    color: 0xebfcff,
    normalMap: papernormal,
    normalScale: new THREE.Vector2( .001, .001 ),
    roughness: 1,
  })

// set overlay material
overlay.material = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    transmission: 1,
    roughness: .25,
    iridescence: 1,
    iridescenceIOR: 2.333,
/*     attenuationColor: 0xff007b,
    attenuationDistance: 0.00001 */
  })


paper.material.color.convertSRGBToLinear()
overlay.material.color.convertSRGBToLinear()
// set position of overlay over paper
paper.position.set(0, 0, 0)
overlay.position.set(0, 0, .0014)

// instanciate a new card group
const card = new THREE.Group()

// add paper and overlay to card group
paper.castShadow = true
card.add(paper)
card.add(overlay)

// load font 
const fontloader = new FontLoader();
fontloader.load( 'fonts/helvetiker_bold.typeface.json', function (font) {

  // create text geometry
  const title = type('Thomas Aucoin-Lo', .05)
  const subtitle = type('Programmeur web', .03)
  title.position.set(-.4, .15, 0.0002)
  subtitle.position.set(-.39, 0.1, 0.0002)
  card.add(title)
  card.add(subtitle)

  function type(string, size)
  {
    const geometry = new TextGeometry( string, {
      font: font,
      size: size,
      height: 0,
    });
    const material = new THREE.MeshPhysicalMaterial( { 
      color: 0x080909,
      roughness: 1,
      normalMap: papernormal,
      normalScale: new THREE.Vector2( .0002, .0002 ),
    });
    const text =  new THREE.Mesh( geometry, material );
    return text
  }
}); 

export default card