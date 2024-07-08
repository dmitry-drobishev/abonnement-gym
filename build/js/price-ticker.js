function priceTicker(element, price = 0, to = 0) {

  let changeTo  = to;
  let currentPrice = price;
  let direction = 1;

  if(changeTo < currentPrice) {
    direction = -1;
  }

  let timeoutId = null;

  return function () {

    timeoutId = setInterval(() => {

      currentPrice = currentPrice + (direction * 1);
      element.textContent = currentPrice;

      if(currentPrice === changeTo) {
        clearInterval(timeoutId);
        return;
      }



    }, 10);
  }
}

export {priceTicker};
