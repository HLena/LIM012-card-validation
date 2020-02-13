/* eslint-disable no-console */
const validator = {
      // isValid: metodo para validar tarjeta
      isValid : function(cardNumber){
            let sum = 0;
            let currentDigit = 0;

            for(let i = cardNumber.length - 1; i >=0 ; i--){
                  currentDigit = parseInt(cardNumber[i],10);
                  if(i % 2 == 1){
                        //console.log("["+i+"]=> "+ currentDigit);
                        currentDigit = currentDigit * 2;
                        //console.log("= = > "+ currentDigit);
                        if(currentDigit > 9){
                              currentDigit = 1 + (currentDigit % 10);
                              //console.log("= = => "+ currentDigit);
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
      maskify : function(cardNumber){
           const lastDigit = 4;
           if(cardNumber.length > lastDigit){
                  let vec = cardNumber.split("");
                  // console.log(vec);
                  for(let i = (cardNumber.length - lastDigit)-1; i >= 0; i--){
                        vec[i] = "#";
                 }
            //      console.log(vec.join(''));
                 return vec.join('');
           }
      //      console.log(cardNumber);
           return cardNumber;           
      }
};

export default validator;
