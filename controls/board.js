function board(sideLength, action) {
  const $tables = $("#tables");
  const tableId = `table-${action}`;

  $(`#${tableId}`).remove();

  const $table = $("<table>");
  $table.attr("id", tableId);

  $tables.append($table);
  var rows = sideLength;
  var colus = rows;

  while (rows) {
    rows--;
    var tr = $("<tr>");
    var cols = colus;
    while (cols) {
      cols--;
      tr.append($("<td>"));
    }
    $table.append(tr);
  }

  return $table;
}

function paintBoard(hiest) {
  var colores = ["#aff", "#adf", "#acf", "#abf", "#aaf"];

  $("td").each(function () {
    var $t = $(this);
    $t.css({ backgroundColor: colores[$t.text() % 5] });
  });
}
