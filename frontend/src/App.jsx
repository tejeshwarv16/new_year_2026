import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import './App.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showQR, setShowQR] = useState(false);
  
  // 💰 State for the dynamic amount (defaults to 501)
  const [amount, setAmount] = useState('500'); 
  
  const audioRef = useRef(null);

  // --- 🔧 YOUR DETAILS 🔧 ---
  const myName = "Tejes"; 
  const upiId = "your.upi.id@okhdfcbank"; // <--- REPLACE THIS
  // -------------------------

  // 🔗 Generate Dynamic UPI Link based on 'amount' state
  // This link works for both Mobile Intent and QR Code generation
  const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(myName)}&am=${amount}&cu=INR&tn=New Year Gift`;
  
  // 📱 QR Code API (Updates automatically when amount changes)
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiLink)}`;

  const handleOpen = () => {
    setIsOpen(true);
    triggerSubtleConfetti();
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.log("Audio autoplay blocked:", e));
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

  // 🚀 Smart Payment Handler
  const handlePayment = () => {
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      // On Mobile: Forces the system to ask "Which app?" (GPay/PhonePe/etc)
      window.location.href = upiLink;
    } else {
      // On Desktop: Toggles the QR Code view
      setShowQR(!showQR);
    }
  };

  const triggerSubtleConfetti = () => {
    const duration = 2500;
    const end = Date.now() + duration;
    const colors = ['#ffd700', '#ffffff', '#e0c3fc']; 

    (function frame() {
      confetti({
        particleCount: 4, 
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
        shapes: ['circle'],
        scalar: 0.8
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
        shapes: ['circle'],
        scalar: 0.8
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  return (
    <div className="container">
      <audio ref={audioRef} loop src="/celebration.mp3" />
      
      <button className="music-btn" onClick={toggleMusic}>
        {isPlaying ? '⏸ Pause' : '▶ Play Music'}
      </button>

      <div className="card-wrapper">
        <h1 className="title">Happy New Year 2026!</h1>
        <p className="subtitle">From {myName}</p>

        {!isOpen ? (
          <button className="open-btn pulse" onClick={handleOpen}>
            Open Gift ✨
          </button>
        ) : (
          <div className="message-box fade-in">
            <h2>Warm Wishes ✨</h2>
            <p>
              Wishing you a New Year filled with quiet confidence, 
              joyful moments, and new opportunities.
            </p>
            <p>
              May 2026 bring you <strong>pawsitive vibes</strong> and the courage to 
              always <strong>land on your feet</strong>. Let's make this year 
              truly spectacular!
            </p>

            {/* --- 🎁 GIFT SECTION --- */}
            <div className="gift-section">
                <div className="divider"></div>
                <p className="gift-text">Send a Token of Love? 🎁</p>

                {/* Input Field for Custom Amount */}
                <div className="input-wrapper">
                  <span className="currency-symbol">₹</span>
                  <input 
                    type="number" 
                    className="amount-input"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                
                <button className="pay-btn" onClick={handlePayment}>
                    Send Gift 🚀
                </button>
                
                {/* QR Code (Centered) */}
                {showQR && (
                    <div className="qr-container fade-in">
                        <img src={qrCodeUrl} alt="Scan to Pay" />
                        <p>Scan with GPay / PhonePe</p>
                    </div>
                )}
            </div>
             {/* ----------------------- */}

          </div>
        )}
      </div>
    </div>
  );
}

export default App;