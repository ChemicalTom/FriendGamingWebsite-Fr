// Function to update the time
    function updateTime() {
      fetch("https://www.timeapi.io/api/time/current/zone?timeZone=Europe/Amsterdam")
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(data => {
          // Get the element by ID and update the text
          const hoursElement = document.getElementById('Hours');
          hoursElement.textContent = `Il est : ${data.time} et le ` + (data.date);
          
        })
        .catch(error => {
          document.getElementById('Hours').textContent = "Error fetching time.";
          console.error("There was an error:", error);
        });
    }

    // Call the function once when the page loads
    updateTime();

    // Try to play background audio; if blocked, play on first user interaction
    document.addEventListener('DOMContentLoaded', () => {
      const audio = document.getElementById('bgAudio');
      if (!audio) return;
      // attempt autoplay
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay blocked: play audio on the first user interaction (click or keydown)
          const startAudio = () => {
            audio.play().catch(() => {});
            window.removeEventListener('click', startAudio);
            window.removeEventListener('keydown', startAudio);
          };
          window.addEventListener('click', startAudio);
          window.addEventListener('keydown', startAudio);
        });
      }
    });