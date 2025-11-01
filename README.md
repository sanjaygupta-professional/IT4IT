# IT4IT Visualizations

A collection of interactive visualizations and animations for educational purposes, including physics simulations, clustering algorithms, and machine learning quality metrics.

## Available Visualizations

### 1. Silhouette Coefficient Visualizer
**File:** `silhouette_visualizer.html`

An interactive visualization demonstrating the silhouette coefficient metric for evaluating clustering quality.

**Features:**
- Real-time K-means clustering with adjustable parameters
- Silhouette coefficient calculation and visualization for each data point
- Dual-canvas display: cluster visualization + silhouette plot
- Multiple data patterns (well-separated, overlapping, random, circular, elongated)
- Animated K-value testing to find optimal number of clusters
- Color-coded quality metrics (excellent, good, fair, poor)
- Educational information about silhouette coefficient formula

**How to use:**
Simply open `silhouette_visualizer.html` in a web browser. No installation required!

**What you'll learn:**
- How silhouette coefficient measures clustering quality
- The relationship between number of clusters (k) and quality metrics
- How different data patterns affect clustering performance
- How to interpret silhouette plots

### 2. USA Cities Clustering
**File:** `usa_cities_clustering.html`

Animated hierarchical clustering visualization of major USA cities based on geographic coordinates.

**Features:**
- Interactive geographic clustering
- Step-by-step hierarchical clustering animation
- Real city data from major US metropolitan areas

### 3. Clustering Algorithm Visualizer
**File:** `clustering_visualizer.html`

Interactive comparison of K-Means and Agglomerative clustering algorithms.

**Features:**
- Side-by-side algorithm comparison
- Multiple data generation patterns
- Step-by-step animation of clustering process
- Customizable parameters

### 4. Weather Visualizer
**File:** `weather_visualizer.html`

Animated weather data visualization tool.

### 5. Bouncing Balls Animation
**File:** `bouncing_balls.py`

A dynamic Python/Pygame animation featuring realistic physics simulation.

## Bouncing Balls Animation - Detailed Features

- **Realistic Physics**: Gravity, velocity, and collision detection between balls and walls
- **Ball-to-Ball Collisions**: Balls interact with each other using elastic collision physics
- **Vibrant Colors**: Each ball has a randomly generated vibrant color with a 3D highlight effect
- **Interactive Controls**: Add, remove, pause, and reset balls in real-time
- **Performance Display**: Real-time FPS counter and ball count

## Requirements

- Python 3.7 or higher
- Pygame 2.5.0 or higher

## Installation

1. Clone the repository or download the files

2. Install the required dependencies:
```bash
pip install -r requirements.txt
```

Or install Pygame directly:
```bash
pip install pygame
```

## Usage

Run the animation:
```bash
python bouncing_balls.py
```

Or make it executable and run:
```bash
chmod +x bouncing_balls.py
./bouncing_balls.py
```

## Controls

| Key/Action | Function |
|------------|----------|
| **SPACE** | Pause/Resume animation |
| **R** | Reset (regenerate all balls) |
| **+** or **=** | Add 5 more balls |
| **-** | Remove 5 balls |
| **Mouse Click** | Add a ball at cursor position |
| **ESC** | Quit the application |

## Customization

You can customize various parameters in the `bouncing_balls.py` file:

```python
WINDOW_WIDTH = 800      # Window width in pixels
WINDOW_HEIGHT = 600     # Window height in pixels
FPS = 60                # Frames per second
NUM_BALLS = 15          # Initial number of balls
GRAVITY = 0.5           # Gravity strength
DAMPING = 0.98          # Energy retention on collision (0.98 = 2% loss)
MIN_RADIUS = 10         # Minimum ball radius
MAX_RADIUS = 30         # Maximum ball radius
```

## How It Works

### Physics Simulation

1. **Gravity**: Each ball experiences constant downward acceleration
2. **Velocity**: Ball positions update based on their velocity vectors
3. **Wall Collisions**: When a ball hits a wall, its velocity is reversed and damped
4. **Ball Collisions**: Elastic collisions between balls using momentum conservation
5. **Energy Loss**: Small amounts of energy are lost on collisions for realistic behavior

### Ball Class

Each ball is an object with properties:
- Position (x, y)
- Radius
- Color
- Velocity (x, y)
- Mass (proportional to radius)

## Screenshot

The animation displays:
- Multiple colorful balls bouncing around the screen
- Real-time statistics (ball count, FPS)
- Control instructions overlay
- Pause indicator when paused

## License

This project is open source and available for educational and personal use.

## Contributing

Feel free to fork this project and add your own features such as:
- Different ball shapes
- Trails or particle effects
- Sound effects on collisions
- Adjustable gravity via keyboard
- Ball size changes based on velocity
- Custom textures or patterns

## Credits

Created using Pygame - a cross-platform set of Python modules designed for writing video games.
