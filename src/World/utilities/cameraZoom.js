
function cameraZoom(e, camera) {

  /* zoom limits */
  const maxZoom = 2.5;
  const minZoom = 10;

  //camera zoom
  if(e.deltaY > 0 && camera.position.z < minZoom) camera.position.z += .5;
  if(e.deltaY < 0 && camera.position.z > maxZoom) camera.position.z -= .5;

  //keyboard zoom
  if(e.keyCode == 38 && camera.position.z > maxZoom) camera.position.z -= .5;
  if(e.keyCode == 40 && camera.position.z < minZoom) camera.position.z += .5;

}
export { cameraZoom }