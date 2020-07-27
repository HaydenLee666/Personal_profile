//const DEVICE_RATIO = window.innerWidth / window.innerHeight;
const DEVICE_RATIO_1_3 = 1.3;
const DEVICE_RATIO_1_7 = 1.7;
const welcome_title = document.getElementById('welcome-btn');
const welcome_animation = document.getElementById('welcome-animation');
const main = document.getElementById('main');
const main_background_image = document.getElementById('main-background-image');
const navigation=document.getElementById('navigation');
const navigation_button=document.getElementById('navigation-button');
const navigation_title=document.getElementById('navigation-title');
const navigation_items=document.getElementsByClassName('main__navigation__item');
window.onresize=setBackground;
//window.addEventListener('resize', setBackground());
// set background image
function setBackground() {
   let DEVICE_RATIO = window.innerWidth / window.innerHeight;

   if (DEVICE_RATIO >= 1) {
      if (Math.abs(DEVICE_RATIO - DEVICE_RATIO_1_3) < Math.abs(DEVICE_RATIO - DEVICE_RATIO_1_7)) {
         main_background_image.src = "./src/background_1.3_horizontal.png";
      } else {
         main_background_image.src = "./src/background_1.7_horizontal.png";
      }

   } else {
      if (Math.abs(DEVICE_RATIO - 1/DEVICE_RATIO_1_3) < Math.abs(DEVICE_RATIO - 1/DEVICE_RATIO_1_7)) {
         main_background_image.src = "./src/background_1.3_vertical.png";
      } else {
         main_background_image.src = "./src/background_1.7_vertical.png";
      }

   }

}

function reSetNavigationItem(){
   for(let i=0;i<4;i++){
      navigation_items[i].addEventListener("animationend",function(){
         this.style.animation='';
      });
   }  

}




window.onload = function () {
   setBackground();
   reSetNavigationItem();
   //welcome click entry 
   welcome_title.onclick = function () {

      welcome_title.style.animation = "welcome-title-fade-out 0.5s 1";
      setTimeout(() => {
         welcome_title.style.display = 'none';
         welcome_animation.style.animation = "fade-out 1s 1";
         setTimeout(() => {
            welcome_animation.style.display = 'none';
            main.style.animation = "fade-in 1s 1";
            main_background_image.style.animation= "backgoundFilter 5s infinite";
            main.style.display = 'block';
            navigation_button.style.display='block';
         }, 1000);
      }, 500);
   };

   //small screen navigation status changed
   navigation_button.onclick=function(){
      navigation.classList.toggle('nav-open');
     
   };

   navigation_title.onclick=function(){
      for(let i=0;i<4;i++){
         navigation_items[i].style.animation="navigationItemDown 1s";
      }   
   }

   for(let i=0;i<4;i++){
      navigation_items[i].onclick=function(){

        // alert(i);
      }
   }
   

}