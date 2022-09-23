async function display(action) {
  let boardWidth = $("#board-width").val() * 1;
  const $bord = board(boardWidth, action);
  var trs = $bord.find("tr");
  var center = Math.floor(trs.length / 2);
  var ctd = trs.eq(center).find("td").eq(center);
  ctd.addClass("center").text("K");

  var hiest = 0;
  let result = 0;
  let $result = $("#result");
  $result.text(action !== "algoritm" ? 'wait' : '');

  let movesToAllPositions;
  const pOr = action == "predict" || action === "random";

  if (pOr) {
    movesToAllPositions = await getPositions(boardWidth, action);
  }

  const $td = $("#train-data");
  $td.text(`Stored ${oldTD} moves from ${totalMoves} random moves`);

  trs.each(function (r, rr) {
    var $rr = $(rr);
    $rr.find("td").each(function (i, v) {
      var $t = $(this);
      if (!$t.hasClass("center")) {
        var x = ctd.index() - i;
        var y = ctd.parent().index() - r;

        // console.log(x, y)
        var kMoves = algoritm(x, y);
        var moves = kMoves;

        if (pOr) {
          const findMoves = movesToAllPositions.find(
            (position) => position.x === x && position.y === y
          );
          moves = findMoves ? findMoves.moves : -2;
        }

        if (pOr) {
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

  if (!pOr) {
    paintBoard(hiest);
  } else {
    $("#model-btns")[0].style = "";
  }
}

async function getPositions(bW, action) {
  const allpositions = new Array(bW*bW)
  // const positions = action === 'predict' ? allpositions.slice(0,10) : allpositions
  const positions = allpositions;
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

      moves = await random(x, y, ROUNDS)
    }

    positions[index] = { x, y , moves}
  }

  return positions
}
