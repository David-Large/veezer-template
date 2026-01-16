function initCarouselMini() {
  

  
  function showCarouselSlides(n,carousel) {

    let leftOffset = (n * 100);
    
    let carouselInner = carousel.querySelector(".carousel-mini-inner");
    
    carouselInner.style.left = "-" + leftOffset + "%";
    


    carousel.querySelectorAll('.carousel-mini-slide').forEach((carousel,index) => {
      
      if (index == n) {
        carousel.classList.add("carousel-mini-fade-in");
      } else {
        carousel.classList.remove("carousel-mini-fade-in");
      }
    
    })
    


    // Update the dot indicator showing selected slide
    carousel.querySelectorAll('.carousel-mini-nav-dot').forEach((dot,index) => {
      
        if (index == n) {
          dot.classList.add("carousel-mini-active");
        } else {
          dot.classList.remove("carousel-mini-active");
        }
      
    })
    
  }
  
  
  
  // Iterate over each individual slider component that has been added.
  document.querySelectorAll('.carousel-mini-outer').forEach(carousel => {
    
    
      let totalCarouselSlides = carousel.dataset.totalSlides;
      let autoInterval = carousel.dataset.autoInterval;
      let interval;
      
      /*Unless the data value for auto-interval is > 0 then set as a delay.
      Note that whenever a previous,next or navigation button are clicked (human interation),
      then turn off the auto-change of slide. */
      if (autoInterval > 0) {
        
        interval = setInterval(function(){
              
          changeSlide(carousel,"next");
              
        }, autoInterval);
      }
      

      
      // Show the FIRST slide
      showCarouselSlides(0, carousel);
      

      
      // Jump to selected slide from dot indicator click
      carousel.querySelectorAll('.carousel-mini-nav-dot').forEach(clicker => {
      
        clicker.addEventListener('click', event => {
            
            showCarouselSlides(event.target.dataset.dotIndex, carousel);
            
            if (typeof interval != "undefined") {
              clearInterval(interval);
            }
            
        })
            
      });
      
      

      // Jump to PREVIOUS slide
      carousel.querySelector('.carousel-mini-prev').addEventListener('click', event => {
            
        changeSlide(carousel,"previous");
        
        if (typeof interval != "undefined") {
            clearInterval(interval);
        }
        
      });
      
      

      // Jump to NEXT slide
      carousel.querySelector('.carousel-mini-next').addEventListener('click', event => {
            
        changeSlide(carousel,"next");
        
        if (typeof interval != "undefined") {
            clearInterval(interval);
        }
        
      });
      
      
      
      function changeSlide(carousel,direction) {
        
        let currentCarouselSlideIndex;
        let newCarouselSlideIndex;
    
        carousel.querySelectorAll('.carousel-mini-nav-dot').forEach((dot,index) => {
      
          if (dot.classList.contains("carousel-mini-active")) {
            currentCarouselSlideIndex = index;
          }
          
        });
        
        if (direction == "next") {
          
          if (currentCarouselSlideIndex < (totalCarouselSlides - 1)) {
            newCarouselSlideIndex = currentCarouselSlideIndex + 1;
          } else {
            newCarouselSlideIndex = 0;
          }
        }
        
        if (direction == "previous") {
          if (currentCarouselSlideIndex > 0) {
            newCarouselSlideIndex = currentCarouselSlideIndex - 1;
          } else {
            newCarouselSlideIndex = totalCarouselSlides - 1;
          }
        }
    
        showCarouselSlides(newCarouselSlideIndex, carousel);
            
      }
    
  });

    
}



export {initCarouselMini};