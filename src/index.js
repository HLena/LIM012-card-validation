/* eslint-disable no-console */
import validator from './validator.js';

const cardObj = {
      number: '**** **** **** ****',
      name: 'FULL NAME',
      date: 'MM/YY',
      cvv : '***'
}


//Elementos Input
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


let alertWindows = document.getElementById("alert");

// Eventos para modificar Tarjeta
inputNumber.addEventListener("keydown",(event) =>
{      
      let ch = String.fromCharCode(event.which);
      console.log("codigo: "+event.which);
      if((/[0-9]/.test(ch)) || event.which === 8)
      {
            inputNumber.addEventListener("input",() =>
            {
                  console.log("evento input");
                  cardNumber.innerHTML = "" + validator.maskify(inputNumber.value); 
                  console.log("valor: "+inputNumber.value);
                  if(inputNumber.value.length === 0)
                        cardNumber.innerHTML = cardObj.number;       
            });
      }
      else
      {
           event.preventDefault(); 
      }
});

inputName.addEventListener("keydown",(event) => {      
      let ch = String.fromCharCode(event.which);
      if((/[a-zA-Z]/.test(ch)) || event.which === 8)
      {
            inputName.addEventListener("input",() =>
            {
                  console.log("evento input");
                  cardName.innerHTML = "" + validator.maskify(inputName.value); 
                  console.log("valor: "+inputName.value);
                  if(inputName.value.length === 0)
                        cardName.innerHTML = cardObj.name;       
            });
      }
      else
      {
            event.preventDefault();
      }
});

inputDate.addEventListener("keydown",(event) => 
{     //Formato MM/YY
      let len = inputDate.value.length;
      let digit = String.fromCharCode(event.which);      
      if(len === 0 && !(/[0-1]/.test(digit)))
      {      
            event.preventDefault();
      }
      else
      {            
            if(len === 1 && !(event.which === 8 ))
            {
                  if((inputDate.value[0] === "0" && !(/[1-9]/.test(digit))) || (inputDate.value[0] === "1" && !(/[0-2]/.test(digit))))
                  {                        
                        event.preventDefault();
                  }
                  else
                  {
                        cardDate.innerHTML = "" + inputDate.value;                                                                  
                  }

            }
            else if(len === 2 && !(event.which === 8 ))
            {     
                  console.log("valor: " + inputDate.value);
                  inputDate.value += "/";                      
            }
            else if(event.which === 8 || (/[0-9]/.test(digit)))
            {                  
                  inputDate.addEventListener("input",() => 
                  {
                        cardDate.innerHTML = "" + inputDate.value;                                          
                        if(inputDate.value.length === 0)
                              cardDate.innerHTML = cardObj.date;  
                        
                  });                  
            }
            else
            {                  
                  event.preventDefault();      
            }
      }      
});


//Evento para valida tarjeta
validarBtn.addEventListener("click",() => 
{
      let number = inputNumber.value;      
      const response = validator.isValid(number);

      if(number.length > 0)
      {
            if(response === true)
            {
                  // alertWindows.style.border = "#49B607";
                  rptsLabel.innerHTML = "Tarjeta Válida";  
                  rptsLabel.style.color = "#49B607"
            }
            else
            {
                  // alertWindows.style.borderColor = "#FF5733";
                  rptsLabel.innerHTML = "Tarjeta Inválida";
                  rptsLabel.style.color = "#FF5733";           
            }
      }
      else
      { 
            rptsLabel.innerHTML = "Ingrese Número de Tarjeta";
            rptsLabel.style.color = "#F1CC22"; 
      }                  
});

// console.log(validator)
