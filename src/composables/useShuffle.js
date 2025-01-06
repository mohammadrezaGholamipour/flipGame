export function useShuffle(state) {
  const handleShuffle = () => {
    clearTimeout(state.clickTimeOut)
    state.list = false
    const array = [
      { id: 1, showImage: true, imageName: 1, found: false },
      { id: 2, showImage: true, imageName: 1, found: false },
      { id: 3, showImage: true, imageName: 2, found: false },
      { id: 4, showImage: true, imageName: 2, found: false },
      { id: 5, showImage: true, imageName: 3, found: false },
      { id: 6, showImage: true, imageName: 3, found: false },
      { id: 7, showImage: true, imageName: 4, found: false },
      { id: 8, showImage: true, imageName: 4, found: false },
      { id: 9, showImage: true, imageName: 5, found: false },
      { id: 10, showImage: true, imageName: 5, found: false },
      { id: 11, showImage: true, imageName: 6, found: false },
      { id: 12, showImage: true, imageName: 6, found: false },
      { id: 13, showImage: true, imageName: 7, found: false },
      { id: 14, showImage: true, imageName: 7, found: false },
      { id: 15, showImage: true, imageName: 8, found: false },
      { id: 16, showImage: true, imageName: 8, found: false },
    ];

    state.list = [...array.sort(() => Math.random() - 0.5)]
    setTimeout(() => {
      state.list.forEach(element => {
        element.showImage = false
      });
    }, 2000);
  };

  return { handleShuffle };
}
