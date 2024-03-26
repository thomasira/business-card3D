import { createScene } from "./components/scene"
import { createCamera } from "./components/camera"
import { createGround } from "./components/ground"
import { createCard } from "./components/card"
import { createRenderer } from "./systems/renderer"
import { Resizer } from "./systems/Resizer"
import { createLights } from "./components/lights"
import { cameraZoom } from "./utilities/cameraZoom"
import { Loop } from "./systems/Loop"

let camera
let renderer
let scene
let loop

class World
{
  #camera
  #renderer
  #scene
  #loop

  constructor(container)
  {
    renderer = createRenderer()
    camera = createCamera(container)
    scene = createScene()
    
    const lights = createLights()
    const ground = createGround()
    
    scene.add(lights[0])
    scene.add(lights[1])
    scene.add(ground)
    
    this.init()
    this.events()
    
    loop = new Loop(camera, scene, renderer)
    new Resizer(container, camera, renderer)
    container.append(renderer.domElement)
  }
  
  async init()
  {
    const card = await createCard()
    scene.add(card)
    loop.updatables.push(card)
  }
  
  events()
  {
    window.addEventListener('wheel',(e) => cameraZoom(e, camera))
    window.addEventListener('keydown', (e) => cameraZoom(e, camera))
  }

  render()
  {
    renderer.render(scene, camera)
  }

  start()
  {
    loop.start()
  }

  stop()
  {
    loop.stop()
  }
}
export { World }