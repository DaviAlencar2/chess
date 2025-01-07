import {Chess}  from 'chess.js';
import {board} from '../components/chessboard';


const game = new Chess();

export function handleMove(source, target) { 
    try {
        const move = game.move({
            from: source,
            to: target,
            promotion: 'q',
        });

        if (!move) {
            return 'snapback'; 
        }

        board.position(game.fen()); // Atualizar tabuleiro

        if (game.isCheckmate()) {
            alert('Xeque-mate!');
        } else if (game.isDraw()) {
            alert('Empate!');
        }

    } catch (error) {
        console.error('Erro ao realizar o movimento:', error.message);
        return 'snapback'; 
    }
}
