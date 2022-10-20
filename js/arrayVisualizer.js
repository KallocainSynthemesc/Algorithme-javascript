// get each control button
const pushButton = document.querySelector("#push");
const popButton = document.querySelector("#pop");
const unshiftButton = document.querySelector("#unshift");
const shiftButton = document.querySelector("#shift");
const reverseButton = document.querySelector("#reverse");
const sortButton = document.querySelector("#sort");

// get the ul element for visualized array
const theArrayUl = document.querySelector("ul");

// setup array of items to unshift and push to visualized array
let extraItems = [
  "Bacon",
  "Butter",
  "Cereal",
  "Coffee",
  "Creamer",
  "Fruit",
  "Mayo",
  "Milk",
  "Yogurt",
];

// update index markers
const updateIndexMarkers = () => {
  // get all list items
  let listItems = document.querySelectorAll(".listItem");
  listItems.forEach((item, index) => {
    // get this items child div
    let indexMarker = item.querySelector("div");
    // set div to display the current index
    indexMarker.innerText = `[${index}]`;
  });
};

// setup event listener for unshift button
unshiftButton.addEventListener("click", () => {
  // create new HTML list item
  let item = document.createElement("li");
  item.classList.add("listItem");
  // set inner text to random array item
  item.innerHTML = `
  ${extraItems[Math.floor(Math.random() * extraItems.length)]}
  <div></div>
  `;
  // add new list item to start of list
  theArrayUl.prepend(item);
  // Q: Why does the css transition only work with a timeout in place?
  // A: Without delay browser acts like item was created with 'show' class,
  //    so transition does not apply and no animation occurs.
  setTimeout(function () {
    // add width, add opacity, and slide element in from left
    item.classList.add("show");
  }, 1);
  updateIndexMarkers();
});

// setup event listener for shift button
shiftButton.addEventListener("click", () => {
  // get the item to shift
  let shiftItem = theArrayUl.firstElementChild;
  if (shiftItem !== null) {
    // remove show class
    shiftItem.classList.remove("show");
    // set delay equal to css transition
    setTimeout(function () {
      // remove the list item from DOM
      shiftItem.remove();
      updateIndexMarkers();
    }, 400);
  }
});

// setup event listener for push button
pushButton.addEventListener("click", () => {
  // create new HTML list item
  let item = document.createElement("li");
  item.classList.add("listItem", "rightOrigin");
  // set inner text to random array item
  item.innerHTML = `
  ${extraItems[Math.floor(Math.random() * extraItems.length)]}
  <div></div>
  `;
  // add new list item to end of list
  theArrayUl.append(item);
  // set delay so css transition will apply
  setTimeout(function () {
    // add width, add opacity, and slide element in from right
    item.classList.add("show");
    // remove rightOrigin class so if element is shifted off array it slides out to left
    item.classList.remove("rightOrigin");
  }, 1);
  updateIndexMarkers();
});

// setup event listener for pop button
popButton.addEventListener("click", () => {
  // get item to pop
  let popItem = theArrayUl.lastElementChild;
  if (popItem !== null) {
    // add rightOrigin class so elements slides out to right
    popItem.classList.add("rightOrigin");
    // remove show class
    popItem.classList.remove("show");
    // set delay equal to css transition
    setTimeout(function () {
      // remove the list item from DOM
      popItem.remove();
      updateIndexMarkers();
    }, 400);
  }
});

// setup event listener for reverse button
reverseButton.addEventListener("click", () => {
  // get all li items
  const listItems = document.querySelectorAll(".listItem");
  // clear out existing list items
  theArrayUl.innerHTML = "";
  // prepend list items to ul
  listItems.forEach((item) => {
    theArrayUl.prepend(item);
  });
  updateIndexMarkers();
});

// setup event listener for reverse button
sortButton.addEventListener("click", () => {
  // get all li items and convert to array
  let listItems = Array.from(document.querySelectorAll(".listItem"));
  // sort listItems alphabetically
  listItems.sort(function (a, b) {
    if (a.innerText < b.innerText) {
      return -1;
    }
    if (a.innerText > b.innerText) {
      return 1;
    }
    return 0;
  });
  // clear out existing list items
  theArrayUl.innerHTML = "";
  // append sorted items to list
  listItems.forEach((item) => {
    theArrayUl.append(item);
  });
  updateIndexMarkers();
});
