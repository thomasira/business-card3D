import { SpotLight, Vector2 } from "three"

function createLights()
{
  const slight1 = new SpotLight(0xfffaed)
  slight1.intensity = 100
  slight1.penumbra = 1
  slight1.angle = Math.PI/3
  slight1.castShadow = true;
  slight1.shadow.mapSize = new Vector2(128, 128)
  slight1.shadow.camera.near = 0.5; 
  slight1.shadow.camera.far = 25; 
  slight1.shadow.blurSamples = 25
  slight1.shadow.radius = 5
  slight1.shadow.focus = 2; 

  const slight2 = new SpotLight(0x385928)
  slight2.intensity = 100;
  slight2.penumbra = 3;
  slight2.castShadow = true

  const slight3 = new SpotLight(0xe5e0e0)
  slight3.intensity = 1000;
  slight3.penumbra = 1;

  slight1.position.set(1, 1, 10);
  slight2.position.set(-4, 2, 5);
  slight3.position.set(10, 2, 40);

  return [slight1, slight2, slight3]
}

export { createLights }