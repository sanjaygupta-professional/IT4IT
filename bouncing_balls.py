#!/usr/bin/env python3
"""
Bouncing Balls Animation
A dynamic animation of colorful balls bouncing within a window using Pygame.
"""

import pygame
import random
import math

# Initialize Pygame
pygame.init()

# Constants
WINDOW_WIDTH = 800
WINDOW_HEIGHT = 600
FPS = 60
BACKGROUND_COLOR = (20, 20, 30)
NUM_BALLS = 15
GRAVITY = 0.5
DAMPING = 0.98  # Energy loss on collision (0.98 = 2% energy loss)
MIN_RADIUS = 10
MAX_RADIUS = 30

class Ball:
    """Represents a bouncing ball with physics properties."""

    def __init__(self, x, y, radius, color, velocity_x, velocity_y):
        self.x = x
        self.y = y
        self.radius = radius
        self.color = color
        self.velocity_x = velocity_x
        self.velocity_y = velocity_y
        self.mass = radius  # Mass proportional to radius

    def update(self):
        """Update ball position and apply physics."""
        # Apply gravity
        self.velocity_y += GRAVITY

        # Update position
        self.x += self.velocity_x
        self.y += self.velocity_y

        # Collision detection with walls
        # Left and right walls
        if self.x - self.radius <= 0:
            self.x = self.radius
            self.velocity_x = -self.velocity_x * DAMPING
        elif self.x + self.radius >= WINDOW_WIDTH:
            self.x = WINDOW_WIDTH - self.radius
            self.velocity_x = -self.velocity_x * DAMPING

        # Top and bottom walls
        if self.y - self.radius <= 0:
            self.y = self.radius
            self.velocity_y = -self.velocity_y * DAMPING
        elif self.y + self.radius >= WINDOW_HEIGHT:
            self.y = WINDOW_HEIGHT - self.radius
            self.velocity_y = -self.velocity_y * DAMPING

            # Add some friction when bouncing on the ground
            self.velocity_x *= 0.95

    def draw(self, screen):
        """Draw the ball on the screen."""
        pygame.draw.circle(screen, self.color, (int(self.x), int(self.y)), self.radius)

        # Add a highlight for a 3D effect
        highlight_offset = self.radius // 3
        highlight_pos = (int(self.x - highlight_offset), int(self.y - highlight_offset))
        highlight_radius = self.radius // 3
        highlight_color = tuple(min(c + 80, 255) for c in self.color)
        pygame.draw.circle(screen, highlight_color, highlight_pos, highlight_radius)

    def check_collision(self, other):
        """Check and resolve collision with another ball."""
        dx = other.x - self.x
        dy = other.y - self.y
        distance = math.sqrt(dx**2 + dy**2)

        # Check if balls are colliding
        if distance < self.radius + other.radius and distance > 0:
            # Normalize the collision vector
            nx = dx / distance
            ny = dy / distance

            # Relative velocity
            dvx = other.velocity_x - self.velocity_x
            dvy = other.velocity_y - self.velocity_y

            # Relative velocity in collision normal direction
            dvn = dvx * nx + dvy * ny

            # Don't resolve if balls are moving apart
            if dvn < 0:
                return

            # Collision impulse
            impulse = 2 * dvn / (self.mass + other.mass)

            # Apply impulse to both balls
            self.velocity_x += impulse * other.mass * nx
            self.velocity_y += impulse * other.mass * ny
            other.velocity_x -= impulse * self.mass * nx
            other.velocity_y -= impulse * self.mass * ny

            # Separate overlapping balls
            overlap = (self.radius + other.radius - distance) / 2
            self.x -= overlap * nx
            self.y -= overlap * ny
            other.x += overlap * nx
            other.y += overlap * ny


