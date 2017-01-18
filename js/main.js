(function () {
    // Display the controls on Android devices
    if (navigator.userAgent.indexOf('Android') >=0 ) {
        $('video').each(function (i, video) {
            video.controls = true;
        });
    }

    // Disabled console.log because jquery.typer is annoying
    window.console = console || {};
    window.console.log = function(){};
    $('[data-typer-targets]').typer();
})();
