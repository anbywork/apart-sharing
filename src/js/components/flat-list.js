export const setFlatListPosition = () => {
  const flatList = document.querySelector('.flats__list');
  const flatListWidth = flatList.scrollWidth;

  const screenWidth = document.documentElement.offsetWidth;

  flatList.scrollLeft = flatListWidth / 2 - screenWidth / 2;
};