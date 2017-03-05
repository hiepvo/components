(function(){

	var dots = document.querySelectorAll('.dot');

	for(var i = 0; i < dots.length; i++){
		dots[i].addEventListener('click', function(e){
			e.preventDefault();
			var parent = e.target.parentNode.parentNode;
		
			if(!this.classList.contains('active')){
				parent.querySelector('.active').classList.remove('active');
				this.classList.add('active');
			}
		})
	}
	
})(window);