/* eslint-disable no-console */
import validator from './validator.js';

const cardObj = {
      number: '**** **** **** ****',
      name: 'NOMBRE COMPLETO',
      date: 'MM/AA',
      cvv : '***',
      signature :''
}

let card = document.getElementById("card-obj");

//Elementos Input
let inputName = document.getElementById("input-name");
let inputNumber = document.getElementById("input-number");
let inputDate = document.getElementById("input-date");
let inputCvv = document.getElementById("input-cvv");
let validateBtn = document.getElementById("validate-btn");
let cleanBtn = document.getElementById("clean-btn")


//elementos de la tarjeta
let cardNumber = document.getElementById("card-number");
let cardName = document.getElementById("card-name");
let cardDate = document.getElementById("card-date");
let cardCvv = document.getElementById("card-cvv");
let cardSignature = document.getElementsByClassName("signature-panel");

let formBox = document.getElementsByClassName("payment-form-box");            
let alertBox = document.getElementsByClassName("alert");
let alertImg = document.getElementsByClassName("icon-check");
let alertMessage = document.getElementById("rpts");
let otherCardBtn = document.getElementById("btn-other-card");


// Eventos para modificar Tarjeta
inputNumber.addEventListener("keydown",(event) =>
{      
      let long = 0;
      let ch = String.fromCharCode(event.which);
      console.log("codigo: "+event.which);
      if((/[0-9]/.test(ch)) || event.which === 8)
      {
            inputNumber.addEventListener("input",() =>
            {
                  long = inputNumber.value.length;
                  console.log("evento input");
                  cardNumber.innerHTML = "" + validator.maskify(inputNumber.value); 
                  console.log("valor: "+inputNumber.value);
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
      let ch = String.fromCharCode(event.which);      
      if((/[a-zA-Z]/.test(ch)) || event.which === 8 || event.which === 32)
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
      let ch = String.fromCharCode(event.which);
      console.log("codigo: "+event.which);
      if((/[0-9]/.test(ch)) || event.which === 8)
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



//Evento para valida tarjeta
validateBtn.addEventListener("click",() => 
{
      if(face === false){
            card.style.transform = "rotateY(360deg)";            
            face = true;
      }
      // console.log(alertBox[0].style.display);
      alertBox[0].style.display = 'block';
      // console.log(alertBox[0].style.display);
      alertMessage.style.display = 'block';
      if(inputNumber.value.length > 0 && inputName.value.length > 0 && inputDate.value.length > 0 && inputCvv.value.length > 0)
      {
            // let number = inputNumber.value;       
            const response = validator.isValid(inputNumber.value);            

            formBox[0].style.display = 'none';            
            alertBox[0].style.heigth = '5em';
            alertImg[0].style.display = "inline-block";
            // alertMessage.style.display = "inline-block";
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
}
cleanBtn.addEventListener("click",cleanInputs);

otherCardBtn.addEventListener('click', () => {
      alertBox[0].style.display = 'none';      
      // alertMessage.style.display = 'block';
      formBox[0].style.display = 'block';  
      cleanInputs();


});

// console.log(validator)
