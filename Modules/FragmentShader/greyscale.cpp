vec3 greyscale(vec3 x)
{
  float grey = (x.r + x.g + x.b) / 3.0;
  x.r = grey;
  x.b = grey;
  x.g = grey;
  return x;
}