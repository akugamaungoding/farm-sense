// Simple sound effects using Web Audio API
// Since we can't include actual sound files, we'll create synthetic sounds

class SoundEffects {
  constructor() {
    this.audioContext = null;
    this.isEnabled = true;
    this.initAudioContext();
  }

  initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.log('Web Audio API not supported');
      this.isEnabled = false;
    }
  }

  // Create a simple beep sound
  createBeep(frequency = 440, duration = 200, type = 'sine') {
    if (!this.isEnabled || !this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration / 1000);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration / 1000);
  }

  // Success sound (happy beep)
  playSuccess() {
    this.createBeep(523, 150, 'sine'); // C5
    setTimeout(() => this.createBeep(659, 150, 'sine'), 100); // E5
    setTimeout(() => this.createBeep(784, 200, 'sine'), 200); // G5
  }

  // Error sound (sad beep)
  playError() {
    this.createBeep(392, 200, 'sawtooth'); // G4
    setTimeout(() => this.createBeep(349, 300, 'sawtooth'), 150); // F4
  }

  // Water spray sound
  playWater() {
    this.createBeep(800, 100, 'square');
    setTimeout(() => this.createBeep(600, 100, 'square'), 50);
    setTimeout(() => this.createBeep(400, 100, 'square'), 100);
  }

  // Alarm sound
  playAlarm() {
    this.createBeep(1000, 100, 'square');
    setTimeout(() => this.createBeep(800, 100, 'square'), 100);
    setTimeout(() => this.createBeep(1000, 100, 'square'), 200);
    setTimeout(() => this.createBeep(800, 100, 'square'), 300);
  }

  // Cheering sound
  playCheering() {
    this.createBeep(523, 100, 'sine'); // C5
    setTimeout(() => this.createBeep(659, 100, 'sine'), 100); // E5
    setTimeout(() => this.createBeep(784, 100, 'sine'), 200); // G5
    setTimeout(() => this.createBeep(1047, 200, 'sine'), 300); // C6
  }

  // Button click sound
  playClick() {
    this.createBeep(800, 50, 'square');
  }

  // Enable/disable sounds
  toggle() {
    this.isEnabled = !this.isEnabled;
    return this.isEnabled;
  }

  setEnabled(enabled) {
    this.isEnabled = enabled;
  }
}

// Create a global instance
const soundEffects = new SoundEffects();

export default soundEffects;
