import {settings, select, classNames, templates} from '../settings.js'; //classNames dodałem
import CartProduct from './CartProduct.js'; //
import {utils} from '../utils.js'; //

class Cart {
  constructor(element) {
    const thisCart = this;
    thisCart.products = [];
    thisCart.getElements(element);
    thisCart.initActions(element);
  }

  getElements(element) {
    const thisCart = this;
    thisCart.dom = {};
    thisCart.dom.wrapper = element;
    thisCart.dom.toggleTrigger = thisCart.dom.wrapper.querySelector(select.cart.toggleTrigger);
    thisCart.dom.productList = thisCart.dom.wrapper.querySelector(select.cart.productList);
    thisCart.dom.deliveryFee = thisCart.dom.wrapper.querySelector(select.cart.deliveryFee);
    thisCart.dom.subtotalPrice = thisCart.dom.wrapper.querySelector(select.cart.subtotalPrice);
    thisCart.dom.totalPrice = thisCart.dom.wrapper.querySelectorAll(select.cart.totalPrice);
    thisCart.dom.totalNumber = thisCart.dom.wrapper.querySelector(select.cart.totalNumber);
    thisCart.dom.form = thisCart.dom.wrapper.querySelector(select.cart.form); //
    thisCart.dom.address = thisCart.dom.wrapper.querySelector(select.cart.address); //
    thisCart.dom.phone = thisCart.dom.wrapper.querySelector(select.cart.phone); //
  }

  initActions() {
    const thisCart = this;
    thisCart.dom.toggleTrigger.addEventListener('click', function () {
      thisCart.dom.wrapper.classList.toggle(classNames.cart.wrapperActive);
    });

    thisCart.dom.productList.addEventListener('updated', function () {
      thisCart.update();

      console.log('update', thisCart.update);
    });

    thisCart.dom.productList.addEventListener('remove', function (event) {
      thisCart.remove(event.detail.cartProduct);

    });

    thisCart.dom.form.addEventListener('submit', function (event) {
      event.preventDefault();                             //
      thisCart.sendOrder();

    });

  }

  add(menuProduct) {
    const thisCart = this;
    const generatedHTML = templates.cartProduct(menuProduct);
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);
    thisCart.element = document.querySelector(select.cart.productList);
    thisCart.element.appendChild(generatedDOM);
    thisCart.products.push(new CartProduct(generatedDOM, menuProduct));
    thisCart.update();
  }

  update() {
    const thisCart = this;
    let deliveryfee = 20;
    let totalNumber = 0;
    let subtotalPrice = 0;

    for (let product of thisCart.products) {
      totalNumber = product.amount + totalNumber;
      subtotalPrice = product.price + subtotalPrice;
      console.log(subtotalPrice);
      console.log(thisCart.products);
    }

    if (subtotalPrice == 0) {
      thisCart.totalPrice = 0;
      deliveryfee = 0;
    }

    thisCart.dom.totalNumber.innerHTML = totalNumber;
    thisCart.dom.deliveryFee.innerHTML = deliveryfee;
    thisCart.dom.subtotalPrice.innerHTML = subtotalPrice;
    thisCart.totalPrice = subtotalPrice + deliveryfee;
    thisCart.dom.totalPrice.innerHTML = thisCart.totalPrice;
    thisCart.totalNumber = totalNumber; //
    thisCart.subtotalPrice = thisCart.dom.totalPrice.innerHTML - deliveryfee; //

    for (let priceElement of thisCart.dom.totalPrice) {
      priceElement.innerHTML = thisCart.totalPrice;
    }
  }

  remove(cartProduct) {
    const thisCart = this;
    const removedItem = cartProduct.dom.wrapper;
    removedItem.remove();

    const index = thisCart.products.indexOf(cartProduct);

    if (index > -1) {
      thisCart.products.splice(index, 1);
    }

    thisCart.update();

    console.log('removedItem:', removedItem);
  }
  sendOrder() {
    const thisCart = this;
    const url = settings.db.url + '/' + settings.db.orders;
    const payload = {
      address: thisCart.dom.address.value, //string
      phone: thisCart.dom.phone.value, //string
      totalPrice: thisCart.totalPrice,
      subtotalPrice: thisCart.subtotalPrice,
      totalNumber: thisCart.totalNumber,
      deliveryFee: thisCart.dom.deliveryFee.innerHTML, //string
      products: [],
    };
    console.log(payload);

    for (let prod of thisCart.products) {
      payload.products.push(prod.getData());
      console.log(prod);
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    fetch(url, options);
  }

}

export default Cart;