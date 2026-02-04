const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const items = document.querySelectorAll('.item');



const total = items.length;
let timer;

function update(direction){
    direction = Number(direction);

    const currentItem = document.querySelector('.item.active');
    const currentDot = document.querySelector('.dot.active');
    if (currentItem) currentItem.classList.remove('active');
    if (currentDot) currentDot.classList.remove('active');

    if(direction > 0){
        active = active + 1;

        if(active === total){
            active = 0;
        }
    } else if(direction < 0){
        active = active - 1;

        if(active < 0){
            active = total - 1;
        }
    }

    items[active].classList.add('active');
    dots[active].classList.add('active');

    numberIndicator.textContent = String(active + 1).padStart(2, '0');
}

timer = setInterval(() => {
        update(1);
    }, 6000);



let list = document.querySelectorAll('.item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');

// Inicializa o contador e o índice ativo
let count = list.length;
let active = 0;



next.onclick = () => {

    let activeOld =  document.querySelector('.active');
    activeOld.classList.remove('active');
    active = active >= count -1 ? 0 : active + 1;
    list[active].classList.add('active');


}

prev.onclick = () => {
    console.log('prev');
    let activeOld =  document.querySelector('.active');
    activeOld.classList.remove('active');
    active = active <= 0 ? count -1 : active - 1;
    list[active].classList.add('active');
    
    
}


