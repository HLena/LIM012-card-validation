/* eslint-disable no-console */
const validator = {
      // isValid: metodo para validar tarjeta
      isValid : (cardNumber) => {
            let sum = 0;
            let currentDigit = 0;

            for(let i = cardNumber.length - 1; i >= 0 ; i--){
                  currentDigit = parseInt(cardNumber[i],10);
                  if(i % 2 === 1){                        
                        currentDigit = currentDigit * 2;                        
                        if(currentDigit > 9){
                              currentDigit = 1 + (currentDigit % 10);                              
                        }
                  }
                  sum += currentDigit;            
            }            
            if(sum % 10 === 0){
                  return true;
            }
            else{
                  return false;
            }
      },      
      maskify : (cardNumber) => {
           const lastDigit = 4;
           if(cardNumber.length > lastDigit){
                  let vec = cardNumber.split("");                  
                  for(let i = (cardNumber.length - lastDigit)-1; i >= 0; i--){
                        vec[i] = "#";
                 }            
                 return vec.join('');
           }      
           return cardNumber;           
      }
};

export default validator;
