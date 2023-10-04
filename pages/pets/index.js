//Бургер-меню

//Бургер-меню

const burgerBtn = document.querySelector('.burger');
const menu = document.querySelector('.navigation');
const html = document.querySelector('html');
const menuWrapper = document.querySelector('.menu-wrapper');

function toggleBurgerMenu() {
    menu.classList.toggle('active');
    burgerBtn.classList.toggle('active');
    menu.classList.toggle('shadow');
    html.classList.toggle('scroll');
}

burgerBtn.addEventListener('click', toggleBurgerMenu)

//Клик вне меню и его закрытие


document.addEventListener('click', (e) => {
    if(menu.classList.contains('active')) {
        const modalBorders = e.composedPath().includes(menuWrapper);
        if(! (modalBorders)) {
            menu.classList.remove('active');
            burgerBtn.classList.remove('active');
            menu.classList.remove('shadow');
            html.classList.remove('scroll');
        }
    } 
    
})


//Клик по ссылке и закрытие меню

const links = document.querySelectorAll('.link');

for(let link of links) {
    link.onclick = function() {
        menu.classList.remove('active');
        burgerBtn.classList.remove('active');
        menu.classList.remove('shadow');
        html.classList.remove('scroll');
    }
}


// Пагинация

const cardImage = document.querySelectorAll('.slide-img');
const cardTitle = document.querySelectorAll('.slider-title');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const firstPageBtn = document.querySelector('.first');
const lastPageBtn = document.querySelector('.last');
const num = document.querySelector('.center-btn');
let cardsOnPage;
let pageNum = Number(num.textContent);
let pageCounts;


import pets from '../../petslist.js';

//Функция создания списка из 48 объектов

const listOfPets = () => {
    let list = []
    let item;
    for(let i=1; i<=6; i++) {
            item = pets;
            list.push(item); 
    };
    list = list.flat()
    let el;
    let newArr = []
    for(let i=0; i < list.length; i=i+4) {
        el = list.slice(i, i + 4).sort(makeRandomArr);
        newArr.push(el)
    }
    return newArr.flat();
    
}
document.addEventListener('load', listOfPets);

const petsList = listOfPets();

function  devideOnPath() {
    if(window.innerWidth >= 850) {
        cardsOnPage = 8;
        pageCounts = 6;
        if(pageNum >= 6) {
            pageNum = 6;
            num.textContent = pageNum;
            nextBtn.classList.remove('right-btn');
            nextBtn.classList.add('left-btn');
            nextBtn.disabled = true;
            lastPageBtn.classList.remove('right-btn');
            lastPageBtn.classList.add('left-btn');
            lastPageBtn.disabled = true;
        } else if(pageNum < 6) {
            nextBtn.classList.remove('left-btn');
            nextBtn.classList.add('right-btn');
            nextBtn.disabled = false;
            lastPageBtn.classList.remove('left-btn');
            lastPageBtn.classList.add('right-btn');
            lastPageBtn.disabled = false;
        }
            
    } else if(window.innerWidth < 850 && window.innerWidth >= 767.5) {
        cardsOnPage = 6;
        pageCounts = 8;
        if(pageNum >= 8) {
            pageNum = 8;
            num.textContent = pageNum;
            nextBtn.classList.remove('right-btn');
            nextBtn.classList.add('left-btn');
            nextBtn.disabled = true;
            lastPageBtn.classList.remove('right-btn');
            lastPageBtn.classList.add('left-btn');
            lastPageBtn.disabled = true;
        } else if(pageNum < 8) {
            nextBtn.classList.remove('left-btn');
            nextBtn.classList.add('right-btn');
            nextBtn.disabled = false;
            lastPageBtn.classList.remove('left-btn');
            lastPageBtn.classList.add('right-btn');
            lastPageBtn.disabled = false;
        }
        
    } else if(window.innerWidth < 767.5 && window.innerWidth >500) {
        cardsOnPage = 4;
        pageCounts = 12;
        if(pageNum >= 12) {
            pageNum = 12;
            num.textContent = pageNum;
            nextBtn.classList.remove('right-btn');
            nextBtn.classList.add('left-btn');
            nextBtn.disabled = true;
            lastPageBtn.classList.remove('right-btn');
            lastPageBtn.classList.add('left-btn');
            lastPageBtn.disabled = true;
        } else if(pageNum < 12) {
            nextBtn.classList.remove('left-btn');
            nextBtn.classList.add('right-btn');
            nextBtn.disabled = false;
            lastPageBtn.classList.remove('left-btn');
            lastPageBtn.classList.add('right-btn');
            lastPageBtn.disabled = false;
        }
        
    } else if(window.innerWidth <= 500 && window.innerWidth >=320) {
        cardsOnPage = 3;
        pageCounts = 16;
    }
    let el;
    let newArr = []
    for(let i=0; i < petsList.length; i=i+cardsOnPage) {
        el = petsList.slice(i, i + cardsOnPage);
        newArr.push(el)
    }
    return newArr;
}

