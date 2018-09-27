class ViewHandler {
  buildBars(arr) {
    const renderScreen = document.getElementById("render-screen");
    const barWidth = this.getBarWidth(renderScreen, arr.length);
    const barHeightScale = this.getBarHeightScale(renderScreen, arr.length);

    for (let i = 0; i < arr.length; i++) {
      const bar = document.createElement("div");
      const barHeight = (i + 1) * barHeightScale;
      const marginTop = renderScreen.clientHeight - barHeight;

      bar.className = "chart-bar";
      bar.style.height = `${barHeight}px`;
      bar.style.width = `${barWidth}px`;
      bar.style.marginTop = `${marginTop}px`;

      renderScreen.appendChild(bar);
    }
  }

  getBarWidth(renderScreen, arrSize) {
    const screenWidth = renderScreen.clientWidth;
    return screenWidth / arrSize;
  }

  getBarHeightScale(renderScreen, arrSize) {
    const screenHeight = renderScreen.clientHeight;
    return screenHeight / arrSize;
  }

  wipeBars() {
    const renderScreen = document.getElementById("render-screen");
    while (renderScreen.firstChild) {
      renderScreen.removeChild(renderScreen.firstChild);
    }
  }

  render(arr) {
    this.buildBars(arr);
  }
}
