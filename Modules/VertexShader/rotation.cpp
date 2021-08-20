// returns a rotation matrix as per the acis requested
// angle is specified in float angle and vec3 dir specifies the axis of rotation

mat3 rotate(float angle, vec3 dir)
{
  float sin = sin(radians(angle)),
        cos = cos(radians(angle));
  if(dir.x == 1.0)
  {
    return mat3(
      1, 0, 0,
      0, cos, -sin,
      0, sin, cos
    );
  }
  else if(dir.y == 1.0)
  {
    return mat3(
      cos, 0, sin,
      0, 1, 0,
      -sin, 0, cos
    );
  }
  else if(dir.z == 1.0)
  {
    return mat3(
      cos, -sin, 0,
      sin, cos, 0,
      0, 0, 1
    );
  }
  else
  {
    return mat3(
      1, 0, 0,
      0, 1, 0,
      0, 0, 1
      );
  }
}