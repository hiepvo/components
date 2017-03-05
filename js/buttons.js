/**
 * Created by hiepvo on 1/24/17.
 */
(function(){
  var init = {};

  var transitionEnd  = transitionEndEventName();
  //var btnWaveEffects = document.querySelectorAll('.waves-effect--border');
  var btnWaveEffects = document.querySelectorAll('[class*="waves-effect"]');

  var cleanUp = function(){
    var effectShowed = document.querySelectorAll('.waves-effect--show');
    setTimeout(function(){
      for(var i = 0; i < effectShowed.length; i++){
        effectShowed[i].remove();
      }
    }, 500);
  };

  function getElemPos(elem){
    // (1) Get the enclosing rectangle
    var box     = elem.getBoundingClientRect();
    var body    = document.body;
    var doc = document.documentElement;
    // (2) Calculate the page scroll.
    // All browsers except IE<9 support `pageXOffset/pageYOffset`, and in IE when DOCTYPE is set,
    // the scroll can be taken from documentElement(<html>), otherwise from `body` - so we take what we can.
    var scrollTop  = window.pageYOffset || doc.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || doc.scrollLeft || body.scrollLeft;
    // (3) The document (`html` or `body`) can be shifted from left-upper corner in IE. Get the shift.
    var clientTop  = doc.clientTop || body.clientTop || 0;
    var clientLeft = doc.clientLeft || body.clientLeft || 0;
    // (4) Add scrolls to window-relative coordinates
    // and subtract the shift of `html/body` to get coordinates in the whole document.
    var top        = box.top + scrollTop - clientTop;
    var left       = box.left + scrollLeft - clientLeft;
    return {
      top: Math.round(top),
      left: Math.round(left)
    };
  }

  var addWaveEffect = function(e){
    this.removeEventListener(transitionEnd, addWaveEffect);
    var rect       = getElemPos(this);
    var span       = document.createElement('span');
    if(this.className.indexOf('ring') != -1){
      span.className = 'waves-effect--ring';
    }
    else if(this.className.indexOf('fill') != -1)
      span.className = 'waves-effect--fill';
    else
      return;

    this.appendChild(span);
    var posX         = rect.left,
        posY         = rect.top,
        size  = this.offsetWidth;

    span.style.height = size + 'px';
    span.style.width  = size + 'px';

    var top  = e.pageY - posY - size / 2;
    var left = e.pageX - posX - size / 2;

    span.style.top  = top + 'px';
    span.style.left = left + 'px';


    addClass(span, 'waves-effect--show');
    cleanUp();
  };

  for(var i = 0; i < btnWaveEffects.length; i++){
    btnWaveEffects[i].addEventListener('click', addWaveEffect, false);
  }

  function hide(el, time){
    setTimeout(function(){
      addClass(el, 'hide');
    }, time);
  }

  function show(el, time){
    setTimeout(function(){
      removeClass(el, 'hide');
    }, time);
  }

  function transitionEndEventName(){
    var i,
        undefined,
        el          = document.createElement('div'),
        transitions = {
          'transition': 'transitionend',
          'OTransition': 'otransitionend',  // oTransitionEnd in very old Opera
          'MozTransition': 'transitionend',
          'WebkitTransition': 'webkitTransitionEnd'
        };

    for(i in transitions){
      if(transitions.hasOwnProperty(i) && el.style[i] !== undefined){
        return transitions[i];
      }
    }
  }

  function hasClass(el, className){
    if(el.classList)
      return el.classList.contains(className);
    else
      return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
  }

  function addClass(el, className){
    if(el.classList)
      el.classList.add(className);
    else if(!hasClass(el, className)) el.className += " " + className
  }

  function removeClass(el, className){
    if(el.classList)
      el.classList.remove(className);
    else if(hasClass(el, className)){
      var reg      = new RegExp('(\\s|^)' + className + '(\\s|$)');
      el.className = el.className.replace(reg, ' ')
    }
  }

  /*-------------------------------*/

  window.init = init;

})(window);

