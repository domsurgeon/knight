function algoritm(ex, ey) {
  ex = parseInt(ex);
  ey = parseInt(ey);
  ex = ex < 0 ? -ex : ex;
  ey = ey < 0 ? -ey : ey;
  var x = ex < ey ? ex : ey;
  var y = x == ex ? ey : ex;

  if (x + y == 1) return 3;
  if (x == 2 && x == y) return 4;

  var over = 2 * x <= y;

  var yP = y + (((over ? -1 : 1) * y) % 2);
  var dx = yP / 2 - x;

  if (over) return x + dx + (dx % 2) + (y % 2);

  var dxpos = dx < 0 ? -dx : dx;
  var xP = dx + x;
  var w = dxpos - Math.floor(dxpos / 3) * 2;
  var result = xP + w;

  if (y % 2) {
    if (dx % 3) result += -1;
    else result += +1;
  }
  return result;
}
