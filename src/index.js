/* eslint-disable no-console */
import validator from './validator.js';

const cardObj = {
      number: '**** **** **** ****',
      name: 'FULL NAME',
      date: 'MM/YY',
      cvv : '***'
}

let inputName = document.getElementById("input-name");
let inputNumber = document.getElementById("input-number");
let inputDate = document.getElementById("input-date");
// let inputCvv = document.getElementById("input-cvv");

let validarBtn = document.getElementById("validarBtn");
let rptsLabel = document.getElementById("rpts");

//elementos de la tarjeta
let cardNumber = document.getElementById("card-number");
let cardName = document.getElementById("card-name");
let cardDate = document.getElementById("card-date");
// let cardCvv = document.getElementById("card-cvv");



const card = Object.create(validator);
const cardObject = Object.create(cardObj);

inputNumber.addEventListener("input",function(){
      cardNumber.innerHTML = "" + card.maskify(inputNumber.value);
      if(inputNumber.value.length === 0)
            cardNumber.innerHTML = cardObject.number;
});

inputName.addEventListener("input",function(){
      cardName.innerHTML = "" + card.maskify(inputName.value);
      if(inputName.value.length === 0)
            cardName.innerHTML = cardObject.name;
});

inputDate.addEventListener("input",function(){
      cardDate.innerHTML = "" + inputDate.value;
      if(inputDate.value.length === 0)
            cardDate.innerHTML = cardObject.date;
});

validarBtn.addEventListener("click",function(){
      const number = cardNumber.value;
      const response = card.isValid(number);
      
      if(number.length > 0){
            if(response === true)
                  rptsLabel.innerHTML = "Es Valida";                  
            else
                  rptsLabel.innerHTML = "No es Valida";
      }else{ 
            rptsLabel.innerHTML = "Ingrese Numero"   ;
      }
                  
});

// console.log(validator)