window.addEventListener('resize', devideOnPath);


function addCardFromList() {
    let petsList = devideOnPath();
    let count = pageNum - 1;
    for(let i=0; i<cardsOnPage; i++) {
        cardImage[i].src = petsList[count][i].img;
        cardTitle[i].textContent = petsList[count][i].name;
}
}
window.addEventListener('resize', addCardFromList)
addCardFromList()


function makeRandomArr() {
    return Math.random() - 0.5;
  }


function clickNext() {
    pageNum = Number(num.textContent);
    let petsList = devideOnPath()
    let count = pageNum;

for(let i=0; i<cardsOnPage; i++) {
    cardImage[i].src = petsList[count][i].img;
    cardTitle[i].textContent = petsList[count][i].name;
}
pageNum = pageNum+1;
num.textContent = pageNum;
prevBtn.classList.add('right-btn');
prevBtn.disabled = false;
firstPageBtn.classList.add('right-btn');
firstPageBtn.disabled = false;
if(pageNum === pageCounts) {
    nextBtn.classList.remove('right-btn');
    nextBtn.classList.add('left-btn');
    nextBtn.disabled = true;
    lastPageBtn.classList.remove('right-btn');
    lastPageBtn.classList.add('left-btn');
    lastPageBtn.disabled = true;
}
}

nextBtn.addEventListener('click', clickNext)

function clickPrev() {
let petsList = devideOnPath()
pageNum = Number(num.textContent);
pageNum = pageNum-1;
num.textContent = pageNum;
let count = pageNum-1;
    for(let i=0; i<cardsOnPage; i++) {
        cardImage[i].src = petsList[count][i].img;
        cardTitle[i].textContent = petsList[count][i].name;
    }

nextBtn.classList.add('right-btn');
nextBtn.disabled = false;
lastPageBtn.classList.add('right-btn');
lastPageBtn.disabled = false;

if(pageNum === 1) {
    prevBtn.classList.remove('right-btn');
    prevBtn.classList.add('left-btn');
    prevBtn.disabled = true;
    firstPageBtn.classList.remove('right-btn');
    firstPageBtn.classList.add('left-btn');
    firstPageBtn.disabled = true;
}
}

prevBtn.addEventListener('click', clickPrev);

//Переход на первую страницу 

function goToFirstPage() {
    let petsList = devideOnPath()
    for(let i=0; i<cardsOnPage; i++) {
        cardImage[i].src = petsList[0][i].img;
        cardTitle[i].textContent = petsList[0][i].name;
    }
    prevBtn.classList.remove('right-btn');
    prevBtn.classList.add('left-btn');
    prevBtn.disabled = true;
    firstPageBtn.classList.remove('right-btn');
    firstPageBtn.classList.add('left-btn');
    firstPageBtn.disabled = true;
    num.textContent  = 1;
    nextBtn.classList.remove('left-btn');
    nextBtn.classList.add('right-btn');
    nextBtn.disabled = false;
    lastPageBtn.classList.remove('left-btn');
    lastPageBtn.classList.add('right-btn');
    lastPageBtn.disabled = false;
}
firstPageBtn.addEventListener('click', goToFirstPage)

