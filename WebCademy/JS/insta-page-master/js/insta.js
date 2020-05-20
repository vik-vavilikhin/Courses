$(document).ready(function(){ 

  const userFeed = new Instafeed({
    get:         'user',
    userId:      '3026807255',
    accessToken: '3026807255.1677ed0.cf121a9ca3534bcda9ed45e3d6002119',
    resolution:  'standard_resolution',
    limit:       33
  });
  userFeed.run();

  setTimeout(function() {
    $('#instafeed').addClass('shadowed');
  }, 1000)

});