def generate_random_color():
    """Generate a vibrant random color."""
    hue = random.randint(0, 360)
    saturation = random.randint(60, 100)
    lightness = random.randint(45, 65)

    # Convert HSL to RGB
    c = (1 - abs(2 * lightness/100 - 1)) * saturation/100
    x = c * (1 - abs((hue/60) % 2 - 1))
    m = lightness/100 - c/2

    if hue < 60:
        r, g, b = c, x, 0
    elif hue < 120:
        r, g, b = x, c, 0
    elif hue < 180:
        r, g, b = 0, c, x
    elif hue < 240:
        r, g, b = 0, x, c
    elif hue < 300:
        r, g, b = x, 0, c
    else:
        r, g, b = c, 0, x

    return (int((r + m) * 255), int((g + m) * 255), int((b + m) * 255))


def create_balls(num_balls):
    """Create a list of balls with random properties."""
    balls = []
    for _ in range(num_balls):
        radius = random.randint(MIN_RADIUS, MAX_RADIUS)
        x = random.randint(radius, WINDOW_WIDTH - radius)
        y = random.randint(radius, WINDOW_HEIGHT // 2)
        color = generate_random_color()
        velocity_x = random.uniform(-5, 5)
        velocity_y = random.uniform(-2, 2)

        ball = Ball(x, y, radius, color, velocity_x, velocity_y)
        balls.append(ball)

    return balls


def main():
    """Main game loop."""
    # Set up the display
    screen = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
    pygame.display.set_caption("Bouncing Balls Animation")
    clock = pygame.time.Clock()

    # Create balls
    balls = create_balls(NUM_BALLS)

    # Font for displaying information
    font = pygame.font.Font(None, 36)
    small_font = pygame.font.Font(None, 24)

    # Game loop
    running = True
    paused = False

    while running:
        # Event handling
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:
                    running = False
                elif event.key == pygame.K_SPACE:
                    paused = not paused
                elif event.key == pygame.K_r:
                    # Reset: create new balls
                    balls = create_balls(NUM_BALLS)
                elif event.key == pygame.K_PLUS or event.key == pygame.K_EQUALS:
                    # Add more balls
                    balls.extend(create_balls(5))
                elif event.key == pygame.K_MINUS:
                    # Remove some balls
                    if len(balls) > 5:
                        balls = balls[:-5]
            elif event.type == pygame.MOUSEBUTTONDOWN:
                # Add a ball at mouse position
                mouse_x, mouse_y = pygame.mouse.get_pos()
                radius = random.randint(MIN_RADIUS, MAX_RADIUS)
                color = generate_random_color()
                velocity_x = random.uniform(-3, 3)
                velocity_y = random.uniform(-3, 3)
                new_ball = Ball(mouse_x, mouse_y, radius, color, velocity_x, velocity_y)
                balls.append(new_ball)

        # Update
        if not paused:
            # Update all balls
            for ball in balls:
                ball.update()

            # Check collisions between balls
            for i in range(len(balls)):
                for j in range(i + 1, len(balls)):
                    balls[i].check_collision(balls[j])

        # Draw
        screen.fill(BACKGROUND_COLOR)

        # Draw all balls
        for ball in balls:
            ball.draw(screen)

        # Draw UI information
        info_text = small_font.render(f"Balls: {len(balls)} | FPS: {int(clock.get_fps())}", True, (200, 200, 200))
        screen.blit(info_text, (10, 10))

        controls_text = [
            "SPACE: Pause/Resume",
            "R: Reset",
            "+/-: Add/Remove balls",
            "Click: Add ball",
            "ESC: Quit"
        ]

        for i, text in enumerate(controls_text):
            rendered_text = small_font.render(text, True, (150, 150, 150))
            screen.blit(rendered_text, (10, WINDOW_HEIGHT - 120 + i * 25))

        if paused:
            pause_text = font.render("PAUSED", True, (255, 255, 100))
            text_rect = pause_text.get_rect(center=(WINDOW_WIDTH // 2, WINDOW_HEIGHT // 2))
            screen.blit(pause_text, text_rect)

        # Update display
        pygame.display.flip()
        clock.tick(FPS)

    # Quit
    pygame.quit()


if __name__ == "__main__":
    main()
