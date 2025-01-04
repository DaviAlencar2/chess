import $ from 'jquery'; 
import 'chessboardjs/www/css/chessboard.css';  // Importando o CSS do Chessboard
import Chessboard from 'chessboardjs';  // Importando o Chessboard

// Garantindo que o jQuery está acessível globalmente
window.$ = $;

export function createChessboard() {
    // Inicializando o tabuleiro na posição inicial
    const board = Chessboard('chessboard', {
        position: 'start',
        pieceTheme: '/img/chesspieces/{piece}.png',
        draggable: true,
        dropOffBoard: 'trash',
    });''
}