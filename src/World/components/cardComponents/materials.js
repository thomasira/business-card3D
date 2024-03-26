import { TextureLoader, Vector2, MeshPhysicalMaterial } from "three"

function createPaperMaterial()
{
  const papernormal = new TextureLoader().load('/asset/Watercolor_Paper_001_NORM.jpg')
  return new MeshPhysicalMaterial({
    color: 0xe7e4e4,
    normalMap: papernormal,
    normalScale: new Vector2( .001, .001 ),
    roughness: 1,
  })
}

function createOverlayMaterial()
{
  return new MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    transmission: 1,
    roughness: .2,
    iridescence: 1,
    iridescenceIOR: 2.333,
  })
}

export { createPaperMaterial, createOverlayMaterial }