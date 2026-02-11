import random


player = input("Please select your symbol (X/O): ").upper()
bot = "O" if player == "X" else "X"

patterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

board = [" "] * 9
cell = 0
max_cells = 9
game_over = False


def print_board():
    for i in range(0, 9, 3):
        print(board[i : i + 3])


def check_win(symbol):
    for p in patterns:
        if all(board[i] == symbol for i in p):
            return True
    return False


while not game_over and cell < max_cells:

    pos = int(input("Enter position (0-8): "))
    
    if board[pos] != " ":
        print("Cell already occupied")
        continue

    board[pos] = player
    cell += 1

    if check_win(player):
        print("You won!")
        break

    if cell == max_cells:
        print("Draw!")
        break

    while True:
        bot_pos = random.randint(0, 8)
        if board[bot_pos] == " ":
            break

    board[bot_pos] = bot
    cell += 1
    print_board()

    if check_win(bot):
        print("Computer won!")
        break
