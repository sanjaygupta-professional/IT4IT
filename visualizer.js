// Visualization Engine for Sorting Algorithms

class Visualizer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.array = [];
        this.bars = [];
        this.isRunning = false;
        this.isPaused = false;
        this.currentStep = 0;
        this.steps = [];
        this.speed = 50;
        this.animationTimeout = null;
        this.sortedIndices = new Set();
    }

    generateArray(size) {
        this.array = [];
        for (let i = 0; i < size; i++) {
            this.array.push(Math.floor(Math.random() * 300) + 20);
        }
        this.sortedIndices.clear();
        this.renderBars();
    }

    renderBars() {
        this.container.innerHTML = '';
        this.bars = [];

        const containerWidth = this.container.clientWidth;
        const barWidth = Math.max(2, Math.floor((containerWidth - this.array.length * 2) / this.array.length));
        const maxHeight = this.container.clientHeight - 40;

        const maxValue = Math.max(...this.array);

        this.array.forEach((value, index) => {
            const bar = document.createElement('div');
            bar.className = 'bar';

            const height = (value / maxValue) * maxHeight;
            bar.style.height = `${height}px`;
            bar.style.width = `${barWidth}px`;

            // Add value label for smaller arrays
            if (this.array.length <= 30) {
                bar.setAttribute('data-value', value);
                bar.style.position = 'relative';

                const label = document.createElement('span');
                label.textContent = value;
                label.style.position = 'absolute';
                label.style.bottom = '5px';
                label.style.fontSize = '10px';
                label.style.color = 'white';
                label.style.fontWeight = 'bold';
                label.style.width = '100%';
                label.style.textAlign = 'center';
                bar.appendChild(label);
            }

            if (this.sortedIndices.has(index)) {
                bar.classList.add('sorted');
            }

            this.bars.push(bar);
            this.container.appendChild(bar);
        });
    }

    updateBar(index, value, className = '') {
        if (index >= 0 && index < this.bars.length) {
            const bar = this.bars[index];
            const maxValue = Math.max(...this.array);
            const maxHeight = this.container.clientHeight - 40;
            const height = (value / maxValue) * maxHeight;

            bar.style.height = `${height}px`;

            // Remove all special classes
            bar.classList.remove('comparing', 'swapping', 'pivot', 'sorted');

            // Add new class if provided
            if (className) {
                bar.classList.add(className);
            }

            // Update label if exists
            if (this.array.length <= 30) {
                const label = bar.querySelector('span');
                if (label) {
                    label.textContent = value;
                }
            }
        }
    }

    highlightBars(indices, className) {
        // Remove previous highlights
        this.bars.forEach((bar, idx) => {
            if (!this.sortedIndices.has(idx)) {
                bar.classList.remove('comparing', 'swapping', 'pivot');
            }
        });

        // Add new highlights
        indices.forEach(index => {
            if (index >= 0 && index < this.bars.length && !this.sortedIndices.has(index)) {
                this.bars[index].classList.add(className);
            }
        });
    }

    markAsSorted(indices) {
        indices.forEach(index => {
            if (index >= 0 && index < this.bars.length) {
                this.sortedIndices.add(index);
                this.bars[index].classList.remove('comparing', 'swapping', 'pivot');
                this.bars[index].classList.add('sorted');
            }
        });
    }

    async animate(steps, statsCallback) {
        this.steps = steps;
        this.currentStep = 0;
        this.isRunning = true;
        this.isPaused = false;
        this.sortedIndices.clear();

        return new Promise((resolve) => {
            this.animateStep(statsCallback, resolve);
        });
    }

    animateStep(statsCallback, resolve) {
        if (!this.isRunning || this.isPaused) {
            return;
        }

        if (this.currentStep >= this.steps.length) {
            this.isRunning = false;
            this.sortedIndices.clear();
            this.bars.forEach(bar => bar.classList.add('sorted'));
            resolve();
            return;
        }

        const step = this.steps[this.currentStep];

        switch (step.type) {
            case 'compare':
                this.highlightBars(step.indices, 'comparing');
                break;

            case 'swap':
                this.array = [...step.array];
                this.highlightBars(step.indices, 'swapping');
                step.indices.forEach((index, i) => {
                    this.updateBar(index, step.array[index]);
                });
                break;

            case 'pivot':
                this.highlightBars(step.indices, 'pivot');
                break;

            case 'sorted':
                this.markAsSorted(step.indices);
                break;

            case 'complete':
                this.bars.forEach(bar => bar.classList.add('sorted'));
                break;
        }

        if (statsCallback) {
            statsCallback();
        }

        this.currentStep++;
        this.animationTimeout = setTimeout(() => {
            this.animateStep(statsCallback, resolve);
        }, this.speed);
    }

    pause() {
        this.isPaused = true;
    }

    resume(statsCallback) {
        if (this.isPaused && this.isRunning) {
            this.isPaused = false;
            const self = this;
            new Promise((resolve) => {
                self.animateStep(statsCallback, resolve);
            });
        }
    }

    stop() {
        this.isRunning = false;
        this.isPaused = false;
        if (this.animationTimeout) {
            clearTimeout(this.animationTimeout);
            this.animationTimeout = null;
        }
    }

    reset() {
        this.stop();
        this.sortedIndices.clear();
        this.currentStep = 0;
        this.renderBars();
    }

    setSpeed(speed) {
        this.speed = speed;
    }

    getArray() {
        return [...this.array];
    }

    setArray(array) {
        this.array = [...array];
        this.sortedIndices.clear();
        this.renderBars();
    }
}
