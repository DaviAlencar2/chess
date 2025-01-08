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

        updateMoveList(move);
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

function updateMoveList(move) {
    const moveText = `${move.color === 'w' ? 'Branco' : 'Preto'}: ${move.san}`;
    const listItem = $('<li></li>').text(moveText);

    if ($('#movesList li').length % 2 === 0) {
        listItem.css('background-color', '#44444440'); // Claro
        listItem.css('color', '#EDEDED'); // Escuro
    } else {
        listItem.css('background-color', '#17171740'); // Escuro
        listItem.css('color', '#EDEDED'); // Claro
    }

    $('#movesList').append(listItem);
}