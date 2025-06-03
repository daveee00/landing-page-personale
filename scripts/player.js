const gradients = [
  "background: linear-gradient(43deg,rgba(238, 174, 202, 1) 0%, rgba(148, 187, 233, 1) 100%)",
  "background: linear-gradient(43deg,rgb(174, 180, 238) 0%, rgb(233, 227, 148) 100%)",
  "background: linear-gradient(43deg,rgb(238, 174, 174) 0%, rgb(233, 148, 148) 100%)",
  "background: linear-gradient(43deg,rgb(174, 238, 174) 0%, rgb(148, 233, 148) 100%)",
  "background: linear-gradient(43deg,rgb(174, 238, 233) 0%, rgb(148, 148, 233) 100%)",
  "background: linear-gradient(43deg,rgb(233, 174, 238) 0%, rgb(233, 148, 174) 100%)",
  "background: linear-gradient(43deg,rgb(238, 233, 174) 0%, rgb(233, 174, 148) 100%)",
  "background: linear-gradient(43deg,rgb(174, 174, 238) 0%, rgb(233, 148, 233) 100%)",
  "background: linear-gradient(43deg,rgb(238, 174, 233) 0%, rgb(148, 233, 174) 100%)",
  "background: linear-gradient(43deg,rgb(233, 238, 174) 0%, rgb(174, 148, 233) 100%)",
];

const ButtonIds = [
  "player-01",
  "player-02",
  "player-03",
  "player-04",
  "player-05",
  "player-06"
];

const audioPlay = [
  "https://cdn.jsdelivr.net/gh/daveee00/landing-page-personale/assets/mp3/thank-u-next.mp3",
  "https://cdn.jsdelivr.net/gh/daveee00/landing-page-personale/assets/mp3/espresso-sabrina.mp3",
  "https://cdn.jsdelivr.net/gh/daveee00/landing-page-personale/assets/mp3/runrunrundolph.mp3",
  "https://cdn.jsdelivr.net/gh/daveee00/landing-page-personale/assets/mp3/we-cant-be-friends.mp3",
  "https://cdn.jsdelivr.net/gh/daveee00/landing-page-personale/assets/mp3/diva.mp3",
  "https://cdn.jsdelivr.net/gh/daveee00/landing-page-personale/assets/mp3/donatella.mp3",
];

let currentlyPlayingAudio = null;
let currentlyPlayingElement = null;
let activeGradientElements = new Set(); // Track elements with active gradients

function playerCheck() {
  const buttonsIds = ['player-01', 'player-02', 'player-03', 'player-04', 'player-05', 'player-06'];
  buttonsIds.forEach((id, index) => {
    console.log(`Button ID: ${id} is at index: ${index}`);
  });
}

function gradientsCheck() {
  const gradients = [
    "linear-gradient(45deg,rgb(243, 163, 246),rgb(200, 185, 209))",
    "linear-gradient(45deg, #4facfe, #00f2fe)",
    "linear-gradient(45deg, #43e97b, #38f9d7)",
    "linear-gradient(45deg, #fa709a, #fee140)",
    "linear-gradient(45deg, #667eea, #764ba2)",
    "linear-gradient(43deg, #E9EEAE, #AE94E9)"
  ];
  gradients.forEach((gradient, index) => {
    console.log(`Gradient: ${gradient} is at index: ${index}`);
  });
}

function crossCheckPlayer() {
  const buttonsIds = ['player-01', 'player-02', 'player-03', 'player-04', 'player-05', 'player-06'];
  const gradients = [
    "linear-gradient(45deg,rgb(243, 163, 246),rgb(200, 185, 209))",
    "linear-gradient(45deg, #4facfe, #00f2fe)",
    "linear-gradient(45deg, #43e97b, #38f9d7)",
    "linear-gradient(45deg, #fa709a, #fee140)",
    "linear-gradient(45deg, #667eea, #764ba2)",
    "linear-gradient(43deg, #E9EEAE, #AE94E9)"
  ];

  const suggestionPlayers = document.querySelectorAll('.suggestions-player');
  suggestionPlayers.forEach((player, index) => {
    player.addEventListener('mouseenter', () => {
      const buttonId = buttonsIds[index];
      const button = document.getElementById(buttonId);
      if (button && !activeGradientElements.has(button)) {
        button.style.background = gradients[index];
      }
    });

    player.addEventListener('mouseleave', () => {
      const buttonId = buttonsIds[index];
      const button = document.getElementById(buttonId);
      if (button && !activeGradientElements.has(button)) {
        button.style.background = '';
      }
    });
  });
}

function handleSuggestionPlayerClick(event) {
  const clickedElement = event.currentTarget;
  const clickedId = clickedElement.id;
  const index = ButtonIds.indexOf(clickedId);
  const button = document.getElementById(clickedId);

  if (index === -1) return;

  // If clicking the same element that's currently playing, stop the audio and remove gradient
  if (currentlyPlayingElement === clickedElement) {
    if (currentlyPlayingAudio) {
      currentlyPlayingAudio.pause();
      currentlyPlayingAudio.currentTime = 0;
      currentlyPlayingAudio = null;
      currentlyPlayingElement = null;
      if (button) {
        button.style.background = '';
        activeGradientElements.delete(button);
      }
    }
    return;
  }

  // If there's audio playing from a different element, stop it and remove its gradient
  if (currentlyPlayingAudio) {
    currentlyPlayingAudio.pause();
    currentlyPlayingAudio.currentTime = 0;
    const previousButton = document.getElementById(currentlyPlayingElement.id);
    if (previousButton) {
      previousButton.style.background = '';
      activeGradientElements.delete(previousButton);
    }
  }

  // Play the new audio and apply gradient
  const audio = new Audio(audioPlay[index]);
  audio.play();
  currentlyPlayingAudio = audio;
  currentlyPlayingElement = clickedElement;
  if (button) {
    button.style.background = gradients[index];
    activeGradientElements.add(button);
  }

  // Add event listener to reset state when audio ends
  audio.addEventListener('ended', () => {
    currentlyPlayingAudio = null;
    currentlyPlayingElement = null;
    if (button) {
      button.style.background = '';
      activeGradientElements.delete(button);
    }
  });
}

function initializeSuggestionPlayers() {
  const suggestionPlayers = document.querySelectorAll('.suggestions-player');
  suggestionPlayers.forEach(player => {
    player.addEventListener('click', handleSuggestionPlayerClick);
  });
}

// Export the functions
export { playerCheck, gradientsCheck, crossCheckPlayer, initializeSuggestionPlayers };

