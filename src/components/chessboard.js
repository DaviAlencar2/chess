import $ from 'jquery';
import 'chessboardjs/www/css/chessboard.css';  
import Chessboard from 'chessboardjs';  
import {handleMove}  from '../game/game';

window.$ = $;
export let board;  // Definido globalmente para acesso fácil

export function createChessboard() {
    board = Chessboard('chessboard', {
        position: 'start',
        pieceTheme: '/img/chesspieces/{piece}.png',
        draggable: true,
        dropOffBoard: 'snapback',
        onDrop: handleMove
    });
}