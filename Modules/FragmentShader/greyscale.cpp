// returns the greyscale value of a vec3 color

vec3 greyscale(vec3 x)
{
  float grey = (x.r + x.g + x.b) / 3.0;
  x.r = x.b = x.g = grey;
  return x;
}