let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');


let isPlaying = false;
let isRandom = false;
let updateTimer;
var track_index = 0;


genrePlaylists = {
    pop: [{ index: 1, song: 'Pop Song 1' }, { index: 2, song: 'Pop Song 2' }, { index: 3, song: 'Pop Song 3' }],
    rock: [{ index: 4, song: 'Rock Song 1' }, { index: 5, song: 'Rock Song 2' }, { index: 6, song: 'Rock Song 3' }],
    hiphop: [{ index: 7, song: 'Hip Hop Song 1' }, { index: 8, song: 'Hip Hop Song 2' }, { index: 9, song: 'Hip Hop Song 3' }],
    electronic: [{ index: 10, song: 'Electronic Song 1' }, { index: 11, song: 'Electronic Song 2' }, { index: 12, song: 'Electronic Song 3' }]
};

const moodPlaylists = {
    happy: [{ index: 13, song: 'Happy Song 1' }, { index: 14, song: 'Happy Song 2' }, { index: 15, song: 'Happy Song 3' }],
    sad: [{ index: 16, song: 'Sad Song 1' }, { index: 17, song: 'Sad Song 2' }, { index: 18, song: 'Sad Song 3' }],
    energetic: [{ index: 19, song: 'Energetic Song 1' }, { index: 20, song: 'Energetic Song 2' }, { index: 21, song: 'Energetic Song 3' }],
    calm: [{ index: 22, song: 'Calm Song 1' }, { index: 23, song: 'Calm Song 2' }, { index: 24, song: 'Calm Song 3' }]
};

function showMoodSection() {
    document.getElementById("mood-section").style.display = "block";
    document.getElementById("genre-section").style.display = "none";
    document.getElementById("mood-playlist-output").style.display = "none";
    document.getElementById("genre-playlist-output").style.display = "none";
}

function showGenreSection() {
    document.getElementById("mood-section").style.display = "none";
    document.getElementById("genre-section").style.display = "block";
    document.getElementById("mood-playlist-output").style.display = "none";
    document.getElementById("genre-playlist-output").style.display = "none";
}

function generateMoodPlaylist(moodPlaylists) {
    var mood = document.getElementById('mood').value;

    var selectedPlaylist = moodPlaylists[mood];
    displayPlaylist(selectedPlaylist, 'mood-playlist-output');
}

function generateGenrePlaylist(genrePlaylists) {
    var genre = document.getElementById('genre').value;
    var selectedPlaylist = genrePlaylists[genre];
    displayPlaylist(selectedPlaylist, 'genre-playlist-output');
}

function displayPlaylist(playlist, outputElementId) {
    var playlistOutput = document.getElementById(outputElementId);
    playlistOutput.innerHTML = '<h2>Your Playlist:</h2>';
    playlistOutput.innerHTML += '<ul>';
    playlist.forEach(function (song) {
        playlistOutput.innerHTML += `<li><button onclick="getSongIndex(${song.index})">${song.song}</button></li>`;
    });
    playlistOutput.innerHTML += '</ul>';
    playlistOutput.style.display = "block";
}

function showDiv(showId, hideId) {
    document.getElementById(showId).style.display = 'block';
    document.getElementById(hideId).style.display = 'none';
}
function initial(){
    loadTrack(track_index)
    showDiv('div2', 'div1')
}
function getSongIndex(index) {
    track_index = index-1
    loadTrack(track_index);
    showDiv('div2', 'div1')
    playTrack()
}

