let draggedElem = null;
let hours = 0;
let mins = 0;

function showTime() {
  const minsStr = `${mins}`.padStart(2, '0');
  document.getElementById('timestamp').textContent = `${hours}:${minsStr}`;
}

function updateTime(handName, angle) {
  let pos = (Math.round(angle / 6) + 60) % 60;

  if (handName === 'hours') {
    hours = Math.floor(pos / 5);
    if (hours === 0)
      hours = 12;
  } else {
    mins = pos;
  }

  showTime();
}

function setHandPosition(elem, angle) {
        elem.style.transform = `rotateZ(${angle}deg)`;

      const isHourHand = elem.classList.contains('hour-hand');
      updateTime(isHourHand ? 'hours' : 'minutes', angle);
}

function onMouseMove(e) {
  if (draggedElem) {
        const xDelta = ((e.pageX - draggedElem.parentElement.offsetLeft) -
          draggedElem.parentElement.clientWidth / 2);

        const yDelta = ((e.pageY - draggedElem.parentElement.offsetTop) -
          draggedElem.parentElement.clientHeight / 2);
    
      let angle = Math.atan2(yDelta, xDelta) * (180 / Math.PI);
      angle += 90;
      setHandPosition(draggedElem, angle);
  }
}

function onMouseDown(e) {
  draggedElem = e.target;
  draggedElem.onmousemove = onMouseMove;
  document.onmousemove = onMouseMove;
}

function onMouseUp(e) {
  e = e || window.event;
  e.preventDefault();
  if (draggedElem) {
    draggedElem.onmousemove = null;
    document.onmousemove = null;
    draggedElem = null;
  }
}

const hands = document.getElementsByClassName('hand');
for (let i = 0; i < hands.length; i++) {
  hands[i].onmousedown=onMouseDown;
  hands[i].onmouseup=onMouseUp;
}

document.onmouseup = onMouseUp;

function setTime(hoursToSet, minsToSet) {
  hours = hoursToSet;
  mins = minsToSet;

  const hourHand = document.getElementsByClassName('hour-hand')[0];
  const minHand = document.getElementsByClassName('minute-hand')[0];
  setHandPosition(hourHand, hours * 30);
  setHandPosition(minHand, mins * 6);
}

setTime(12, 60);
showTime();
