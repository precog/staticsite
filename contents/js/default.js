var currentLocation = window.location.pathname;

$(document).ready(function(){
      $(".tooltip").click(function(e){
            e.preventDefault();
      });
      
      //HOME JQUERY
      /*ANIMATION FUNCTIONS FOR PANELS*/
      $("#section-usecase-menu a").mouseenter(function(){
            var linkVal = $(this).html();
            var activePanel = linkVal.replace(/\s+/g, '-').toLowerCase();
            
            $(".sliding-panel").removeClass("active");
            $("#" + activePanel).addClass("active");
            
      });
      
      
      /*TEAM ANIMATIONS*/
      $("#section-body #previous").mouseenter(function(){
            $(this).css('opacity','1.0');
            function leftFunction() {
                  var currentPosition = $("#section-body #team-cards #cards-slider").css("left");
                  var cpValue = parseInt(currentPosition, 10);
                  
                  if(cpValue < 0){
                        $("#section-body #team-cards #cards-slider").animate({left:"+=10"},1, leftFunction);     
                  } 
            }
            $(leftFunction);    

      }) .mouseleave(function(){
            $(this).css('opacity','0.7');
            $("#section-body #team-cards #cards-slider").stop();
      });
      
      $(function(){
            var totalNumber = parseInt($("#cards-slider ul li").length);
            var totalWidth = parseInt($("#cards-slider ul li").outerWidth(true));
            var totalLength = totalNumber * totalWidth;
            $("#section-body #team-cards #cards-slider").css('width', totalLength)
            $("#section-body #team-cards #cards-slider").css('width', totalLength)
            if($("#team-cards").length) {$("body").css('overflow-x', 'hidden');}
      });
      
      
      $("#section-body #next").mouseenter(function(){
            $(this).css('opacity','1.0');
            function rightFunction() {
                  var totalNumber = parseInt($("#cards-slider ul li").length);
                  var totalWidth = parseInt($("#cards-slider ul li").outerWidth(true));
                  var totalLength = totalNumber * totalWidth;
                  var stopValue = totalLength - 1050;
                  var currentPosition = $("#section-body #team-cards #cards-slider").css("left");
                  var cpValue = parseInt(currentPosition, 10) * -1;    
                  
                  if(cpValue != stopValue) {
                        $("#section-body #team-cards #cards-slider").animate({left:"-=10"},1, rightFunction);
                  }
            }
            $(rightFunction);
            
      }).mouseleave(function(){
            $(this).css('opacity','0.7');
            $("#section-body #team-cards #cards-slider").stop();
      });
      
      /*EMPLOYEE ANIMATIONS*/
      $(function() {
            var photoPopulate = $("#team-cards #cards-slider ul li").each(function(){
                  var photoPopulate2 = $(this).text().replace(/ /g,'').toLowerCase();
                  $(this).addClass(photoPopulate2);
            });
      });
      
      if(window.location.hash) {
            var urlEmployee = window.location.hash.substring(1);
            setTimeout(function (){
                  var elementIndex = $("#cards-slider ul li." + urlEmployee).index();
                  var elementWidth = $("#cards-slider ul li." + urlEmployee).outerWidth(true);
                  var leftAdjust = elementIndex * elementWidth
                  
                  $("#section-body #team-cards #cards-slider").animate({
                        left: "-" + leftAdjust
                      }, 1000 );
            }, 0);
            
            $("#team-information .information-employee").css('display', 'none');
            $("#team-information ." + urlEmployee).css('display', 'block');
      }
      
      $("#team-cards #cards-slider ul li").hover(function(){
            var currentValue = "." + $(this).text().replace(/ /g,'').toLowerCase();
            $("#team-information .information-employee").css('display', 'none');
            $(currentValue).css('display', 'block');
            
            var changeHeight = parseInt($("#team-information " + currentValue).css("height"));
            
            $("#section-body #team-information").animate({
                  'height': changeHeight + 20
                  }, {queue: false}
            );
            
      });
      
      /*PROTECTED LINKS*/
      $(".phone-link").html("888.673.9958");
      $(".sales-link").html("sales@precog.com").attr("href", "mailto:sales@precog.com");
      $(".jobs-link").html("jobs@precog.com").attr("href", "mailto:jobs@precog.com");
      $(".marketing-link").html("marketing@precog.com").attr("href", "mailto:marketing@precog.com");
      
      /*USE CASE PAGES*/
      $(".diagram-frame").mouseenter(function(){
            
            var currentFrame = $(this);
            var scrollSpeed = 1;
            
            setInterval(boxAnim, scrollSpeed);  
            
            function boxAnim () {
                  $(currentFrame).animate({
                        'background-position-x': '+=100px',
                        'background-position-y': '0px'
                  }, 2000, 'linear');
            }
      });
      
      $(".diagram-frame-alt").hover(function(){
            $(".diagram-frame-alt .frame-front").animate({
                  'opacity': '1.0'
                  }, {queue: false}
            );
      });
      
     if (typeof window.localStorage == 'undefined' || typeof window.sessionStorage == 'undefined') (function () {
 
      var Storage = function (type) {
        function createCookie(name, value, days) {
          var date, expires;
       
          if (days) {
            date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            expires = "; expires="+date.toGMTString();
          } else {
            expires = "";
          }
          document.cookie = name+"="+value+expires+"; path=/";
        }
       
        function readCookie(name) {
          var nameEQ = name + "=",
              ca = document.cookie.split(';'),
              i, c;
       
          for (i=0; i < ca.length; i++) {
            c = ca[i];
            while (c.charAt(0)==' ') {
              c = c.substring(1,c.length);
            }
       
            if (c.indexOf(nameEQ) == 0) {
              return c.substring(nameEQ.length,c.length);
            }
          }
          return null;
        }
        
        function setData(data) {
          data = JSON.stringify(data);
          if (type == 'session') {
            window.name = data;
          } else {
            createCookie('localStorage', data, 365);
          }
        }
        
        function clearData() {
          if (type == 'session') {
            window.name = '';
          } else {
            createCookie('localStorage', '', 365);
          }
        }
        
        function getData() {
          var data = type == 'session' ? window.name : readCookie('localStorage');
          return data ? JSON.parse(data) : {};
        }
       
       
        // initialise if there's already data
        var data = getData();
       
        return {
          length: 0,
          clear: function () {
            data = {};
            this.length = 0;
            clearData();
          },
          getItem: function (key) {
            return data[key] === undefined ? null : data[key];
          },
          key: function (i) {
            // not perfect, but works
            var ctr = 0;
            for (var k in data) {
              if (ctr == i) return k;
              else ctr++;
            }
            return null;
          },
          removeItem: function (key) {
            delete data[key];
            this.length--;
            setData(data);
          },
          setItem: function (key, value) {
            data[key] = value+''; // forces the value to a string
            this.length++;
            setData(data);
          }
        };
      };
       
      if (typeof window.localStorage == 'undefined') window.localStorage = new Storage('local');
      if (typeof window.sessionStorage == 'undefined') window.sessionStorage = new Storage('session');
       
      })();
      
});