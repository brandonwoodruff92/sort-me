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
  "default": "#ff1000",
  "swap": "#777775",
  "compare": "#777775",
  // "compare": "#ff1000",
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
    this.intervalAmount = interval;
    this.isSorted = false;
    this.comparisons = 0;
    this._render();
  }

  isSorted() {
    return this.isSorted;
  }

  isRunning() {
    return this.interval ? true : false;
  }

  run() {
    if (this.sort) {
      this.interval = window.setInterval(this._step, this.intervalAmount);
      switch (this.sort) {
        case Algorithms.BUBBLE_SORT:
          this.bubbleSort();
          break;
        case Algorithms.SELECTION_SORT:
          this.selectionSort();
          break;
        case Algorithms.INSERTION_SORT:
          this.insertionSort();
          break;
        case Algorithms.QUICK_SORT:
          this.quickSort();
          break;
        case Algorithms.MERGE_SORT:
          this.mergeSort();
          break;
        case Algorithms.HEAP_SORT:
          this.heapSort();
          break;
        default:
          break;
      }
    }
  }

  shuffle() {
    SortMe._shuffle(this.arr);
    this.displayArr = new DisplayArray(this.arr, this.renderScreen);
    this.comparisons = 0;
  }

  setSort(sort) {
    this.sort = sort;
  }

  size() {
    return this.displayArr.length;
  }

  _render() {
    console.log("rendering");
    this._clearScreen();

    for (let i = 0; i < this.displayArr.length; i++) {
      const barDisplay = this.displayArr.get(i);
      const bar = barDisplay[0];
      const hueRotate = `${barDisplay[1]}deg`;
      const state = barDisplay[2];

      const barContainer = this._prepareBar(bar, hueRotate, state);

      this.renderScreen.appendChild(barContainer);
    }

    const comparisons = document.querySelector(".comparison-counter");
    comparisons.innerHTML = `Comparisons: ${this.comparisons}`;
  }

  _prepareBar(barContainer, hueRotate, state) {
    const bar = barContainer.getElementsByClassName("chart-bar")[0];
    const backgroundBar = barContainer.getElementsByClassName("background-bar")[0];

    if (state === States.COMPARE_STATE) {
      backgroundBar.style.opacity = "0.5";
    } else if (state === States.DEFAULT_STATE) {
      backgroundBar.style.opacity = "0";
    }

    bar.style.background = COLORS[state];
    bar.style.filter = `hue-rotate(${hueRotate})`;

    return barContainer;
  }

  _clearScreen() {
    while (this.renderScreen.firstChild) {
      this.renderScreen.removeChild(this.renderScreen.firstChild);
    }
  }

  bubbleSort() {
    let sorted = false;
    let n = this.arr.length;

    while (!sorted) {
      sorted = true;

      for (let i = 0; i < n - 1; i++) {
        const j = i + 1;
        const comparison = this._compare(i, j);

        if (comparison === 1) {
          this._swap(i, j);
          sorted = false;
        }
      }

      n--;
    }
  }

  selectionSort() {

    let minIdx;

    for (let i = 0; i < this.arr.length - 1; i++) {
      minIdx = i;

      for (let j = i + 1; j < this.arr.length; j++) {
        const comparison = this._compare(minIdx, j);

        if (comparison === 1) {
          minIdx = j;
        }
      }

      this._swap(i, minIdx);
    }


  }

  insertionSort() {
    for (let i = 1; i < this.arr.length; i++) {
      for (let j = i; j > 0 && this._compare(j, j - 1 ) === -1; j--) {
        this._swap(j, j - 1);
      }
    }
  }

  quickSort() {
    this._recQuickSort(this.arr);
  }

  _recQuickSort(arr, left = 0, right) {
    if (typeof(right) === "undefined") {
      right = arr.length - 1;
    }

    if (left >= right) {
      return;
    }

    let pivot = this._partition(arr, left, right);

    this._recQuickSort(arr, left, pivot - 1);
    this._recQuickSort(arr, pivot + 1, right);
  }

  _partition(arr, left, right) {
    let pivot = left;

    this._swap(pivot, right);

    for (let i = left; i < right; i++) {
      const compare = this._compare(i, right);

      if (compare === -1) {
        if (i !== pivot) {
          this._swap(i, pivot);
        }
        pivot++;
      }
    }

    this._swap(right, pivot);

    return pivot;
  }

  mergeSort() {
    this._recMergeSort(this.arr);
  }

  _recMergeSort(arr, first = 0, last) {
    if (typeof(last) === "undefined") {
      last = arr.length - 1;
    }

    if (first >= last) {
      return;
    }

    const mid = Math.floor((first + last) / 2);

    this._recMergeSort(arr, first, mid);
    this._recMergeSort(arr, mid + 1, last);

    let left = first;
    let right = mid + 1;

    if (this._compare(mid, right) <= 0) {
      return;
    }

    while (left <= mid && right <= last) {
      if (this._compare(left, right) <= 0) {
        left++;
      } else {
        this._swap(left, right);
        right++;
      }
    }
  }

  heapSort() {
    let left = 0;
    let right = this.arr.length - 1;

    let start = Math.floor(this.arr.length / 2) - 1 + left;

    while (start >= left) {
      this._siftDown(start, right, left, right);
      start--;
    }

    let end = right;
    while (end > left) {
      this._swap(end, left);
      end--;
      this._siftDown(left, end, left, right);
    }
  }

  _siftDown(start, end, left, right) {
    let root = start;

    while (true) {
      let leftChild = 2 * (root - left) + 1 + left;
      let rightChild = 2 * (root - left) + 2 + left;

      if (leftChild > end) {
        break;
      }

      let swap = root;

      if (this._compare(swap, leftChild) === -1) {
        swap = leftChild;
      }

      if (rightChild <= end && this._compare(swap, rightChild) === -1)  {
        swap = rightChild;
      }

      if (swap === root) {
        return;
      }

      this._swap(root, swap);
      root = swap;
    }
  }

  _step() {
    //Get the next action from the action buffer and complete the action.

    if (this.actionBuffer.length() <= 0) {
      this._render();
      clearInterval(this.interval);
      this.interval = null;
      this.isSorted = true;
      return;
    }

    const action = this.actionBuffer.getAction();

    const i = action[0];
    const j = action[1];
    const actionType = action[2];
    this.displayArr.sendAction(action);

    if (actionType === Actions.COMPARE) {
      this.comparisons++;
    }

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
