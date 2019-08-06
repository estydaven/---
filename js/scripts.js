//slider

var metaslider_50 = function($) {
    $('#metaslider_50').addClass('flexslider'); // theme/plugin conflict avoidance
    $('#metaslider_50').flexslider({ 
        slideshowSpeed:4000,
        animation:"fade",
        controlNav:true,
        directionNav:true,
        pauseOnHover:true,
        direction:"horizontal",
        reverse:false,
        animationSpeed:600,
        prevText:"&lt;",
        nextText:"&gt;",
        slideshow:true
    });
};
var timer_metaslider_50 = function() {
    var slider = !window.jQuery ? window.setTimeout(timer_metaslider_50, 100) : !jQuery.isReady ? window.setTimeout(timer_metaslider_50, 1) : metaslider_50(window.jQuery);
};
timer_metaslider_50();

//messengers
var messengers = [
    {
      name: 'Facebook',
      short: 'fb',
      visible: 'visible',
      link: 'https://www.facebook.com/messages/t/lapppkin',
      innerBtn: 'facebook-button',
      step3: 'ШАГ - 3. Перейдите в Facebook и напишите свой вопрос в чате'
    },
    {
      name: 'Skype',
      short: 'skype',
      visible: '',
      link: 'skype:lap_king?chat',
      innerBtn: 'skype-button',
      step3: 'ШАГ - 3. Перейдите в Skype и напишите свой вопрос в чате'
    },
    {
      name: 'Telegram',
      short: 'tg',
      visible: 'visible',
      link: 'https://tele.click/LapkinLAb_agency_bot',
      innerBtn: 'telegram-button',
      step3: 'ШАГ - 3. Перейдите в свой Telegram и напишите свой вопрос в чате'
    },
    {
      name: 'Viber',
      short: 'viber',
      visible: '',
      link: 'viber://chat?number=79628587771',
      innerBtn: 'viber-button',
      step3: 'ШАГ - 3. Перейдите в свой Viber и напишите свой вопрос в чате'
    },
    {
      name: 'WhatsApp',
      short: 'whatsapp',
      visible: 'visible',
      link: 'whatsapp://send?phone=79628587771',
      innerBtn: 'whatsapp-button',
      step3: 'ШАГ - 3. Перейдите в свой WhatsApp и напишите свой вопрос в чате'
    },
    {
      name: 'Вконтакте',
      short: 'vkontakte',
      visible: 'visible',
      link: 'https://vk.com/im?media=&sel=-146762719',
      innerBtn: 'vkontakte-button',
      step3: 'ШАГ - 3. Перейдите в свой Вконтакте и напишите свой вопрос в чате'
    }
  ];

  var MessengerPane = (function() {

    function Messager(container, messengersItems) {
      this.container = document.querySelector(container);
      this.messengersItems = messengersItems;
    }

    var fn = Messager.prototype;

    var options = {
      btnPrefix: 'btn-',
      isOpened: false

    }

    fn.creatButtons = function() {
      var self = this;

      for (var i = 0; i < this.messengersItems.length; i++) {

          var btnItem = document.createElement('div');
          btnItem.classList.add('btn-item');
          btnItem.classList.add('' + options.btnPrefix + this.messengersItems[i].visible + '');

          var html = '<button class="' + options.btnPrefix + this.messengersItems[i].short + '">'
                html += '<div class="icon"><div class="anim anim1"></div><div class="anim anim2"></div><div class="anim anim3"></div><div class="anim anim4"></div><div class="anim anim5"></div></div>';
                html += '<div class="title">' + this.messengersItems[i].name + '</div>';
              html += '</button>';

          btnItem.innerHTML = html;

          this.container.appendChild(btnItem);
      }


    }


    fn.createPopupArea = function() {

        var popupArea = document.createElement('div');
        popupArea.classList.add('block-channel');

        var html = '<div class="tool-send-step">';
            html += '<div class="send-text first-step"></div>';
            html += '<div class="send-button">';
            html += '<a href="" class="send-button-link" target="_blank">';
            html += '<div class="icon"></div>';
            html += '<div class="title"></div></a></div></div>';

            html += '<div class="tool-send-step">';
            html += '<div class="send-text second-step"></div>';
            html += '</div></div>';



        popupArea.innerHTML = html;

        document.querySelector('#messengers').appendChild(popupArea);

        $('.send-button-link')
          .on('touchstart', function(){
              isScrolling = false;
          })
          .on('touchmove', function(e){
              isScrolling = true;
          })
          .on('touchend', function(e){
              if( !isScrolling )
              {
                  window.location = $(this).attr('href');
              }
          });

    }

    return Messager;
  }());

  var socialB = new MessengerPane('.btn-channels-container', messengers);
  socialB.creatButtons();
  socialB.createPopupArea();




  var parentWindowScreen = window.parent.screen.width;


  if (parentWindowScreen < 768) {

      $('.btn-item').on('click', function(e) {
          e.preventDefault();

          $('.btn-channels').removeClass('hover');
          $('.btn-item').removeClass('active');
          $('.block-channel').removeClass('visible');

          var id = $(this).index();
          $('.send-button-link').removeClass().addClass('send-button-link ' + socialB.messengersItems[id].innerBtn).attr('href', socialB.messengersItems[id].link);
          $('.send-button-link .title').text('Связаться в ' + socialB.messengersItems[id].name);
          $('.first-step').text('ШАГ - 2 Нажмите кнопку "Связаться в ' + socialB.messengersItems[id].name+'"');
          // $('.second-step').text('Связаться в ' + socialB.messengersItems[id].step3);
          $('.second-step').text('' + socialB.messengersItems[id].step3);

          $('.btn-channels').addClass('hover');
          $(this).addClass('active');
          $('.block-channel').addClass('visible');

      });

  } else {
    var btn_channels = document.querySelector('.btn-channels');
  var btn_channel = Array.prototype.slice.call(document.querySelectorAll('.btn-item'));
  var channels = Array.prototype.slice.call(document.querySelectorAll('.block-channel'));

  Array.prototype.slice.call(document.querySelectorAll('.btn-item')).forEach(function (element) {
      element.addEventListener("mouseenter", showChannel);
      element.addEventListener("mouseleave", leaveChannel);
      element.addEventListener("touchstart", toggleChannel);
  });

  channels.forEach(function (element) {
      element.addEventListener("mouseenter", enterChannel);
      element.addEventListener("mouseleave", leaveChannel);
      element.addEventListener("touchstart", enterChannel);
      //element.addEventListener("touchend", leaveChannel);
  });

  var portalCard = document.getElementsByClassName('messengers-pane')[0];
  var additionalMargin = 0;

  var timer = 0;
  var isOpened = false;
  var openedTarget = null;

  function toggleChannel(e) {
      if (!isOpened) {
          showChannel(e);
          isOpened = true;
          openedTarget = e.target;
      } else if (isOpened) {
          removeHoverChannels();
          clearTimeout(timer);
          btn_channels.classList.remove('hover');
          if (e.target === openedTarget) {
              isOpened = false;
              openedTarget = null;
          } else {
              openedTarget = e.target;
          }
      }
  }

  function leaveChannel() {
    clearTimeout(timer);
    isOpened = false;
    timer = setTimeout(function () {
        btn_channels.classList.remove('hover');
        removeHoverChannels();
    }, 0);
  }

  function enterChannel() {
    clearTimeout(timer);
  }

  function showChannel(e) {
    var el = e.currentTarget;
    var id = $(el).index();

    clearTimeout(timer);
    isOpened = true;
    removeHoverChannels();
    btn_channels.classList.add('hover');


    $('.send-button-link').removeClass().addClass('send-button-link ' + socialB.messengersItems[id].innerBtn).attr('href', socialB.messengersItems[id].link);
    $('.send-button-link .title').text('Связаться в ' + socialB.messengersItems[id].name);
    $('.first-step').text('ШАГ - 2 Нажмите кнопку "Связаться в ' + socialB.messengersItems[id].name + '"');
    // $('.second-step').text('Связаться в ' + socialB.messengersItems[id].step3);
    $('.second-step').text('' + socialB.messengersItems[id].step3);


    el.classList.add('active');
    var className = el.children[0].className;
    var channel = document.querySelector('.block-channel');
    channel.classList.add('visible')
  }

  function removeHoverChannels() {
    btn_channel.forEach(function (el) {
        el.classList.remove('active');
    });

    document.querySelector('.block-channel').classList.remove('visible');

  }
  }

  $(document).click( function(event){
    if( $(event.target).closest(".block-channel").length ) {
        console.log('block-channel');
        return;
    }
    if( $(event.target).closest(".btn-item").length ) {
        console.log('btn-item');
        // $(".block-channel").fadeIn("slow");
        $(".block-channel").css({'display':'block'});
        return;
    }
    $(".block-channel").fadeOut("slow");
    $(".btn-item").removeClass("active");
    $(".title").css({'opacity':'1'});
    $(".icon").css({'margin-top':'0'});
    event.stopPropagation();
});

