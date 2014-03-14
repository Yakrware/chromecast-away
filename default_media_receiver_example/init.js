// Generated by CoffeeScript 1.7.0
(function() {
  var attachMediaControls, castAway;

  castAway = new CastAway();

  castAway.initialize({
    receiversAvailable: function() {
      return castConnection.requestSession({
        success: function(receiver) {
          var media;
          media = {
            url: 'https://s3.amazonaws.com/roysfunfun/ghostbuster_ringtone.mp3',
            contentType: 'audio/mpeg'
          };
          return receiver.load(media, {
            success: function(controls) {
              return attachMediaControls(receiver, controls);
            },
            error: function(data) {}
          });
        },
        error: function(data) {}
      });
    },
    receiversUnAvailable: function() {},
    error: function(data) {}
  });

  attachMediaControls = function(receiver, controls) {
    document.getElementsByClassName('pause')[0].addEventListener('click', function(ev) {
      return controls.pause();
    });
    document.getElementsByClassName('play')[0].addEventListener('click', function(ev) {
      return controls.play();
    });
    return document.getElementsByClassName('release')[0].addEventListener('click', function(ev) {
      return receiver.release();
    });
  };

}).call(this);