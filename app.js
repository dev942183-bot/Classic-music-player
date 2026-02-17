const API_KEY = "AIzaSyAfJIHop06R94612CGPmMiTByy5hUarL1M";

let player;

function onYouTubeIframeAPIReady(){
player = new YT.Player('player',{
height:'0',
width:'0',
videoId:'',
playerVars:{playsinline:1}
});
}

function searchMusic(){
let query = document.getElementById("searchInput").value;

fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=8&q=${query}&key=${API_KEY}`)
.then(res => res.json())
.then(data => {

let results = document.getElementById("results");
results.innerHTML = "";

data.items.forEach(item => {

let videoId = item.id.videoId;
let title = item.snippet.title;
let thumb = item.snippet.thumbnails.medium.url;

let card = document.createElement("div");
card.className = "card";
card.innerHTML = `<img src="${thumb}"><div>${title}</div>`;
card.onclick = function(){
playVideo(videoId,title);
};

results.appendChild(card);

});

});
}

function playVideo(id,title){
player.loadVideoById(id);
document.getElementById("nowPlaying").innerText = "Playing: " + title;
}

function goHome(){
document.getElementById("results").innerHTML = "";
}

function focusSearch(){
document.getElementById("searchInput").focus();
}

function clearResults(){
document.getElementById("results").innerHTML = "";
}