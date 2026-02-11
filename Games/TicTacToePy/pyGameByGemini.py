import cv2
import mediapipe as mp
import pygame
import random
import math

# --- Robust Mediapipe Setup ---
# Using the direct solution path to avoid attribute errors
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(
    static_image_mode=False,
    max_num_hands=1, 
    min_detection_confidence=0.7,
    min_tracking_confidence=0.5
)

# --- Setup Pygame ---
pygame.init()
WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Solar Finger Shooter")
clock = pygame.time.Clock()

# Colors
WHITE = (255, 255, 255)
YELLOW = (255, 255, 0)
RED = (255, 50, 50)
CYAN = (0, 255, 255)

score = 0
targets = []

def spawn_target():
    return {
        "pos": [random.randint(50, WIDTH-50), random.randint(50, HEIGHT-50)], 
        "radius": random.randint(20, 40),
        "color": random.choice([YELLOW, (255, 165, 0), (200, 200, 255)]) # Planet-ish colors
    }

for _ in range(5):
    targets.append(spawn_target())

cap = cv2.VideoCapture(0)

running = True
while running:
    screen.fill((5, 5, 20)) # Deep space blue
    
    success, image = cap.read()
    if not success: break
    
    image = cv2.flip(image, 1)
    results = hands.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))

    finger_pos = None
    is_shooting = False

    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            # Landmark 8 = Index Tip, Landmark 4 = Thumb Tip
            itip = hand_landmarks.landmark[8]
            ttip = hand_landmarks.landmark[4]

            ix, iy = int(itip.x * WIDTH), int(itip.y * HEIGHT)
            tx, ty = int(ttip.x * WIDTH), int(ttip.y * HEIGHT)
            finger_pos = (ix, iy)

            # Pinch detection
            dist = math.hypot(ix - tx, iy - ty)
            if dist < 40:
                is_shooting = True

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Draw Targets
    for t in targets[:]:
        pygame.draw.circle(screen, t["color"], t["pos"], t["radius"])
        # Glow effect
        pygame.draw.circle(screen, WHITE, t["pos"], t["radius"], 2)
        
        if is_shooting and finger_pos:
            d = math.hypot(finger_pos[0] - t["pos"][0], finger_pos[1] - t["pos"][1])
            if d < t["radius"]:
                targets.remove(t)
                targets.append(spawn_target())
                score += 1

    # Draw Crosshair & Laser
    if finger_pos:
        if is_shooting:
            # Draw Laser Beam from bottom
            pygame.draw.line(screen, CYAN, (WIDTH//2, HEIGHT), finger_pos, 4)
            pygame.draw.circle(screen, WHITE, finger_pos, 20) # Impact flash
            cross_color = RED
        else:
            cross_color = (0, 255, 0)

        # Crosshair
        pygame.draw.circle(screen, cross_color, finger_pos, 15, 2)
        pygame.draw.line(screen, cross_color, (finger_pos[0]-20, finger_pos[1]), (finger_pos[0]+20, finger_pos[1]), 2)
        pygame.draw.line(screen, cross_color, (finger_pos[0], finger_pos[1]-20), (finger_pos[0], finger_pos[1]+20), 2)

    # Score UI
    font = pygame.font.SysFont("Arial", 32, bold=True)
    score_txt = font.render(f"SPACE DUST COLLECTED: {score}", True, WHITE)
    screen.blit(score_txt, (20, 20))

    pygame.display.flip()
    clock.tick(60)

cap.release()
pygame.quit()