//Переход на последнюю страницу

function goToLastPage() {
    let petsList = devideOnPath()
    let count = pageCounts-1;
    for(let i=0; i<cardsOnPage; i++) {
        cardImage[i].src = petsList[count][i].img;
        cardTitle[i].textContent = petsList[count][i].name;
    }
    nextBtn.classList.remove('right-btn');
    nextBtn.classList.add('left-btn');
    nextBtn.disabled = true;
    lastPageBtn.classList.remove('right-btn');
    lastPageBtn.classList.add('left-btn');
    lastPageBtn.disabled = true;
    num.textContent  = pageCounts;
    prevBtn.classList.remove('left-btn');
    prevBtn.classList.add('right-btn');
    prevBtn.disabled = false;
    firstPageBtn.classList.remove('left-btn');
    firstPageBtn.classList.add('right-btn');
    firstPageBtn.disabled = false;
}
lastPageBtn.addEventListener('click', goToLastPage)

//Попап

const card = document.querySelectorAll('.card');
const popup = document.querySelector('.popap');
const popupWindow = document.querySelector('.popap-window');
const popupImage = document.querySelector('.popap-image');
const popupContent = document.querySelector('.popap-content')
const title = document.querySelector('.popap-title')
const typePet = document.querySelector('.type');
const breed = document.querySelector('.breed')
const info = document.querySelector('.popap-info')
const age = document.querySelector('.age')
const inoculations = document.querySelector('.inoculations');
const diseases = document.querySelector('.diseases')
const parasites = document.querySelector('.parasites')
const closeBtn = document.querySelector('.close');
const overlay = document.querySelector('.overlay');
const body = document.querySelector('body');

function openPopup() {
for(let i=0; i<card.length; i++) {
    card[i].addEventListener('click', () => {
        const pet = devideOnPath();
        pageNum = Number(num.textContent);
        let count = pageNum-1;
    
        popup.classList.add('open');
        popup.classList.remove('fadeOut');
        popup.classList.add('fadeIn');
        popupImage.classList.add('open');
        popupWindow.classList.add('open');
        overlay.classList.add('open');
        html.classList.add('scroll');
        body.classList.add('scroll');
        const imgPet = new Image;
        imgPet.src = pet[count][i].img;
        popupImage.style.backgroundImage = `url(${imgPet.src})`;
        popupContent.style.display = 'block';
        title.textContent = pet[count][i].name;
        typePet.textContent = pet[count][i].type;
        breed.textContent = pet[count][i].breed;
        info.textContent = pet[count][i].description;
        age.textContent = pet[count][i].age;
        inoculations.textContent = pet[count][i].inoculations;
        diseases.textContent = pet[count][i].diseases;
        parasites.textContent = pet[count][i].parasites;
    })
}
}
openPopup()

function closePopup() {
    popup.classList.remove('open');
    popup.classList.remove('fadeIn');
    popup.classList.add('fadeOut');
    popupImage.classList.remove('open');
    popupWindow.classList.remove('open')
    overlay.classList.remove('open');
    html.classList.remove('scroll');
}

closeBtn.addEventListener('click', closePopup);

overlay.addEventListener('click', closePopupOutModalBoders) 

function closePopupOutModalBoders(e) {
    if(popup.classList.contains('open')) {
        const modalBorders = e.composedPath().includes(popup);
   
        if(! modalBorders) {
           popup.classList.remove('open');
           popup.classList.remove('fadeIn');
           popup.classList.add('fadeOut');
           popupImage.classList.remove('open');
           popupWindow.classList.remove('open')
           overlay.classList.remove('open');
           body.classList.remove('scroll');
           html.classList.remove('scroll');
        }
   } else {
    openPopup()
   }
}
