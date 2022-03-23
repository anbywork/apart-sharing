export const render = (parentElement, place, template,) => {
  parentElement.insertAdjacentHTML(place, template);
}

export const createElement = (template) => {
  const div = document.createElement('div');
  div.insertAdjacentHTML('beforeend', template);
  return div.children[0];
}