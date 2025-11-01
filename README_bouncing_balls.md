# Bouncing Balls Animation

A dynamic and interactive animation of colorful balls bouncing within a window, created with Pygame. The animation features realistic physics including gravity, elastic collisions, and energy damping.

## Features

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
