Session.set("imageLimit", 9);
lastScrollTop = 0;

$(window).scroll(function(event){
	//check if we are near the bottom of the page 
	if($(window).scrollTop() + $(window).height() > $(document).height() - 100){
		//where are we on the page
		var scrollTop = $(this).scrollTop();
		//test if we are going down
		if (scrollTop > lastScrollTop){
			//yes we are scrolling down
			Session.set("imageLimit",Session.get("imageLimit") + 3);
		}//end of if (new scrollTop)
		lastScrollTop = scrollTop;	
	}//end of (height check)
});	
