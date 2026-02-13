  // Fix input value bug
  const favoriteFood = document.getElementById('favoriteFood').value;
  const favoriteIceCream = document.getElementById('favoriteIceCream').value;
  const favoriteActor = document.getElementById('favoriteActor').value;
  const favoriteColor = document.getElementById('favoriteColor') ? document.getElementById('favoriteColor').value : '';
// Valentine message templates
const messageTemplates = [
  "Happy Valentine's Day to my forever Valentine!",
  "You make every day feel like Valentine's Day.",
  "Sending love and hugs your way this Valentine's!",
  "To my secret admirer, you brighten my world.",
  "Wishing you a day filled with love and joy!",
  "You are the heart of my life. Happy Valentine's!",
  "May your day be as sweet as you are!",
  "Love is in the air, and it's all for you!",
  "Forever grateful for your love. Happy Valentine's Day!",
  "You are my favorite reason to smile."
];

// Populate message dropdown
window.onload = function() {
  const messageSelect = document.getElementById('message');
  messageTemplates.forEach(msg => {
    const option = document.createElement('option');
    option.value = msg;
    option.textContent = msg;
    messageSelect.appendChild(option);
  });
};

function generateCard() {
  const photoInput = document.getElementById('photo');
  const preview = document.getElementById('cardPreview');

  // Poetic, heart-touching message
  let recipientName = document.getElementById('recipient').value;
  const poeticTemplates = [
    [
      `Happy Valentine's Day${recipientName ? ', ' + recipientName : ''}! ❤️`,
      "You are the gentle breeze that brings calm to my soul. 💨",
      "Your smile is the sunrise that brightens my every morning. 🌅😊",
      "In the story of my life, you are the most beautiful chapter. 📖💖",
      "With you, every moment feels like a celebration of love. 🎉💕",
      "You are the reason my heart believes in magic. ✨💓",
      "No words can capture the warmth you bring to my world. 🔥🥰",
      "You are cherished, adored, and loved beyond measure. 💝",
      "Thank you for being you, for filling my days with joy and my heart with hope. 🙏🌸"
    ],
    [
      `Happy Valentine's Day${recipientName ? ', ' + recipientName : ''}! 💖`,
      "You are the light that guides me through every storm. 🌟",
      "Your laughter is the music that fills my heart. 🎶😂",
      "Every day with you is a new adventure in love. 🚀💞",
      "You are the dream I never want to wake from. 🌙💭",
      "Your kindness is the anchor that keeps me grounded. ⚓️🤗",
      "You are the hope that makes my world brighter. 🌈💗",
      "I am grateful for your love, today and always. 🙏💝"
    ],
    [
      `Happy Valentine's Day${recipientName ? ', ' + recipientName : ''}! 💘`,
      "You are the poetry in my life, the rhythm in my heart. 📚🎵",
      "With you, every moment is a masterpiece. 🎨🖼️",
      "Your love is the canvas on which my happiness is painted. 🖌️💖",
      "You are the wish I made and the miracle I received. 🌠💫",
      "Thank you for being the magic in my ordinary days. ✨💞"
    ],
    [
      `Happy Valentine's Day${recipientName ? ', ' + recipientName : ''}! 💝`,
      "You are the smile that makes my world go round. 😊🌍",
      "Your presence is the gift I cherish most. 🎁💗",
      "With you, love feels effortless and true. 💑💓",
      "You are the answer to every prayer and the joy in every moment. 🙏🎉",
      "Forever grateful for you. ♾️💖"
    ],
    [
      `Happy Valentine's Day${recipientName ? ', ' + recipientName : ''}! 💃🎶`,
      "With you, my heart dances to the rhythm of love. 💃❤️",
      "Your laughter is music to my soul. 🎵😄",
      "Every day with you is a song worth singing. 🎤💕",
      "You are the harmony in my life's melody. 🎼💖",
      "Thank you for making my world a stage of happiness. 🎭🌟"
    ],
    [
      `Happy Valentine's Day${recipientName ? ', ' + recipientName : ''}! 📖💞`,
      "You are the story I never want to end. 📚💓",
      "With you, every page is filled with love. 📖❤️",
      "Your words are poetry that touches my heart. ✍️💖",
      "You are the author of my happiest memories. 📝😊",
      "Thank you for writing your love into my life. 🖋️💝"
    ]
  ];
  const randomTemplate = poeticTemplates[Math.floor(Math.random() * poeticTemplates.length)];
  let personalizedMessage = randomTemplate.join(' ');

  let designStyle = 'background: linear-gradient(135deg, #ffb6c1 0%, #ffe4e1 100%); color: #e75480;';
  let photoHTML = '';
  if (photoInput.files && photoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      photoHTML = `<img src="${e.target.result}" alt="Photo">`;
      preview.innerHTML = `
        <div style="${designStyle}">
          <h2>Happy Valentine's Day!</h2>
          ${photoHTML}
          <p>${personalizedMessage}</p>
          <div style="margin-top:24px; font-size:16px; color:#e75480; text-align:center;">
            — Soulvest ❤️
            <div style="font-size:12px; color:#b22234; margin-top:8px;">Made with love by Soulvest</div>
          </div>
        </div>
      `;
    };
    reader.readAsDataURL(photoInput.files[0]);
    return;
  }

  preview.innerHTML = `
    <div style="${designStyle}">
      <h2>Happy Valentine's Day!</h2>
      ${photoHTML}
      <p>${personalizedMessage}</p>
      <div style="margin-top:24px; font-size:16px; color:#e75480; text-align:center;">
        — Soulvest ❤️
        <div style="font-size:12px; color:#b22234; margin-top:8px;">Made with love by Soulvest</div>
      </div>
    </div>
  `;
}

function downloadCard() {
  const preview = document.getElementById('cardPreview');
  if (!preview || preview.innerHTML.trim() === '') {
    alert('Please generate your card before downloading.');
    return;
  }
  if (typeof html2canvas !== 'function') {
    // Dynamically load html2canvas from CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
    script.onload = () => downloadCard();
    document.body.appendChild(script);
    return;
  }
  html2canvas(preview).then(canvas => {
    try {
      const link = document.createElement('a');
      link.download = 'valentine_card.png';
      link.href = canvas.toDataURL();
      link.click();
    } catch (err) {
      alert('Download failed. Please try again or take a screenshot.');
    }
  }).catch(() => {
    alert('Download failed. Please try again or take a screenshot.');
  });
}

function shareCard() {
  const preview = document.getElementById('cardPreview');
  if (!preview || preview.innerHTML.trim() === '') {
    alert('Please generate your card before sharing.');
    return;
  }
  if (typeof html2canvas !== 'function') {
    // Dynamically load html2canvas from CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
    script.onload = () => shareCard();
    document.body.appendChild(script);
    return;
  }
  html2canvas(preview).then(canvas => {
    canvas.toBlob(blob => {
      if (navigator.share && typeof File === 'function') {
        navigator.share({
          title: "Souvest Valentine Card",
          files: [new File([blob], 'valentine_card.png', { type: blob.type })]
        }).catch(() => {
          // Fallback: automatically trigger download
          const link = document.createElement('a');
          link.download = 'valentine_card.png';
          link.href = URL.createObjectURL(blob);
          link.click();
          alert('Sharing failed. Card downloaded instead.');
        });
      } else {
        // Fallback: automatically trigger download
        const link = document.createElement('a');
        link.download = 'valentine_card.png';
        link.href = URL.createObjectURL(blob);
        link.click();
        alert('Sharing is not supported. Card downloaded instead.');
      }
    });
  }).catch(() => {
    alert('Sharing failed. Please download and share manually.');
  });
}
