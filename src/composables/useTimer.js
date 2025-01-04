export function useTimer(state) {
    const handleTimer = () => {
      state.timer.setInterval = setInterval(() => {
        state.timer.second--;
        if (state.timer.second <= 0) {
          state.timer.second = 0;
          clearInterval(state.timer.setInterval);
        }
      }, 1000);
    };
  
    return { handleTimer };
  }
  