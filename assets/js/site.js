// Shared by every page: mobile menu and FAQ state.
(function(){
  var btn=document.getElementById('rkg-burger'),menu=document.getElementById('rkg-mnav');
  if(btn&&menu){
    var set=function(open){menu.hidden=!open;btn.setAttribute('aria-expanded',open);btn.setAttribute('aria-label',open?'Close menu':'Open menu')};
    btn.addEventListener('click',function(){set(menu.hidden)});
    menu.addEventListener('click',function(e){if(e.target.closest('a'))set(false)});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!menu.hidden){set(false);btn.focus()}});
    document.addEventListener('click',function(e){if(!menu.hidden&&!e.target.closest('.rkg-nav'))set(false)});
    window.addEventListener('resize',function(){if(window.innerWidth>900)set(false)});
  }
  document.querySelectorAll('.rkg-faq-item > button').forEach(function(b){
    b.setAttribute('aria-expanded','false');
    b.addEventListener('click',function(){b.parentElement.classList.toggle('open');b.setAttribute('aria-expanded',b.parentElement.classList.contains('open'))});
  });
})();
