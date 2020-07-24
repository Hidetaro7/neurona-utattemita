import lyrics from "./lyrics.js"

 const startBtn = document.querySelector('#start-btn');
  const stopBtn = document.querySelector('#stop-btn');
  const resultDiv = document.querySelector('#result-div');
  const original = document.querySelector(".original");
  const songsSelector = document.querySelector("#songs-selector")
  const audio = document.createElement("audio");

  /* 曲名をいれておく */
  Object.keys(lyrics).forEach(function (key) {
    const option = document.createElement("option");
    // optionタグのテキストを4に設定する
    option.text = lyrics[key].title;
    // optionタグのvalueを4に設定する
    option.value = key;
    // selectタグの子要素にoptionタグを追加する
    songsSelector.appendChild(option);
  });
  songsSelector.onchange = () => {
    changeSong(songsSelector.value)
  }


  /* lyrics */
  const changeSong = (title) => {
    original.innerText = ""
    songsSelector.value = title
    audio.src="./audio/"+songsSelector.value+".mp4"
    /* const tit = document.querySelector("#song-title");
    tit.innerText = lyrics[title].title; */
    const showLyric = lyrics[title].lyric.split("\n");
    showLyric.forEach(lyricItem => {
      const div = document.createElement("div")
      div.innerText = lyricItem;
      original.append(div)
    })
  }


  const SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
  let recognition = new SpeechRecognition();

  recognition.lang = 'ja-JP';
  recognition.interimResults = true;
  recognition.continuous = true;

  let finalTranscript = ''; // 確定した(黒の)認識結果

  recognition.onresult = (event) => {
    let interimTranscript = ''; // 暫定(灰色)の認識結果
    for (let i = event.resultIndex; i < event.results.length; i++) {
      let transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript + "<br>";
      } else {
        interimTranscript = transcript;
      }
    }
    resultDiv.innerHTML = finalTranscript + '<p style="color:#f30;">' + interimTranscript + '</p>';
  }
  recognition.onend = () => {
    recognition.start();
  }

  startBtn.onclick = () => {
    recognition.start();
    audio.play()
  }
  stopBtn.onclick = () => {
    recognition.stop();
    audio.pause()
  }

  changeSong("ikusenhitoyo")