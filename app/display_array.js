class DisplayArray {
  constructor(arr, renderScreen) {
    this.length = arr.length;
    this.bars = [];
    this.screenHeight = renderScreen.clientHeight;
    this.screenWidth = renderScreen.clientWidth;

    for (let i = 0; i < arr.length; i++) {
      const displayPair = [this.buildBar(arr[i], i), States.DEFAULT_STATE];
      this.bars.push(displayPair);
    }
  }

  sendAction(action) {
    const i = action[0];
    const j = action[1];
    const actionType = action[2];

    switch (actionType) {
      case Actions.SWAP:
        this.setState(i, States.SWAP_STATE);
        this.setState(j, States.SWAP_STATE);

        const temp = this.bars[i];
        this.bars[i] = this.bars[j];
        this.bars[j] = temp;
        break;
      case Actions.COMPARE:
        this.setState(i, States.COMPARE_STATE);
        this.setState(j, States.COMPARE_STATE);
        break;
      default:
        break;
    }
  }

  get(i) {
    return this.bars[i];
  }

  shift() {
    return this.bars.shift();
  }

  length() {
    return this.bars.length;
  }

  isEmpty() {
    return this.bars.length <= 0;
  }

  setState(i, state) {
    const displayPair = this.bars[i];
    displayPair[1] = state;
  }

  buildBar(ele, i) {
    const bar = document.createElement("div");
    const barHeight = (ele) * this.getBarHeightScale();
    const barWidth = this.getBarWidth();
    const marginTop = this.screenHeight - barHeight;

    bar.className = "chart-bar";
    bar.style.height = `${barHeight}px`;
    bar.style.width = `${barWidth}px`;
    bar.style.marginTop = `${marginTop}px`;

    return bar;
  }

  getBarWidth() {
    return this.screenWidth / this.length;
  }

  getBarHeightScale() {
    return this.screenHeight / this.length;
  }
}
