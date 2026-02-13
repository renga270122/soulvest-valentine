// Poetic message templates with emojis
const poeticTemplates = [
	"Roses are red, violets are blue,\nYour smile is magic, your heart is true. 💖",
	"In the garden of souls, yours blooms the brightest. 🌹\nHappy Valentine's Day!",
	"Your presence is poetry, your laughter a melody. 🎶\nWishing you love and joy!",
	"Like stars in the night, you light up my world. ✨\nHappy Valentine's Day!",
	"Every moment with you is a verse in my heart's song. 💝",
	"You are the sunshine that warms my soul. ☀️\nHappy Valentine's Day!",
	"Your kindness paints my days with color. 🎨\nSending you love!",
	"To the one whose spirit inspires,\nMay your day be filled with love and smiles. 😊"
];

function getRandomTemplate() {
	return poeticTemplates[Math.floor(Math.random() * poeticTemplates.length)];
}

function generateCard() {
	const recipientInput = document.getElementById('recipient');
	const photoInput = document.getElementById('photo');
	const preview = document.getElementById('cardPreview');
	const recipient = recipientInput.value.trim();
	let photoHTML = '';
	const personalizedMessage = getRandomTemplate();
	const designStyle = "background: linear-gradient(135deg, #ffe4e1 0%, #ffb6c1 100%); border-radius: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); padding: 24px; text-align: center; color: #e75480; font-size: 22px; position: relative;";

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

function loadHtml2Canvas(callback) {
	if (window.html2canvas) {
		callback();
		return;
	}
	const script = document.createElement('script');
	script.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
	script.onload = callback;
	document.body.appendChild(script);
}

function downloadCard() {
	loadHtml2Canvas(() => {
		const card = document.getElementById('cardPreview');
		window.html2canvas(card).then(canvas => {
			const link = document.createElement('a');
			link.download = 'valentine-card.png';
			link.href = canvas.toDataURL();
			link.click();
		});
	});
}

function shareCard() {
	loadHtml2Canvas(() => {
		const card = document.getElementById('cardPreview');
		window.html2canvas(card).then(canvas => {
			canvas.toBlob(blob => {
				const file = new File([blob], 'valentine-card.png', { type: 'image/png' });
				if (navigator.canShare && navigator.canShare({ files: [file] })) {
					navigator.share({ files: [file], title: 'Valentine Card', text: 'Made with love by Soulvest ❤️' })
						.catch(() => downloadCard());
				} else {
					downloadCard();
				}
			});
		});
	});
}