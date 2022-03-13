let playBtn = document.querySelectorAll('i');
let range_song = document.querySelectorAll('.sound_range');
let time_appear = document.querySelectorAll('.time');

let track = document.createElement('audio');

let trackDuration, timer, isPlaying = false, min, sec;

let newDate;

playBtn.forEach((el)=>{
  el.innerHTML = '<i class="fa fa-play"></i>';
})

let a = {
    name: "first song",
    path: "../assets/music/song/song1.mp3",
    singer: "1"
  }


function loadTrack(){
	track.src = a.path;
  track.load();

	timer = setInterval(range_slider ,1000);
}

loadTrack();

function reset_slider(){
  slider.value = 0;
}

function playSong(){
  console.log(isPlaying)
  
  if (isPlaying){
    track.pause();
    playBtn.forEach((el)=>{
      el.innerHTML = '<i class="fa fa-play"></i>';
    })

    isPlaying = false
  }else{

    track.play();

    playBtn.forEach((el)=>{
      el.innerHTML = '<i class="fa fa-solid fa-pause"></i>';
    })
    isPlaying = true
  }
} 

function change_duration(){
  range_song.forEach(el =>{
    slider_position = el.value * (track.duration / 100);
    track.currentTime = slider_position;
  })
}

function timeTracker(time, m, s){
  if (time < 60){
    m = '00';
    if (time < 10){
      s = '0' + `${time}`
    }else{
      s = time
    }
  }else if(time >59 && time < 120){
    m = '01'
    if ((time - 60) < 10){  
      s = '0' + `${time - 60}`
    }else{
      s = `${time - 60}`
    }
  }else if(time >119 && time < 180){
    m = '02'
    if ((time - 120) < 10){
      s = '0' + `${time - 120}`
    }else{
      s = time - 120
    }
  }else if(time >179 && time < 240){
    m = '03'
    if ((time - 180) < 10){
      s = '0' + `${time - 180}`
    }else{
      s = time - 180
    }
  }
  return {
    time, m, s
  }
}

function range_slider(){
	let position = 0;
        
		if(!isNaN(track.duration)){
      leftT = track.currentTime.toFixed(0);
      rightT =  track.duration.toFixed(0);
      let m = 0, s = 0, mm = 0, ss = 0;

      let time1 = timeTracker(leftT, m, s)
      let time2 = timeTracker(rightT, mm, ss)

		   time =  track.currentTime.toFixed(0) + "/" + track.duration.toFixed(0);
		   position = track.currentTime * (100 / track.duration);

       time_appear.forEach((el)=>{
         el.innerText  = time1.m + ':' + time1.s + '-' + time2.m + ":" + time2.s
       })
       range_song.forEach(el=>{
        el.value = position
       })
	  }

    if(track.ended){
		    loadTrack();
		    playsong();
        isPlaying = false
	  }
}
