// manage a webapp.
// place <link rel="app-manifest" href="path-to-manifest.webapp"> in your <head>
// mozApp.install() attempts installation
// mozApp.uninstall() removes
// mozApp.isRunning() indicates whether the app is currently installed and open
var mozApp = (function() {
    var manLink = document.querySelector('link[rel="app-manifest"]'),
        manifestURL = manLink.href;

    var self = false;

    var selfReq = navigator.mozApps.getSelf();
    selfReq.onsuccess = function() {
        self = selfReq.result;
    };

    function isRunning() {
        return !!self;
    }
    function install(success, error) {
        var r = navigator.mozApps.install(manifestURL);
        r.onsuccess = success;
        r.onerror = error;
        r.addEventListener('error', function() {
            alert('Installation Failed with Error: ' + this.error.name);
        });
        return r;
    }
    function uninstall() {
        if (self)
            return self.uninstall();
    }

    return {
        isRunning: isRunning,
        install: install,
        uninstall: uninstall,
        manifest: manifestURL
    };
})();

$(function() {
    $('button.installme').click(function(e) {
        e.preventDefault();
        mozApp.install();
    });
});
