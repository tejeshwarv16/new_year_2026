import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import './App.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // --- 🔧 YOUR DETAILS HERE 🔧 ---
  const myName = "Tejes"; 
  // ----------------------------------

  const handleOpen = () => {
    setIsOpen(true);
    triggerFireworks();
    
    // Check if audio exists before trying to play
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.log("Audio autoplay blocked (normal browser behavior):", e));
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const triggerFireworks = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  return (
    <div className="container">
      {/* Background Music */}
      <audio ref={audioRef} loop src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
      
      <button className="music-btn" onClick={toggleMusic}>
        {isPlaying ? '⏸ Pause Music' : '🎵 Play Music'}
      </button>

      <div className="card-wrapper">
        <h1 className="title">Happy New Year 2026! 🎆</h1>
        <p className="subtitle">From {myName} & Family</p>

        {!isOpen ? (
          <button className="open-btn pulse" onClick={handleOpen}>
            Tap to Open ✉️
          </button>
        ) : (
          <div className="message-box fade-in">
            <h2>Warm Wishes ✨</h2>
            <p>
              May the coming year bring you success, joy, and prosperity.
              Let's make 2026 legendary!
            </p>
            <p>
                Sending you positive vibes and a great year ahead!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;