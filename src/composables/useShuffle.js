export function useShuffle(state) {
  const handleShuffle = () => {
    clearTimeout(state.clickTimeOut)
    const array = [
      { id: 1, showImage: false, imageName: 1, found: false },
      { id: 2, showImage: false, imageName: 1, found: false },
      { id: 3, showImage: false, imageName: 2, found: false },
      { id: 4, showImage: false, imageName: 2, found: false },
      { id: 5, showImage: false, imageName: 3, found: false },
      { id: 6, showImage: false, imageName: 3, found: false },
      { id: 7, showImage: false, imageName: 4, found: false },
      { id: 8, showImage: false, imageName: 4, found: false },
      { id: 9, showImage: false, imageName: 5, found: false },
      { id: 10, showImage: false, imageName: 5, found: false },
      { id: 11, showImage: false, imageName: 6, found: false },
      { id: 12, showImage: false, imageName: 6, found: false },
      { id: 13, showImage: false, imageName: 7, found: false },
      { id: 14, showImage: false, imageName: 7, found: false },
      { id: 15, showImage: false, imageName: 8, found: false },
      { id: 16, showImage: false, imageName: 8, found: false },
    ];
    state.list = false
    state.list = [...array]
    setTimeout(() => {
      state.list.sort(() => Math.random() - 0.5)
    }, 150);
  };

  return { handleShuffle };
}
