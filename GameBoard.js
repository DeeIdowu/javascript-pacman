import { GRID_SIZE, CELL_SIZE, OBJECT_TYPE, CLASS_LIST } from './setup';

//creation of the class:
class GameBoard {
	constructor(DOMGrid) {
		this.dotCount = 0;
		this.grid = [];
		this.DOMGrid = DOMGrid;
	}

	//initialization of method:
	showGameStatus(gameWin) {
		//display if game is over or the game is won
		const div = document.createElement('div');
		div.classList.add('game-status');
		//conditional statement to display result
		div.innerHTML = `${gameWin ? 'WIN!' : 'GAME OVER!'}`;
		this.DOMGrid.appendChild(div);
	}

	//method to create game grid:
	createGrid(level) {
		//every time game is restarted or a new game is commenced
		this.dotCount = 0;
		this.grid = [];
		this.DOMGrid.innerHTML = '';
		//setting style for correct no. of columns for grid
		this.DOMGrid.style.cssText = `grid-template-columns: repeat(${GRID_SIZE}, ${CELL_SIZE}px)`;

		//drawing the grid via looping of level values:
		level.forEach((square) => {
			const div = document.createElement('div');
			div.classList.add('square', CLASS_LIST[square]);
			//styling:
			div.style.cssText = `width: ${CELL_SIZE}px; height: ${CELL_SIZE}px`;
		});
	}
}
