import { LEVEL, OBJECT_TYPE } from './setup';

//DOM Elements:
const gameGrid = document.querySelector('#game');
const scoreTable = document.querySelector('#score');
const startButton = document.querySelector('#start');

//Game Constants:
const POWER_PILL_TIME = 10000; //milliseconds
const GLOBAL_SPEED = 80; //ms

//Initial Setup:
let score = 0;
let timer = null;
let gameWin = false;
let powerPillActive = false; // when pacman eats powerpill
let powerPillTimer = null;

//functions required:
//Gameover
function gameOver(pacman, grid) {}

function checkCollision(pacman, ghosts) {}

function gameLoop(pacman, ghosts) {}

function startGame() {}
