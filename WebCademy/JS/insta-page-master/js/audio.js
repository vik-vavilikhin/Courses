$(document).ready(function(){

  const audio = $('#audioTreck')[0];

  $playBtn = $('#audio-play');
  $pauseBtn = $('#audio-pause');

  $audioControl = $('[data-type="audio-control"]');

  function initAudioPlayer() {
    $playBtn.parent().show();
    audio.loop = true;
    $audioControl.click(function() {
      if (audio.paused) {
        audio.play();
        $playBtn.parent().hide();
        $pauseBtn.parent().show();
      } else {
        audio.pause();
        $pauseBtn.parent().hide();
        $playBtn.parent().show();
        
      }
    });
  }
  initAudioPlayer();
});
