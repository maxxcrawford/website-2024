(function() {
	"use strict";

	function updateCopywriteYear() {
        const copywriteWrapper = document.querySelector(".copyright-year");
        const currentYear = new Date().getFullYear();
        copywriteWrapper.textContent = currentYear;
    }

    function init() {
        updateCopywriteYear()
    }
    
    init();
	
})();