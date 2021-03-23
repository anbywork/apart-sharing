export const setFlatListPosition = () => {
  const flatList = document.querySelector('.flats__list');
  const flatListWidth = flatList.scrollWidth;
  const flat = flatList.querySelector('.flat');
  const flatWidth = flat.offsetWidth;
  flatList.scrollLeft = flatListWidth / 2 - flatWidth / 2 - 25;
};