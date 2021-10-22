const cubeBlanks = document.querySelectorAll('.blank');
const cube = document.querySelector('.cube');




function positions(event) {
  console.log(event.offsetWidth);
}


positions(cube);


// cubeBlanks.forEach(element => {

//   element.addEventListener('mousedown', function () {

//     cube.style.left = posX + 'px';

//   })

// });