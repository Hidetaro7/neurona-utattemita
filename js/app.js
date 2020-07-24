import lyrics from "./lyrics.js"

 const startBtn = document.querySelector('#start-btn');
  const stopBtn = document.querySelector('#stop-btn');
  const resultDiv = document.querySelector('#result-div');
  const original = document.querySelector(".original");
  const songsSelector = document.querySelector("#songs-selector")
  const audio = document.createElement("audio");

  let finalTranscript = '';



  const SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
  let recognition = new SpeechRecognition();

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

  const playClicked = () => {
    startBtn.disabled = true;
    recognition.start();
    audio.play()
  }
  const pauseClicked = () => {
    startBtn.disabled = false;
    recognition.stop();
    audio.pause()
  }


  /* lyrics */
  const changeSong = (title) => {
    pauseClicked()
    original.innerText = ""
    resultDiv.innerText = ""
    finalTranscript = ""
    songsSelector.value = title
    audio.src="./audio/"+songsSelector.value+".mp3"
    /* const tit = document.querySelector("#song-title");
    tit.innerText = lyrics[title].title; */
    const showLyric = lyrics[title].lyric.split("\n");
    showLyric.forEach(lyricItem => {
      const div = document.createElement("div")
      div.innerText = lyricItem;
      original.append(div)
    })
  }


  recognition.lang = 'ja-JP';
  recognition.interimResults = true;
  recognition.continuous = true;

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
    //recognition.start();
  }

  startBtn.onclick = () => {
    playClicked()
  };

  stopBtn.onclick = () => {
    pauseClicked()
  }

  changeSong("ikusenhitoyo")