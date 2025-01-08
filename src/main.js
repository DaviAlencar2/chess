import { createChessboard} from "./components/chessboard";
import { resetGame, undoMove } from "./game/game";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

createChessboard();
document.getElementById('resetButton').addEventListener('click', resetGame);
document.getElementById('undoButton').addEventListener('click', undoMove);