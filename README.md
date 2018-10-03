# sort-me

A way to visualize sorting algorithms in real-time!

1. Select a sorting algorithm.
2. Populate it with varying sizes of data.
3. Let it run and see the results!

Live Link: http://brandonwoodruff.io/sort-me/

![screen shot 2018-10-02 at 14 43 21](https://user-images.githubusercontent.com/29648862/46369702-b704dd00-c651-11e8-8619-07dfd644bc12.png)

![screen shot 2018-10-02 at 14 45 56](https://user-images.githubusercontent.com/29648862/46369795-f4696a80-c651-11e8-90a1-b8b95925a4b7.png)

![screen shot 2018-10-02 at 14 48 52](https://user-images.githubusercontent.com/29648862/46369958-54f8a780-c652-11e8-926c-423efb40f1a9.png)

## Technology Used

- Vanilla JS DOM Manipulation
- HTML5
- CSS3

## Features 

- Scrollable algorithm selection.
- Incremented data size selection (10-100 elements).
- Hue-rotation gradiant scale across data bars for easy visualization of sorted elements.
- Dynamically resizing bars.

## Summary

This project was inspired by my desire to help people understand the fundementals of programming as a whole. I have found that programming is rarely visual, and a lot of the core concepts are purely abstract. Sorting algorithms, and time complexity, is a topic that many struggle to grasp, yet serves as the basis for many advanced programming concepts. With Sort-Me, my goal is to allow people to clearly see what is happening in the algorithm as it happens, so they can better understand their usage and speed.

## AnimatedArray

AnimatedArray is a wrapper class for integer arrays that has built-in sorting algorithm functions. These algorithms are designed to mimic common sorting algorithms by sending actions to an action buffer, such as swap and compare, and render the array onto the screen at set intervals. AnimatedArray is composed of the following:

arr: Original array used for computation.

displayArr: A copy of the original array which is parsed into and array of div "bars" with sizes equal to the values in the original array.

renderScreen: The screen which will render all of the displayArr bars.

intervalAmount: The amount of time (ms) to set the rendering interval at.

## Todo

- Merge Sort
- Heap Sort
- Search Algorithms
