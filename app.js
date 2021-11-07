// Một số bài hát có thể bị lỗi do liên kết bị hỏng. Vui lòng thay thế liên kết khác để có thể phát
// Some songs may be faulty due to broken links. Please replace another link so that it can be played

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const progress = $("#progress");
const cd = $(".cd");
const playBtn = $(".btn-toggle-play");
const player = $(".player");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");
const volume = $("#volume");
const volumeMuted = $("#volume_icon");

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRepeat: false,
  isRandom: false,
  isMuted: false,
  songs: [
    {
      name: "Ngày Chưa Giông Bão",
      singer: "Bùi Lan Hương",
      path: "../Music Player/Music/Ngay-Chua-Giong-Bao-Nguoi-Bat-Tu-OST-Bui-Lan-Huong.mp3",
      image:
        "https://theharmonica.vn/wp-content/uploads/2019/05/ngay-chua-giong-bao.jpg",
    },
    {
      name: "Tìm Hành Tinh Khác ",
      singer: "Vũ Cát Tường",
      path: "../Music Player/Music/Tim-Hanh-Tinh-Khac-Chill-Version-Vu-Cat-Tuong.mp3",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp8bDTD7hb7GX9FNyo3O5Ivavw2ap1um6xUQ&usqp=CAU",
    },
    {
      name: "từ chối nhẹ nhàng thôi",
      singer: "Bích Phương",
      path: "../Music Player/Music/tu-choi-nhe-nhang-thoi-liu-riu-version-Bich-Phuong-Phuc-Du.mp3",
      image:
        "https://avatar-ex-swe.nixcdn.com/song/2020/07/09/f/2/a/a/1594296127806_640.jpg",
    },
    {
      name: "Fix My Make up",
      singer: "TaeYeon(SNSD)",
      path: "../Music Player/Music/FixingMyMakeupBeginAgain3-TaeYeonSNSD-6247673_hq.mp3",
      image:
        "https://znews-photo.zadn.vn/w660/Uploaded/unvjuas/2019_09_01/69294209_1281857981984357_2250228379640922112_n_1.jpg",
    },
    {
      name: "I Will Go To You Like The First Snow  ",
      singer: "Ailee",
      path: "../Music Player/Music/I-Will-Go-To-You-Like-The-First-Snow-Ailee.mp3",
      image:
        "https://lyricvn.com/wp-content/uploads/2019/11/966d2041fcab971ff9b109c8ed574756_1483762865.jpg",
    },
    {
      name: "Dù Mưa Thôi Rơi",
      singer: "Thùy Chi",
      path: "../Music Player/Music/DuMuaThoiRoi-ThuyChi-6148777.mp3",
      image:
        "https://avatar-ex-swe.nixcdn.com/song/share/2019/11/22/7/9/1/a/1574419231724.jpg",
    },
    {
      name: "I Will Go To You Like The First Snow  ",
      singer: "Ailee",
      path: "../Music Player/Music/I-Will-Go-To-You-Like-The-First-Snow-Ailee.mp3",
      image:
        "https://lyricvn.com/wp-content/uploads/2019/11/966d2041fcab971ff9b109c8ed574756_1483762865.jpg",
    },
  ],

  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  render: function () {
    // Code render
    const htmls = this.songs.map(function (song, index) {
      return `<div class="song ${
        index === app.currentIndex ? "active" : " "
      }" data-index="${index}">
      <div class="thumb" style="background-image: url('${song.image}')">
      </div>
      <div class="body">
          <h3 class="title">${song.name}</h3>
          <p class="author">${song.singer}</p>
      </div>
      <div class="option">
          <i class="fas fa-ellipsis-h"></i>
      </div>
  </div>
  `;
    });
    $(".playlist").innerHTML = htmls.join("\n");
  },
  handleEvents: function () {
    const cdWidth = cd.offsetWidth;

    // Quay CD
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000, // 10 seconds
      iterations: Infinity,
    });
    cdThumbAnimate.pause();

    // Xu ly khi scroll
    document.onscroll = function () {
      const scrollTop = window.scrollY;
      const newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };
    // Xử lý khi click play

    playBtn.onclick = function () {
      if (app.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    // Khi bài hát được play
    audio.onplay = function () {
      app.isPlaying = true;
      audio.play();
      player.classList.add("playing");
      cdThumbAnimate.play();
    };

    // Khi bài hát bị pause
    audio.onpause = function () {
      app.isPlaying = false;
      audio.pause();
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };
    // Khi tiến độ bài hát thay đổi
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progress.value = progressPercent;
      }
    };
    // Khi bài hát hết -> next

    audio.onended = function () {
      if (app.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };
    // Khi điều chỉnh thanh progress
    progress.onchange = function () {
      audio.currentTime = (progress.value / 100) * audio.duration;
    };
    // Khi điều chỉnh volume
    volume.onchange = function () {
      audio.volume = volume.value / 100;

      if (audio.volume < 0.5 && audio.volume > 0) {
        volumeMuted.classList.add("fa-volume-down");
        volumeMuted.classList.remove("fa-volume-up");
        volumeMuted.classList.remove("fa-volume-mute");
      } else {
        volumeMuted.classList.add("fa-volume-up");
        volumeMuted.classList.remove("fa-volume-down");

        volumeMuted.classList.remove("fa-volume-mute");
      }
    };
    //Khi click nút volume muted
    volumeMuted.onclick = function () {
      app.isMuted = !app.isMuted;
      // console.log(app.isRandom);
      audio.volume = 0;
      volume.value = 0;
      volumeMuted.classList.toggle("fa-volume-mute", app.isMuted);
    };
    // Khi click nút next
    nextBtn.onclick = function () {
      if (app.isRandom) {
        app.randomSong();
        app.render();
        app.scrollToActiveSong();
      } else {
        app.nextSong();
        audio.play();
        app.render();
        app.scrollToActiveSong();
      }
    };
    // Khi click nút prev
    prevBtn.onclick = function () {
      if (app.isRandom) {
        app.randomSong();
        app.render();
        app.scrollToActiveSong();
      } else {
        app.prevSong();
        audio.play();
        app.render();
        app.scrollToActiveSong();
      }
    };
    // Khi click nút random
    randomBtn.onclick = function () {
      app.isRandom = !app.isRandom;
      // console.log(app.isRandom);
      randomBtn.classList.toggle("active", app.isRandom);
    };
    // Khi click nút repeat
    repeatBtn.onclick = function () {
      app.isRepeat = !app.isRepeat;
      // console.log(app.isRandom);
      repeatBtn.classList.toggle("active", app.isRepeat);
    };
    // Lắng nghe khi click vào playlist
    playlist.onclick = function (e) {
      // Xử lý khi click vào song
      const songNode = e.target.closest(".song:not(.active)");
      if (
        e.target.closest(".song:not(.active)") ||
        e.target.closest(".song.option")
      ) {
        if (songNode) {
          app.currentIndex = Number(songNode.dataset.index); //get dataset thì chuyển thành chuỗi nên phải chuyển thành number
          app.loadCurrentSong();

          audio.play();
          app.render();
        }
        // Xử lý khi click vào option
      }
      // Khi change volume
    };
  },

  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
    // console.log(heading, cdThumb, audio);
  },
  randomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);

    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  scrollToActiveSong: function () {
    let activeSong = $(".song.active");
    if (this.currentIndex > this.songs.length - 6) {
      activeSong.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    } else {
      activeSong.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex > this.songs.length - 1) {
      app.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (app.currentIndex == 0) {
      app.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  start: function () {
    // Dinh nghia thuoc tinh
    this.defineProperties();
    // Render playlist
    this.render();
    // Lang nghe / xu ly DOM events
    this.handleEvents();
    // Tai thong tin bai hat vao UI khi chay ung dung
    this.loadCurrentSong();
  },
};
app.start();
