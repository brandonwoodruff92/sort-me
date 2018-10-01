var Algorithms = {
  BUBBLE_SORT: "bubbleSort",
  SELECTION_SORT: "selectionSort",
  INSERTION_SORT: "insertionSort",
  QUICK_SORT: "quickSort",
  MERGE_SORT: "mergeSort"
};
Object.freeze(Algorithms);

class SortMe {
  constructor(size, sort) {
    this.interval = 1000 / size;
    this.size = size;
    this.sort = sort;
    this.renderScreen = document.getElementById("render-screen");
    this.animatedArr = new AnimatedArray(SortMe.randomArr(size), this.renderScreen, this.interval);
  }

  run() {
    if (!this.animatedArr.isRunning()) {
      if (this.animatedArr.isSorted) {
        this.animatedArr.shuffle();
      }

      this.animatedArr.setSort(this.sort);
      this.animatedArr.run();
    }
  }

  size() {
    return this.animatedArr.size();
  }

  setSize(size) {
    this.size = size;

    if (!this.animatedArr.isRunning()) {
      this.animatedArr = new AnimatedArray(SortMe.randomArr(size), this.renderScreen, this.interval);
    }
  }

  setSort(sort) {
    this.sort = sort;
  }

  isRunning() {
    return this.animatedArr.isRunning();
  }

  static randomArr(size) {
    const arr = [];

    for (let i = 0; i < size; i++) {
      arr.push(i + 1);
    }

    return SortMe._shuffle(arr);
  }

  static _shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}
