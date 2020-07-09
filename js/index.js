'use strict';

const dataBase = [];

const modalAdd = document.querySelector('.modal__add'),
    addAd = document.querySelector('.add__ad'),
    modalBtnSubmit = document.querySelector('.modal__btn-submit'),
    modalSubmit = document.querySelector('.modal__submit'),
    modalItem = document.querySelector('.modal__item'),
    catalog = document.querySelector('.catalog'),
    modalBtnWarning = document.querySelector('.modal__btn-warning');

const elementsModalSubmit = [...modalSubmit.elements]
    .filter(elem => elem.tagName !== 'BUTTON' && elem.type !== 'submit');

// закрытие модальных окон одной функцией 
const closeModal =  function (event) {
    const target = event.target;

    if(target.closest('.modal__close') || target === this ||
        event.code === 'Escape') {
        modalAdd.classList.add('hide');
        modalItem.classList.add('hide');
        modalSubmit.reset();
        document.removeEventListener('keydown', closeModal);
        if (this === modalAdd){
            modalSubmit.reset();
        }       
    }
};

modalSubmit.addEventListener('input', () => {
    const validForm = elementsModalSubmit.every(elem => elem.value);
    modalBtnSubmit.disabled = !validForm;
    modalBtnWarning.style.display = validForm ? 'none' : '';
});  

// при отправки мейн форма закрывается
modalSubmit.addEventListener('submit', event => {
    event.preventDefault();
    const itemObj = {};
    for (const elem of elementsModalSubmit) {
        itemObj[elem.name] = elem.value;
        modalAdd.classList.add('hide');
    }
    dataBase.push(itemObj);
    modalSubmit.reset();
})

addAd.addEventListener('click', () => {
    modalAdd.classList.remove('hide');
    modalBtnSubmit.disabled = true;
    document.addEventListener('keydown', closeModal);    
});

catalog.addEventListener('click', event => {
    const target = event.target;

    if(target.closest('.card')) {
        modalItem.classList.remove('hide');
        document.addEventListener('keydown', closeModal);
    };  
});


modalAdd.addEventListener('click', closeModal);
modalItem.addEventListener('click', closeModal);









