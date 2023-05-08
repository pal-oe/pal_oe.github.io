const board = document.getElementById("board");
const chess = new Chess();

// Create board squares
for (let i = 0; i < 64; i++) {
  const square = document.createElement("div");
  square.classList.add("square");
  square.dataset.index = i;
  
  // Set light or dark color
  const row = Math.floor(i / 8);
  const col = i % 8;
  if ((row + col) % 2 === 0) {
    square.classList.add("light");
  } else {
    square.classList.add("dark");
  }

  board.appendChild(square);
}

// Add event listeners
board.addEventListener("click", handleClick);

let selectedSquare = null;

function handleClick(event) {
  const square = event.target.closest(".square");

  if (!square) return;

  const index = parseInt(square.dataset.index);
  const row = Math.floor(index / 8);
  const col = index % 8;
  const squareName = `${String.fromCharCode(97 + col)}${8 - row}`;

  if (selectedSquare) {
    // Try to make a move
    const move = chess.move({
      from: selectedSquare,
      to: squareName,
    });

    if (move) {
      // Update the board
      renderBoard();
    }

    // Deselect the square
    selectedSquare = null;
  } else {
    // Select the square
    selectedSquare = squareName;
  }
}

function renderBoard() {
  // Clear the board
  for (const square of board.querySelectorAll(".square")) {
    square.textContent = "";
  }

  // Populate the board with pieces
  for (const [squareName, piece] of Object.entries(chess.SQUARES)) {
    const pieceCode = chess.get(squareName);
    if (pieceCode) {
      const index = (8 - parseInt(squareName[1])) * 8 + (squareName.charCodeAt(0) - 97);
      const squareElement = board.querySelector(`[data-index="${index}"]`);
      squareElement.textContent = pieceCodeToUnicode(pieceCode);
    }
  }
}

function pieceCodeToUnicode(piece) {
  const pieceMap = {
    "k": "♔", "q": "♕", "r": "♖", "b": "♗", "n": "♘", "p": "♙",
    "K": "♚", "Q": "♛", "R": "♜", "B": "♝", "N": "♞", "P": "♟",
  };

  return pieceMap[piece.type] || "";
}

// Initialize the board
renderBoard();