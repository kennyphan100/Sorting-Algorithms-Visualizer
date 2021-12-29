import React from 'react';
import './SortingVisualizer.css';
import {getMergeSortAnimations} from '../SortingAlgorithms/MergeSort.js';
import {getBubbleSortAnimations} from '../SortingAlgorithms/BubbleSort.js';
import {getQuickSortAnimations} from '../SortingAlgorithms/QuickSort.js';
import {getHeapSortAnimations} from '../SortingAlgorithms/HeapSort.js';
import {getSelectionSortAnimations} from '../SortingAlgorithms/SelectionSort.js';
import {getInsertionSortAnimations} from '../SortingAlgorithms/InsertionSort.js';

let speed = 1;
let numberOfBars = 150;
const PRIMARY_COLOR = 'rgb(235, 177, 52)';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    render() {
        let {array} = this.state;
        let length = array.length;
        let width;

        if (length >= 250) {
            width = 2;
        } else if (length >= 200) {
            width = 3;
        } else if (length >= 150) {
            width = 5;
        } else if (length >= 100) {
            width = 8;
        } else if (length >= 50) {
            width = 10;
        } else if (length >= 25) {
            width = 20;
        } else if (length >= 15) {
            width = 40;
        } else if (length >= 5) {
            width = 55;
        }

        return (
        <div id="box">
            <h1 id="title">Sorting Algorithms Visualizer</h1>
            
            <div className="header">

                <span className='options'>
                    <button type="button" id="generateNewList" className="btn btn-warning buttons" onClick={() => this.resetArray()}>Generate New List</button>
                </span>

                <span className="options">
                    <label htmlFor="algorithms" id="algorithms_text" className='text'><strong>Algorithms:</strong> </label>
                    <select id="algorithms" className="cars">
                        <option value="Merge Sort">Merge Sort</option>
                        <option value="Quick Sort">Quick Sort</option>
                        <option value="Heap Sort">Heap Sort</option>
                        <option value="Bubble Sort">Bubble Sort</option>
                        <option value="Selection Sort">Selection Sort</option>     
                        <option value="Insertion Sort">Insertion Sort</option>
                    </select> 
                </span>

                <span className='options'>
                    <button type="button" id="sort" className="btn btn-warning buttons" onClick={() => this.getAndSortAlgorithmInput()}>SORT</button>
                </span>

                <span className="options">
                    <label htmlFor="speed" className="text"> <strong>Speed: </strong> </label>
                    <label htmlFor="speed" className="text"> <span className="speedType">(Fast) </span> </label>
                    <input type="range" id="speed" name="speed" defaultValue={speed} min="1" max="500" onChange={() => this.changeSpeed()} />
                    <label htmlFor="speed" className="text"> <span className="speedType">(Slow) </span> </label>
                </span>

                <label htmlFor="size" className="text"> <strong>Size:</strong> </label>
                <input type="range" id="size" name="size" defaultValue="150" min="5" max="300" onChange={() => this.changeListSize()} />

            </div>

            <div className="bars">
                {array.map((value, idx) => (
                    <div className="array-bar" key={idx} style={{width: `${width}px`, height: `${value}px`}}></div>  
                ))}
            </div>

        </div> 
        );
    }

    resetArray() {
        let array = [];

        for (let i = 0; i < numberOfBars; i++) {
            array.push(this.randomIntFromInterval(5, 650));
        }

        this.setState({array});
    }

    bubbleSort() {
        let animations = getBubbleSortAnimations(this.state.array);

        for (let i = 0; i < animations.length; i++) {
            let arrayBars = document.getElementsByClassName('array-bar');
            
            setTimeout(() => {
                let [barOneIdx, barTwoIdx, newHeight1, newHeight2, isSwapped] = animations[i];
                let barOneStyle = arrayBars[barOneIdx].style;
                let barTwoStyle = arrayBars[barTwoIdx].style;

                let [nextBarOneIdx, nextBarTwoIdx, nextNewHeight1, nextNewHeight2, nextIsSwapped] = animations[i + 1];
                let nextBarOneStyle = arrayBars[nextBarOneIdx].style;
                let nextBarTwoStyle = arrayBars[nextBarTwoIdx].style;

                let previousBarOneIdx, previousBarTwoIdx, previousBarOneStyle, previousBarTwoStyle;
                if (i !== 0) {
                    [previousBarOneIdx, previousBarTwoIdx] = animations[i - 1];
                    previousBarOneStyle = arrayBars[previousBarOneIdx].style;
                    previousBarTwoStyle = arrayBars[previousBarTwoIdx].style;
                    previousBarOneStyle.backgroundColor = PRIMARY_COLOR;
                }

                if (isSwapped) {
                    barOneStyle.backgroundColor = 'green';
                    barTwoStyle.backgroundColor = 'green';

                    barOneStyle.height = `${newHeight2}px`;
                    barTwoStyle.height = `${newHeight1}px`;

                } else {
                    barOneStyle.backgroundColor = 'red';
                    barTwoStyle.backgroundColor = 'red';
                }

                if (nextBarOneIdx <= barOneIdx) {
                    barOneStyle.backgroundColor = PRIMARY_COLOR;
                    barTwoStyle.backgroundColor = PRIMARY_COLOR;
                }
                
            }, i * speed);

        }

        this.toggleButtonsOn(animations.length);
    }

    quickSort() {
        let animations = getQuickSortAnimations(this.state.array);

        for (let i = 0; i < animations.length; i++) {
            let arrayBars = document.getElementsByClassName('array-bar');
            
            setTimeout(() => {
                let [pivotIndex, leftBarIndex, rightBarIndex, leftBarHeight, rightBarHeight, isSwapped] = animations[i];
                let pivotIndexStyle = arrayBars[pivotIndex].style;
                let leftBarStyle = arrayBars[leftBarIndex].style;
                let rightBarStyle = arrayBars[rightBarIndex].style;

                let nextPivotIndex, nextLeftBarIndex, nextRightBarIndex, nextLeftBarHeight, nextRightBarHeight, nextIsSwapped;

                if (i < animations.length - 1) {
                    [nextPivotIndex, nextLeftBarIndex, nextRightBarIndex, nextLeftBarHeight, nextRightBarHeight, nextIsSwapped] = animations[i + 1];
                }

                pivotIndexStyle.backgroundColor = 'red';

                if (nextPivotIndex !== pivotIndex) {
                    pivotIndexStyle.backgroundColor = PRIMARY_COLOR
                }

                if (i !== 0) {
                    let [previousPivotIndex, previousLeftBarIndex, previousRightBarIndex , previousLeftBarHeight, previousRightBarHeight, previousIsSwapped] = animations[i - 1];
                    if (previousLeftBarIndex !== null) {
                        arrayBars[previousLeftBarIndex].style.backgroundColor = PRIMARY_COLOR;
                    }
                }

                if (isSwapped) {
                    leftBarStyle.height = `${rightBarHeight}px`;
                    rightBarStyle.height = `${leftBarHeight}px`;

                } else {
                    if (leftBarIndex !== null) {
                        leftBarStyle.backgroundColor = 'green';
                    }
                }

            }, i * speed );

        }

        this.toggleButtonsOn(animations.length);
    }

    mergeSort() {
        let animations = getMergeSortAnimations(this.state.array);

        for (let i = 0; i < animations.length; i++) {
            let arrayBars = document.getElementsByClassName('array-bar');
            let isColorChange = i % 3 !== 2;

            if (isColorChange) {
                let [barOneIdx, barTwoIdx] = animations[i];
                let barOneStyle = arrayBars[barOneIdx].style;
                let barTwoStyle = arrayBars[barTwoIdx].style;
                
                let color = i % 3 === 0 ? 'green' : PRIMARY_COLOR;

                setTimeout(() => {
                   barOneStyle.backgroundColor = color;
                   barTwoStyle.backgroundColor = color;  
                }, i * speed);
                
            } else {
                setTimeout(() => {
                    let [barOneIdx, newHeight] = animations[i];
                    let barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * speed);
            }
        }

        this.toggleButtonsOn(animations.length);
    }

    heapSort() {
        let animations = getHeapSortAnimations(this.state.array);

        for (let i = 0; i < animations.length; i++) {
            let arrayBars = document.getElementsByClassName('array-bar');
            
            setTimeout(() => {
                let [firstBarIndex, secondBarIndex, firstBarHeight, secondBarHeight] = animations[i];
                let firstBarStyle = arrayBars[firstBarIndex].style;
                let secondBarStyle = arrayBars[secondBarIndex].style;

                if (i !== 0) {
                    let [previousFirstBarIndex, previousSecondBarIndex, previousFirstBarHeight, previousSecondBarHeight] = animations[i - 1];
                    arrayBars[previousFirstBarIndex].style.backgroundColor = PRIMARY_COLOR;
                    arrayBars[previousSecondBarIndex].style.backgroundColor = PRIMARY_COLOR;
                }

                firstBarStyle.backgroundColor = "red";
                secondBarStyle.backgroundColor = "green";

                firstBarStyle.height = `${secondBarHeight}px`;
                secondBarStyle.height = `${firstBarHeight}px`;

                // Reset color to gold
                if (i == animations.length - 1) {
                    firstBarStyle.backgroundColor = PRIMARY_COLOR;
                    secondBarStyle.backgroundColor = PRIMARY_COLOR;
                }

            }, i * speed);
        }

        this.toggleButtonsOn(animations.length);
    }

    selectionSort() {
        let animations = getSelectionSortAnimations(this.state.array);

        for (let i = 0; i < animations.length; i++) {
            let arrayBars = document.getElementsByClassName('array-bar');
            
            setTimeout(() => {
                let [firstBarIndex, secondBarIndex, firstBarHeight, secondBarHeight, isSwapped] = animations[i];
                let firstBarStyle = arrayBars[firstBarIndex].style; // first bar = the bar with smallest value - red
                let secondBarStyle = arrayBars[secondBarIndex].style; // second bar = the bar moving along the list to find the smallest value - green

                let previousFirstBarIndex, previousSecondBarIndex, previousFirstBarHeight, previousSecondBarHeight, previousIsSwapped, previousFirstBarStyle, previousSecondBarStyle;
                if (i > 0) {
                    [previousFirstBarIndex, previousSecondBarIndex, previousFirstBarHeight, previousSecondBarHeight, previousIsSwapped] = animations[i - 1];

                    previousFirstBarStyle = arrayBars[previousFirstBarIndex].style;
                    previousSecondBarStyle = arrayBars[previousSecondBarIndex].style;

                    previousSecondBarStyle.backgroundColor = PRIMARY_COLOR;
                }

                let nextFirstBarIndex, nextSecondBarIndex, nextFirstBarHeight, nextSecondBarHeight, nextIsSwapped, nextFirstBarStyle, nextSecondBarStyle;
                if (i < animations.length - 1) {
                    [nextFirstBarIndex, nextSecondBarIndex, nextFirstBarHeight, nextSecondBarHeight, nextIsSwapped] = animations[i + 1];

                    nextFirstBarStyle = arrayBars[nextFirstBarIndex].style;
                    nextSecondBarStyle = arrayBars[nextSecondBarIndex].style;
                }

                if (firstBarIndex !== previousFirstBarIndex) {
                    if (typeof previousFirstBarStyle !== 'undefined') {
                        previousFirstBarStyle.backgroundColor = PRIMARY_COLOR;
                    }
                }

                firstBarStyle.backgroundColor = "red";
                secondBarStyle.backgroundColor = "green";

                if (isSwapped) {
                    firstBarStyle.height = `${secondBarHeight}px`;
                    secondBarStyle.height = `${firstBarHeight}px`;
                }

                // Reset color to gold
                if (i === animations.length - 1) {
                    firstBarStyle.backgroundColor = PRIMARY_COLOR;
                    secondBarStyle.backgroundColor = PRIMARY_COLOR;
                }
                
            }, i * speed);
        }

        this.toggleButtonsOn(animations.length);
    }

    insertionSort() {
        let animations = getInsertionSortAnimations(this.state.array);

        for (let i = 0; i < animations.length; i++) {
            let arrayBars = document.getElementsByClassName('array-bar');
            
            setTimeout(() => {
                let [firstBarIndex, newBarHeight] = animations[i];
                let firstBarStyle = arrayBars[firstBarIndex].style;

                let nextFirstBarIndex, nextFirstBarHeight, nextFirstBarStyle;
                if (i < animations.length - 1) {
                    [nextFirstBarIndex, nextFirstBarHeight] = animations[i + 1];
                    nextFirstBarStyle = arrayBars[nextFirstBarIndex].style;
                }

                let previousFirstBarIndex, previousFirstBarHeight, previousFirstBarStyle;
                if (i > 0) {
                    [previousFirstBarIndex, previousFirstBarHeight] = animations[i - 1];
                    previousFirstBarStyle = arrayBars[previousFirstBarIndex].style;
                }

                previousFirstBarStyle.backgroundColor = PRIMARY_COLOR;

                firstBarStyle.height = `${newBarHeight}px`;
                firstBarStyle.backgroundColor = 'red';    

                if (nextFirstBarIndex === firstBarIndex - 1) {
                    firstBarStyle.backgroundColor = 'green';  
                }
                
                if (i === animations.length - 1) {
                    firstBarStyle.backgroundColor = PRIMARY_COLOR;
                }

            }, i * speed);

        }

        this.toggleButtonsOn(animations.length);
    }

    // Enable buttons
    toggleButtonsOn(animationsSize) {
        let totalAnimationTime = animationsSize * speed;
        setTimeout(() => {
            this.toggleButtonsOff(false);
        }, totalAnimationTime) ;
    }

    // Disable buttons
    toggleButtonsOff(toggle) {
        document.getElementById("algorithms").disabled = toggle;
        document.getElementById("generateNewList").disabled = toggle;
        document.getElementById("sort").disabled = toggle;
        document.getElementById("size").disabled = toggle;
        document.getElementById("speed").disabled = toggle;
    }

    // Adjust list size according to user input
    changeListSize() {
        numberOfBars = document.getElementById("size").value;
        
        this.resetArray();
    }

    // Adjust speed according to user input
    changeSpeed(value) {
        speed = document.getElementById("speed").value;
    }

    // Execute algorithm according to user input
    getAndSortAlgorithmInput() {
        let algorithmInput = document.getElementById('algorithms');
        let algorithm = algorithmInput.options[algorithmInput.selectedIndex].value;

        this.toggleButtonsOff(true);
        
        if (algorithm === "Merge Sort") {
            this.mergeSort();

        } else if (algorithm === "Quick Sort") {
            this.quickSort();

        } else if (algorithm === "Bubble Sort") {
            this.bubbleSort();

        } else if (algorithm === "Heap Sort") {
            this.heapSort();

        } else if (algorithm === "Selection Sort") {
            this.selectionSort();

        } else if (algorithm === "Insertion Sort") {
            this.insertionSort();
        }

    }

    // Generate random integer between a range
    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

}
