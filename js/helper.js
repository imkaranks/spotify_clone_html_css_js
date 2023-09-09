const $audioElement = document.querySelector("audio");
const $songPlayer = document.querySelector('.song-player');
const $songList = document.querySelector(".playlists");
const $duration = document.getElementById("song-total-time");
const $songName = document.querySelector(".song-details h3");
const $artist = document.querySelector(".song-details p");

export function createPlaylist (img, name, desc) {
  return (
    `<img src="${img}" alt="song-thumbnail">
    <h3>${name}</h3>
    <p>${desc}</p>
    <div class="song-play-icon">
      <i class="fa-solid fa-play"></i>
    </div>`
  );
}

export function formatDuration(time) {
  const leadingZeroFormatter =
    new Intl.NumberFormat(
      undefined,
      { minimumIntegerDigits: 2 }
    );

  const seconds = Math.round(time % 60);
  const minutes = Math.round(time / 60) % 60;
  const hours = Math.round(time / 3600);

  return hours === 0
    ? `${minutes}:${leadingZeroFormatter.format(seconds)}`
    : `${hours}:${leadingZeroFormatter.format(minutes)}:${leadingZeroFormatter.format(seconds)}`;
}

export function loadSectionDOM(title, playlists, options={}) {
  const section = document.createElement("section");
  section.className = "section";
  const container = document.createElement("div");
  const sectionHeader = document.createElement("div");
  const sectionTitle = document.createElement("h2");
  const sectionLink = document.createElement("a");
  const playlistWrapper = document.createElement("div");
  playlistWrapper.className = "grid-playlist";
  if (options?.columns === 'auto-fit') {
    playlistWrapper.style.setProperty('--columns', options?.columns)
  }
  playlistWrapper.setAttribute("id", title);

  sectionHeader.className = "section-header";
  sectionHeader.appendChild(sectionTitle);
  sectionTitle.textContent = title;
  sectionTitle.className = "section-title";

  if (!options?.linkHidden) {
    sectionLink.className = "global-link";
    sectionLink.textContent = "show all";
    sectionLink.href = `playlist.html?name=${title}`;
    sectionHeader.appendChild(sectionLink);
  }

  container.className = "container";
  container.appendChild(sectionHeader);
  section.appendChild(container);

  container.appendChild(playlistWrapper)
  playlists.map(playlist => playlistWrapper.appendChild(loadPlaylistDOM(playlist, title))).join("")
  $songList?.appendChild(section);
}

export function loadPlaylistDOM(playlist, title) {
  const playListDiv = document.createElement("div");
  playListDiv.className = "playlist-card"
  playListDiv.addEventListener("click", () => location.href = `songlist.html?id=${playlist.id}&name=${title}`)

  playListDiv.innerHTML = createPlaylist(playlist.img,playlist.name,playlist.desc)
  return playListDiv;
}

export function shuffle(array) {
  const newArray = [...array];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
}

export function randomize(arr) {
  let i, j, tmp;
  for (i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

export function getQueryParams(query) {
  let queryParams = new URLSearchParams(window.location.search);
  return queryParams.get(query);
}