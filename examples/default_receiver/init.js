// Generated by CoffeeScript 1.7.1
(function() {
  var castAway, mediaConfig, sessionView;

  sessionView = new MediaSessionView();

  mediaConfig = {
    music: {
      url: 'https://s3.amazonaws.com/roysfunfun/ghostbuster_ringtone.mp3',
      contentType: 'audio/mpeg',
      albumName: 'Album name',
      albumArtist: 'Album artist',
      artist: 'Music artist',
      composer: 'Composer',
      images: ["http://www.biography.com/imported/images/Biography/Images/Profiles/S/Will-Smith-9542165-1-402.jpg"]
    },
    tvShow: {
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/ED_1280.mp4',
      title: 'Elephant Dream',
      seriesTitle: 'TV show name here',
      images: ['http://img1.wikia.nocookie.net/__cb20130823094044/disney/images/a/a2/Will-smith-image3.jpg'],
      contentType: 'video/mp4'
    },
    movie: {
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/tears_of_steel_1080p.mov',
      title: 'Tears of Steel',
      images: ['http://img1.wikia.nocookie.net/__cb20130823094044/disney/images/a/a2/Will-smith-image3.jpg'],
      subtitle: 'subtitle',
      studio: 'By Blender Foundation',
      releaseYear: '2006',
      contentType: 'video/mp4'
    },
    photo: {
      url: 'http://www.videws.com/eureka/castv2/images/San_Francisco_Fog.jpg',
      title: 'San Francisco Fog',
      contentType: 'image/jpg',
      artist: 'Photo artist',
      location: 'San Francisco',
      longitude: 37.7833,
      latitude: 122.4167,
      width: 1728,
      height: 1152,
      creationDateTime: '1999'
    }
  };

  castAway = new CastAway();

  castAway.on('receivers:available', function() {
    console.log('receivers available, safe to request a session');
    return $('.cast').click(function(ev) {
      var $el;
      $el = $(ev.currentTarget);
      return castAway.requestSession(function(err, session) {
        var mediaType;
        if (err) {
          return $el.addClass('error');
        } else {
          $el.addClass('active');
          sessionView.updateSession(session);
          session.on('release', function() {
            return $el.removeClass('active');
          });
          mediaType = $el.data('media-type');
          return session[mediaType](mediaConfig[mediaType], function(err, controls) {
            if (err) {
              return $el.addClass('error');
            } else {
              return sessionView.attachEvents(session, controls);
            }
          });
        }
      });
    });
  });

  castAway.on('receivers:unavailable', function() {
    console.log('no receivers found');
    return $('.name').text('No receivers found');
  });

  castAway.on('existingMediaFound', function(session, controls) {
    console.log('found existing media session');
    sessionView.updateSession(session);
    return sessionView.attachEvents(session, controls);
  });

  castAway.initialize(function(err, data) {
    if (err) {
      return console.log('unsuccessfully initialized');
    } else {
      return console.log('successfully initialized');
    }
  });

}).call(this);
