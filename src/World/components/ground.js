import { PlaneGeometry, Mesh, MeshPhysicalMaterial } from "three"

function createGround()
{
  const groundModel = new PlaneGeometry(100, 100)
  const groundMaterial = new MeshPhysicalMaterial({
    color: 0x0a1008,
    roughness: 1,
  }) 
  const ground = new Mesh( groundModel, groundMaterial)
  ground.position.set(0, 0, 0)
  return ground
}
export { createGround }