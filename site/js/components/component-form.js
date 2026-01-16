function initForm() {
  
   
    const localeEn = {
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      today: 'Today',
      clear: 'Clear',
      dateFormat: 'MM/dd/yyyy',
      timeFormat: 'hh:mm aa',
      firstDay: 0
    };
    
    
    
    // Set up all date pick inputs with the Air-DatePicker JS.
    document.querySelectorAll(".date-picker").forEach((elem) => {
      
      new AirDatepicker(elem, {
          
        locale: localeEn,
        dateFormat(date) {
            return date.toLocaleString('en-NZ', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            });
        }
          
      })
      
    });
    
    
    
    /* If present, handle the display/hiding of an input based on whether the select
    option chosen is set to 'Other'. The select item has a data attribute to indicate
    if this 'other' input is present. */
    document.querySelectorAll(".site-contact-form select").forEach((elem) => {
      
      if (elem.dataset.inputForOtherOption === "true") {
        
        elem.addEventListener("change", event => {
         
          if (elem.value.toLowerCase() == "other") {
           
            elem.parentElement.parentElement.nextElementSibling.style.display = "block";
           
          } else {
           
            elem.parentElement.parentElement.nextElementSibling.style.display = "none";
           
          }
           
        });
        
      }
      
    });
    
    
    
};


export{initForm};