

const sortButton = document.getElementById('dropdownBtnSort');
const dropdownSortOptions = document.getElementById('dropdownSortOptions');
const sortOptions = document.querySelectorAll('.sortOption');

const filterButton = document.getElementById('dropdownBtnFilter');
const dropdownFilterOptions = document.getElementById('dropdownFilterOptions');
const filterOptions = document.querySelectorAll('.filterOption');

dropdownSortOptions.style.display = "none";
dropdownFilterOptions.style.display = "none";

let data = [
  {
    name: "Eloise",
    droitier: true,
    age: 21
  },
  {
    name: "Charlotte",
    droitier: true,
    age: 47
  },
  {
    name: "Josephine",
    droitier: false,
    age: 28
  },
  {
    name: "Remy",
    droitier: false,
    age: 16
  },
  {
    name: "Louis",
    droitier: true,
    age: 34
  }
]

let sortType = '';
let filterType = '';
let displayedArr = [...data]


sortButton.addEventListener('click', () => {
  if(dropdownSortOptions.style.display === 'none'){
    sortButton.style.borderBottom = 'none';
    sortButton.style.borderRadius = '5px 5px 0 0';
    dropdownSortOptions.style.display = 'flex';
    sortButton.childNodes[1].style.transform = 'rotate(180deg)'; 
  } else {
    sortButton.style.borderBottom = '2px solid white';
    sortButton.style.borderRadius = '5px';
    dropdownSortOptions.style.display = 'none';
    sortButton.childNodes[1].style.transform = 'rotate(0deg)';
  }
})

sortOptions.forEach((curEl) => {
  curEl.addEventListener('click', () => {
    sortButton.style.setProperty('--active-sort-col', '#F5B32F');
    sortOptions.forEach((el) => el.classList.remove('selected'))
    curEl.classList.add('selected');
    sortType = curEl.textContent;
    sortArr()
  })
})

filterButton.addEventListener('click', () => {
  if(dropdownFilterOptions.style.display === 'none'){
    filterButton.style.borderBottom = 'none';
    filterButton.style.borderRadius = '5px 5px 0 0';
    dropdownFilterOptions.style.display = 'flex';
    filterButton.childNodes[1].style.transform = 'rotate(180deg)'; 
  } else {
    filterButton.style.borderBottom = '2px solid white';
    filterButton.style.borderRadius = '5px';
    dropdownFilterOptions.style.display = 'none';
    filterButton.childNodes[1].style.transform = 'rotate(0deg)';
  }
})

filterOptions.forEach((curEl) => {
  curEl.addEventListener('click', () => {
    if(curEl.classList.contains('selected')){
      curEl.classList.remove('selected');
      filterType = '';
      displayedArr = [...data];
      filterButton.style.setProperty('--active-filter-col', '#302E2E');
      sortArr()
    } else {
      filterOptions.forEach((el) => el.classList.remove('selected'))
      curEl.classList.add('selected');
      filterButton.style.setProperty('--active-filter-col', '#F5B32F');
      filterType = curEl.textContent;
      filterArr()
    }
  })
})

const clearBtn = document.getElementById('clearBtn');

clearBtn.addEventListener('click', () => {
  sortButton.style.setProperty('--active-sort-col', '#302E2E');
  sortOptions.forEach((el) => el.classList.remove('selected'))
  filterButton.style.setProperty('--active-filter-col', '#302E2E');
  filterOptions.forEach((el) => el.classList.remove('selected'))
  sortType = '';
  displayedArr = [...data]
  renderList(data)
})

const renderList = (arr) => {
  document.getElementById('list').innerHTML = ''
  for(let i = 0; i < arr.length; i++){
    document.getElementById('list').innerHTML += `
    <div>
      <h2>${arr[i].name}</h2>
      <p>${(arr[i].droitier) ? 'droitier' : 'gaucher'}</p>
      <p>${arr[i].age} years old</p>
    </div>
    `
  }
}

renderList(data)

const sortArr = () => {
  if(sortType === "Name A - Z") {
    displayedArr.sort((a, b) => (a.name < b.name) ? -1 : 1);
  } else if(sortType === "Name Z - A") {
    displayedArr.sort((a, b) => (a.name > b.name) ? -1 : 1);
  } else if(sortType === "Age ASC") {
    displayedArr.sort((a, b) => a.age - b.age);
  } else if(sortType === "Age DESC") {
    displayedArr.sort((a, b) => b.age - a.age);
  }
  
  renderList(displayedArr)
}

const filterArr = () => {
  displayedArr = [...data]
  if(filterType === "Droitier") {
    displayedArr = displayedArr.filter(person => person.droitier)
  } else if(filterType === "Gaucher") {
    displayedArr = displayedArr.filter(person => !person.droitier)
  }
  renderList(displayedArr)
}

