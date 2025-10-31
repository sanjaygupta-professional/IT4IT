// Sorting Algorithms with Step-by-Step Tracking

class SortingAlgorithms {
    constructor() {
        this.steps = [];
        this.comparisons = 0;
        this.arrayAccesses = 0;
        this.swaps = 0;
    }

    reset() {
        this.steps = [];
        this.comparisons = 0;
        this.arrayAccesses = 0;
        this.swaps = 0;
    }

    addStep(type, indices, array) {
        this.steps.push({
            type: type,
            indices: [...indices],
            array: [...array]
        });
    }

    // Bubble Sort
    bubbleSort(arr) {
        this.reset();
        const array = [...arr];
        const n = array.length;

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                this.comparisons++;
                this.arrayAccesses += 2;
                this.addStep('compare', [j, j + 1], array);

                if (array[j] > array[j + 1]) {
                    this.swaps++;
                    this.addStep('swap', [j, j + 1], array);
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    this.addStep('swap', [j, j + 1], array);
                }
            }
            this.addStep('sorted', [n - i - 1], array);
        }
        this.addStep('sorted', [0], array);
        this.addStep('complete', [], array);

        return {
            steps: this.steps,
            stats: {
                comparisons: this.comparisons,
                arrayAccesses: this.arrayAccesses,
                swaps: this.swaps
            }
        };
    }

    // Selection Sort
    selectionSort(arr) {
        this.reset();
        const array = [...arr];
        const n = array.length;

        for (let i = 0; i < n - 1; i++) {
            let minIdx = i;
            this.addStep('pivot', [i], array);

            for (let j = i + 1; j < n; j++) {
                this.comparisons++;
                this.arrayAccesses += 2;
                this.addStep('compare', [minIdx, j], array);

                if (array[j] < array[minIdx]) {
                    minIdx = j;
                }
            }

            if (minIdx !== i) {
                this.swaps++;
                this.addStep('swap', [i, minIdx], array);
                [array[i], array[minIdx]] = [array[minIdx], array[i]];
                this.addStep('swap', [i, minIdx], array);
            }
            this.addStep('sorted', [i], array);
        }
        this.addStep('sorted', [n - 1], array);
        this.addStep('complete', [], array);

        return {
            steps: this.steps,
            stats: {
                comparisons: this.comparisons,
                arrayAccesses: this.arrayAccesses,
                swaps: this.swaps
            }
        };
    }

    // Insertion Sort
    insertionSort(arr) {
        this.reset();
        const array = [...arr];
        const n = array.length;

        this.addStep('sorted', [0], array);

        for (let i = 1; i < n; i++) {
            const key = array[i];
            this.arrayAccesses++;
            this.addStep('pivot', [i], array);
            let j = i - 1;

            while (j >= 0 && array[j] > key) {
                this.comparisons++;
                this.arrayAccesses += 2;
                this.addStep('compare', [j, j + 1], array);

                array[j + 1] = array[j];
                this.addStep('swap', [j, j + 1], array);
                j--;
            }
            if (j >= 0) {
                this.comparisons++;
            }

            array[j + 1] = key;
            this.addStep('sorted', [j + 1], array);
        }
        this.addStep('complete', [], array);

        return {
            steps: this.steps,
            stats: {
                comparisons: this.comparisons,
                arrayAccesses: this.arrayAccesses,
                swaps: this.swaps
            }
        };
    }

    // Merge Sort
    mergeSort(arr) {
        this.reset();
        const array = [...arr];
        this.mergeSortHelper(array, 0, array.length - 1);
        this.addStep('complete', [], array);

        return {
            steps: this.steps,
            stats: {
                comparisons: this.comparisons,
                arrayAccesses: this.arrayAccesses,
                swaps: this.swaps
            }
        };
    }

    mergeSortHelper(array, left, right) {
        if (left < right) {
            const mid = Math.floor((left + right) / 2);

            this.mergeSortHelper(array, left, mid);
            this.mergeSortHelper(array, mid + 1, right);
            this.merge(array, left, mid, right);
        }
    }

    merge(array, left, mid, right) {
        const n1 = mid - left + 1;
        const n2 = right - mid;
        const leftArr = array.slice(left, mid + 1);
        const rightArr = array.slice(mid + 1, right + 1);

        let i = 0, j = 0, k = left;

        while (i < n1 && j < n2) {
            this.comparisons++;
            this.arrayAccesses += 2;
            this.addStep('compare', [left + i, mid + 1 + j], array);

            if (leftArr[i] <= rightArr[j]) {
                array[k] = leftArr[i];
                this.addStep('swap', [k], array);
                i++;
            } else {
                array[k] = rightArr[j];
                this.addStep('swap', [k], array);
                j++;
            }
            this.swaps++;
            k++;
        }

        while (i < n1) {
            array[k] = leftArr[i];
            this.addStep('swap', [k], array);
            this.swaps++;
            i++;
            k++;
        }

        while (j < n2) {
            array[k] = rightArr[j];
            this.addStep('swap', [k], array);
            this.swaps++;
            j++;
            k++;
        }

        for (let idx = left; idx <= right; idx++) {
            this.addStep('sorted', [idx], array);
        }
    }

    // Quick Sort
    quickSort(arr) {
        this.reset();
        const array = [...arr];
        this.quickSortHelper(array, 0, array.length - 1);
        this.addStep('complete', [], array);

        return {
            steps: this.steps,
            stats: {
                comparisons: this.comparisons,
                arrayAccesses: this.arrayAccesses,
                swaps: this.swaps
            }
        };
    }

    quickSortHelper(array, low, high) {
        if (low < high) {
            const pi = this.partition(array, low, high);
            this.quickSortHelper(array, low, pi - 1);
            this.quickSortHelper(array, pi + 1, high);
        } else if (low === high) {
            this.addStep('sorted', [low], array);
        }
    }

    partition(array, low, high) {
        const pivot = array[high];
        this.addStep('pivot', [high], array);
        this.arrayAccesses++;
        let i = low - 1;

        for (let j = low; j < high; j++) {
            this.comparisons++;
            this.arrayAccesses++;
            this.addStep('compare', [j, high], array);

            if (array[j] < pivot) {
                i++;
                if (i !== j) {
                    this.swaps++;
                    this.addStep('swap', [i, j], array);
                    [array[i], array[j]] = [array[j], array[i]];
                    this.addStep('swap', [i, j], array);
                }
            }
        }

        if (i + 1 !== high) {
            this.swaps++;
            this.addStep('swap', [i + 1, high], array);
            [array[i + 1], array[high]] = [array[high], array[i + 1]];
            this.addStep('swap', [i + 1, high], array);
        }
        this.addStep('sorted', [i + 1], array);

        return i + 1;
    }

    // Heap Sort
    heapSort(arr) {
        this.reset();
        const array = [...arr];
        const n = array.length;

        // Build max heap
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            this.heapify(array, n, i);
        }

        // Extract elements from heap one by one
        for (let i = n - 1; i > 0; i--) {
            this.swaps++;
            this.addStep('swap', [0, i], array);
            [array[0], array[i]] = [array[i], array[0]];
            this.addStep('swap', [0, i], array);
            this.addStep('sorted', [i], array);

            this.heapify(array, i, 0);
        }
        this.addStep('sorted', [0], array);
        this.addStep('complete', [], array);

        return {
            steps: this.steps,
            stats: {
                comparisons: this.comparisons,
                arrayAccesses: this.arrayAccesses,
                swaps: this.swaps
            }
        };
    }

    heapify(array, n, i) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < n) {
            this.comparisons++;
            this.arrayAccesses += 2;
            this.addStep('compare', [left, largest], array);
            if (array[left] > array[largest]) {
                largest = left;
            }
        }

        if (right < n) {
            this.comparisons++;
            this.arrayAccesses += 2;
            this.addStep('compare', [right, largest], array);
            if (array[right] > array[largest]) {
                largest = right;
            }
        }

        if (largest !== i) {
            this.swaps++;
            this.addStep('swap', [i, largest], array);
            [array[i], array[largest]] = [array[largest], array[i]];
            this.addStep('swap', [i, largest], array);
            this.heapify(array, n, largest);
        }
    }
}

