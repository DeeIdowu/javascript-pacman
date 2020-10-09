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
			//append to DOMGrid
			this.DOMGrid.appendChild(div);
			this.grid.push(div);

			//calculate count of the game:
			if (CLASS_LIST[square] === OBJECT_TYPE.DOT) this.dotCount++;
		});
	}

	//method to add classes:
	addObject(pos, classes) {
		this.grid[pos].classList.add(...classes);
	}
	//method to remove classes:
	removeObject(pos, classes) {
		this.grid[pos].classList.remove(...classes);
	}
	//method to check if object exists:
	objectExist = (pos, object) => {
		return this.grid[pos].classList.contains(object);
	};

	rotateDiv(pos, deg) {
		this.grid[pos].style.transform = `rotate(${deg}deg)`;
	}

	moveCharacter(character) {
		if (character.shouldMove()) {
			const { nextMovePos, direction } = character.getNextMove(this.objectExist);

			const { classesToRemove, classesToAdd } = character.makeMove();

			if (character.rotation && nextMovePos !== character.pos) {
				this.rotateDiv(nextMovePos, character.dir.rotation);
				this.rotateDiv(character.pos, 0);
			}

			this.removeObject(character.pos, classesToRemove);
			this.addObject(nextMovePos, classesToAdd);

			character.setNewPos(nextMovePos, direction);
		}
	}

	//Static method - something you can call withing initiating the Class
	static createGameBoard(DOMGrid, level) {
		const board = new this(DOMGrid);
		board.createGrid(level);
		return board;
	}
}

export default GameBoard;
