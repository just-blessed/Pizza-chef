// document.getElementsByTagName('h1')[0].innerHTML = "Самая крутая пицца ждет <span style='color: #ffaf18'>только в нашем ресторане</span>";
// // Изменение текста и цвета в спане
// document.getElementById('products-title').style.color = '#000000';
// //Изменение цвета в названии продуктов
//
//
// let buttonElements =  document.querySelectorAll('.btn');
// buttonElements.forEach((item) => {
//     if (item.innerText === 'Оформить заказ' ) {
//         return;
//     }
//     item.style.backgroundColor = 'transparent';
//     item.style.border = "1px solid rgb(255, 175, 24)";
//     item.style.color = 'rgb(255, 175, 24)';
// })
// // Здесь мы используем forEach оба метода работают NodeList - forEach
//
//
// let buttonsElements =  document.getElementsByClassName('btn');
// for (let i = 0; i < buttonElements.length; i++) {
//     if (buttonElements[i].innerText === 'Оформить заказ' ) {
//         continue;
//     }
//     buttonsElements[i].style.backgroundColor = 'transparent';
//     buttonsElements[i].style.border = "1px solid rgb(255, 175, 24)";
// //     buttonsElements[i].style.color = 'rgb(255, 175, 24)';
// }
// Здесь мы используем цикл for оба варианта работают HTMLCollection - for
// Находим элемент кнопки, и если это не последний элемент BTN Оформить заказ, то меняем все остальное, фон рамку и цвет

// document.getElementById('product-input').setAttribute('Placeholder', 'Имя');
// // Меняем placeholder в оформлении заказа
// document.querySelector('.footer__rights span').innerText = (new Date()).getFullYear();
// // Выставляем текущий год в футере
// let products = document.getElementsByClassName('product');
// // Находим продукты
// for (let i = 0; i <products.length; i++) {
//     if (i % 2 === 1) {
//         products[i].children[1].innerText += '*';
//     }
// }
//Добавляем звездочку к наименованию продукта, по атрибуту children с индексом, для products-title,


// Lesson 10


// document.getElementById('choose-pizza').onclick = function () {
//     document.getElementsByClassName('products')[0].scrollIntoView({behavior: "smooth"});
// }
// Скролл по кнопке к пункту меню пиццы

// let productInput = document.getElementById('product-input');
// let addToCardButtons = document.getElementsByClassName('btn-add-to-cart');
//
// for (let i = 0; i < addToCardButtons.length; i++) {
//     addToCardButtons[i].onclick = function (e) {
//         productInput.value = e.target.parentElement.previousElementSibling.previousElementSibling.innerText;
//         document.getElementsByClassName('order__form')[0].scrollIntoView({behavior: "smooth"});
//     }
// }

// document.getElementById('create-order').onclick = function () {
//     let addressInput = document.getElementById('address-input');
//     let phoneInput = document.getElementById('phone-input');
//     if (!productInput.value) {
//         alert("Заполните пиццу");
//         return;
//     }
//     if (!addressInput.value) {
//         alert("Заполните адресс");
//         return;
//     }
//     if (!phoneInput.value) {
//         alert("Заполните телефон");
//         return;
//     }
//
//     alert("Спасибо за заказ");
// }
//

// Lesson12 JQuery


new WOW({
    animateClass: 'animate__animated'
}).init();


// $('.open-popup-link').magnificPopup({
//     type:'inline',
//     midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
// });
//
// $('.open-popup-link').magnificPopup({
//     type: 'image'
// });

$('h1').html("Самая крутая пицца ждет <span>только в нашем ресторане</span>");

$('#products-title').css('color', '#000000');

$('.btn:not(#create-order)').css({
    backgroundColor: 'transparent',
    border: "1px solid rgb(255, 175, 24)",
    color: 'rgb(255, 175, 24)'
});
let productInput = $('#product-input');
productInput.attr('placeholder', 'Имя');

$('.footer__rights span').text((new Date()).getFullYear());

let products = $('.product');
for (let i = 0; i < products.length; i++) {
    let productTitle = products.eq(i).find('.product__title')
    productTitle.text(productTitle.text().replace(/(Кури[а-я]+)(.+)/gi, '$2 из индейки')); //(.+)сохраняет все что после Кури а-я      знак $2 перенос второго слова на 1 первое место


    if (i % 2 === 1) {
        let element = products.eq(i).children().eq(1);
        element.text(element.text() + '*')
    }
}


$('#choose-pizza').click(function () {
    $('.products')[0].scrollIntoView({behavior: "smooth"});
})


$('.btn-add-to-cart').click((e) => {
    productInput.val($(e.target).parents('.product').find('.product__title').text());
    $('.order')[0].scrollIntoView({behavior: "smooth"});
})

let phoneInput = $('#phone-input');
phoneInput.inputmask({"mask": "(999) 999-99-99"});

// $('#create-order').click(function () {
//     let addressInput = $('#address-input');
//     if (!productInput.val()) {
//         alert("Заполните пиццу");
//         return;
//     }
//     if (!addressInput.val()) {
//         alert("Заполните адресс");
//         return;
//     }
//     if (!phoneInput.val()) {
//         alert("Заполните телефон");
//         return;
//     }
//
//     alert("Спасибо за заказ");
// });

$('#create-order').click( function () {
    let hasError = false;
    let addressInput = $('#address-input');


    $('.order-input').css('border-color', 'rgb(119, 94, 49)');

    if (!productInput.val().match(/^[А-Я][а-я]+\s*$/)) {
        productInput.css('border-color', 'red');
        hasError = true;
    }
    if (!addressInput.val().match(/^[а-яА-Я0-9,\.\s]+$/)) {
        addressInput.css('border-color', 'red');
        hasError = true;
    }
    if (!phoneInput.val().match(/^\+7\s\(9\d{2}\)\s\d{3}-\d{2}-\d{2}/)) {
        phoneInput.css('border-color', 'red');
        hasError = true;
    }

    if (!hasError) {
        $.ajax({
            method: "POST",
            url:"http://testologia.ru/checkout",
            data: {
                product: productInput.val(),
                name: addressInput.val(),
                phone: phoneInput.val(),
            }
        })
            .done(function (msg) {
                if (msg.success) {
                    alert ('Спасибо за заказ');
                } else  {
                    alert('Что-то не так ! ')
                }
            })
    }
})



