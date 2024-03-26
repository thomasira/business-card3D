import { Mesh, MeshPhysicalMaterial, Vector2, TextureLoader } from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import { FontLoader } from 'three/addons/loaders/FontLoader.js'

async function createType(string, size, normal)
{
  const papernormal = new TextureLoader().load('/asset/Watercolor_Paper_001_NORM.jpg')
  const fontloader = new FontLoader();
  const font = await fontloader.loadAsync('fonts/helvetiker_bold.typeface.json')
  const geometry = new TextGeometry( string, {
    font: font,
    size: size,
    height: 0,
  });
  const material = new MeshPhysicalMaterial( { 
    color: 0x080909,
    roughness: 1,
    normalMap: papernormal,
    normalScale: new Vector2( .0002, .0002 ),
  });
  const text =  new Mesh( geometry, material );
  return text
}

export { createType }