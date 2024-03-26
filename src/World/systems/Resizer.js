class Resizer
{
  constructor(container, camera, renderer)
  {
    camera.aspect = container.clientWidth / container.clientHeight
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(window.devicePixelRatio*2)
    
    window.addEventListener('resize', () => {
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }
}
export { Resizer }