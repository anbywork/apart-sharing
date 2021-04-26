class Calc {
  constructor(element) {
    this.element = element;
    this.summaryElement = element.querySelector('.calc__summary');
    this.flatRangeElement = element.querySelector('.calc__range--flats'),
    this.flatsRange = {
      current: 100,
      currentElement: this.flatRangeElement.querySelector('.calc-range__li--active'),
      indicatorElement: this.flatRangeElement.querySelector('.calc-range__indicator'),
    };
    this.costRangeElement = element.querySelector('.calc__range--cost');
    this.costRange = {
      min: 1500,
      max: 10000,
      step: 500,
      current: 2500,
      indicatorElement: this.costRangeElement.querySelector('.calc-range__indicator'),
    };
    const flatsElements = this.flatRangeElement.querySelectorAll('.calc-range__li:not(.calc-range__li--hide)');
    this.flatsAblePositions = this.findFlatPositions(flatsElements);


  }
  findFlatPositions(elements) {
    const ulRect = elements[0].closest('ul').getBoundingClientRect();
    const ablePositions = Array.from(elements).map(li => {
      const value = li.getAttribute('data-value');
      const liRect = li.getBoundingClientRect();

      const position = {
        x: liRect.x - ulRect.x,
        y: liRect.y - ulRect.y,
      };
      return {
        value: value,
        position: position,
        element: li,
      }
    });
    return ablePositions;
  }
  setFlatCount() {
    const calc = this;
    // для всех доступных вариантов добавить обработчик клика
    for (let item of this.flatsAblePositions) {
      item.element.addEventListener('click', function (evt) {
        evt.preventDefault();
        // активный элемент сделать простым
        calc.flatRangeElement.querySelector('.calc-range__li--active').classList.remove('calc-range__li--active');
        // выбранный элемент сделать активным
        item.element.classList.add('calc-range__li--active');
        // изменить текущее значение
        calc.flatsRange.current = item.value;
        // переместить отметку к выбранному элементу
        calc.flatsRange.indicatorElement.style.left = item.position.x + 'px';
        calc.setSummary();

      });
    }
  }
  setIndicator(indicatorElement) {
    const calc = this;
    let minItem;
    indicatorElement.addEventListener('mousedown',  onDown);
    indicatorElement.addEventListener('touchstart',  onDown);
    function onDown (evt) {

      evt.preventDefault();
      let startX;
      if (evt.type === 'mousedown') {
        startX = evt.clientX;
      } else {
        startX = evt.touches[0].clientX;
      }

      const startOffsetLeft = indicatorElement.offsetLeft;

      const onMove = function(moveEvt) {
        let shiftX;
        if (moveEvt.type === 'mousemove') {
          // moveEvt.preventDefault();
          shiftX = startX - moveEvt.clientX;
        } else {
          shiftX = startX - moveEvt.touches[0].clientX;
        }

        indicatorElement.classList.add('calc-range__indicator--active');

        let newIndicatorLeft = startOffsetLeft - shiftX - indicatorElement.offsetWidth/2;

        let widthList = indicatorElement.previousElementSibling.offsetWidth;
        if (newIndicatorLeft < 0) {
          newIndicatorLeft = 0;
        } else if (newIndicatorLeft > widthList) {
          newIndicatorLeft = widthList - indicatorElement.offsetWidth / 2;
        }

        indicatorElement.style.left = newIndicatorLeft + 'px';
        minItem = calc.getClosestPoint(indicatorElement, newIndicatorLeft);
      }
      const onUp = function (upEvt) {
        if (upEvt.type === 'mouseup') {
          upEvt.preventDefault();
        }
        indicatorElement.classList.remove('calc-range__indicator--active');
        indicatorElement.style.left = minItem.position.x + 'px';
        calc.flatsRange.current = minItem.value;
        const currentActiveElement = calc.flatRangeElement.querySelector('.calc-range__li--active');
        currentActiveElement.classList.remove('calc-range__li--active');
        minItem.element.classList.add('calc-range__li--active');
        calc.setSummary();
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("touchmove", onMove);
        document.removeEventListener("touchend", onUp);
        document.removeEventListener("mouseup", onUp);
      }
      document.addEventListener('mousemove', onMove);
      document.addEventListener("touchmove", onMove);
      document.addEventListener("touchend", onUp);
      document.addEventListener('mouseup', onUp);
    }
  }
  setFlowIndicator(indicatorElement) {
    const calc = this;
    indicatorElement.addEventListener('mousedown',  onDown);
    indicatorElement.addEventListener('touchstart',  onDown);
    function onDown(evt) {
      evt.preventDefault();
      let startX;
      if(evt.type === 'mousedown') {
        startX = evt.clientX;
      } else {
        startX = evt.touches[0].clientX;
      }

      const startOffsetLeft = indicatorElement.offsetLeft;

      const onMouseMove = function(moveEvt) {
        moveEvt.preventDefault();
        indicatorElement.classList.add('calc-range__indicator--active');
        let shiftX;
        if(moveEvt.type === 'mousemove') {
          shiftX = startX - moveEvt.clientX;
        } else {
          shiftX = startX - moveEvt.touches[0].clientX;
        }
        let newIndicatorLeft = startOffsetLeft - shiftX - indicatorElement.offsetWidth/2;

        const firstElement = calc.costRangeElement.querySelector('.calc-range__li:first-child');
        const leftEdge = firstElement.offsetLeft + firstElement.offsetWidth / 2 - 8;
        const lastElement = calc.costRangeElement.querySelector('.calc-range__li:last-child');
        const rightEdge = lastElement.offsetLeft + lastElement.offsetWidth / 2 - 12;
        const widthRange = rightEdge - leftEdge;

        let currentValue = Math.round(newIndicatorLeft * ((calc.costRange.max-calc.costRange.min) / widthRange)) + calc.costRange.min;

        if (newIndicatorLeft < leftEdge) {
          newIndicatorLeft = leftEdge;
          currentValue = calc.costRange.min;
        } else if (newIndicatorLeft > rightEdge) {
          newIndicatorLeft = rightEdge + 12 - indicatorElement.offsetWidth / 2;
          currentValue = calc.costRange.max;
        }

        indicatorElement.style.left = newIndicatorLeft + 'px';

        calc.costRange.current = currentValue;
        indicatorElement.setAttribute('data-content', `${String(calc.costRange.current).replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} ₽`);

        calc.setSummary();
      }
      const onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        indicatorElement.classList.remove('calc-range__indicator--active');
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        document.removeEventListener("touchmove", onMouseMove);
        document.removeEventListener("touchend", onMouseUp);
      }
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('touchmove', onMouseMove);
      document.addEventListener('touchend', onMouseUp);
    }
  }

  getClosestPoint(indicatorElement, left) {
    const arrayValue = this.flatsAblePositions;
    const sortArray = arrayValue
      .map(item => {
        return {
          value: item.value,
          path: Math.abs(item.position.x - left),
          position: item.position,
          element: item.element,
        };})
      .sort((a, b) => {
        if(a.path > b.path) return 1;
        if(a.path === b.path) return 0;
        if(a.path < b.path) return -1;
      });

    const min = sortArray[0];
    return min;
  }

  setSummary() {
    this.summaryElement.innerText = String(this.flatsRange.current * this.costRange.current * 30 * 0.18).replace(/(\d)(?=(\d{3})+$)/g, '$1 ') + '₽';
  }
}

export const setCalc = () => {
  const calcElement =  document.querySelector('.calc');
  if (!calcElement) {
    return;
  }
  const calc = new Calc(calcElement);
  calc.flatsRange.indicatorElement.style.left = calc.flatsRange.currentElement.offsetLeft + 1 + 'px';

  const firstElement = calc.costRangeElement.querySelector('.calc-range__li:first-child');
  const leftEdge = firstElement.offsetLeft + firstElement.offsetWidth / 2 - 8;
  const lastElement = calc.costRangeElement.querySelector('.calc-range__li:last-child');
  const rightEdge = lastElement.offsetLeft + lastElement.offsetWidth / 2;
  const widthRange = rightEdge - leftEdge;
  calc.costRange.indicatorElement.style.left = Math.round(widthRange * ((calc.costRange.current - calc.costRange.min) / (calc.costRange.max - calc.costRange.min))) + 'px';

  calc.setIndicator(calc.flatsRange.indicatorElement);
  calc.setFlowIndicator(calc.costRange.indicatorElement);
  calc.setFlatCount();

}