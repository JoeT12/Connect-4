# Connect-4
A Connect-4 Game which includes an advanced AI, and 2 player-mode. Created using HTML, CSS and Javascript.

# AI Mode
This game allows the player to choose between 3 AI difficulties, should they choose to go against the computer: easy, medium and hard. Easy mode has been implemented through a randomiser choosing the location the computer should play. Medium mode evaluates the best position based on "virtually" dropping a piece into each column, and checking for a win, else it will score it using a scoring function. Hard mode makes use of the minimax algorithm, and alpha-beta pruning, in order to find the best possible location the computer can place it's piece. All AI functions are located within the ai_functions.js folder.

# Function
- 2 player mode, allowing 2 players (who are using the same computer) to play against one another.
- Player vs computer mode (with 3 difficulties: easy, medium and hard).
- Reset game button, allowing you to play again once you have completed your game.
- Computer vs Computer mode, allowing the user to test the AI against itself at ANY difficulty level.
- Setup page which allows player to choose their and the computers game colour (red/yellow), and difficulty of AI (if applicable).
- Hover feature, which shows the piece at the top of the column that the current player is "hovering" over with their mouse.

# Screenshots of Program
## Game Setup Page
![game-page](https://github.com/JoeT12/Connect-4/assets/108418412/2656d93b-7e88-417d-a442-440c5085effd)
## Game Page
Here we can see the "hover" feature in action, as it is red's turn, and they are hovering over column 3 with their mouse.
![game-play](https://github.com/JoeT12/Connect-4/assets/108418412/e32e18d6-0a7c-4254-9272-95550b958765)
