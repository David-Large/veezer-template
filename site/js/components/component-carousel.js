import {gsapFunctionsNoScrollTrigger} from './../gsap/gsap-functions.js';



function initCarousel() {
  
  

  function showCarouselSlides(n,carousel) {
    
    let leftOffset = (n * 100);
    let carouselInner = carousel.querySelector(".carousel-inner")
    
    carouselInner.style.left = "-" + leftOffset + "%";
    


    carousel.querySelectorAll('.carousel-slide').forEach((carousel,index) => {
      
      if (index == n) {
        carousel.classList.add("carousel-fade-in");

        // Trigger any GSAP animations for this slide now it is visible.
        carousel.querySelectorAll('.gsap-element-wrapper-no-scrolltrigger').forEach((carousel,index) => {
          gsapFunctionsNoScrollTrigger(carousel);
        })

      } else {
        carousel.classList.remove("carousel-fade-in");
      }
    
    })
    


    carousel.querySelectorAll('.carousel-gradient').forEach((carousel,index) => {
      
      carousel.classList.add("carousel-gradient-fade-in");
      
    })
  


    // Update the dot indicator showing selected slide
    carousel.querySelectorAll('.carousel-nav-dot').forEach((dot,index) => {
      
        if (index == n) {
          dot.classList.add("carousel-active");
        } else {
          dot.classList.remove("carousel-active");
        }
      
    })

    
  }
  
  
  
  // Iterate over each individual slider component that has been added.
  document.querySelectorAll('.carousel-outer').forEach(carousel => {
    
      

    // Handle swipe right and left (touch events) for mobile devices.
    // From: https://codepen.io/vanecendales/pen/ZEYOgWw
    let startX;
    let startY;
    let endX;
    let endY;
    let xDist;
    let yDist;
    let threshold = 100; // This sets the minimum swipe distance, to avoid noise and to filter actual swipes from just moving fingers.



    function handleTouch(start,end) {
      
      // Calculate the distance on x-axis and o y-axis. Check whether had the great moving ratio.
      xDist = endX - startX;
      yDist = endY - startY;
      
      console.log(xDist);
      console.log(yDist);
      
      // Check for swipe left...
      // To turn the threshold value into a negative: Math.abs(number goes here)*-1. That’ll get the absolute (positive) value and then reverse
      if (xDist < (threshold * -1)) {
        // Simulate 'previous' button click
        carousel.querySelector('.carousel-next').click();
      }
      
      // Check for swipe right...
      if (xDist > threshold) {
        // Simulate 'next' button click
        carousel.querySelector('.carousel-prev').click();
      }
      
    }
    


    carousel.addEventListener('touchstart', function(event){
        
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
        
    })
      


    carousel.addEventListener('touchend', function(event){
          
      endX = event.changedTouches[0].clientX;
      endY = event.changedTouches[0].clientY;
          
      handleTouch(startX, endX);
      
    })


    
    let totalCarouselSlides = carousel.dataset.totalSlides;
    let autoInterval = carousel.dataset.autoInterval;
    let interval;
    
    /* Unless the data value for auto-interval is > 0 then set as a delay.
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
    carousel.querySelectorAll('.carousel-nav-dot').forEach(clicker => {
    
        clicker.addEventListener('click', event => {
            
            showCarouselSlides(event.target.dataset.dotIndex, carousel);
            
            if (typeof interval != "undefined") {
              clearInterval(interval);
            }
            
        })
        
        
    });
    

    
    // Jump to PREVIOUS slide
    carousel.querySelector('.carousel-prev').addEventListener('click', event => {
          
          changeSlide(carousel,"previous");
          
          if (typeof interval != "undefined") {
              clearInterval(interval);
          }
      
    });
    
    

    // Jump to NEXT slide
    carousel.querySelector('.carousel-next').addEventListener('click', event => {
          
          changeSlide(carousel,"next");
          
          if (typeof interval != "undefined") {
              clearInterval(interval);
          }
      
    });
    
    

    function changeSlide(carousel,direction) {
      
          let currentCarouselSlideIndex;
          let newCarouselSlideIndex;
      
          carousel.querySelectorAll('.carousel-nav-dot').forEach((dot,index) => {
        
            if (dot.classList.contains("carousel-active")) {
              currentCarouselSlideIndex = index;
            }
            
          })
          
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



export {initCarousel};