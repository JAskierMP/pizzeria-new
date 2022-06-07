import {templates, select} from '../settings.js'; 
import AmountWidget from './AmountWidget.js'; 

class Booking {
  constructor(element) {
    this.render(element);
    this.initWidgets();
  }
  render(element) {
    const thisBooking = this;
    const generatedHTML = templates.bookingWidget();
    thisBooking.dom = {
      wrapper: element
    };
    thisBooking.dom.wrapper.innerHTML = generatedHTML;
    thisBooking.dom.peopleAmount = document.querySelector(select.booking.peopleAmount);
    thisBooking.dom.hoursAmount = document.querySelector(select.booking.hoursAmount);
  }
  initWidgets(){

  }

}

export default Booking; 