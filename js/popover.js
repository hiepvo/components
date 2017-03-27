/**
 * Created by hiepvo on 2/23/17.
 */
(function(){
  var init = {};

  var links  = document.querySelectorAll('.popover-text');
  var closes = document.querySelectorAll('.s-close');

  for(var i = 0; i < links.length; i++){
    links[i].addEventListener('click', openSlideOver, false);
    closes[i].addEventListener('click', closeSlideOver, false);
  }

  function clearPopup(){
    var popups = document.querySelectorAll('.popover');
    var i      = 0;
    for(i; i < popups.length; i++){
      if(popups[i].className.indexOf('hide') === -1){
        hide(popups[i], 0);
        removeClass(popups[i].children[0], 'animated-height');
        removeClass(popups[i].children[0].children[0], 'popover__content--visible');
        addClass(popups[i].children[0].children[0], 'popover__content--invisible');
      }
    }
  }

  function closeSlideOver(e){
    var el             = e.target;
    var contentWrapper = el.parentNode;
    var content        = contentWrapper.children[0];
    var caption        = contentWrapper.nextElementSibling;
    hide(contentWrapper.parentNode, 0);
    removeClass(contentWrapper.parentNode, 'swing');
    removeClass(contentWrapper, 'animated-height');
    removeClass(content, 'popover__content--visible');
    addClass(content, 'popover__content--invisible');
    removeClass(caption, 'swing');

  }

  function openSlideOver(){
    clearPopup()

    var animatedHeight = document.querySelector('#' + this.htmlFor + ' .popover__content');
    var content        = document.querySelector('#' + this.htmlFor + ' .popover__content>div');

    var el = document.getElementById(this.htmlFor);

    placeEl(el, this.offsetLeft, this.offsetTop - 10);
    show(el, 0);
    addClass(animatedHeight, 'animated-height');
    addClass(el, 'swing');
    removeClass(content, 'popover__content--invisible');
    addClass(content, 'popover__content--visible');

  }

  //place element in specific cords
  function placeEl(el, x_pos, y_pos){

    el.style.left = x_pos - el.offsetWidth / 3 + 'px';
    el.style.top  = y_pos + 'px';
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

  /*********** Helpers ***************/

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

