/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
console.log("hi");
$('.rmelement').css({"opacity":0});
$('.page').css({"display":"none"});
$('#mapPg').css({"display":"none"});

$(document).ready(function(){
  
  //window.scrollTo(0,1000);
  
  gsap.to('#cloudA', {left: '100%', duration:20, ease:'none', repeat: '-1'})
  
  $(window).on("load", function(){
    gsap.to('#cloudA', {top: '100%', duration:0.8, ease:"power3.in"})
    gsap.to('#loading img', {bottom: '-50%', duration:0.6, ease:"power3.in"})
    gsap.to('#loading h1', {y: '500', duration:0.8, ease:"power3.in"})
    gsap.to('#loading p', {y: '500', duration:0.6, ease:"power3.in"})
    gsap.to("#loading", {y: '900', duration:1, ease:"power3.in", onComplete: function(){
      $('#loading').remove()
    }})
    
    console.log($(window).width())
    
    if ($(window).width() < 1024){
      $('#beginScroll').remove();
      
      $('#logo').hide();
      $('#nav').hide();
      $('#mobile.modal').modal('show');
      $("#mobile.modal").modal({
        fadeDuration: 1000,
        fadeDelay: 0.50
      }); 
      
      $('#mobile.modal').on($.modal.AFTER_CLOSE, function(event, modal){
        $('#logo').fadeIn(500);
        $('#nav').fadeIn(500);
        $('#intro.modal').modal('show');
        $("#intro.modal").modal({
          fadeDuration: 1000,
          fadeDelay: 0.50
        }); 
      })
    }
    else {
      $('#intro.modal').modal('show');
      $("#intro.modal").modal({
        fadeDuration: 1000,
        fadeDelay: 0.50
      }); 
    }
    $('#rm1').css({"display":"block"});
  
    $('#rm1').addClass("open");
    
    $('#intro.modal').on($.modal.AFTER_CLOSE, function(event, modal){
      gsap.to('.rmelement', {opacity: 1, duration: 0.05});
      $('.open').minimap();
      $.minimap.show();
    })
    
  })
  
  
  // DRAG TO SCROLL ----------------------------------------------------
  
  var clicked = false, clickY;
  $(document).on({
      'mousemove': function(e) {
          clicked && updateScrollPos(e);
      },
      'mousedown': function(e) {
          clicked = true;
          clickY = e.pageY;
      },
      'mouseup': function() {
          clicked = false;
          $('html').css('cursor', 'auto');
      }
  });

  var updateScrollPos = function(e) {
      //$('html').css('cursor', 'row-resize');
      $(window).scrollTop($(window).scrollTop() + (clickY - e.pageY));
  }
  $('img').attr('draggable', false);
  
  // MAP BUTTON --------------------------------------------------------
  var rm2visit = false;
  var rm3visit = false;
  var rm4visit = false;
  var rm5visit = false;
  var rm6visit = false, rm7visit = false, rm8visit = false, rm9visit = false, rm10visit = false,
      rm11visit = false, rm12visit = false, rm13visit = false, rm14visit = false, rm15visit = false,
      rm16visit = false, rm17visit = false, rm18visit = false, rm19visit = false, rm20visit = false,
      rm21visit = false, rm22visit = false, rm23visit = false, rm24visit = false, rm25visit = false,
      rm26visit = false, rm27visit = false, rm28visit = false, rm29visit = false, rm30visit = false;
  
  var mapMode = false;
  var saveScroll = 0;
  $('#mapBtn').click(function(){
    $('aside').remove();
    //$('#about').toggle();
    $(function(){
      $('#mapBtn').toggleClass("on");
      if (mapMode == false){
        saveScroll = $(document).scrollTop();
        $('.open').fadeOut(300);
        $('#contentPg').fadeOut(300, function(){
          //$('#contentPg').css({"visibility":"hidden"});
          $('#mapPg').fadeIn(500);
          window.scrollTo(0,100);
        });
        // window.scrollTo(500,500);
        
        
        mapMode = true;
      }
      else {
        // $('.page').css({"display":"none"});
        $('#mapPg').fadeOut(300, function(){
          $('#contentPg').fadeIn(500);
          $('.open').fadeIn(800);
          //$('.open').fadeIn(800, function(){window.scrollTo(0, saveScroll);});
          window.scrollTo(0, saveScroll);
          $('.open').minimap(); $.minimap.show();
        });
        //$('#contentPg').css({"visibility":"visible"});
        // $('.open').css({"display":"block"});
        mapMode = false;
      }
    })
  })
  $('.marker').click(function(){$('#mapBtn').toggleClass("on");});
  
  // SOUND BUTTON --------------------------------------------------------
  var audio0 = document.createElement('audio'); //oh this just doesn't work in Safari for some reason OKAY
  var audiowater = document.createElement('audio'), audiofly = document.createElement('audio');
  audio0.setAttribute('src', 'https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2FHongKongAmbience_1Market.mp3?v=1619204997404');
  audiowater.setAttribute('src', 'https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Ffilling-sink-1.mp3?v=1618805160193');
  audiofly.setAttribute('src', 'https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2Fairplane-fly-over-01.mp3?v=1618898943612');
  audiowater.volume = 0.5;
  
  audio0.addEventListener('ended', function(){
    this.play();
  })
  audio0.addEventListener("canplay",function(){
    $('#sfx').removeClass('inactive');
    $('#sfxTip').remove();
  });
  audio0.addEventListener("loop", function(){
    console.log(audio0.currentTime);
    if (audio0.currentTime >= audio0.duration){
      audio0.currentTime = 0;
    }
  })
  
  var sound = false;
  $('#sfx').click(function(){
    if (!($('#sfx').hasClass('inactive'))){
      $('#sfx > i').toggleClass('fa-volume-off').toggleClass('fa-volume-up');
      $('#sfx').toggleClass('on');
    }
    if (sound == false){
      audio0.play();
      sound = true;
    }
    else {
      audiowater.pause();
      audiofly.pause();
      audiofly.currentTime = 0;
      audio0.pause();
      sound = false;
    }
  })
  
  $('#sfx.inactive').mouseenter(function(){
    $('#sfxTip').fadeIn(300);
  }).mouseleave(function(){
    $('#sfxTip').fadeOut(300);
  })
  
  function checkSound(source){
    if(audio0.src != source){
      let time = audio0.currentTime;
      audio0.src = source;
      if (sound == true){
        audio0.currentTime = time;
        audio0.play();
      }
    }
  }
  
  $('#animBtn').click(function(){
    $(this).toggleClass('on');
    $('#animTip').remove();
  })
  
  $('#animBtn').mouseenter(function(){
    $('#animTip').fadeIn(300);
  }).mouseleave(function(){
    $('#animTip').fadeOut(300);
  })
  
  gsap.to('img.bgelement.cloud', {left:'100%', duration:30, ease:'none', repeat:-1});
  gsap.to('img.bgelement.cloud', {rotation:360, duration:100, repeat: -1})
  
  // MISC --------------------------------------------------------  
  $('#logo').click(function(){
    $('aside').remove();
    $('.open').removeClass('open');
    $('.page').fadeOut(300);
    $('#contentPg').css({"visibility":"visible"});
    $('#rm1').fadeIn(800).addClass('open');
    window.scrollTo(0,1000);
    //$('#rm1 .arrow:nth-child(3)').fadeIn(300);
    $('.modal').modal('show');
  })
  
  var about = false;
  $('#about').click(function(){
    $('#about').toggleClass('on');
    let abtW = $('#abtPg').width();
    if (about == false){
      gsap.to('#abtPg', {left: '58%', duration: 0.4, 'border-left':'2px solid white'});
      gsap.to('#about', {right: '40.5%', duration:0.4});
      //gsap.to('aside', {opacity: 0, duration: 0.1});
      about = true;
    }
    else{
      gsap.to('#abtPg', {left: '100%', duration: 0.4, 'border-left':'none'});
      gsap.to('#about', {right: '-1.5%', duration:0.4});
      //gsap.to('aside', {opacity: 1, duration: 0.1});
      about = false;
    }
  })
  
  $('.text').click(function(){
    $(this).toggleClass('flat');
  })
  
  // INDIVIDUAL ROOMS --------------------------------------------------------  
  $('.arrow').click(function(){
    if(this.id != 'beginScroll'){
      $('aside').remove();
      //console.log(audio0.getAttribute('src'));
      console.log(audio0.src);
    }
  });
  
  $('#rmrk1').click(function(){
    //$('.page').css({"display":"none"});
    $('.open').removeClass('open');
    $('#mapPg').fadeOut(300, function(){
      $('#contentPg').fadeIn(500);
      //$('#rm1').css({"display":"block"});
      $('#rm1').fadeIn(800).addClass('open');
      $('#rm1').minimap();
      $.minimap.show();
      checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2FHongKongAmbience_1Market.mp3?v=1619204997404");
    });
    mapMode = false;
  })
  
  $('#rm1 .arrow:nth-child(2)').click(function(){
    $('#rm1').removeClass('open');
    $('#rm1').fadeOut(300);
    $('#rm2').fadeIn(800).addClass('open');
    if (rm2visit == false){
      rm2visit = true;
      $('#rmrk2 img').fadeIn(800);
    }
    $('#rm2').minimap();
    $.minimap.show();
    checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2FHongKongAmbience_1Market.mp3?v=1619204997404");
  })
  $('#rm1 .arrow:nth-child(3)').click(function(){
    $('html, body').animate({
      scrollTop: 1200
    }, 1500, "swing");
    $('#rm1 .arrow:nth-child(3)').fadeOut(800);
  })

  
  $(window).scroll(function(){
    //console.log($(window).scrollTop());
    if ($(window).scrollTop() > 500){
      $('#rm1 .arrow:nth-child(3)').fadeOut(300);
    }
  })
  
  //ENTRANCE
  $('#rmrk2').click(function(){
    //$('.page').css({"display":"none"});
    $('.open').removeClass('open');
    $('#mapPg').fadeOut(300, function(){
      $('#contentPg').fadeIn(500);
      //$('#rm1').css({"display":"block"});
      $('#rm2').fadeIn(800).addClass('open');
      $('#rm2').minimap();
      $.minimap.show();
      checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2FHongKongAmbience_1Market.mp3?v=1619204997404");
    });
    mapMode = false;
    
    if (rm2visit == false){
      rm2visit = true;
      $('#rmrk2 img').fadeIn(800);
    }
  })
  $('#rm2 .arrow:nth-child(2)').click(function(){
    $('#rm2').removeClass('open');
    $('#rm2').fadeOut(300);
    $('#rm6').fadeIn(800).addClass('open');
    if (rm6visit == false){
      rm6visit = true;
      $('#rmrk6 img').fadeIn(800);}
    $('#rm6').minimap();
    $.minimap.show();
    checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2FHongKongAmbience_1Market.mp3?v=1619204997404");
  })
  $('#rm2 .arrow:nth-child(3)').click(function(){
    $('#rm2').removeClass('open');
    $('#rm2').fadeOut(300);
    $('#rm3').fadeIn(800).addClass('open');
    if (rm3visit == false){
      rm3visit = true;
      $('#rmrk3 img').fadeIn(800);}
    $('#rm3').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422");
  })
  $('#rm2 .arrow:nth-child(4)').click(function(){
    $('#rm2').removeClass('open');
    $('#rm2').fadeOut(300);
    $('#rm1').fadeIn(800).addClass('open');
    $('#rm1').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2FHongKongAmbience_1Market.mp3?v=1619204997404");
  })

  
  //TRASH
  $('#rmrk3').click(function(){
    //$('.page').css({"display":"none"});
    $('.open').removeClass('open');
    $('#mapPg').fadeOut(300, function(){
      $('#contentPg').fadeIn(500);
      //$('#rm1').css({"display":"block"});
      $('#rm3').fadeIn(800).addClass('open');
      $('#rm3').minimap(); $.minimap.show();
      checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422");
    });
    mapMode = false;
    
    if (rm3visit == false){
      rm3visit = true;
      $('#rmrk3 img').fadeIn(800);}
  })
  $('#rm3 .arrow:nth-child(2)').click(function(){
    $('#rm3').removeClass('open');
    $('#rm3').fadeOut(300);
    $('#rm5').fadeIn(800).addClass('open');
    if (rm5visit == false){
      rm5visit = true;
      $('#rmrk5 img').fadeIn(800);}
    $('#rm5').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422");
  })
  $('#rm3 .arrow:nth-child(3)').click(function(){
    $('#rm3').removeClass('open');
    $('#rm3').fadeOut(300);
    $('#rm2').fadeIn(800).addClass('open');
    if (rm2visit == false){
      rm2visit = true;
      $('#rmrk2 img').fadeIn(800);}
    $('#rm2').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2FHongKongAmbience_1Market.mp3?v=1619204997404");
  })
  $('#rm3 .text').mouseenter(function(){
    $('#rm3 .arrow:nth-child(2)').css({"opacity":0});
  }).mouseleave(function(){
    $('#rm3 .arrow:nth-child(2)').css({"opacity":1});
  })
  $('#rm3 .text:nth-child(4)').mouseenter(function(){
    $('#rm3 .text:nth-child(5)').css({"opacity":0});
  }).mouseleave(function(){
    $('#rm3 .text:nth-child(5)').css({"opacity":1});
  })
  
  //COURTYARD
  $('#rmrk4').click(function(){
    //$('.page').css({"display":"none"});
    $('.open').removeClass('open');
    $('#mapPg').fadeOut(300, function(){
      $('#contentPg').fadeIn(500);
      //$('#rm1').css({"display":"block"});
      $('#rm4').fadeIn(800).addClass('open');
      $('#rm4').minimap(); $.minimap.show();
      checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2FHongKongAmbience_3OutsideQuiet.mp3?v=1619204999167");
    });
    mapMode = false;
    
    if (rm4visit == false){
      rm4visit = true;
      $('#rmrk4 img').fadeIn(800);}
  })
  $('#rm4 .arrow:nth-child(2)').click(function(){
    $('#rm4').removeClass('open');
    $('#rm4').fadeOut(300);
    $('#rm10').fadeIn(800).addClass('open');
    if (rm10visit == false){
      rm10visit = true;
      $('#rmrk10 img').fadeIn(800);}
    $('#rm10').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422");
  })
  $('#rm4 .arrow:nth-child(3)').click(function(){
    $('#rm4').removeClass('open');
    $('#rm4').fadeOut(300);
    $('#rm16').fadeIn(800).addClass('open');
    if (rm16visit == false){
      rm16visit = true;
      $('#rmrk16 img').fadeIn(800);} 
    $('#rm16').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2FHongKongAmbience_1Market.mp3?v=1619204997404");
  })
  
  $('#rmrk5').click(function(){
    //$('.page').css({"display":"none"});
    $('.open').removeClass('open');
    $('#mapPg').fadeOut(300, function(){
      $('#contentPg').fadeIn(500);
      //$('#rm1').css({"display":"block"});
      $('#rm5').fadeIn(800).addClass('open');
      $('#rm5').minimap(); $.minimap.show();
      checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422");
    });
    mapMode = false;
    
    if (rm5visit == false){
      rm5visit = true;
      $('#rmrk5 img').fadeIn(800);}
  })
  $('#rm5 .arrow:nth-child(2)').click(function(){
    $('#rm5').removeClass('open');
    $('#rm5').fadeOut(300);
    $('#rm7').fadeIn(800).addClass('open');
    if (rm7visit == false){
      rm7visit = true;
      $('#rmrk7 img').fadeIn(800);}
    $('#rm7').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2Fstreet-alley-ambience-water.mp3?v=1619205010021");
  })
  $('#rm5 .arrow:nth-child(3)').click(function(){
    $('#rm5').removeClass('open');
    $('#rm5').fadeOut(300);
    $('#rm3').fadeIn(800).addClass('open');
    if (rm3visit == false){
      rm3visit = true;
      $('#rmrk3 img').fadeIn(800);}
    $('#rm3').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422");
  })
  $('#rm5 .arrow:nth-child(4)').click(function(){
    $('#rm5').removeClass('open');
    $('#rm5').fadeOut(300);
    $('#rm12').fadeIn(800).addClass('open');
    window.scrollTo(0,1000);
    if (rm12visit == false){
      rm12visit = true;
      $('#rmrk12 img').fadeIn(800);}
    $('#rm12').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422")
  })
  
  $('#rmrk6').click(function(){
    //$('.page').css({"display":"none"});
    $('.open').removeClass('open');
    $('#mapPg').fadeOut(300, function(){
      $('#contentPg').fadeIn(500);
      //$('#rm1').css({"display":"block"});
      $('#rm6').fadeIn(800).addClass('open');
      $('#rm6').minimap(); $.minimap.show();
      checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2FHongKongAmbience_1Market.mp3?v=1619204997404");
    });
    mapMode = false;
    
    if (rm4visit == false){
      rm4visit = true;
      $('#rmrk6 img').fadeIn(800);}
  })
  $('#rm6 .arrow:nth-child(2)').click(function(){
    $('#rm6').removeClass('open');
    $('#rm6').fadeOut(300);
    $('#rm21').fadeIn(800).addClass('open');
    window.scrollTo(0,1000);
    if (rm21visit == false){
      rm21visit = true;
      $('#rmrk21 img').fadeIn(800);}
    $('#rm21').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2FHongKongAmbience_1Market.mp3?v=1619204997404");
  })
  $('#rm6 .arrow:nth-child(3)').click(function(){
    $('#rm6').removeClass('open');
    $('#rm6').fadeOut(300);
    $('#rm2').fadeIn(800).addClass('open');
    window.scrollTo(0,1000);
    if (rm2visit == false){
      rm2visit = true;
      $('#rmrk2 img').fadeIn(800);}
    $('#rm2').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2FHongKongAmbience_1Market.mp3?v=1619204997404");
  })
  $('#rm6 .text:nth-child(4)').mouseenter(function(){
    $('#rm6 .arrow:nth-child(2)').css({"opacity":0}); 
  }).mouseleave(function(){
    $('#rm6 .arrow:nth-child(2)').css({"opacity":1});
  })
  
  $('#rmrk7').click(function(){
    //$('.page').css({"display":"none"});
    $('.open').removeClass('open');
    $('#mapPg').fadeOut(300, function(){
      $('#contentPg').fadeIn(500);
      //$('#rm1').css({"display":"block"});
      $('#rm7').fadeIn(800).addClass('open');
      $('#rm7').minimap(); $.minimap.show();
      checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2Fstreet-alley-ambience-water.mp3?v=1619205010021");
      //if(sound == true){audiowater.play()};
    });
    mapMode = false;
    
    if (rm7visit == false){
      rm7visit = true;
      $('#rmrk7 img').fadeIn(800);}
  })
  $('#rm7 .arrow:nth-child(2)').click(function(){
    $('#rm7').removeClass('open');
    $('#rm7').fadeOut(300);
    $('#rm9').fadeIn(800).addClass('open');
    if (rm9visit == false){
      rm9visit = true;
      $('#rmrk9 img').fadeIn(800);}
    $('#rm9').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422");
  })
  $('#rm7 .arrow:nth-child(3)').click(function(){
    $('#rm7').removeClass('open');
    $('#rm7').fadeOut(300);
    $('#rm8').fadeIn(800).addClass('open');
    if (rm8visit == false){
      rm8visit = true;
      $('#rmrk8 img').fadeIn(800);}
    $('#rm8').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422");
  })
  $('#rm7 .arrow:nth-child(4)').click(function(){
    $('#rm7').removeClass('open');
    $('#rm7').fadeOut(300);
    $('#rm5').fadeIn(800).addClass('open');
    if (rm5visit == false){
      rm5visit = true;
      $('#rmrk5 img').fadeIn(800);}
    $('#rm5').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422");
  })
  $('#rm7 .text:nth-child(6)').mouseenter(function(){
    $('#rm7 .arrow:nth-child(3)').css({"opacity":0});
  }).mouseleave(function(){
    $('#rm7 .arrow:nth-child(3)').css({"opacity":1});
  })
  
  $('#rmrk8').click(function(){
    //$('.page').css({"display":"none"});
    $('.open').removeClass('open');
    $('#mapPg').fadeOut(300, function(){
      $('#contentPg').fadeIn(500);
      //$('#rm1').css({"display":"block"});
      $('#rm8').fadeIn(800).addClass('open');
      $('#rm8').minimap(); $.minimap.show();
      checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422");
    });
    mapMode = false;
    
    if (rm8visit == false){
      rm8visit = true;
      $('#rmrk8 img').fadeIn(800);}
  })
  $('#rm8 .arrow:nth-child(3)').click(function(){
    $('#rm8').removeClass('open');
    $('#rm8').fadeOut(300);
    $('#rm7').fadeIn(800).addClass('open');
    if (rm7visit == false){
      rm7visit = true;
      $('#rmrk7 img').fadeIn(800);}
    $('#rm7').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2Fstreet-alley-ambience-water.mp3?v=1619205010021");
  })
  $('#rm8 .arrow:nth-child(2)').click(function(){
    $('#rm8').removeClass('open');
    $('#rm8').fadeOut(300);
    $('#rm29').fadeIn(800).addClass('open');
    if (rm29visit == false){
      rm29visit = true;
      $('#rmrk29 img').fadeIn(800);}
    $('#rm29').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2Fstreet-alley-ambience-heater.mp3?v=1619205006692");
  })
  
  $('#rmrk9').click(function(){
    //$('.page').css({"display":"none"});
    $('.open').removeClass('open');
    $('#mapPg').fadeOut(300, function(){
      $('#contentPg').fadeIn(500);
      //$('#rm1').css({"display":"block"});
      $('#rm9').fadeIn(800).addClass('open');
      $('#rm9').minimap(); $.minimap.show();
      checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422");
    });
    mapMode = false;
    
    if (rm9visit == false){
      rm9visit = true;
      $('#rmrk9 img').fadeIn(800);}
  })
  $('#rm9 .arrow:nth-child(2)').click(function(){
    $('#rm9').removeClass('open');
    $('#rm9').fadeOut(300);
    $('#rm7').fadeIn(800).addClass('open');
    if (rm7visit == false){
      rm7visit = true;
      $('#rmrk7 img').fadeIn(800);}
    $('#rm7').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2Fstreet-alley-ambience-water.mp3?v=1619205010021")
  })
  $('#rm9 .arrow:nth-child(3)').click(function(){
    $('#rm9').removeClass('open');
    $('#rm9').fadeOut(300);
    $('#rm10').fadeIn(800).addClass('open');
    if (rm10visit == false){
      rm10visit = true;
      $('#rmrk10 img').fadeIn(800);}
    $('#rm10').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422")
  })
  $('#rm9 .arrow:nth-child(4)').click(function(){
    $('#rm9').removeClass('open');
    $('#rm9').fadeOut(300);
    $('#rm9a').fadeIn(800).addClass('open');
    $('#rm9a').minimap(); $.minimap.show();
  })
  
  $('#rm9a .arrow').click(function(){
    $('#rm9a').removeClass('open');
    $('#rm9a').fadeOut(300);
    $('#rm9').fadeIn(800).addClass('open');
    $('#rm9').minimap(); $.minimap.show();
  })
  
  $('#rmrk10').click(function(){
    //$('.page').css({"display":"none"});
    $('.open').removeClass('open');
    $('#mapPg').fadeOut(300, function(){
      $('#contentPg').fadeIn(500);
      //$('#rm1').css({"display":"block"});
      $('#rm10').fadeIn(800).addClass('open');
      $('#rm10').minimap(); $.minimap.show();
      checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422");
    });
    mapMode = false;
    
    if (rm10visit == false){
      rm10visit = true;
      $('#rmrk10 img').fadeIn(800);}
  })
  $('#rm10 .arrow:nth-child(2)').click(function(){
    $('#rm10').removeClass('open');
    $('#rm10').fadeOut(300);
    $('#rm19').fadeIn(800).addClass('open');
    if (rm19visit == false){
      rm19visit = true;
      $('#rmrk19 img').fadeIn(800);}
    $('#rm19').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422");
  })
  $('#rm10 .arrow:nth-child(3)').click(function(){
    $('#rm10').removeClass('open');
    $('#rm10').fadeOut(300);
    $('#rm4').fadeIn(800).addClass('open');
    if (rm4visit == false){
      rm4visit = true;
      $('#rmrk4 img').fadeIn(800);}
    $('#rm4').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2FHongKongAmbience_3OutsideQuiet.mp3?v=1619204999167");
  })
  $('#rm10 .arrow:nth-child(4)').click(function(){
    $('#rm10').removeClass('open');
    $('#rm10').fadeOut(300);
    $('#rm9').fadeIn(800).addClass('open');
    if (rm9visit == false){
      rm9visit = true;
      $('#rmrk9 img').fadeIn(800);}
    $('#rm9').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422");
  })
  
  $('#rmrk11').click(function(){
    //$('.page').css({"display":"none"});
    $('.open').removeClass('open');
    $('#mapPg').fadeOut(300, function(){
      $('#contentPg').fadeIn(500);
      //$('#rm1').css({"display":"block"});
      $('#rm11').fadeIn(800).addClass('open');
      $('#rm11').minimap(); $.minimap.show();
      checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422");
    });
    mapMode = false;
    
    if (rm11visit == false){
      rm11visit = true;
      $('#rmrk11 img').fadeIn(800);}
  })
  $('#rm11 .arrow:nth-child(2)').click(function(){
    $('#rm11').removeClass('open');
    $('#rm11').fadeOut(300);
    $('#rm15').fadeIn(800).addClass('open');
    if (rm15visit == false){
      rm15visit = true;
      $('#rmrk15 img').fadeIn(800);}
    $('#rm15').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422");
  })
  $('#rm11 .arrow:nth-child(3)').click(function(){
    $('#rm11').removeClass('open');
    $('#rm11').fadeOut(300);
    $('#rm14').fadeIn(800).addClass('open');
    if (rm14visit == false){
      rm14visit = true;
      $('#rmrk14 img').fadeIn(800);}
    $('#rm14').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422");
  })
  
  $('#rmrk12').click(function(){
    //$('.page').css({"display":"none"});
    $('.open').removeClass('open');
    $('#mapPg').fadeOut(300, function(){
      $('#contentPg').fadeIn(500);
      //$('#rm1').css({"display":"block"});
      $('#rm12').fadeIn(800).addClass('open');
      $('#rm12').minimap(); $.minimap.show();
      checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422");
    });
    mapMode = false;
    
    if (rm12visit == false){
      rm12visit = true;
      $('#rmrk12 img').fadeIn(800);}
  })
  $('#rm12 .arrow:nth-child(2)').click(function(){
    $('#rm12').removeClass('open');
    $('#rm12').fadeOut(300);
    $('#rm14').fadeIn(800).addClass('open');
    if (rm14visit == false){
      rm14visit = true;
      $('#rmrk14 img').fadeIn(800);}
    $('#rm14').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422");
  })
  $('#rm12 .arrow:nth-child(3)').click(function(){
    $('#rm12').removeClass('open');
    $('#rm12').fadeOut(300);
    $('#rm5').fadeIn(800).addClass('open');
    if (rm5visit == false){
      rm5visit = true;
      $('#rmrk5 img').fadeIn(800);}
    $('#rm5').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422");
  })
  
  $('#rmrk13').click(function(){
    $('.open').removeClass('open');
    $('#mapPg').fadeOut(300, function(){
      $('#contentPg').fadeIn(500);
      $('#rm13').fadeIn(800).addClass('open');
      $('#rm13').minimap(); $.minimap.show();
      checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2FHongKongAmbience_3OutsideQuiet.mp3?v=1619204999167");
    });
    mapMode = false;
    
    if (rm13visit == false){
      rm13visit = true;
      $('#rmrk13 img').fadeIn(800);}
  })
  $('#rm13 .arrow:nth-child(2)').click(function(){
    $('#rm13').removeClass('open');
    $('#rm13').fadeOut(300);
    $('#rm14').fadeIn(800).addClass('open');
    if (rm14visit == false){
      rm14visit = true;
      $('#rmrk14 img').fadeIn(800);}
    $('#rm14').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422");
  })
  
  $('#rmrk14').click(function(){
    //$('.page').css({"display":"none"});
    $('.open').removeClass('open');
    $('#mapPg').fadeOut(300, function(){
      $('#contentPg').fadeIn(500);
      //$('#rm1').css({"display":"block"});
      $('#rm14').fadeIn(800).addClass('open');
      $('#rm14').minimap(); $.minimap.show();
      checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422");
    });
    mapMode = false;
    
    if (rm14visit == false){
      rm14visit = true;
      $('#rmrk14 img').fadeIn(800);}
  })
  $('#rm14 .arrow:nth-child(2)').click(function(){
    $('#rm14').removeClass('open');
    $('#rm14').fadeOut(300);
    $('#rm13').fadeIn(800).addClass('open');
    if (rm13visit == false){
      rm13visit = true;
      $('#rmrk13 img').fadeIn(800);}
    $('#rm13').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2FHongKongAmbience_3OutsideQuiet.mp3?v=1619204999167");
  })
  $('#rm14 .arrow:nth-child(3)').click(function(){
    $('#rm14').removeClass('open');
    $('#rm14').fadeOut(300);
    $('#rm12').fadeIn(800).addClass('open');
    if (rm12visit == false){
      rm12visit = true;
      $('#rmrk12 img').fadeIn(800);}
    $('#rm12').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422");
  })
  $('#rm14 .arrow:nth-child(4)').click(function(){
    $('#rm14').removeClass('open');
    $('#rm14').fadeOut(300);
    $('#rm11').fadeIn(800).addClass('open');
    if (rm11visit == false){
      rm11visit = true;
      $('#rmrk11 img').fadeIn(800);}
    $('#rm11').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422");
  })
  
  $('#rmrk15').click(function(){
    //$('.page').css({"display":"none"});
    $('.open').removeClass('open');
    $('#mapPg').fadeOut(300, function(){
      $('#contentPg').fadeIn(500);
      //$('#rm1').css({"display":"block"});
      $('#rm15').fadeIn(800).addClass('open');
      $('#rm15').minimap(); $.minimap.show();
      checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422");
    });
    mapMode = false;
    
    if (rm15visit == false){
      rm15visit = true;
      $('#rmrk15 img').fadeIn(800);}
  })
  $('#rm15 .arrow:nth-child(2)').click(function(){
    $('#rm15').removeClass('open');
    $('#rm15').fadeOut(300);
    $('#rm17').fadeIn(800).addClass('open');
    if (rm17visit == false){
      rm17visit = true;
      $('#rmrk17 img').fadeIn(800);}
    $('#rm17').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2FHongKongAmbience_5OutsideNight.mp3?v=1619205000305");
  })
  $('#rm15 .arrow:nth-child(3)').click(function(){
    $('#rm15').removeClass('open');
    $('#rm15').fadeOut(300);
    $('#rm22').fadeIn(800).addClass('open');
    if (rm22visit == false){
      rm22visit = true;
      $('#rmrk22 img').fadeIn(800);}
    $('#rm22').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422");
  })
  $('#rm15 .arrow:nth-child(4)').click(function(){
    $('#rm15').removeClass('open');
    $('#rm15').fadeOut(300);
    $('#rm11').fadeIn(800).addClass('open');
    if (rm11visit == false){
      rm11visit = true;
      $('#rmrk11 img').fadeIn(800);}
    $('#rm11').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422");
  })
  $('#rm15 .arrow:nth-child(5)').click(function(){
    $('#rm15').removeClass('open');
    $('#rm15').fadeOut(300);
    $('#rm16').fadeIn(800).addClass('open');
    if (rm16visit == false){
      rm16visit = true;
      $('#rmrk16 img').fadeIn(800);}
    $('#rm16').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2FHongKongAmbience_1Market.mp3?v=1619204997404");
  })
  
  $('#rmrk16').click(function(){
    //$('.page').css({"display":"none"});
    $('.open').removeClass('open');
    $('#mapPg').fadeOut(300, function(){
      $('#contentPg').fadeIn(500);
      //$('#rm1').css({"display":"block"});
      $('#rm16').fadeIn(800).addClass('open');
      $('#rm16').minimap(); $.minimap.show();
      checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2FHongKongAmbience_1Market.mp3?v=1619204997404");
    });
    mapMode = false;
    
    if (rm16visit == false){
      rm16visit = true;
      $('#rmrk16 img').fadeIn(800);}
  })
  $('#rm16 .arrow:nth-child(2)').click(function(){
    $('#rm16').removeClass('open');
    $('#rm16').fadeOut(300);
    $('#rm15').fadeIn(800).addClass('open');
    if (rm15visit == false){
      rm15visit = true;
      $('#rmrk15 img').fadeIn(800);}
    $('#rm15').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422");
  })
  $('#rm16 .arrow:nth-child(3)').click(function(){
    $('#rm16').removeClass('open');
    $('#rm16').fadeOut(300);
    $('#rm4').fadeIn(800).addClass('open');
    if (rm4visit == false){
      rm4visit = true;
      $('#rmrk4 img').fadeIn(800);}
    $('#rm4').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2FHongKongAmbience_3OutsideQuiet.mp3?v=1619204999167")
  })
  $('#rm16 .arrow:nth-child(4)').click(function(){
    $('#rm16').removeClass('open');
    $('#rm16').fadeOut(300);
    $('#rm18').fadeIn(800).addClass('open');
    if (rm18visit == false){
      rm18visit = true;
      $('#rmrk18 img').fadeIn(800);}
    $('#rm18').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2FHongKongAmbience_1Market.mp3?v=1619204997404");
  })
  // $('#rm16 .text').mouseenter(function(){
  //   $('#rm16 .arrow:nth-child(3)').css({"opacity":0});
  // }).mouseleave(function(){
  //   $('#rm16 .arrow:nth-child(3)').css({"opacity":1});
  // })
  
  $('#rmrk17').click(function(){
    $('.open').removeClass('open');
    $('#mapPg').fadeOut(300, function(){
      $('#contentPg').fadeIn(500);
      $('#rm17').fadeIn(800).addClass('open');
      $('#rm17').minimap(); $.minimap.show();
      checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2FHongKongAmbience_5OutsideNight.mp3?v=1619205000305");
    });
    mapMode = false;
    
    if (rm17visit == false){
      rm17visit = true;
      $('#rmrk17 img').fadeIn(800);}
  })
  $('#rm17 .arrow:nth-child(2)').click(function(){
    $('#rm17').removeClass('open');
    $('#rm17').fadeOut(300);
    $('#rm15').fadeIn(800).addClass('open');
    if (rm15visit == false){
      rm15visit = true;
      $('#rmrk15 img').fadeIn(800);}
    $('#rm15').minimap(); $.minimap.show();
    audiofly.pause(); audiofly.currentTime = 0;
    checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422");
  })
  $('#rm17 .arrow:nth-child(3)').click(function(){
    $('#rm17').removeClass('open');
    $('#rm17').fadeOut(300);
    $('#rm17a').fadeIn(800).addClass('open');
    $('#rm17a').minimap(); $.minimap.show();
  })
  $('#rm17 .arrow:nth-child(4)').click(function(){
    $('#rm17').removeClass('open');
    $('#rm17').fadeOut(300);
    $('#rm17b').fadeIn(800).addClass('open');
    $('#rm17b').minimap(); $.minimap.show();
    if(sound == true){audiofly.play()};
  })
  $('#rm17a .arrow:nth-child(2)').click(function(){
    $('#rm17a').removeClass('open');
    $('#rm17a').fadeOut(300);
    $('#rm17c').fadeIn(800).addClass('open');
    $('#rm17c').minimap(); $.minimap.show();
  })
  $('#rm17a .arrow:nth-child(3)').click(function(){
    $('#rm17a').removeClass('open');
    $('#rm17a').fadeOut(300);
    $('#rm17').fadeIn(800).addClass('open');
    $('#rm17').minimap(); $.minimap.show();
  })
  $('#rm17b .arrow:nth-child(2)').click(function(){
    $('#rm17b').removeClass('open');
    $('#rm17b').fadeOut(300);
    $('#rm17').fadeIn(800).addClass('open');
    $('#rm17').minimap(); $.minimap.show();
  })
  $('#rm17b .arrow:nth-child(3)').click(function(){
    $('#rm17b').removeClass('open');
    $('#rm17b').fadeOut(300);
    $('#rm17c').fadeIn(800).addClass('open');
    $('#rm17c').minimap(); $.minimap.show();
  })
  $('#rm17c .arrow:nth-child(2)').click(function(){
    $('#rm17c').removeClass('open');
    $('#rm17c').fadeOut(300);
    $('#rm17b').fadeIn(800).addClass('open');
    $('#rm17b').minimap(); $.minimap.show();
    if(sound == true){audiofly.play()};
  })
  $('#rm17c .arrow:nth-child(3)').click(function(){
    $('#rm17c').removeClass('open');
    $('#rm17c').fadeOut(300);
    $('#rm17a').fadeIn(800).addClass('open');
    $('#rm17a').minimap(); $.minimap.show();
  })
  
  $('#rmrk18').click(function(){
    $('.open').removeClass('open');
    $('#mapPg').fadeOut(300, function(){
      $('#contentPg').fadeIn(500);
      $('#rm18').fadeIn(800).addClass('open');
      $('#rm18').minimap(); $.minimap.show();
      checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2FHongKongAmbience_1Market.mp3?v=1619204997404");
    });
    mapMode = false;
    
    if (rm18visit == false){
      rm18visit = true;
      $('#rmrk18 img').fadeIn(800);}
  })
  $('#rm18 .arrow:nth-child(2)').click(function(){
    $('#rm18').removeClass('open');
    $('#rm18').fadeOut(300);
    $('#rm16').fadeIn(800).addClass('open');
    if (rm16visit == false){
      rm16visit = true;
      $('#rmrk16 img').fadeIn(800);}
    $('#rm16').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2FHongKongAmbience_1Market.mp3?v=1619204997404");
  })
  $('#rm18 .arrow:nth-child(3)').click(function(){
    $('#rm18').removeClass('open');
    $('#rm18').fadeOut(300);
    $('#rm19').fadeIn(800).addClass('open');
    if (rm19visit == false){
      rm19visit = true;
      $('#rmrk19 img').fadeIn(800);}
    $('#rm19').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422");
  })
  
  $('#rmrk19').click(function(){
    $('.open').removeClass('open');
    $('#mapPg').fadeOut(300, function(){
      $('#contentPg').fadeIn(500);
      $('#rm19').fadeIn(800).addClass('open');
      $('#rm19').minimap(); $.minimap.show();
      checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422");
    });
    mapMode = false;
    
    if (rm19visit == false){
      rm19visit = true;
      $('#rmrk19 img').fadeIn(800);}
  })
  $('#rm19 .arrow:nth-child(2)').click(function(){
    $('#rm19').removeClass('open');
    $('#rm19').fadeOut(300);
    $('#rm18').fadeIn(800).addClass('open');
    if (rm18visit == false){
      rm18visit = true;
      $('#rmrk18 img').fadeIn(800);}
    $('#rm18').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2FHongKongAmbience_1Market.mp3?v=1619204997404");
  })
  $('#rm19 .arrow:nth-child(5)').click(function(){
    $('#rm19').removeClass('open');
    $('#rm19').fadeOut(300);
    $('#rm10').fadeIn(800).addClass('open');
    if (rm10visit == false){
      rm10visit = true;
      $('#rmrk10 img').fadeIn(800);}
    $('#rm10').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422");
  })
  $('#rm19 .arrow:nth-child(3)').click(function(){
    $('#rm19').removeClass('open');
    $('#rm19').fadeOut(300);
    $('#rm23').fadeIn(800).addClass('open');
    if (rm23visit == false){
      rm23visit = true;
      $('#rmrk23 img').fadeIn(800);}
    $('#rm23').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422");
  })
  $('#rm19 .arrow:nth-child(4)').click(function(){
    $('#rm19').removeClass('open');
    $('#rm19').fadeOut(300);
    $('#rm25').fadeIn(800).addClass('open');
    if (rm25visit == false){
      rm25visit = true;
      $('#rmrk25 img').fadeIn(800);}
    $('#rm25').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2Fstreet-alley-ambience-heater.mp3?v=1619205006692");
  })
  
  
 $('#rmrk20').click(function(){
    $('.open').removeClass('open');
    $('#mapPg').fadeOut(300, function(){
      $('#contentPg').fadeIn(500);
      $('#rm20').fadeIn(800).addClass('open');
      $('#rm20').minimap(); $.minimap.show();
      checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2Fstreet-alley-ambience-freezer.mp3?v=1619205004815");
    });
    mapMode = false;
    
    if (rm20visit == false){
      rm20visit = true;
      $('#rmrk20 img').fadeIn(800);}
  })
  $('#rm20 .arrow').click(function(){
    $('#rm20').removeClass('open');
    $('#rm20').fadeOut(300);
    $('#rm21').fadeIn(800).addClass('open');
    if (rm21visit == false){
      rm21visit = true;
      $('#rmrk21 img').fadeIn(800);}
    $('#rm21').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2FHongKongAmbience_1Market.mp3?v=1619204997404");
  })
  
  $('#rmrk21').click(function(){
    $('.open').removeClass('open');
    $('#mapPg').fadeOut(300, function(){
      $('#contentPg').fadeIn(500);
      $('#rm21').fadeIn(800).addClass('open');
      $('#rm21').minimap(); $.minimap.show();
      checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2FHongKongAmbience_1Market.mp3?v=1619204997404");
    });
    mapMode = false;
    
    if (rm21visit == false){
      rm21visit = true;
      $('#rmrk21 img').fadeIn(800);}
  })
  $('#rm21 .arrow:nth-child(2)').click(function(){
    $('#rm21').removeClass('open');
    $('#rm21').fadeOut(300);
    $('#rm20').fadeIn(800).addClass('open');
    if (rm20visit == false){
      rm20visit = true;
      $('#rmrk20 img').fadeIn(800);}
    $('#rm20').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2Fstreet-alley-ambience-freezer.mp3?v=1619205004815");
  })
  $('#rm21 .arrow:nth-child(3)').click(function(){
    $('#rm21').removeClass('open');
    $('#rm21').fadeOut(300);
    $('#rm29').fadeIn(800).addClass('open');
    if (rm29visit == false){
      rm29visit = true;
      $('#rmrk29 img').fadeIn(800);}
    $('#rm29').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2Fstreet-alley-ambience-heater.mp3?v=1619205006692");
  })
  $('#rm21 .arrow:nth-child(4)').click(function(){
    $('#rm21').removeClass('open');
    $('#rm21').fadeOut(300);
    $('#rm6').fadeIn(800).addClass('open');
    if (rm6visit == false){
      rm6visit = true;
      $('#rmrk6 img').fadeIn(800);}
    $('#rm6').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2FHongKongAmbience_1Market.mp3?v=1619204997404");
  })
  
  $('#rmrk22').click(function(){
    $('.open').removeClass('open');
    $('#mapPg').fadeOut(300, function(){
      $('#contentPg').fadeIn(500);
      $('#rm22').fadeIn(800).addClass('open');
      $('#rm22').minimap(); $.minimap.show();
      checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422");
    });
    mapMode = false;
    
    if (rm22visit == false){
      rm22visit = true;
      $('#rmrk22 img').fadeIn(800);}
  })
  $('#rm22 .arrow:nth-child(2)').click(function(){
    $('#rm22').removeClass('open');
    $('#rm22').fadeOut(300);
    $('#rm15').fadeIn(800).addClass('open');
    if (rm15visit == false){
      rm15visit = true;
      $('#rmrk15 img').fadeIn(800);}
    $('#rm15').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422");
  })
  $('#rm22 .arrow:nth-child(3)').click(function(){
    $('#rm22').removeClass('open');
    $('#rm22').fadeOut(300);
    $('#rm23').fadeIn(800).addClass('open');
    if (rm23visit == false){
      rm23visit = true;
      $('#rmrk23 img').fadeIn(800);}
    $('#rm23').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422");
  })
  
  $('#rmrk23').click(function(){
    $('.open').removeClass('open');
    $('#mapPg').fadeOut(300, function(){
      $('#contentPg').fadeIn(500);
      $('#rm23').fadeIn(800).addClass('open');
      $('#rm23').minimap(); $.minimap.show();
      checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422");
    });
    mapMode = false;
    
    if (rm23visit == false){
      rm23visit = true;
      $('#rmrk23 img').fadeIn(800);}
  })
  $('#rm23 .arrow:nth-child(2)').click(function(){
    $('#rm23').removeClass('open');
    $('#rm23').fadeOut(300);
    $('#rm22').fadeIn(800).addClass('open');
    if (rm22visit == false){
      rm22visit = true;
      $('#rmrk22 img').fadeIn(800);}
    $('#rm22').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422");
  })
  $('#rm23 .arrow:nth-child(3)').click(function(){
    $('#rm23').removeClass('open');
    $('#rm23').fadeOut(300);
    $('#rm24').fadeIn(800).addClass('open');
    if (rm24visit == false){
      rm24visit = true;
      $('#rmrk24 img').fadeIn(800);}
    $('#rm24').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2Fstreet-alley-ambience-freezer.mp3?v=1619205004815");
  })
  $('#rm23 .arrow:nth-child(4)').click(function(){
    $('#rm23').removeClass('open');
    $('#rm23').fadeOut(300);
    $('#rm19').fadeIn(800).addClass('open');
    if (rm19visit == false){
      rm19visit = true;
      $('#rmrk19 img').fadeIn(800);}
    $('#rm19').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422");
  })
  
  $('#rmrk24').click(function(){
    $('.open').removeClass('open');
    $('#mapPg').fadeOut(300, function(){
      $('#contentPg').fadeIn(500);
      $('#rm24').fadeIn(800).addClass('open');
      $('#rm24').minimap(); $.minimap.show();
      checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2Fstreet-alley-ambience-freezer.mp3?v=1619205004815");
    });
    mapMode = false;
    
    if (rm24visit == false){
      rm24visit = true;
      $('#rmrk24 img').fadeIn(800);}
  })
  $('#rm24 .arrow:nth-child(2)').click(function(){
    $('#rm24').removeClass('open');
    $('#rm24').fadeOut(300);
    $('#rm23').fadeIn(800).addClass('open');
    if (rm23visit == false){
      rm23visit = true;
      $('#rmrk23 img').fadeIn(800);}
    $('#rm23').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422");
  })
  
  $('#rmrk25').click(function(){
    $('.open').removeClass('open');
    $('#mapPg').fadeOut(300, function(){
      $('#contentPg').fadeIn(500);
      $('#rm25').fadeIn(800).addClass('open');
      $('#rm25').minimap(); $.minimap.show();
      checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2Fstreet-alley-ambience-heater.mp3?v=1619205006692");
    });
    mapMode = false;
    
    if (rm25visit == false){
      rm25visit = true;
      $('#rmrk25 img').fadeIn(800);}
  })
  $('#rm25 .arrow:nth-child(2)').click(function(){
    $('#rm25').removeClass('open');
    $('#rm25').fadeOut(300);
    $('#rm26').fadeIn(800).addClass('open');
    if (rm26visit == false){
      rm26visit = true;
      $('#rmrk26 img').fadeIn(800);}
    $('#rm26').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422");
  })
  $('#rm25 .arrow:nth-child(3)').click(function(){
    $('#rm25').removeClass('open');
    $('#rm25').fadeOut(300);
    $('#rm19').fadeIn(800).addClass('open');
    if (rm19visit == false){
      rm19visit = true;
      $('#rmrk19 img').fadeIn(800);}
    $('#rm19').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422");
  })
  
  $('#rmrk26').click(function(){
    $('.open').removeClass('open');
    $('#mapPg').fadeOut(300, function(){
      $('#contentPg').fadeIn(500);
      $('#rm26').fadeIn(800).addClass('open');
      $('#rm26').minimap(); $.minimap.show();
      checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422");
    });
    mapMode = false;
    
    if (rm26visit == false){
      rm26visit = true;
      $('#rmrk26 img').fadeIn(800);}
  })
  $('#rm26 .arrow:nth-child(2)').click(function(){
    $('#rm26').removeClass('open');
    $('#rm26').fadeOut(300);
    $('#rm27').fadeIn(800).addClass('open');
    if (rm27visit == false){
      rm27visit = true;
      $('#rmrk27 img').fadeIn(800);}
    $('#rm27').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2FHongKongAmbience_2Outside.mp3?v=1619204997358");
  })
  $('#rm26 .arrow:nth-child(3)').click(function(){
    $('#rm26').removeClass('open');
    $('#rm26').fadeOut(300);
    $('#rm25').fadeIn(800).addClass('open');
    if (rm25visit == false){
      rm25visit = true;
      $('#rmrk25 img').fadeIn(800);}
    $('#rm25').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2Fstreet-alley-ambience-heater.mp3?v=1619205006692");
  })
  
  $('#rmrk27').click(function(){
    $('.open').removeClass('open');
    $('#mapPg').fadeOut(300, function(){
      $('#contentPg').fadeIn(500);
      $('#rm27').fadeIn(800).addClass('open');
      $('#rm27').minimap(); $.minimap.show();
      checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2FHongKongAmbience_2Outside.mp3?v=1619204997358");
    });
    mapMode = false;
    
    if (rm27visit == false){
      rm27visit = true;
      $('#rmrk27 img').fadeIn(800);}
  })
  $('#rm27 .arrow:nth-child(2)').click(function(){
    $('#rm27').removeClass('open');
    $('#rm27').fadeOut(300);
    $('#rm28').fadeIn(800).addClass('open');
    if (rm28visit == false){
      rm28visit = true;
      $('#rmrk28 img').fadeIn(800);}
    $('#rm28').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2FHongKongAmbience_2Outside.mp3?v=1619204997358");
  })
  $('#rm27 .arrow:nth-child(3)').click(function(){
    $('#rm27').removeClass('open');
    $('#rm27').fadeOut(300);
    $('#rm26').fadeIn(800).addClass('open');
    if (rm26visit == false){
      rm26visit = true;
      $('#rmrk26 img').fadeIn(800);}
    $('#rm26').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422");
  })
  
  $('#rmrk28').click(function(){
    $('.open').removeClass('open');
    $('#mapPg').fadeOut(300, function(){
      $('#contentPg').fadeIn(500);
      $('#rm28').fadeIn(800).addClass('open');
      $('#rm28').minimap(); $.minimap.show();
      checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2FHongKongAmbience_2Outside.mp3?v=1619204997358");
    });
    mapMode = false;
    
    if (rm28visit == false){
      rm28visit = true;
      $('#rmrk28 img').fadeIn(800);}
  })
  $('#rm28 .arrow:nth-child(2)').click(function(){
    $('#rm28').removeClass('open');
    $('#rm28').fadeOut(300);
    $('#rm27').fadeIn(800).addClass('open');
    if (rm27visit == false){
      rm27visit = true;
      $('#rmrk27 img').fadeIn(800);}
    $('#rm27').minimap(); $.minimap.show();
  })
  
  $('#rmrk29').click(function(){
    $('.open').removeClass('open');
    $('#mapPg').fadeOut(300, function(){
      $('#contentPg').fadeIn(500);
      $('#rm29').fadeIn(800).addClass('open');
      $('#rm29').minimap(); $.minimap.show();
      checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2Fstreet-alley-ambience-heater.mp3?v=1619205006692");
    });
    mapMode = false;
    
    if (rm29visit == false){
      rm29visit = true;
      $('#rmrk29 img').fadeIn(800);}
  })
  $('#rm29 .arrow:nth-child(3)').click(function(){
    $('#rm29').removeClass('open');
    $('#rm29').fadeOut(300);
    $('#rm8').fadeIn(800).addClass('open');
    if (rm8visit == false){
      rm8visit = true;
      $('#rmrk8 img').fadeIn(800);}
    $('#rm8').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a54e754d-c14d-4c60-8d37-c82b57995b82%2Fstreet-alley-ambience-1.mp3?v=1618409101422");
  })
  $('#rm29 .arrow:nth-child(2)').click(function(){
    $('#rm29').removeClass('open');
    $('#rm29').fadeOut(300);
    $('#rm30').fadeIn(800).addClass('open');
    if (rm30visit == false){
      rm30visit = true;
      $('#rmrk30 img').fadeIn(800);}
    $('#rm30').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2Fstreet-alley-ambience-heater.mp3?v=1619205006692");
  })
  $('#rm29 .arrow:nth-child(4)').click(function(){
    $('#rm29').removeClass('open');
    $('#rm29').fadeOut(300);
    $('#rm21').fadeIn(800).addClass('open');
    if (rm21visit == false){
      rm21visit = true;
      $('#rmrk21 img').fadeIn(800);}
    $('#rm21').minimap(); $.minimap.show();
    checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2FHongKongAmbience_1Market.mp3?v=1619204997404");
  })
  
   $('#rmrk30').click(function(){
    $('.open').removeClass('open');
    $('#mapPg').fadeOut(300, function(){
      $('#contentPg').fadeIn(500);
      $('#rm30').fadeIn(800).addClass('open');
      $('#rm30').minimap(); $.minimap.show();
      checkSound("https://cdn.glitch.com/a930866b-18b5-4cbe-bbe9-352016a48366%2Fstreet-alley-ambience-heater.mp3?v=1619205006692");
    });
    mapMode = false;
    
    if (rm30visit == false){
      rm30visit = true;
      $('#rmrk30 img').fadeIn(800);}
  })
  $('#rm30 .arrow:nth-child(2)').click(function(){
    $('#rm30').removeClass('open');
    $('#rm30').fadeOut(300);
    $('#rm29').fadeIn(800).addClass('open');
    if (rm29visit == false){
      rm29visit = true;
      $('#rmrk29 img').fadeIn(800);}
    $('#rm29').minimap(); $.minimap.show();
  })
  $('#rm30 .text:nth-child(3)').mouseenter(function(){
    $('#rm30 .text:nth-child(4)').css({"opacity":0});
  }).mouseleave(function(){
    $('#rm30 .text:nth-child(4)').css({"opacity":1});
  })
  
})