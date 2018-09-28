const Algorithms = {
  BUBBLE_SORT: "bubbleSort",
  SELECTION_SORT: "selectionSort",
  INSERTION_SORT: "insertionSort",
  QUICK_SORT: "quickSort"
};
Object.freeze(Algorithms);

class SortMe {
  static run(arr, sort) {
    const interval = 5000 / arr.length;
    const renderScreen = document.getElementById("render-screen");
    const animatedArr = new AnimatedArray(arr, renderScreen, interval);

    switch (sort) {
      case Algorithms.BUBBLE_SORT:
        animatedArr.bubbleSort();
        break;
      case Algorithms.SELECTION_SORT:
        animatedArr.selectionSort();
        break;
      case Algorithms.INSERTION_SORT:
        animatedArr.insertionSort();
        break;
      case Algorithms.QUICK_SORT:
        animatedArr.quickSort();
        break;
      default:
        break;
    }
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
