// Main Application Logic

// Initialize
const visualizer = new Visualizer('visualization-container');
const sortingAlgorithms = new SortingAlgorithms();

// DOM Elements
const algorithmSelect = document.getElementById('algorithm-select');
const arraySizeSlider = document.getElementById('array-size');
const speedSlider = document.getElementById('speed');
const generateBtn = document.getElementById('generate-btn');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');

const sizeValue = document.getElementById('size-value');
const speedValue = document.getElementById('speed-value');
const comparisonsDisplay = document.getElementById('comparisons');
const arrayAccessesDisplay = document.getElementById('array-accesses');
const swapsDisplay = document.getElementById('swaps');
const timeComplexityDisplay = document.getElementById('time-complexity');
const currentAlgorithmDisplay = document.getElementById('current-algorithm');
const algorithmDescription = document.getElementById('algorithm-description');

// State
let currentAlgorithm = 'bubble';
let arraySize = 50;
let speed = 50;
let currentStats = { comparisons: 0, arrayAccesses: 0, swaps: 0 };
let isPaused = false;

// Initialize the visualizer
visualizer.generateArray(arraySize);
updateAlgorithmInfo();

// Event Listeners
algorithmSelect.addEventListener('change', (e) => {
    currentAlgorithm = e.target.value;
    updateAlgorithmInfo();
    resetVisualization();
});

arraySizeSlider.addEventListener('input', (e) => {
    arraySize = parseInt(e.target.value);
    sizeValue.textContent = arraySize;
});

arraySizeSlider.addEventListener('change', (e) => {
    visualizer.generateArray(arraySize);
    resetStats();
});

speedSlider.addEventListener('input', (e) => {
    speed = parseInt(e.target.value);
    speedValue.textContent = `${speed}ms`;
    visualizer.setSpeed(speed);
});

generateBtn.addEventListener('click', () => {
    visualizer.generateArray(arraySize);
    resetStats();
    enableControls();
});

startBtn.addEventListener('click', async () => {
    if (isPaused) {
        // Resume
        isPaused = false;
        visualizer.resume(updateStatsDisplay);
        updateButtonStates(true);
    } else {
        // Start new sort
        await startSorting();
    }
});

pauseBtn.addEventListener('click', () => {
    isPaused = true;
    visualizer.pause();
    startBtn.textContent = 'Resume';
    pauseBtn.disabled = true;
    startBtn.disabled = false;
});

resetBtn.addEventListener('click', () => {
    resetVisualization();
});

// Functions
async function startSorting() {
    disableControls();
    resetStats();

    const array = visualizer.getArray();
    let result;

    // Run the selected algorithm
    switch (currentAlgorithm) {
        case 'bubble':
            result = sortingAlgorithms.bubbleSort(array);
            break;
        case 'selection':
            result = sortingAlgorithms.selectionSort(array);
            break;
        case 'insertion':
            result = sortingAlgorithms.insertionSort(array);
            break;
        case 'merge':
            result = sortingAlgorithms.mergeSort(array);
            break;
        case 'quick':
            result = sortingAlgorithms.quickSort(array);
            break;
        case 'heap':
            result = sortingAlgorithms.heapSort(array);
            break;
    }

    currentStats = result.stats;

    // Animate the sorting steps
    await visualizer.animate(result.steps, updateStatsDisplay);

    // Final stats update
    updateStatsDisplay();

    // Re-enable controls after completion
    enableControls();
    startBtn.textContent = 'Start Sorting';
}

function updateStatsDisplay() {
    comparisonsDisplay.textContent = currentStats.comparisons;
    arrayAccessesDisplay.textContent = currentStats.arrayAccesses;
    swapsDisplay.textContent = currentStats.swaps;
}

function resetStats() {
    currentStats = { comparisons: 0, arrayAccesses: 0, swaps: 0 };
    updateStatsDisplay();
}

function updateAlgorithmInfo() {
    const info = algorithmInfo[currentAlgorithm];
    currentAlgorithmDisplay.textContent = info.name;
    algorithmDescription.textContent = info.description;
    timeComplexityDisplay.textContent = info.timeComplexity;
}

function resetVisualization() {
    visualizer.reset();
    resetStats();
    isPaused = false;
    enableControls();
    startBtn.textContent = 'Start Sorting';
}

function disableControls() {
    algorithmSelect.disabled = true;
    arraySizeSlider.disabled = true;
    generateBtn.disabled = true;
    updateButtonStates(true);
}

function enableControls() {
    algorithmSelect.disabled = false;
    arraySizeSlider.disabled = false;
    generateBtn.disabled = false;
    updateButtonStates(false);
}

function updateButtonStates(isRunning) {
    if (isRunning) {
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        resetBtn.disabled = false;
        startBtn.textContent = 'Start Sorting';
    } else {
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        resetBtn.disabled = true;
        if (!isPaused) {
            startBtn.textContent = 'Start Sorting';
        }
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !startBtn.disabled) {
        e.preventDefault();
        startBtn.click();
    } else if (e.code === 'KeyP' && !pauseBtn.disabled) {
        e.preventDefault();
        pauseBtn.click();
    } else if (e.code === 'KeyR' && !resetBtn.disabled) {
        e.preventDefault();
        resetBtn.click();
    } else if (e.code === 'KeyG' && !generateBtn.disabled) {
        e.preventDefault();
        generateBtn.click();
    }
});

// Responsive handling
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        visualizer.renderBars();
    }, 250);
});
