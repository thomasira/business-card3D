import { Group } from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { createType } from './cardComponents/type'
import { createPaperMaterial, createOverlayMaterial } from './cardComponents/materials'
async function createCard()
{
  // load model
  const loader = new GLTFLoader()
  const cardData = await loader.loadAsync('/asset/holographic_card2.glb')

  // define both layers
  const overlay = cardData.scene.children[1]
  const paper = cardData.scene.children[0]

  // create materials
  paper.material = createPaperMaterial()
  overlay.material = createOverlayMaterial()

  // set shadow(only one of the card layers)
  paper.castShadow = true

  // set position of items
  paper.position.set(0, 0, 0)
  overlay.position.set(0, 0, .0016)

  //create type fields
  const title = await createType('Thomas Aucoin-Lo', .05)
  const subtitle = await createType('Programmeur web', .03)

  console.log(paper.geometry, title.geometry)

  const inkZ = .0002
  title.position.set(-.4, .15, inkZ)
  subtitle.position.set(-.39, 0.1, inkZ)

  // create group
  const card = new Group()

  // add paper,overlay and text to card group
  card.add(paper)
  card.add(overlay)
  card.add(title)
  card.add(subtitle)

  card.position.set(0, 0, 2)
  card.name = 'card'

  var rotateX = 0
  var rotateY = 0
  var loopX = true
  var loopY = true
  card.tick = () => {
    const limit = .25
    const stepX = .005 * (limit - Math.abs(rotateX / 1.2))
    const stepY = .0023 * (limit - Math.abs(rotateY / 2))
  
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
  
      if(rotateY > limit - 0.005) loopY = false
      if(rotateY < (limit - 0.005) * -1) loopY = true
      if(loopY)
      {
        card.rotation.y += stepY
        rotateY+= stepY
      }
      if(!loopY)
      {
        card.rotation.y -= stepY
        rotateY -= stepY
      }
  }

  /* card.rotateY(Math.PI /2) */
/*   paper.rotateX(Math.PI/ 1000) */
  return card
}

// load card asset group

// set paper and overlay

//set paper material


// set overlay material


// set position of overlay over paper

// instanciate a new card group


// load font 


export { createCard }