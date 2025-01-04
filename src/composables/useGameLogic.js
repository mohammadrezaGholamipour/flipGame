import { computed } from "vue";

export function useGameLogic(state) {
  const gameStatus = computed(() => {
    const itsAllRight = state.list.every((item) => item.found);
    const click = state.numberOfMoves === 0;
    const timer = state.timer.second === 0;

    if (itsAllRight && state.list.length) return "win";
    else if (click || timer) return "lose";
    else if (state.numberOfMoves < 25 || state.timer.second < 59) return "isPlaying";
    else return "ready";
  });

  const handleResetGame = (handleShuffle) => {
    state.numberOfMoves = 25;
    clearInterval(state.timer.setInterval);
    state.timer = { second: 59, setInterval: 0 };
    handleShuffle();
  };

  return { gameStatus, handleResetGame };
}
