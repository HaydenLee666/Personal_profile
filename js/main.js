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
const navigation_links=document.getElementsByClassName('main__navigation__link');
const pages=document.getElementById('pages');
const skill_bar_1=document.getElementById('skill-bar-1');
const skill_bar_2=document.getElementById('skill-bar-2');
const skill_bar_3=document.getElementById('skill-bar-3');
const skill_bar_4=document.getElementById('skill-bar-4');
const skill_bar_5=document.getElementById('skill-bar-5');
const skill_bar_6=document.getElementById('skill-bar-6');
window.onresize=setBackground;



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
   for(let i=0;i<5;i++){
      navigation_items[i].addEventListener("animationend",function(){
         this.style.animation='';
      });
   }  

}
// home text typing effect
class typeWriter{
   constructor(txtElement,words,wait=3000){
      this.txtElement=txtElement;
   this.words=words;
   this.txt='';
   this.wordIndex=0;
   this.wait=parseInt(wait,10);
   this.type();
   this.isDeleting=false;
   }
   type(){
      const current=this.wordIndex%this.words.length;
      const fullTxt=this.words[current];
     if(this.isDeleting){
      this.txt=fullTxt.substring(0,this.txt.length-1);
     }else{
      this.txt=fullTxt.substring(0,this.txt.length+1);
     }
     this.txtElement.innerHTML=`<span class='home__header__text__position__txt'>${this.txt}</span>`;
     //typing speed
     let typespeed=150;
   
     if(this.isDeleting){
        //deleting speed
        typespeed=50;
     }
     if(!this.isDeleting&& this.txt===fullTxt){
        //make pause at the end
        typespeed=this.wait;
        this.isDeleting=true;
   
     }else if(this.isDeleting&&this.txt===''){
        this.isDeleting=false;
        //move to next word
        this.wordIndex++;
        //pause before start typing
        typespeed=500;
     }
      setTimeout(()=>{this.type()},typespeed);
   }
}


function initTypingEffect(){
   const txtElement=document.getElementById('home-text-type');
   const words=JSON.parse(txtElement.getAttribute('data-words'));
   const wait=txtElement.getAttribute('data-wait');
   new typeWriter(txtElement,words,wait);
}




window.onload = function () {
   setBackground();
   reSetNavigationItem();
   const pw = new pageSwitch('pages',{
      duration: 600, //int 页面过渡时间
      direction: 0, //int 页面切换方向，0横向，1纵向
      start: 0, //int 默认显示页面
      loop: false, //bool 是否循环切换
      ease: 'ease-out', //string|function 过渡曲线动画，详见下方说明
      transition: 'flip3d', //string|function转场方式，详见下方说明
      freeze: false, //bool 是否冻结页面（冻结后不可响应用户操作，可以通过 `.freeze(false)` 方法来解冻）
      mouse: true, //bool 是否启用鼠标拖拽
      mousewheel: true, //bool 是否启用鼠标滚轮切换
      arrowkey: true, //bool 是否启用键盘方向切换
      autoplay: false, //bool 是否自动播放幻灯 新增
      interval: 1 //bool 幻灯播放时间间隔 新增
   });

   //welcome click entry 
   welcome_title.onclick = function () {

      welcome_title.style.animation = "welcome-title-fade-out 0.5s 1";
      setTimeout(() => {
         welcome_title.style.display = 'none';
         welcome_animation.style.animation = "fade-out 1s 1";
         setTimeout(() => {
            welcome_animation.style.display = 'none';
            main.style.animation = "fade-in 1s 1";
            main_background_image.style.animation= "backgound-filter 5s infinite";
            main.style.display = 'block';
            navigation_button.style.display='block';
         }, 1000);
      }, 500);
   };

   //small screen navigation status changed
   navigation_button.onclick=function(){
      navigation.classList.toggle('nav-open');
     
   };
   //profile button animation
   navigation_title.onclick=function(){
      navigation_title.innerHTML="PROFILE";
      for(let i=0;i<5;i++){
         navigation_items[i].style.animation="navigation-item-down 1s";
      }   
      pw.slide(0);
   }
   //menu item button effect
   for(let i=0;i<5;i++){
      navigation_links[i].onclick=function(){
         navigation_title.innerHTML=navigation_links[i].innerHTML;
         pw.slide(i);
         //skill bars effect
         if(i===2){
            skill_bar_1.style.width="95%";
            skill_bar_2.style.width="70%";
            skill_bar_3.style.width="75%";
            skill_bar_4.style.width="80%";
            skill_bar_5.style.width="60%";
            skill_bar_6.style.width="85%";
         }else{
            skill_bar_1.style.width="0";
            skill_bar_2.style.width="0";
            skill_bar_3.style.width="0";
            skill_bar_4.style.width="0";
            skill_bar_5.style.width="0";
            skill_bar_6.style.width="0";
         }
      }
   }
   //position text
   initTypingEffect();
 
}  
