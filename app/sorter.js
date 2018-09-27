class Sorter {
  constructor(viewHandler) {
    this.viewHandler = viewHandler;
  }

  bubbleSort(arr) {
    let sorted = true;

    while (sorted) {
      sorted = false;

      for (let i = 0; i < arr.length - 1; i++) {
        this.viewHandler.wipeBars();
        this.viewHandler.render(arr);
        const ele1 = arr[i];
        const ele2 = arr[i + 1];

        if (ele1 > ele2) {
          arr[i] = ele2;
          arr[i + 1] = ele1;
          sorted = true;
        }
      }
    }

    return arr;
  }
}
