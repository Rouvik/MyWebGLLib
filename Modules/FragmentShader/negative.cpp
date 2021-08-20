// convert normal vec3 color to negative vec3 color
vec3 negative(vec3 x)
{
  x.r = 1.0-x.r;
  x.g = 1.0-x.g;
  x.b = 1.0-x.b;
  return x;
}