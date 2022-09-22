let boardWidth;

function board(sideLength) {
  const fire = () => {
    $("table").remove();
    const $table = $("<table>");
    $("#inpi").after($table);
    var filas = sideLength || prompt("Insert number below 100");
    var colus = filas;
    while (filas) {
      filas--;
      var tr = $("<tr>");
      var cols = colus;
      while (cols) {
        cols--;
        tr.append($("<td>"));
      }
      $table.append(tr);
    }
  };
  return fire();
}

async function display(action) {
  boardWidth = $("#board-width").val() * 1;
  board(boardWidth);
  var trs = $("tr");
  var center = Math.floor(trs.length / 2);
  var ctd = trs.eq(center).find("td").eq(center);
  ctd.addClass("center").text("K");

  var hiest = 0;
  let result = 0;
  let $result = $("#result");
  $result.text(result);

  let movesToAllPositions

  if(action){
    movesToAllPositions = await getPositions(boardWidth, action)

    if(action === "walk") {
      console.log("added train")
    } else {
      console.log(movesToAllPositions)
    }
  }

  const $td = $("#train-data")
  $td.text( oldTD )

  trs.each(function (r, rr) {
    var $rr = $(rr);
    $rr.find("td").each(function (i, v) {
      var $t = $(this);
      if (!$t.hasClass("center")) {
        var x = ctd.index() - i;
        var y = ctd.parent().index() - r;

        // console.log(x, y)
        var kMoves = knightTo(x, y);
        var moves = kMoves;

        if (action) {
          const findMoves = movesToAllPositions.find( position => position.x === x && position.y === y)
          moves = findMoves ? findMoves.moves : -2
        }

        if (action) {
          const isOk = kMoves === moves;
          $t.attr("class", isOk ? "ok" : "not-ok");
          result += isOk ? 1 / (boardWidth * boardWidth - 1) : 0;

          const res = Math.ceil(result * 100);
          $result.text(`${res} %`);
        }

        $t.text(moves); // kTo or pred

        hiest = moves > hiest ? moves : hiest;
      }
    });
  });

  if (!action) {
    paintFrac(hiest);
  } else {
    $("#model-btns")[0].style = ""
  }
}

function paintFrac(hiest) {
  var colors = gradient("000000000", "022022022", hiest);
  var colores = colors.map(function (v, i) {
    var colo =
      v.length == 6
        ? "#0" + v.slice(1)
        : v.length == 5
        ? "#00" + v.slice(1)
        : v;
    return colo;
  });
  //console.log(colores);

  $("td").each(function () {
    var $t = $(this);
    $t.css({ backgroundColor: colores[$t.text()] });
  });
}

function knightTo(ex, ey) {
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

/* code taken below */
function gradient(startColor, endColor, steps) {
  var start = {
    Hex: startColor,
    R: parseInt(startColor.slice(1, 3), 16),
    G: parseInt(startColor.slice(3, 5), 16),
    B: parseInt(startColor.slice(5, 7), 16),
  };
  var end = {
    Hex: endColor,
    R: parseInt(endColor.slice(1, 3), 16),
    G: parseInt(endColor.slice(3, 5), 16),
    B: parseInt(endColor.slice(5, 7), 16),
  };
  diffR = end["R"] - start["R"];
  diffG = end["G"] - start["G"];
  diffB = end["B"] - start["B"];

  stepsHex = new Array();
  stepsR = new Array();
  stepsG = new Array();
  stepsB = new Array();

  for (var i = 0; i <= steps; i++) {
    stepsR[i] = start["R"] + (diffR / steps) * i;
    stepsG[i] = start["G"] + (diffG / steps) * i;
    stepsB[i] = start["B"] + (diffB / steps) * i;
    stepsHex[i] =
      "#" +
      Math.round(stepsR[i]).toString(16) +
      "" +
      Math.round(stepsG[i]).toString(16) +
      "" +
      Math.round(stepsB[i]).toString(16);
  }
  return stepsHex;
}

function nocolor() {
  $("td").css({ backgroundColor: "transparent" });
}

async function getPositions(bW, action) {
  const allpositions = new Array(bW*bW)
  const positions = action === 'predict' ? allpositions.slice(0,10) : allpositions
  const center = Math.floor(bW / 2);

  for (let index = 0; index < positions.length; index++) {

    const x = index % bW - center
    const y = Math.floor(index / bW) - center
    let moves = 0

    if( x === 0 && y === 0){
      moves = 0
    }

    if(action === "predict") {
      moves = await prediction(x, y, bW)
    }else{
      const ROUNDS = $('#tries').val()*1;

      moves = await walk(x, y, ROUNDS)
    }

    positions[index] = { x, y , moves}
  }

  return positions
}

setTimeout(console.clear,0)
