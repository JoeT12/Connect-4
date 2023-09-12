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




