import { useGameStore } from "../store/gameStore";


export const uiActions = {
  togglePause: () => {
    useGameStore.setState((state) => {
      state.isPaused = !state.isPaused;
    });
  },

  setPause: (paused: boolean) => {
    useGameStore.setState((state) => {
      state.isPaused = paused;
    });
  },

  isPaused: (): boolean => {
    return useGameStore.getState().isPaused;
  },

  toggleDebugPanel: () => {
    useGameStore.setState((state) => {
      state.showDebugPanel = !state.showDebugPanel;
    });
  },

  setDebugPanel: (visible: boolean) => {
    useGameStore.setState((state) => {
      state.showDebugPanel = visible;
    });
  },

  isDebugPanelVisible: (): boolean => {
    return useGameStore.getState().showDebugPanel;
  },
};
