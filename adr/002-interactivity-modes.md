# Interactivity Modes for Maze Solving

## Overview
We need to decide on the best interactivity modes for solving the maze, ensuring compatibility with both desktop and mobile devices. Below are possible interactivity modes along with their pros and cons.

## Possible Interactivity Modes

### 1. Clicking on Cells
**Description:** Users click on individual cells to toggle them as part of the path.

**Pros:**
- Simple to implement.
- Works well on both desktop and mobile.
- Intuitive for users familiar with grid-based games.

**Cons:**
- May be tedious for large mazes.
- Requires precise clicking, which can be challenging on mobile.

**Example:**
```javascript
document.querySelectorAll('.maze-cell').forEach(cell => {
  cell.addEventListener('click', () => {
    cell.classList.toggle('path-cell');
  });
});
```

---

### 2. Dragging Over Cells
**Description:** Users click and drag over cells to mark them as part of the path.

**Pros:**
- Faster for marking multiple cells.
- More engaging and interactive.

**Cons:**
- More complex to implement.
- May not work well on mobile without additional touch event handling.
- On mobile, the user's finger may cover the cells, making it hard to see where to move next.

**Example:**
```javascript
let isDragging = false;
document.querySelectorAll('.maze-cell').forEach(cell => {
  cell.addEventListener('mousedown', () => {
    isDragging = true;
    cell.classList.add('path-cell');
  });
  cell.addEventListener('mouseenter', () => {
    if (isDragging) {
      cell.classList.add('path-cell');
    }
  });
  cell.addEventListener('mouseup', () => {
    isDragging = false;
  });
});
```

---

### 3. Swiping (Mobile-Friendly)
**Description:** Users swipe over cells to mark them as part of the path.

**Pros:**
- Natural for mobile users.
- Can be combined with dragging for desktop.

**Cons:**
- Requires touch event handling.
- More complex to implement.
- On mobile, the user's finger may cover the cells, making it hard to see where to move next.

**Example:**
```javascript
let isSwiping = false;
document.querySelectorAll('.maze-cell').forEach(cell => {
  cell.addEventListener('touchstart', () => {
    isSwiping = true;
    cell.classList.add('path-cell');
  });
  cell.addEventListener('touchmove', (e) => {
    if (isSwiping) {
      const touch = e.touches[0];
      const element = document.elementFromPoint(touch.clientX, touch.clientY);
      if (element.classList.contains('maze-cell')) {
        element.classList.add('path-cell');
      }
    }
  });
  cell.addEventListener('touchend', () => {
    isSwiping = false;
  });
});
```

---

### 4. Keyboard Navigation
**Description:** Users navigate the maze using keyboard arrows and mark cells.

**Pros:**
- Accessible for users who prefer keyboard navigation.
- Can be combined with other modes.

**Cons:**
- Not intuitive for all users.
- Requires additional UI indicators for selected cells.
- Hard to use on mobile without on-screen controls.

**Alternatives for Mobile:**
- **On-Screen Arrows:** Provide on-screen arrow buttons for navigation.
- **Accelerometer Tilt:** Use the device's accelerometer to detect tilting and move the active cell accordingly.

**Example:**
```javascript
document.addEventListener('keydown', (e) => {
  const currentCell = document.querySelector('.selected-cell');
  if (e.key === 'ArrowRight') {
    // Move to the right cell
  } else if (e.key === 'ArrowLeft') {
    // Move to the left cell
  } else if (e.key === 'ArrowUp') {
    // Move to the cell above
  } else if (e.key === 'ArrowDown') {
    // Move to the cell below
  } else if (e.key === ' ') {
    // Toggle the current cell as part of the path
    currentCell.classList.toggle('path-cell');
  }
});
```

**Example for Accelerometer Tilt:**
```javascript
window.addEventListener('deviceorientation', (e) => {
  const currentCell = document.querySelector('.selected-cell');
  const gamma = e.gamma; // Left-to-right tilt
  const beta = e.beta;  // Front-to-back tilt

  if (gamma > 10) {
    // Tilt right: move to the right cell
  } else if (gamma < -10) {
    // Tilt left: move to the left cell
  } else if (beta > 10) {
    // Tilt forward: move to the cell below
  } else if (beta < -10) {
    // Tilt backward: move to the cell above
  }
});
```

---

### 5. Hybrid Mode (Click + Drag + Swipe)
**Description:** Combine clicking, dragging, and swiping for a versatile experience.

**Pros:**
- Provides flexibility for different user preferences.
- Works well on both desktop and mobile.

