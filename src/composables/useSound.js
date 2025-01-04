export function useSound() {
    const sound = new Audio("/assets/sound.mp3");
    const sound2 = new Audio("/assets/sound-2.mp3");
  
    const playSound = () => {
      sound.play();
    };
  
    const toggleSound = (state) => {
      state.soundStatus = !state.soundStatus;
      if (!state.soundStatus) sound2.pause();
      else sound2.play();
    };
  
    return { playSound, toggleSound, sound2 };
  }
  