console.log('1.Вёрстка страницы Main соответствует макету при ширине экрана 1280px: +14\n2.Вёрстка страницы Main соответствует макету при ширине экрана 768px: +14\n3.Требования к css +6\n4.Интерактивность элементов +12\n3.Вёрстка страницы Main соответствует макету при ширине экрана 320px: +14\n4.Вёрстка страницы Pets соответствует макету при ширине экрана 1280px: +6\n5.Вёрстка страницы Pets соответствует макету при ширине экрана 768px: +6\n6.Вёрстка страницы Pets соответствует макету при ширине экрана 320px: +6\n7.Нет полос прокрутки +20\n8.Верстка резиновая +8\n9.При ширине экрана меньше 768px на обеих страницах меню в хедере скрывается, появляется иконка бургер-меню: +4\n10.Верстка обеих страниц валидная +8\n100 из 100')

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

//Карусель

const slideImg = document.querySelectorAll('.slide-img');
const sliderTitle = document.querySelectorAll('.slider-title');
const nextBtn = document.querySelector('.right');
const prevBtn = document.querySelector('.left');
const carousel = document.querySelector('.carousel');
const itemsLeft = document.querySelector('.card-list-left')
const itemsRight = document.querySelector('.card-list-right');
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
const itemsCenter = document.querySelector('.card-list');

import pets from '../../petslist.js';

const moveRight = () => {
    carousel.classList.add("transition-right");
    prevBtn.removeEventListener("click", moveLeft);
    nextBtn.removeEventListener("click", moveRight);
}

const moveLeft = () => {
    carousel.classList.add("transition-left");
    prevBtn.removeEventListener("click", moveLeft);
    nextBtn.removeEventListener("click", moveRight);
  };

nextBtn.addEventListener('click', moveRight);
prevBtn.addEventListener('click', moveLeft);

let arr1 = [];
let arr2 = [];
let commonArr = [];
let arr = [];
//Нажатие на кнопки next и prev

carousel.addEventListener('animationend', async (animationEvent) => {
    let changeItem;
    const pets = '../../pets.json';
    const res = await fetch(pets);
    const pet = await res.json();

    if(animationEvent.animationName === 'move-left') {
        carousel.classList.remove('transition-left');
        changeItem = itemsLeft;
        carousel.classList.remove('transition-right');
        itemsRight.innerHTML = document.querySelector('.card-list').innerHTML
        document.querySelector('.card-list').innerHTML = itemsLeft.innerHTML;
        openPopupLeft()
        arr = [commonArr[0], commonArr[1], commonArr[2]];
        
    } else {
        carousel.classList.remove('transition-right');
        changeItem = itemsRight;
        carousel.classList.remove('transition-left');
        itemsLeft.innerHTML = document.querySelector('.card-list').innerHTML;
        document.querySelector('.card-list').innerHTML = itemsRight.innerHTML;
        openPopupRight();
        arr = [commonArr[3], commonArr[4], commonArr[5]];
    }
    let arr3 = [];
    

    changeItem.innerHTML = '';

    for (let i = 0; i < 3; i++) {
        const cardNew = document.createElement('div');
        const imgCard = document.createElement('img');
        const titleCard = document.createElement('h3');
        const btn = document.createElement('button');
        cardNew.classList.add("card");
        imgCard.classList.add('slide-img');
        titleCard.classList.add('slider-title');
        btn.classList.add('card-button');
        btn.textContent = 'Learn more';
        let random;
            do {
                random = getRandomNum(0, 8);
            } while (arr.indexOf(random)>=0);
            imgCard.src = pet[random].img;
            titleCard.textContent = pet[random].name;
            cardNew.appendChild(imgCard)
            cardNew.appendChild(titleCard)
            cardNew.appendChild(btn)
            changeItem.appendChild(cardNew);
            arr.push(random);
            arr3.push(random);
    }
    if(animationEvent.animationName === 'move-left') {
        commonArr.unshift(...arr3); 
    } else {
        commonArr.push(...arr3);
    }
    nextBtn.addEventListener("click", moveRight);
    prevBtn.addEventListener("click", moveLeft);
})

