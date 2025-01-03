import $ from 'jquery'; 
import Chessboard, { Piece } from 'chessboardjs'; 
import 'chessboardjs/www/css/chessboard.css';  // Importando o CSS do Chessboard

// Garantindo que o jQuery está acessível globalmente
window.$ = $;

// Inicializando o tabuleiro na posição inicial
const board = Chessboard('chessboard', {
    position: 'start',
    pieceTheme: '/img/chesspieces/{piece}.png',
    draggable: true,
    dropOffBoard: 'trash',
});
