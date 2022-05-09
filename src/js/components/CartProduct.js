import {select} from '../settings.js'; //
import AmountWidget from './AmountWidget.js'; //

class CartProduct {
  constructor(element, menuProduct) { //9.5 ->cwiczenie 2
    this.getElements(element);
    const thisCartProduct = this;
    thisCartProduct.id = menuProduct.id;
    thisCartProduct.name = menuProduct.name;
    thisCartProduct.amount = menuProduct.amount;
    thisCartProduct.priceSingle = menuProduct.priceSingle;
    thisCartProduct.price = menuProduct.price;
    thisCartProduct.params = menuProduct.params;
    console.log(menuProduct);

    thisCartProduct.initAmountWidget();
    thisCartProduct.initActions();
  }

  getElements(element) {
    const thisCartProduct = this;
    thisCartProduct.dom = {

      amountWidget: element.querySelector(select.cartProduct.amountWidget),
      price: element.querySelector(select.cartProduct.price),
      edit: element.querySelector(select.cartProduct.edit),
      remove: element.querySelector(select.cartProduct.remove),
    };

    thisCartProduct.dom.wrapper = element;
  }

  initAmountWidget() {
    const thisCartProduct = this;

    thisCartProduct.amountWidget = new AmountWidget(thisCartProduct.dom.amountWidget, thisCartProduct.amount);

    thisCartProduct.dom.amountWidget.addEventListener('updated', function () {
      console.log(thisCartProduct.dom.price);
      const newPrice = thisCartProduct.amountWidget.value * thisCartProduct.priceSingle;

      thisCartProduct.amount = thisCartProduct.amountWidget.value;
      thisCartProduct.price = newPrice;
      thisCartProduct.dom.price.innerHTML = newPrice;
    });
  }

  remove() {
    const thisCartProduct = this;
    const event = new CustomEvent('remove', {
      bubbles: true,
      detail: {
        cartProduct: thisCartProduct,
      },
    });
    //console.log(thisCartProduct.remove);

    thisCartProduct.dom.wrapper.dispatchEvent(event);
  }

  initActions() {
    const thisCartProduct = this;
    thisCartProduct.dom.edit.addEventListener('click', function (event) {
      event.preventDefault();
    });

    thisCartProduct.dom.remove.addEventListener('click', function (event) {
      event.preventDefault();
      thisCartProduct.remove();
    });

  }

  getData() {
    const thisCartProduct = this;
    const settings = {
      id: thisCartProduct.id,
      name: thisCartProduct.name,
      amount: thisCartProduct.amount,
      priceSingle: thisCartProduct.priceSingle,
      price: thisCartProduct.price,
      params: thisCartProduct.params,
    };
    console.log(settings.params);
    console.log(settings);
    return settings;

  }
}

export default CartProduct; //