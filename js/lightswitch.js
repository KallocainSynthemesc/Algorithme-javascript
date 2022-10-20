const body = document.querySelector('body');

function onClick(el) {
  console.log('click');
  if (el.classList.contains('active')) {
    body.style.backgroundColor = '#222';
    el.classList.remove('active');
  } else {
    el.classList.add('active');
    body.style.backgroundColor = '#fff';
  }
}