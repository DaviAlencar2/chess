import $ from 'jquery'; 
import 'chessboardjs/www/css/chessboard.css';  // Importando o CSS do Chessboard
import Chessboard from 'chessboardjs';  // Importando o Chessboard
import {Chess} from 'chess.js';  // Importando o Chess.js

// Garantindo que o jQuery está acessível globalmente
window.$ = $;
const game = new Chess();

export function createChessboard() {
    // Inicializando o tabuleiro na posição inicial
    const board = Chessboard('chessboard', {
        position: 'start',
        pieceTheme: '/img/chesspieces/{piece}.png',
        draggable: true,
        dropOffBoard: 'trash',
        onDrop : function(source, target, piece, newPos, oldPos, orientation) {
            console.log('Source: ' + source);
            console.log('Target: ' + target);
            console.log('Piece: ' + piece);
            console.log('New position: ' + Chessboard.objToFen(newPos));
            console.log('Old position: ' + Chessboard.objToFen(oldPos));
            console.log('Orientation: ' + orientation);

            try {
                game.move({
                    from: source,
                    to: target,
                    promotion: 'q'
                });

                if (game.isCheckmate()) {
                    alert('Checkmate! Game over!');
                } else if (game.isDraw()) {
                    alert('Draw! Game over!');
                }

            } catch (error) {
                console.error('Invalid move: ', error.message);
                return 'snapback';
            }
        }
    });''
}