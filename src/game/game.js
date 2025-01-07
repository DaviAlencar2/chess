import {Chess}  from 'chess.js';
import {board} from '../components/chessboard';
import $ from 'jquery';

const game = new Chess();
window.$ = $;

export function handleMove(source, target) { 
    try {
        const move = game.move({
            from: source,
            to: target,
            promotion: 'q',
        });

        if (!move) {
            return 'snapback';  // Movimento inválido
        }

        // Implementação do En Passant (remoção manual do peão capturado)
        if (move.flags.includes('e')) {
            const capturedSquare = move.to[0] + (move.to[1] === '3' ? '4' : '5');
            $('#' + capturedSquare).empty();  // Remove o peão capturado no en passant
        }

        // Implementação manual do Roque
        if (move.flags.includes('k')) { // Roque lado do rei
            if (target === 'g1') board.move('h1-f1');
            if (target === 'g8') board.move('h8-f8');
        } else if (move.flags.includes('q')) { // Roque lado da rainha
            if (target === 'c1') board.move('a1-d1');
            if (target === 'c8') board.move('a8-d8');
        }

        // if (game.inCheck()) { 
        //     highlightCheckKing();  
        // }

        // Atualizar o tabuleiro usando a nova posição
        // board.position(game.fen()); // Único local onde atualiza o tabuleiro

      
        //Mensagens para xeque-mate e empate
        if (game.isCheckmate()) {
            alert('Xeque-mate!');
        } else if (game.isDraw()) {
            alert('Empate!');
        }

    } catch (error) {
        console.error('Erro ao realizar o movimento:', error.message);
        return 'snapback'; // Devolver peça se movimento for inválido
    }
}