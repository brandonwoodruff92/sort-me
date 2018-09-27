const Algorithms = {
  BUBBLE_SORT: "bubbleSort"
};
Object.freeze(Algorithms);

class SortMe {
  static run(arr, interval, sort) {
    const renderScreen = document.getElementById("render-screen");
    const animatedArr = new AnimatedArray(arr, renderScreen, interval);

    switch (sort) {
      case Algorithms.BUBBLE_SORT:
        animatedArr.bubbleSort();
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
