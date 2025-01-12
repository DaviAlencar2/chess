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

        // Atualizar o tabuleiro após o movimento
        requestAnimationFrame(() => {
            board.position(game.fen()); // Atualizar tabuleiro
            console.log('Estado do tabuleiro após a atualização:', game.fen());
        
            if (game.isCheckmate()) { // ⚠️Melhoria no futuro
                const chessboard = document.getElementById('chessboard');
                const winner = game.turn() === 'w' ? 'Preto' : 'Branco';
                const message = `Xeque-mate! O vencedor é ${winner}!`;
                const divMessage = document.createElement('div');
                divMessage.innerHTML = message;
                divMessage.className = 'message';
                divMessage.style.color = 'red';
                divMessage.style.fontWeight = 'bold';
                divMessage.style.fontSize = '24px';
                divMessage.style.textAlign = 'center';
                divMessage.style.marginTop = '10px';
                divMessage.style.border = '1px solid red';
                chessboard.appendChild(divMessage);
                
            } else if (game.isDraw()) {
                alert('Empate!');
            }

            highlightCheckSquares();
        });

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

export function resetGame() {
    const divMessage = document.querySelector('.message');
    if (divMessage) {
        divMessage.remove();
    }

    $('.square-55d63').removeClass('highlight-check');
    game.reset();
    board.position(game.fen());
    $('#movesList').empty();
}

export function undoMove() {
    $('.square-55d63').removeClass('highlight-check');
    game.undo();
    board.position(game.fen());
    $('#movesList li:last-child').remove();
}

function highlightCheckSquares() {
    // Limpar destaques anteriores
    $('.square-55d63').removeClass('highlight-check');

    if (game.inCheck()) {
        const kingSquare = game.kingSquare(game.turn());
        $(`.square-${kingSquare}`).addClass('highlight-check');
    }
}

game.kingSquare = function(turn) {
    const pieces = game.board();
    for (let i = 0; i < pieces.length; i++) {
        for (let j = 0; j < pieces[i].length; j++) {
            const piece = pieces[i][j];
            if (piece && piece.type === 'k' && piece.color === turn) {
                return `${String.fromCharCode(97 + j)}${8 - i}`;
            }
        }
    }
    return null;
};