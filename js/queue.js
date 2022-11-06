"use strict";

var platform = $("#platform");
var queue = [];
queue.shift();
var script = $("#document").text().split("\n");
var head;
var tail;
var width;
var disable = true;
var action_complete = true;
function update() {
  platform.empty();
  console.log("=====");
  queue.forEach(j => {
    platform.append($("<div />", {
      text: j,
      class: "block",
      id: "block-" + j
    }));
  });
  head = $("#block-" + queue[0]);
  tail = $("#block-" + queue[queue.length - 1]);
  width = $("#tail").width();
  $("#tail").css("left", (queue.length - 1) * width * 1.15);
  $("#number").html(queue[queue.length - 1] + 1 || 1);
  if (queue.length >= 8) $("#enqueue").attr("disabled", true);else $("#enqueue").attr("disabled", false);
  if (queue.length < 2) {
    $(".pointer").css("opacity", "0");
  } else {
    $(".pointer").css("opacity", "1");
  }
}
$("#dequeue").click(() => {
  $("#out").fadeIn(700);
  $("#out").html(queue.shift() + " returned.").fadeOut(2000);
  head.fadeOut(500);
  head = $("block-" + queue[0]);
  setTimeout(update, 700);
});
$("#enqueue").click(() => {
  queue.push(queue[queue.length - 1] + 1 || 1);
  if (disable) $("#enqueue").attr("disabled", true);
  $("#click").fadeOut(500);
  update();
});
update();
$("#enqueue").attr("disabled", true);
$("#dequeue").attr("disabled", true);
window.line = 0;
$("button").click(() => {
  $("button").attr("disabled", true);
  setTimeout(next_line, 3000);
});
function show_button(btn) {
  btn.attr("disabled", false);
}
function next_line() {
  $("#description").fadeOut(1000, () => {
    $("#description").html(script[line]).fadeIn(1000, f => {
      window.line++;
      if (window.line == 5) {
        $("#click").fadeIn(500);
        show_button($("#enqueue"));
      } else if (window.line == 9 || window.line == 12) {
        show_button($("#enqueue"));
      } else if (window.line == 17) {
        show_button($("#dequeue"));
      } else if (window.line == 23) {
        $("#enqueue span").text("Enqueue");
        $("#dequeue span").text("Dequeue");
        disable = false;
        $("#enqueue").attr("disabled", false);
        $("#dequeue").attr("disabled", false);
      } else {
        setTimeout(next_line, 3000);
      }
    });
  });
}

$(document).one( "click", function() { setTimeout(next_line, 2000);} );