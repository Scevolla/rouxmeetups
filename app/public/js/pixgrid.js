var pixGrid = function() {
    var myNode = document.querySelector('.pixgrid');
    if (!myNode) {
        return;
    }

    myNode.addEventListener("click", function(e) {
        if ("IMG" !== e.target.tagName) {
            return;
        }

        var myOverlay = document.createElement('div');
        myOverlay.id = 'overlay';
        myOverlay.style.position = 'fixed'; 
        myOverlay.style.top = 0;
        myOverlay.style.left = 0;
        myOverlay.style.width = '100%';
        myOverlay.style.height = '100%';
        myOverlay.style.backgroundColor = 'rgba(0,0,0,0.7)';
        myOverlay.style.cursor = 'pointer';
        document.body.appendChild(myOverlay); 

        var imageSrc = e.target.src;
        var largeImage = document.createElement("img");
        largeImage.id = "largeImage";
        largeImage.src = imageSrc.substr(0, imageSrc.length - 7) + ".jpg"; 
        largeImage.style.display = "block";
        largeImage.style.position = "absolute";
        largeImage.addEventListener("load", function() {
            adjustImageSize();
            centerImage();
            myOverlay.appendChild(largeImage);
            document.body.style.paddingRight = 
                (window.innerWidth - document.documentElement.clientWidth) + 'px';
            document.body.style.overflow = 'hidden';           
        });
        document.body.addEventListener('mousedown', hideImage, false);
        document.body.addEventListener('keydown', hideImage, false);
        window.addEventListener('resize', centerImage, false);
        
        function centerImage() {
            var myDifX = (window.innerWidth - largeImage.width) / 2; 
            var myDifY = (window.innerHeight - largeImage.height) / 2;
            largeImage.style.top = myDifY + "px";
            largeImage.style.left = myDifX + "px"; 
        }
        function adjustImageSize() {
            if (largeImage.height > window.innerHeight) {
                largeImage.ratio = window.innerHeight / largeImage.height;
                largeImage.height = largeImage.height * largeImage.ratio;
                largeImage.width = largeImage.width * largeImage.ratio;
            }
            if (largeImage.width > window.innerWidth) {
                largeImage.ratio = window.innerWidth / largeImage.width;
                largeImage.height = largeImage.height * largeImage.ratio;
                largeImage.width = largeImage.width * largeImage.ratio;
            }
            centerImage(largeImage);
        }
        function hideImage() {
            if (myOverlay) {
                window.removeEventListener('resize', centerImage, false);
                document.body.removeEventListener('mousedown', hideImage, false);
                document.body.removeEventListener('keydown', hideImage, false);
                myOverlay.parentNode.removeChild(myOverlay);
                document.body.style.overflow = '';
                document.body.style.paddingRight = '';
            }
        }
    }, false);
}();