// Algorithm descriptions and time complexities
const algorithmInfo = {
    bubble: {
        name: 'Bubble Sort',
        description: 'Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted. Named for the way smaller elements "bubble" to the top of the list.',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)'
    },
    selection: {
        name: 'Selection Sort',
        description: 'Selection Sort divides the input list into two parts: a sorted portion at the left end and an unsorted portion at the right end. Initially, the sorted portion is empty and the unsorted portion is the entire list. The algorithm proceeds by finding the smallest element in the unsorted portion and swapping it with the leftmost unsorted element.',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)'
    },
    insertion: {
        name: 'Insertion Sort',
        description: 'Insertion Sort builds the final sorted array one item at a time. It iterates through an input array and removes one element per iteration, finds the place the element belongs in the sorted list, and inserts it there. It repeats this process until no input elements remain.',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)'
    },
    merge: {
        name: 'Merge Sort',
        description: 'Merge Sort is a divide-and-conquer algorithm that divides the input array into two halves, recursively sorts them, and then merges the two sorted halves. The merge operation is the key process that combines two sorted arrays into one sorted array.',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)'
    },
    quick: {
        name: 'Quick Sort',
        description: 'Quick Sort is a divide-and-conquer algorithm that picks an element as a pivot and partitions the array around the pivot. Elements smaller than the pivot are moved before it, and elements greater are moved after it. The sub-arrays are then sorted recursively.',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(log n)'
    },
    heap: {
        name: 'Heap Sort',
        description: 'Heap Sort uses a binary heap data structure to sort elements. It first builds a max heap from the input data, then repeatedly extracts the maximum element from the heap and reconstructs the heap until all elements are sorted. It combines the better attributes of merge sort and insertion sort.',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(1)'
    }
};
