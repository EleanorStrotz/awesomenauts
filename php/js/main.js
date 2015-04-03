// stickey header code
 $(function(){
   $(window).scroll(function(){
     var winTop = $(window).scrollTop();
     if(winTop >= 30){
       $("body").addClass("sticky-header");
     }else{
       $("body").removeClass("sticky-header");
     }
   })
 })

// code for readmore
$('.post').readmore({
  speed: 75,
  maxHeight: 500,
});

$('.post').readmore({
  afterToggle: function(trigger, element, expanded) {
    if(! expanded) { // The "Close" link was clicked
      $('html, body').animate( { scrollTop: element.offset().top }, {duration: 100 } );
    }
  }
});


 