**Cons:**
- More complex to implement.
- Requires thorough testing across devices.

**Example:**
```javascript
// Combine the examples from clicking, dragging, and swiping
```

---

## Recommendations

### For Simplicity and Broad Compatibility
- **Clicking on Cells:** Simple and works well on both desktop and mobile.

### For Enhanced User Experience
- **Dragging Over Cells:** More engaging but requires additional mobile handling.
- **Hybrid Mode:** Best for flexibility but more complex to implement.

### For Mobile-First Approach
- **Swiping:** Natural for mobile users but may need additional desktop support.
- **Accelerometer Tilt:** Innovative and engaging but requires device support and may not be intuitive for all users.

### Chosen Interaction Mode

**Description:**
- There is an active cell that leaves a trail of highlighted cells where it has been.
- On both desktop and mobile, there is a slight overlay around this active cell with four quarter circles, each having an arrow in one of the four directions.
- On desktop, the arrows and the WASD keys trigger the respective direction.
- Clicking or tapping the quarter triggers the respective direction.
- If the active cell can move in that direction, it will, leaving the previous cell highlighted. We can move in any open cell; highlighted cells are also still open.

**Pros:**
- Works well on both desktop and mobile.
- Intuitive and easy to understand.
- Provides clear visual feedback.
- Can be extended in the future with additional interaction modes like dragging, tapping the edges of the maze, or tilting the phone.

**Cons:**
- Requires additional UI elements (the overlay with arrows).
- May need more complex logic to handle the active cell and its trail.

**Implementation Plan:**
1. Add an overlay around the active cell with four quarter circles and arrows.
2. Implement event listeners for clicking/tapping the quarters and pressing WASD keys.
3. Update the active cell's position based on the input and leave a trail of highlighted cells.
4. Ensure that the active cell can only move to open cells (including highlighted cells).

## Famous Examples of Maze-Solving Games

### 1. **The Witness**
- **Interactivity Mode:** Clicking on cells to mark the path.
- **Why It Works:** Simple and intuitive, allowing players to focus on solving the puzzle.

### 2. **Baba Is You**
- **Interactivity Mode:** Clicking and dragging to move objects and mark paths.
- **Why It Works:** Combines dragging with clicking for a versatile and engaging experience.

### 3. **Maze Games on Mobile (e.g., Maze Runner)**
- **Interactivity Mode:** Swiping or tilting the device to navigate.
- **Why It Works:** Leverages natural mobile interactions for a seamless experience.

### 4. **Classic Maze Games (e.g., Pac-Man)**
- **Interactivity Mode:** Keyboard navigation with arrow keys.
- **Why It Works:** Simple and effective for desktop users, though less intuitive on mobile.

**Mobile Versions of Pac-Man:**
- **Swipe Gestures:** Players swipe in the direction they want Pac-Man to move. This is intuitive and leverages natural touch interactions.
- **On-Screen Joystick:** A virtual joystick is provided on the screen, allowing players to control Pac-Man's movement by dragging the joystick in the desired direction.
- **Tilt Controls:** Some versions use the device's accelerometer to detect tilting, allowing players to control Pac-Man's movement by tilting the device.
- **Tap-to-Move:** Players tap on the screen in the direction they want Pac-Man to move, which is simple but may require more precision.

**Pros and Cons of Mobile Interactivity Modes for Pac-Man:**

**Swipe Gestures:**
- **Pros:**
  - Intuitive and natural for touchscreens.
  - Fast and responsive.
- **Cons:**
  - May accidentally trigger other actions if not handled properly.
  - Requires clear visual feedback to indicate the swipe direction.

**On-Screen Joystick:**
- **Pros:**
  - Provides a familiar control scheme for gamers.
  - Allows for precise control.
- **Cons:**
  - Can obscure part of the screen, especially on smaller devices.
  - May feel less immersive compared to direct touch interactions.

**Tilt Controls:**
- **Pros:**
  - Innovative and engaging.
  - Leverages the device's hardware for a unique experience.
- **Cons:**
  - Not all devices support accelerometer-based controls.
  - May be less precise and more tiring for extended play.
  - Requires additional permissions and may not be intuitive for all users.

**Tap-to-Move:**
- **Pros:**
  - Simple and easy to implement.
  - Works well on all touchscreen devices.
- **Cons:**
  - Requires precise tapping, which can be challenging on smaller screens.
  - May feel less fluid compared to swipe or tilt controls.

## Next Steps
- Choose the best interactivity mode based on the requirements.
- Implement the chosen mode in the application.