async function addCards() {
    const pets = '../../pets.json';
    const res = await fetch(pets);
    const pet = await res.json();
    
    for(let i=0; i<=5; i++) {
        let random = getRandomNum(0, 8);
            do {
                random = getRandomNum(0, 8);
            } while (arr1.indexOf(random)>=0);
            slideImg[i].src = pet[random].img;
            sliderTitle[i].textContent = pet[random].name;
            arr1.push(random);
            let num = arr1[i];
            card[i].addEventListener('click', () => {
                popup.classList.add('open');
                popup.classList.remove('fadeOut');
                popup.classList.add('fadeIn');
                popupImage.classList.add('open');
                popupWindow.classList.add('open');
                overlay.classList.add('open');
                html.classList.add('scroll');
                body.classList.add('scroll');
                const imgPet = new Image;
                imgPet.src = pet[num].img;
                popupImage.style.backgroundImage = `url(${imgPet.src})`;
                popupContent.style.display = 'block';
                title.textContent = pet[num].name;
                console.log(pet[num].name)
                typePet.textContent = pet[num].type;
                breed.textContent = pet[num].breed;
                info.textContent = pet[num].description;
                age.textContent = pet[num].age;
                inoculations.textContent = pet[num].inoculations;
                diseases.textContent = pet[num].diseases;
                parasites.textContent = pet[num].parasites;
            })
        }
        commonArr.push(...arr1);
        for(let i=6; i<=8; i++) {
            let arrRandom = [arr1[3], arr1[4], arr1[5]];
            let random = getRandomNum(0, 8);
                do {
                    random = getRandomNum(0, 8);
                } while (arrRandom.indexOf(random)>=0);
                slideImg[i].src = pet[random].img;
                sliderTitle[i].textContent = pet[random].name;
                arrRandom.push(random);
                arr2.push(random);
                let num = arr2[i-6];
                card[i].addEventListener('click', () => {
                    popup.classList.add('open');
                    popup.classList.remove('fadeOut');
                    popup.classList.add('fadeIn');
                    popupImage.classList.add('open');
                    popupWindow.classList.add('open');
                    overlay.classList.add('open');
                    html.classList.add('scroll');
                    body.classList.add('scroll');
                    const imgPet = new Image;
                    imgPet.src = pet[num].img;
                    popupImage.style.backgroundImage = `url(${imgPet.src})`;
                    popupContent.style.display = 'block';
                    title.textContent = pet[num].name;
                    console.log(pet[num].name)
                    typePet.textContent = pet[num].type;
                    breed.textContent = pet[num].breed;
                    info.textContent = pet[num].description;
                    age.textContent = pet[num].age;
                    inoculations.textContent = pet[num].inoculations;
                    diseases.textContent = pet[num].diseases;
                    parasites.textContent = pet[num].parasites;
                })}
            commonArr.push(...arr2);
            };

document.addEventListener('DOMContentLoaded', addCards);

function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


//Попап

function openPopupLeft() {
    const centerCards = itemsCenter.querySelectorAll('.card');
for(let i=0; i<3; i++) {
    let num = commonArr[i];
    centerCards[i].addEventListener('click', () => {  
        popup.classList.add('open');
        popup.classList.remove('fadeOut');
        popup.classList.add('fadeIn');
        popupImage.classList.add('open');
        popupWindow.classList.add('open');
        overlay.classList.add('open');
        html.classList.add('scroll');
        body.classList.add('scroll');
        const imgPet = new Image();
        imgPet.src = pets[num].img;
        popupImage.style.backgroundImage = `url(${imgPet.src})`;
        popupContent.style.display = 'block';
        title.textContent = pets[num].name;
        console.log(pets[num].name)
        typePet.textContent = pets[num].type;
        breed.textContent = pets[num].breed;
        info.textContent = pets[num].description;
        age.textContent = pets[num].age;
        inoculations.textContent = pets[num].inoculations;
        diseases.textContent = pets[num].diseases;
        parasites.textContent = pets[num].parasites;
    })
}
commonArr.splice(commonArr.length-3, commonArr.length-1);
}

function openPopupRight() {
    const centerCards = itemsCenter.querySelectorAll('.card');
for(let i=0; i<3; i++) {
    let num = commonArr[commonArr.length-3 + i];
    centerCards[i].addEventListener('click', () => {  
        popup.classList.add('open');
        popup.classList.remove('fadeOut');
        popup.classList.add('fadeIn');
        popupImage.classList.add('open');
        popupWindow.classList.add('open');
        overlay.classList.add('open');
        html.classList.add('scroll');
        body.classList.add('scroll');
        const imgPet = new Image();
        imgPet.src = pets[num].img;
        popupImage.style.backgroundImage = `url(${imgPet.src})`;
        popupContent.style.display = 'block';
        title.textContent = pets[num].name;
        console.log(pets[num].name)
        typePet.textContent = pets[num].type;
        breed.textContent = pets[num].breed;
        info.textContent = pets[num].description;
        age.textContent = pets[num].age;
        inoculations.textContent = pets[num].inoculations;
        diseases.textContent = pets[num].diseases;
        parasites.textContent = pets[num].parasites;
    })
}
commonArr.splice(0, 3);
}


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
    openPopup();
   }
}

