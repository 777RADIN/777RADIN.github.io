let hasUserInteracted = false;

function initMedia() {
  console.log("initMedia called");
  const backgroundMusic = document.getElementById('background-music');
  const backgroundVideo = document.getElementById('background');
  if (!backgroundMusic || !backgroundVideo) {
    console.error("Media elements not found");
    return;
  }
  backgroundMusic.volume = 0.3;
  backgroundVideo.muted = true;

  backgroundVideo.play().catch(err => {
    console.error("Failed to play background video:", err);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // === DOM Elements ===
  const dom = {
    startScreen: document.getElementById('start-screen'),
    startText: document.getElementById('start-text'),
    profileName: document.getElementById('profile-name'),
    profileBio: document.getElementById('profile-bio'),
    visitorCount: document.getElementById('visitor-count'),
    backgroundMusic: document.getElementById('background-music'),
    hackerMusic: document.getElementById('hacker-music'),
    rainMusic: document.getElementById('rain-music'),
    animeMusic: document.getElementById('anime-music'),
    carMusic: document.getElementById('car-music'),
    resultsButtonContainer: document.getElementById('results-button-container'),
    resultsButton: document.getElementById('results-theme'),
    volumeIcon: document.getElementById('volume-icon'),
    volumeSlider: document.getElementById('volume-slider'),
    transparencySlider: document.getElementById('transparency-slider'),
    backgroundVideo: document.getElementById('background'),
    hackerOverlay: document.getElementById('hacker-overlay'),
    snowOverlay: document.getElementById('snow-overlay'),
    glitchOverlay: document.querySelector('.glitch-overlay'),
    profileBlock: document.getElementById('profile-block'),
    skillsBlock: document.getElementById('skills-block'),
    pythonBar: document.getElementById('python-bar'),
    cppBar: document.getElementById('cpp-bar'),
    csharpBar: document.getElementById('csharp-bar'),
    resultsHint: document.getElementById('results-hint'),
    profilePicture: document.querySelector('.profile-picture'),
    profileContainer: document.querySelector('.profile-container'),
    socialIcons: document.querySelectorAll('.social-icon'),
    badges: document.querySelectorAll('.badge'),
    cursor: document.querySelector('.custom-cursor'),
    homeButton: document.getElementById('home-button'),
    hackerButton: document.getElementById('hacker-button'),
    rainButton: document.getElementById('rain-button'),
    animeButton: document.getElementById('anime-button'),
    carButton: document.getElementById('car-button'),
  };

  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

  // === Custom Cursor ===
  if (isTouchDevice) {
    document.body.classList.add('touch-device');
    document.addEventListener('touchstart', (e) => updateCursor(e.touches[0]));
    document.addEventListener('touchmove', (e) => updateCursor(e.touches[0]));
    document.addEventListener('touchend', () => dom.cursor.style.display = 'none');
  } else {
    document.addEventListener('mousemove', (e) => updateCursor(e));
    document.addEventListener('mousedown', () => scaleCursor(0.8));
    document.addEventListener('mouseup', () => scaleCursor(1));
  }

  function updateCursor(pos) {
    dom.cursor.style.left = pos.clientX + 'px';
    dom.cursor.style.top = pos.clientY + 'px';
    dom.cursor.style.display = 'block';
  }

  function scaleCursor(scale) {
    dom.cursor.style.transform = `scale(${scale}) translate(-50%, -50%)`;
  }

  // === Typewriter for Start Screen ===
  const startMessage = "Click To Enter Twin";
  let startTextContent = '', startIndex = 0, startCursorVisible = true;

  function typeWriterStart() {
    if (startIndex < startMessage.length) startTextContent = startMessage.slice(0, ++startIndex);
    dom.startText.textContent = startTextContent + (startCursorVisible ? '|' : ' ');
    setTimeout(typeWriterStart, 100);
  }

  setInterval(() => {
    startCursorVisible = !startCursorVisible;
    dom.startText.textContent = startTextContent + (startCursorVisible ? '|' : ' ');
  }, 500);

  // === Visitor Counter ===
  function initializeVisitorCounter() {
    let totalVisitors = parseInt(localStorage.getItem('totalVisitorCount')) || 0;
    if (!localStorage.getItem('hasVisited')) {
      totalVisitors++;
      localStorage.setItem('totalVisitorCount', totalVisitors);
      localStorage.setItem('hasVisited', 'true');
    }
    dom.visitorCount.textContent = totalVisitors.toLocaleString();
  }

  initializeVisitorCounter();

  // === Start Screen Click/Touch Handler ===
  function enterSite(e) {
    e.preventDefault?.();
    dom.startScreen.classList.add('hidden');
    dom.backgroundMusic.muted = false;
    dom.backgroundMusic.play().catch(err => console.error(err));

    dom.profileBlock.classList.remove('hidden');
    gsap.fromTo(dom.profileBlock, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out', onComplete: () => {
      dom.profileBlock.classList.add('profile-appear');
      dom.profileContainer.classList.add('orbit');
    }});

    if (!isTouchDevice) {
      try { new cursorTrailEffect({ length: 10, size: 8, speed: 0.2 }); } 
      catch(err){ console.error(err); }
    }

    typeWriterName();
    typeWriterBio();
  }

  dom.startScreen.addEventListener('click', enterSite);
  dom.startScreen.addEventListener('touchstart', enterSite);

  // === Typewriter for Name and Bio ===
  const name = "777RADIN", bioMessages = ["\"From Iran 🇮🇷\"", "DM me On Discord For Inquiries.", "Discord User: 999_radin"];
  let nameText = '', nameIndex = 0, isNameDeleting = false, nameCursorVisible = true;
  let bioText = '', bioIndex = 0, bioMessageIndex = 0, isBioDeleting = false, bioCursorVisible = true;

  function typeWriterName() {
    if (!isNameDeleting && nameIndex < name.length) nameText = name.slice(0, ++nameIndex);
    else if (isNameDeleting && nameIndex > 0) nameText = name.slice(0, --nameIndex);
    else if (nameIndex === name.length) { isNameDeleting = true; setTimeout(typeWriterName, 10000); return; }
    else if (nameIndex === 0) isNameDeleting = false;

    dom.profileName.textContent = nameText + (nameCursorVisible ? '|' : ' ');
    if (Math.random() < 0.1) { dom.profileName.classList.add('glitch'); setTimeout(() => dom.profileName.classList.remove('glitch'), 200); }
    setTimeout(typeWriterName, isNameDeleting ? 150 : 300);
  }
  setInterval(() => { nameCursorVisible = !nameCursorVisible; dom.profileName.textContent = nameText + (nameCursorVisible ? '|' : ' '); }, 500);

  function typeWriterBio() {
    if (!isBioDeleting && bioIndex < bioMessages[bioMessageIndex].length) bioText = bioMessages[bioMessageIndex].slice(0, ++bioIndex);
    else if (isBioDeleting && bioIndex > 0) bioText = bioMessages[bioMessageIndex].slice(0, --bioIndex);
    else if (bioIndex === bioMessages[bioMessageIndex].length) { isBioDeleting = true; setTimeout(typeWriterBio, 2000); return; }
    else if (bioIndex === 0 && isBioDeleting) { isBioDeleting = false; bioMessageIndex = (bioMessageIndex + 1) % bioMessages.length; }

    dom.profileBio.textContent = bioText + (bioCursorVisible ? '|' : ' ');
    if (Math.random() < 0.1) { dom.profileBio.classList.add('glitch'); setTimeout(() => dom.profileBio.classList.remove('glitch'), 200); }
    setTimeout(typeWriterBio, isBioDeleting ? 75 : 150);
  }
  setInterval(() => { bioCursorVisible = !bioCursorVisible; dom.profileBio.textContent = bioText + (bioCursorVisible ? '|' : ' '); }, 500);

  typeWriterStart();

  // === Volume Controls ===
  let currentAudio = dom.backgroundMusic, isMuted = false;

  function toggleMute() {
    isMuted = !isMuted;
    currentAudio.muted = isMuted;
    dom.volumeIcon.innerHTML = isMuted 
      ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path>` 
      : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>`;
  }

  dom.volumeIcon.addEventListener('click', toggleMute);
  dom.volumeIcon.addEventListener('touchstart', toggleMute);

  dom.volumeSlider.addEventListener('input', () => {
    currentAudio.volume = dom.volumeSlider.value;
    isMuted = false;
    currentAudio.muted = false;
    dom.volumeIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>`;
  });

  // === Transparency Slider ===
  dom.transparencySlider.addEventListener('input', () => {
    const opacity = dom.transparencySlider.value;
    const blocks = [dom.profileBlock, dom.skillsBlock];
    blocks.forEach(block => {
      block.style.background = `rgba(0, 0, 0, ${opacity})`;
      block.style.borderOpacity = opacity;
      block.style.backdropFilter = `blur(${10 * opacity}px)`;
    });
    const elements = [...dom.socialIcons, ...dom.badges, dom.profilePicture, dom.profileName, dom.profileBio, dom.visitorCount];
    elements.forEach(el => { el.style.pointerEvents = 'auto'; el.style.opacity = '1'; });
  });

  // === Theme Switching ===
  function switchTheme(videoSrc, audio, themeClass, overlay = null, overlayOverProfile = false) {
    const colors = { 'home-theme':'#00CED1', 'hacker-theme':'#22C55E', 'rain-theme':'#1E3A8A', 'anime-theme':'#DC2626', 'car-theme':'#EAB308' };
    document.documentElement.style.setProperty('--primary-color', colors[themeClass] || '#00CED1');

    gsap.to(dom.backgroundVideo, { opacity: 0, duration: 0.5, ease: 'power2.in', onComplete: () => {
      dom.backgroundVideo.src = videoSrc;
      if(currentAudio){ currentAudio.pause(); currentAudio.currentTime = 0; }
      currentAudio = audio;
      currentAudio.volume = dom.volumeSlider.value;
      currentAudio.muted = isMuted;
      currentAudio.play().catch(console.error);

      document.body.className = themeClass;
      dom.hackerOverlay.classList.add('hidden');
      dom.snowOverlay.classList.add('hidden');
      dom.profileBlock.style.zIndex = overlayOverProfile ? 10 : 20;
      dom.skillsBlock.style.zIndex = overlayOverProfile ? 10 : 20;
      if(overlay) overlay.classList.remove('hidden');

      if(themeClass === 'hacker-theme') dom.resultsButtonContainer.classList.remove('hidden');
      else dom.resultsButtonContainer.classList.add('hidden');

      gsap.to(dom.backgroundVideo, { opacity: 1, duration: 0.5, ease: 'power2.out', onComplete: () => {
        dom.profileContainer.classList.remove('orbit'); void dom.profileContainer.offsetWidth; dom.profileContainer.classList.add('orbit');
      }});
    }});
  }

  // === Theme Button Listeners ===
  const themeButtons = [
    { btn: dom.homeButton, video: 'assets/background.mp4', audio: dom.backgroundMusic, theme:'home-theme' },
    { btn: dom.hackerButton, video: 'assets/hacker_background.mp4', audio: dom.hackerMusic, theme:'hacker-theme', overlay: dom.hackerOverlay },
    { btn: dom.rainButton, video: 'assets/rain_background.mov', audio: dom.rainMusic, theme:'rain-theme', overlay: dom.snowOverlay, overlayOverProfile:true },
    { btn: dom.animeButton, video: 'assets/anime_background.mp4', audio: dom.animeMusic, theme:'anime-theme' },
    { btn: dom.carButton, video: 'assets/car_background.mp4', audio: dom.carMusic, theme:'car-theme' },
  ];

  themeButtons.forEach(({btn, video, audio, theme, overlay, overlayOverProfile}) => {
    btn.addEventListener('click', () => switchTheme(video, audio, theme, overlay, overlayOverProfile));
    btn.addEventListener('touchstart', (e) => { e.preventDefault(); switchTheme(video, audio, theme, overlay, overlayOverProfile); });
  });

  // === Tilt Effect ===
  function handleTilt(e, element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

    const tiltX = ((clientY - centerY)/rect.height)*15;
    const tiltY = (-(clientX - centerX)/rect.width)*15;

    gsap.to(element, { rotationX: tiltX, rotationY: tiltY, duration:0.3, ease:'power2.out', transformPerspective:1000 });
  }

  [dom.profileBlock, dom.skillsBlock].forEach(block => {
    block.addEventListener('mousemove', e => handleTilt(e, block));
    block.addEventListener('touchmove', e => { e.preventDefault(); handleTilt(e, block); });
    block.addEventListener('mouseleave', () => gsap.to(block,{rotationX:0, rotationY:0,duration:0.5,ease:'power2.out'}));
    block.addEventListener('touchend', () => gsap.to(block,{rotationX:0, rotationY:0,duration:0.5,ease:'power2.out'}));
  });

  // === Profile Picture Glitch and Orbit ===
  dom.profilePicture.addEventListener('mouseenter', () => {
    dom.glitchOverlay.style.opacity = '1';
    setTimeout(() => dom.glitchOverlay.style.opacity='0',500);
  });

  function orbitEffect() {
    dom.profileContainer.classList.remove('fast-orbit','orbit'); void dom.profileContainer.offsetWidth; dom.profileContainer.classList.add('fast-orbit');
    setTimeout(()=>{ dom.profileContainer.classList.remove('fast-orbit'); void dom.profileContainer.offsetWidth; dom.profileContainer.classList.add('orbit'); },500);
  }

  dom.profilePicture.addEventListener('click', orbitEffect);
  dom.profilePicture.addEventListener('touchstart', (e)=>{ e.preventDefault(); orbitEffect(); });

  // === Results / Skills Toggle ===
  let isShowingSkills = false;
  function toggleSkills() {
    if(!isShowingSkills){
      gsap.to(dom.profileBlock,{x:-100,opacity:0,duration:0.5,ease:'power2.in',onComplete:()=>{
        dom.profileBlock.classList.add('hidden');
        dom.skillsBlock.classList.remove('hidden');
        gsap.fromTo(dom.skillsBlock,{x:100,opacity:0},{x:0,opacity:1,duration:0.5,ease:'power2.out'});
        gsap.to(dom.pythonBar,{width:'87%',duration:2,ease:'power2.out'});
        gsap.to(dom.cppBar,{width:'75%',duration:2,ease:'power2.out'});
        gsap.to(dom.csharpBar,{width:'80%',duration:2,ease:'power2.out'});
      }});
      dom.resultsHint.classList.remove('hidden');
      isShowingSkills=true;
    } else {
      gsap.to(dom.skillsBlock,{x:100,opacity:0,duration:0.5,ease:'power2.in',onComplete:()=>{
        dom.skillsBlock.classList.add('hidden');
        dom.profileBlock.classList.remove('hidden');
        gsap.fromTo(dom.profileBlock,{x:-100,opacity:0},{x:0,opacity:1,duration:0.5,ease:'power2.out'});
      }});
      dom.resultsHint.classList.add('hidden');
      isShowingSkills=false;
    }
  }

  dom.resultsButton.addEventListener('click', toggleSkills);
  dom.resultsButton.addEventListener('touchstart', (e)=>{ e.preventDefault(); toggleSkills(); });
});
