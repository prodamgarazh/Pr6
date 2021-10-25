function Slide(index, title, background, link ) {
   this.title = title;
   this.background = background;
   this.link = link;
   this.id = "slide-" + index;
}

const Slider = {
   current: 0,
   slides: [],
   initSlider: function(slides){
       let index = 0;
       for (let slide of slides){
           this.slides.push(new Slide(index, slide.title, slide.background, slide.link));

           index++;
       }
       this.buildSlider();
   },
   buildSlider: function() {
       let sliderHTML = "";
	   let buttonsHTML = "";
       for(let slide of this.slides) {
//зверніть увагу на можливість використання ``,яка дозволяє додавати в string змінні ${}
           sliderHTML +=
               `<div id='${slide.id}' class='singleSlide'
           style='background-image:url(${slide.background});'>
           <div class='slideOverlay'>
           <h2>${slide.title}</h2>
           <a class='link' href='${slide.link}' target='_blank'>Open</a></div></div>`;
		   
		   let btn = document.createElement('button');
btn.className = 'button';
btn.id = 'button-'+slide.id;
btn.innerHTML = slide.id;
btn.onclick = function () {
  Slider.setSlide(slide.id);
};

//let func = "Slider.setSlide(1)";
document.getElementById("buttons").appendChild(btn);


       }
	   

       document.getElementById("slider").innerHTML = sliderHTML;
	   //document.getElementById("buttons").appendChild;
       document.getElementById("slide-" + this.current).style.left = 0;
   },
   prevSlide: function() {
       let next;
       if (this.current === 0 ) {
           next = this.slides.length - 1;
       } else {
           next = this.current - 1;
       }

       document.getElementById("slide-" + next).style.left = "-100%";
       document.getElementById("slide-" + this.current).style.left = 0;

       document.getElementById("slide-" + next).setAttribute("class", "singleSlide slideInLeft");
       document.getElementById("slide-" + this.current).setAttribute("class", "singleSlide slideOutRight");

       this.current = next;
   },
   nextSlide: function(){
       let next;
       if (this.current === (this.slides.length - 1) ) {
           next = 0;
       } else {
           next = this.current + 1;
       }

       document.getElementById("slide-" + next).style.left = "100%";
       document.getElementById("slide-" + this.current).style.left = 0;

       document.getElementById("slide-" + next).setAttribute("class", "singleSlide slideInRight");
       document.getElementById("slide-" + this.current).setAttribute("class", "singleSlide slideOutLeft");

       this.current = next;
   },
   setSlide: function(id){
	  while("slide-" + this.current != id)
	  {
		   this.nextSlide();
	  }
	   
   }
}


   /**/
