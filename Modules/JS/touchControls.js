// controls
var px = 0, py = 0, vx = 0, vy = 0, angleX = 0, angleY = 0;
document.addEventListener('touchstart',(event)=>
{
  px = event.touches[0].clientX;
  py = event.touches[0].clientY;
});
document.addEventListener('touchmove',(event)=>
{
  vx = px - event.touches[0].clientX;
  vy = py - event.touches[0].clientY;
  let hyp = (vx**2 + vy**2)**0.5;
  vx /= hyp;
  vy /= hyp;
});
document.addEventListener('touchend',()=>
{
  vx = vy = 0;
});

// to get the angles use
angleX += vx;
angleY += vy;