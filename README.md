# Sorting Algorithm Visualizer

An interactive web-based application that visualizes various sorting algorithms step-by-step through animated bars. Watch how different sorting algorithms organize data in real-time!

## Features

- **6 Sorting Algorithms**: Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, and Heap Sort
- **Animated Visualizations**: Step-by-step visualization with color-coded bars
- **Adjustable Parameters**:
  - Array size (10-100 elements)
  - Animation speed (1-200ms)
- **Real-time Statistics**:
  - Number of comparisons
  - Array accesses
  - Swaps performed
  - Time complexity
- **Interactive Controls**:
  - Generate new random arrays
  - Start/Pause/Resume sorting
  - Reset visualization
- **Algorithm Information**: Detailed descriptions and complexity analysis for each algorithm
- **Keyboard Shortcuts**:
  - `Space` - Start/Resume sorting
  - `P` - Pause
  - `R` - Reset
  - `G` - Generate new array
- **Responsive Design**: Works on desktop and mobile devices

## How to Use

1. **Open the Application**: Open `index.html` in a modern web browser
2. **Select Algorithm**: Choose a sorting algorithm from the dropdown menu
3. **Adjust Settings**:
   - Set the array size using the slider
   - Adjust animation speed for faster/slower visualization
4. **Generate Array**: Click "Generate New Array" to create a random dataset
5. **Start Sorting**: Click "Start Sorting" to begin the visualization
6. **Control Playback**: Use Pause and Reset buttons as needed

## Color Legend

- **Blue**: Unsorted elements
- **Red**: Elements being compared
- **Orange**: Elements being swapped
- **Purple**: Pivot element or selected element (Quick Sort, Selection Sort)
- **Green**: Sorted elements

## Sorting Algorithms Implemented

### Bubble Sort
- **Time Complexity**: O(n²)
- **Space Complexity**: O(1)
- Repeatedly steps through the list, compares adjacent elements and swaps them if needed

### Selection Sort
- **Time Complexity**: O(n²)
- **Space Complexity**: O(1)
- Finds the minimum element and places it at the beginning

### Insertion Sort
- **Time Complexity**: O(n²)
- **Space Complexity**: O(1)
- Builds the final sorted array one item at a time

### Merge Sort
- **Time Complexity**: O(n log n)
- **Space Complexity**: O(n)
- Divide-and-conquer algorithm that divides, sorts, and merges

### Quick Sort
- **Time Complexity**: O(n log n) average
- **Space Complexity**: O(log n)
- Divide-and-conquer using pivot partitioning

### Heap Sort
- **Time Complexity**: O(n log n)
- **Space Complexity**: O(1)
- Uses binary heap data structure to sort elements

## File Structure

```
├── index.html          # Main HTML file
├── styles.css          # Styling and layout
├── algorithms.js       # Sorting algorithm implementations
├── visualizer.js       # Visualization engine
├── script.js           # Main application logic
└── README.md           # This file
```

## Technical Details

### algorithms.js
Contains implementations of all six sorting algorithms with step tracking. Each algorithm returns an array of steps and statistics for visualization.

### visualizer.js
Manages the visualization of the bars, handles animations, and provides methods for highlighting, swapping, and marking elements as sorted.

### script.js
Coordinates the UI controls, algorithm execution, and visualization updates. Handles user interactions and state management.

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## Future Enhancements

Potential improvements:
- Add more sorting algorithms (Radix Sort, Bucket Sort, etc.)
- Sound effects for comparisons and swaps
- Step-by-step mode with manual control
- Code display showing the current operation
- Performance comparisons between algorithms
- Save and load custom arrays
- Dark mode toggle

## License

This project is open source and available for educational purposes.

## Contributing

Feel free to fork this project and submit pull requests for improvements!
