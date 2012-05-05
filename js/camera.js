define(function () {

var takePicture = document.querySelector("#take-picture"),
    showPicture = document.querySelector("#canvas");

if (takePicture && showPicture) {
    // Set events
    takePicture.onchange = function (event) {
        // Get a reference to the taken picture or chosen file
        var files = event.target.files,
            file;
        if (files && files.length > 0) {
            file = files[0];
            try {
                // Get window.URL object
                var URL = window.URL || window.webkitURL;

                // Create ObjectURL
                var imgURL = URL.createObjectURL(file);

                // Set img src to ObjectURL
                showPicture.src = imgURL;

                // Load image into Caman
                Caman("#canvas", function() {
                    this.render();
                });
            }
            catch (e) {
                try {
                    // Fallback if createObjectURL is not supported
                    var fileReader = new FileReader();
                    fileReader.onload = function(event) {
                        showPicture.src = event.target.result;
                    };
                    fileReader.readAsDataURL(file);
                }
                catch (e) {
                    var error = document.querySelector("#error");
                    if (error) {
                        error.innerHTML = "Neither createObjectURL or FileReader are supported";
                    }
                }
            }

            $('#filters,#rotate').show();
        }
    };
}

});