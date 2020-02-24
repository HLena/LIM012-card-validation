/* eslint-disable no-console */
import validator from './validator.js';

const cardObj = {
      number: '**** **** **** ****',
      name: 'NOMBRE COMPLETO',
      date: 'MM/AA',
      cvv : '***',
      signature :''
}
const KEY_DELETE = 8;
const KEY_SPACE = 32;

//elementos de la tarjeta
let card = document.getElementById("card-obj");
let cardNumber = document.getElementById("card-number");
let cardName = document.getElementById("card-name");
let cardDate = document.getElementById("card-date");
let cardCvv = document.getElementById("card-cvv");
let cardSignature = document.getElementsByClassName("signature-panel");

//Elementos del formulario(Inputs)
let inputName = document.getElementById("input-name");
let inputNumber = document.getElementById("input-number");
let inputDate = document.getElementById("input-date");
let inputCvv = document.getElementById("input-cvv");
let validateBtn = document.getElementById("validate-btn");


//Elementos del mensaje(alert/valido/invalido)
let formBox = document.getElementsByClassName("payment-form-box");            
let alertBox = document.getElementsByClassName("alert");
let alertImg = document.getElementsByClassName("icon-check");
let alertMessage = document.getElementById("rpts");
let otherCardBtn = document.getElementById("btn-other-card");


// Eventos para modificar Tarjeta
inputNumber.addEventListener("keydown",(event) =>
{      
      let long = 0;
      let key = String.fromCharCode(event.which);      
      if((/[0-9]/.test(key)) || event.which === KEY_DELETE)
      {
            inputNumber.addEventListener("input",() =>
            {
                  long = inputNumber.value.length;                  
                  cardNumber.innerHTML = "" + validator.maskify(inputNumber.value);                   
                  if(long === 0)
                        cardNumber.innerHTML = cardObj.number;       
            });
      }
      else
      {
           event.preventDefault(); 
      }
});

inputName.addEventListener("keydown",(event) => {      
      let key = String.fromCharCode(event.which);      
      if((/[a-zA-Z]/.test(key)) || event.which === KEY_DELETE || event.which === KEY_SPACE)
      {
            inputName.addEventListener("input",() =>
            {                  
                  cardName.innerHTML = "" + (inputName.value).toUpperCase();
                  cardSignature[0].innerHTML = "" + inputName.value;                                     
                  if(inputName.value.length === 0)
                        cardName.innerHTML = cardObj.name;       
            });
      }
      else
      {
            event.preventDefault();
      }
});

inputCvv.addEventListener("keydown",(event) => {
      let key = String.fromCharCode(event.which);      
      if((/[0-9]/.test(key)) || event.which === KEY_DELETE)
      {
            inputCvv.addEventListener("input",() =>
            {                  
                  cardCvv.innerHTML = "" + inputCvv.value;                   
                  if(inputCvv.value.length === 0)
                        cardCvv.innerHTML = cardObj.cvv;       
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
            if(len === 1 && !(event.which === KEY_DELETE ))
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
            else if(len === 2 && !(event.which === KEY_DELETE ))
            {     
                  inputDate.value += "/";                      
            }
            else if(event.which === KEY_DELETE || (/[0-9]/.test(digit)))
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

//Evento para validar tarjeta
validateBtn.addEventListener("click",() => 
{
      if(face === false){
            card.style.transform = "rotateY(360deg)";            
            face = true;
      }      
      alertBox[0].style.display = 'block';      
      alertMessage.style.display = 'block';
      if(inputNumber.value.length > 0 && inputName.value.length > 0 && inputDate.value.length > 0 && inputCvv.value.length > 0)
      {            
            const response = validator.isValid(inputNumber.value);            
            formBox[0].style.display = 'none';            
            alertBox[0].style.heigth = '5em';
            alertImg[0].style.display = "inline-block";            
            otherCardBtn.style.display = "inline-block";
            if(response === true)
            {                        
                  alertImg[0].src = "img/correct-check.png";
                  alertMessage.innerHTML = "Tarjeta Válida";  
                  alertMessage.style.color = "#49B607";
                  alertMessage.style.fontSize = "2em";
            }
            else
            {     
                  alertImg[0].src = "img/wrong-check.png";                
                  alertMessage.innerHTML = "Tarjeta Inválida";
                  alertMessage.style.color = "#FF5733";      
                  alertMessage.style.fontSize = "2em";
            }
            
      }else
      {            
            alertMessage.innerHTML = "Complete todos los campos";
            alertMessage.style.color = "#F1CC22";
            otherCardBtn.style.display = "none"; 
      }
});

let cleanInputs = () => {
      inputNumber.value = "";
      inputName.value = "";
      inputDate.value = "";
      inputCvv.value = "";
      alertMessage.innerHTML = "";
      cardNumber.innerHTML = cardObj.number;
      cardName.innerHTML = cardObj.name;
      cardDate.innerHTML = cardObj.date;
      cardCvv.innerHTML = cardObj.cvv;
      cardSignature[0].innerHTML = cardObj.signature;
}


otherCardBtn.addEventListener('click', () => {
      alertBox[0].style.display = 'none';      
      alertImg[0].style.display = "none";
      formBox[0].style.display = 'block';  
      cleanInputs();


});


//Eventos para girar la tarjeta
let face = true;
inputNumber.addEventListener("click",() =>{
      console.log("number + "+face);
      if(face === false){
            card.style.transform = "rotateY(360deg)";            
            face = true;
      }
});

inputName.addEventListener("click",() =>{
      console.log("name + "+face);
      if(face === false){
            card.style.transform = "rotateY(360deg)";            
            face = true;
      }
});

inputDate.addEventListener("click",() =>{
      console.log("date + "+face);
      if(face === false){
            card.style.transform = "rotateY(360deg)";            
            face = true;
      }
});

inputCvv.addEventListener("click",() =>{
      if(face === true){
            card.style.transform = "rotateY(180deg)";            
            face = false;
      }
});

// console.log(validator)