const music_list = [
    {
        img : 'images/Dynamite.jpg',
        name : 'Dynamite',
        artist : 'BTS',
        music : 'music/Dynamite.mp3'
    },
    {
        img : 'images/Money.webp',
        name : 'Money',
        artist : 'Lisa',
        music : 'music/Money.mp3'
    },
    {
        img : 'images/KaalaChasma.jpg',
        name : 'Kala Chashma',
        artist : 'Prem,Badshah,Kam,Neha,Indeep',
        music : 'music/KaalaChasma.mp3'
    },
    {
        img : 'images/RockOn.jpg',
        name : 'Rock On',
        artist : 'Farhan Akhtar',
        music : 'music/RockOn.mp3'
    },
    {
        img : 'images/SaaddaHaq.jpg',
        name : 'Saadda Haq',
        artist : 'Mohit Chauhan',
        music : 'music/SaaddaHaq.mp3'
    },
    {
        img : 'images/Believer.jpg',
        name : 'Believer',
        artist : 'Imagine Dragons',
        music : 'music/Believer.mp3'
    },
    {
        img : 'images/BlueEyes.jpg',
        name : 'Blue Eyes',
        artist : 'Yo Yo Honey Singh',
        music : 'music/BlueEyes.mp3'
    },
    {
        img : 'images/SHOKILALA.jpg',
        name : 'SHOKILALA',
        artist : 'Chandan Shetty',
        music : 'music/SHOKILALA.mp3'
    },
    {
        img : 'images/UptownFunk.jpg',
        name : 'UptownFunk',
        artist : 'Mark Ronson',
        music : 'music/UptownFunk.mp3'
    },
    {
        img : 'images/faded.png',
        name : 'Faded',
        artist : 'Alan Walker',
        music : 'music/Faded.mp3'
    },
    {
        img : 'images/Spectre.jpg',
        name : 'Spectre',
        artist : 'Alan Walker',
        music : 'music/Spectre.mp3'
    },
    {
        img : 'images/Alone.jpg',
        name : 'Alone',
        artist : 'Alan Walker',
        music : 'music/Alone.mp3'
    },
    {
        img : 'images/Cupid.jpg',
        name : 'Cupid',
        artist : 'FIFTY FIFTY',
        music : 'music/Cupid.mp3'
    },
    {
        img : 'images/Universe.jpg',
        name : 'Universe',
        artist : 'Coldplay X BTS',
        music : 'music/Universe.mp3'
    },
    {
        img : 'images/HOME.jpg',
        name : 'HOME',
        artist : 'BTS',
        music : 'music/HOME.mp3'
    },
    {
        img : 'images/AnotherLove.jpg',
        name : 'Another Love',
        artist : 'Tom Odell',
        music : 'music/AnotherLove.mp3'
    },
    {
        img : 'images/KalHoNaaHo.jpg',
        name : 'Kal Ho Naa Ho',
        artist : 'Sonu Nigam|Karan J',
        music : 'music/KalHoNaaHo.mp3'
    },
    {
        img : 'images/SaptaSagaradaacheEllo.jpg',
        name : 'Sapta Sagaradaache Ello',
        artist : 'Hemanth M Rao| Charan Raj | Kapil',
        music : 'music/SaptaSagaradaacheEllo.mp3'
    },
    {
        img : 'images/LungiDance.jpg',
        name : 'Lungi Dance',
        artist : 'Honey Singh',
        music : 'music/LungiDance.mp3'
    },
    {
        img : 'images/BadtameezDil.jpg',
        name : 'Badtameez Dil',
        artist : 'PRITAM',
        music : 'music/BadtameezDil.mp3'
    },
    {
        img : 'images/Jackie.jpg',
        name : 'Jackie',
        artist : 'Bhavana Menon | Yogaraj Bhat',
        music : 'music/Jackie.mp3'
    },
    {
        img : 'images/UntilIFoundYou.jpg',
        name : 'Until I Found You',
        artist : 'Stephen Sanchez',
        music : 'music/UntilIFoundYou.mp3'
    },
    {
        img : 'images/Kadalanu.jpg',
        name : 'Kadalanu',
        artist : 'Charanraj | Hemanth Rao',
        music : 'music/Kadalanu.mp3'
    },
    {
        img : 'images/InnunuBekagide.jpg',
        name : 'Innunu Bekagide',
        artist : 'Praveen I Ananya I Vinay',
        music : 'music/InnunuBekagide.mp3'
    },
];



function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);

}

function back(){
    pauseTrack()
    showDiv('div1', 'div2')
}
function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    console.log(track_index)
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}
