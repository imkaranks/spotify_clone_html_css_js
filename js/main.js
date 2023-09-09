import {
  formatDuration,
  loadSectionDOM
} from "./helper.js";

const $audioElement = document.querySelector("audio");
const $songList = document.querySelector(".playlists");
const $songPlayer = document.querySelector('.song-player');
const $currentTime = document.getElementById("song-current-time");
const $timeline = document.querySelector(".song-timeline");
const $duration = document.getElementById("song-total-time");
const $songName = document.querySelector(".song-details h3");
const $artist = document.querySelector(".song-details p");
const $playPauseBtn = document.querySelector(".btn-play-pause");
const $prevBtn = document.querySelector(".btn-prev-song");
const $nextBtn = document.querySelector(".btn-next-song");
const $replayBtn = document.querySelector(".btn-auto-replay");
const $volumeSlider = document.querySelector('.song-volume > input[type="range"]');
let currentSongId = null;
let currentSongList = [];

window.addEventListener("load", async () => {
  const response = await fetch("./data.json");
  const data = await response.json();
  for (let section in data) {
    loadSectionDOM(section, data[section]);
  }
  $songList?.appendChild(document.createElement("hr"));
});

window.addEventListener("load", () => {
  updateAudioElement("./songs/Au5-Last-Heroes-Lush.mp3");
  updateSongDetails("Au5 last heroes lush");
  $duration.textContent = "5:00";
});

$playPauseBtn?.addEventListener("click", togglePlay);

$prevBtn?.addEventListener("click", skipBack);

function skipBack() {
  currentSongId =
    currentSongId > 1
      ? currentSongId - 1
      : currentSongList.length;

  let prevSong = {};
  currentSongList.forEach(song => {
    if (song.id == currentSongId) {
      prevSong = song;
    }
  });

  updateAudioElement(prevSong.src);
  updateSongDetails(prevSong.title);
  $audioElement.play();
}

$nextBtn?.addEventListener("click", skipNext);

function skipNext() {
  if (currentSongId < currentSongList.length) {
    currentSongId++
  } else {
    currentSongId = 1;
  }

  let nextSong = {};
  currentSongList.forEach(song => {
    if (song.id == currentSongId) {
      nextSong = song;
    }
  });

  updateAudioElement(nextSong.src);
  updateSongDetails(nextSong.title);
  $audioElement.play();
}

$replayBtn?.addEventListener("click", replay);

function updateAudioElement(source) {
  $audioElement.id = 'audio-player';
  $audioElement.controls = 'controls';
  $audioElement.src = source;
  $audioElement.type = 'audio/mpeg';
}

$audioElement?.addEventListener("timeupdate", () => {
  const timePassed = ($audioElement.currentTime / $audioElement.duration) * 100;
  if (timePassed == 100) {
    skipNext();
  }
  $currentTime.textContent = formatDuration($audioElement.currentTime);
  updateTimeline(timePassed);
});

function updateSongDetails(name, artist = null) {
  $songName.textContent = name;
  $artist.textContent = artist || "NCS";
}

function togglePlay() {
  if ($audioElement.paused) {
    $audioElement.play();
    $songPlayer.classList.add("play");
  } else {
    $audioElement.pause();
    $songPlayer.classList.remove("play");
  }
}

function replay() {
  $audioElement.currentTime = 0;
  $audioElement.play();
}

function updateTimeline(time) {
  $timeline.setAttribute("style", `--current-time: ${time}%`);
}

export function loadSongDom(songs, title) {
  currentSongList = [...songs];
  const songHeader = document.querySelector(".song-header h2");
  songHeader.textContent = title;
  const songContainer = document.querySelector(".song-container")
  songContainer.innerHTML = '<div class="song"><div class="song-sno">#</div><div class="song-name">Title</div><div class="song-artist">Artist</div><div class="song-duration">Duration</div></div>';
  songs.map((song, index) => {
    songContainer.appendChild(createSongItem(song, index+1));
  }).join("");
}

function createSongItem(song, index) {
  const songDiv = document.createElement("div");
  songDiv.className = "song";
  const songTitleSno = document.createElement("div");
  songTitleSno.className = "song-sno";
  songDiv.appendChild(songTitleSno);
  const songTitleDiv = document.createElement("div");
  songTitleDiv.className = "song-name";
  songDiv.appendChild(songTitleDiv);
  const songArtistDiv = document.createElement("div");
  songArtistDiv.className = "song-artist";
  songDiv.appendChild(songArtistDiv);
  const songDurationDiv = document.createElement("div");
  songDurationDiv.className = "song-duration";
  songDiv.appendChild(songDurationDiv);

  songDiv.dataset.id = song.id;
  songDiv.dataset.source = song.src;
  songTitleSno.textContent = index;
  songTitleDiv.textContent = song.title;
  songArtistDiv.textContent = song.artist;
  songDurationDiv.textContent = song.duration;
  songDiv.addEventListener("click", () => {
    const source = songDiv.getAttribute("data-source");
    $duration.textContent = song.duration;
    if (currentSongId !== null) {
      const $songItem = document.querySelector(`.song[data-id="${currentSongId}"]`);
      $songItem.classList.remove('active');
    }
    songDiv.classList.add("active");
    currentSongId = songDiv.getAttribute("data-id");
    updateAudioElement(source);
    updateSongDetails(songDiv.querySelector(".song-name").textContent);
    togglePlay();
  });
  return songDiv;
}

$volumeSlider.addEventListener('input', (event) => {
  const $target = event.target;
  const { value } = $target;
  $target.setAttribute('style', `--volume: ${value}%`);
  $audioElement.volume = value / 100;
});