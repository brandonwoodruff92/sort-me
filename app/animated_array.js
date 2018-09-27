var States = {
  DEFAULT_STATE: "default",
  SWAP_STATE: "swap",
  COMPARE_STATE: "compare",
  SORTED_STATE: "sorted"
};
Object.freeze(States);

var Actions = {
  SWAP: "swap",
  COMPARE: "compare"
};
Object.freeze(Actions);

const COLORS = {
  "default": "#EE6055",
  "swap": "#FFD97D",
  "compare": "#FF9B85",
  "sorted": "#AAF683"
};
Object.freeze(COLORS);

class AnimatedArray {
  constructor(arr, renderScreen, interval) {
    //arr => Array used for computation
    //
    //displayArr => Stores an element/state pair which is a copy of the
    //original array. Is used for rendering and is modified by _step() actions.
    //
    //actionBuffer => Queues up each action of a sorting algorithm
    //for use in _step().
    //
    //renderScreen => Stores the screen which will render the displayArr.
    //
    //interval => Stores the interval id of the step interval (ms).
    //
    //Sample displayArr => [[1, "default"], [3, "compare"], [2, "compare"]]

    this.arr = arr;
    this.renderScreen = renderScreen;
    this.displayArr = new DisplayArray(arr, renderScreen);
    this.actionBuffer = new ActionBuffer();
    this._step = this._step.bind(this);
    this.interval = window.setInterval(this._step, interval);
  }

  _render() {
    console.log("rendering");
    this._clearScreen();

    for (let i = 0; i < this.displayArr.length; i++) {
      const barDisplay = this.displayArr.get(i);
      const bar = barDisplay[0];
      const state = barDisplay[1];

      bar.style.background = COLORS[state];

      this.renderScreen.appendChild(bar);
    }
  }

  _clearScreen() {
    while (this.renderScreen.firstChild) {
      this.renderScreen.removeChild(this.renderScreen.firstChild);
    }
  }

  bubbleSort() {
    let sorted = false;

    while (!sorted) {
      sorted = true;

      for (let i = 0; i < this.arr.length - 1; i++) {
        const j = i + 1;
        const comparison = this._compare(i, j);

        if (comparison === 1) {
          this._swap(i, j);
          sorted = false;
        }
      }
    }
  }


  _step() {
    //Get the next action from the action buffer and complete the action.

    if (this.actionBuffer.length() <= 0) {
      this._render();
      clearInterval(this.interval);
      return;
    }

    const action = this.actionBuffer.getAction();

    const i = action[0];
    const j = action[1];
    const actionType = action[2];
    console.log(`sending action: ${action}`);
    console.log(`action buffer: ${this.actionBuffer.length()}`);
    this.displayArr.sendAction(action);

    this._render();
    this.displayArr.setState(i, States.DEFAULT_STATE);
    this.displayArr.setState(j, States.DEFAULT_STATE);
  }

  _swap(i, j) {
    //Pushes a SWAP action to the actionBuffer and performs a swap on
    //the original array.

    this.actionBuffer.pushAction([i, j, Actions.SWAP]);
    let temp = this.arr[i];
    this.arr[i] = this.arr[j];
    this.arr[j] = temp;
  }

  _compare(i, j) {
    //Pushes a COMPARE action to the actionBuffer and performs a comparison
    //on the original array.

    this.actionBuffer.pushAction([i, j, Actions.COMPARE]);
    if (this.arr[i] > this.arr[j]) {
      return 1;
    } else if (this.arr[i] === this.arr[j]) {
      return 0;
    } else {
      return -1;
    }
  }
}
