import { OBJECT_TYPE, DIRECTIONS } from './setup';

class Pacman {
	constructor(speed, startPos) {
		this.pos = startPos;
		this.speed = speed;
		this.dir = null;
		this.timer = 0;
		this.powerPill = false;
		this.rotation = true;
	}

	shouldMove() {
		if (!this.dir) return;

		if (this.timer === this.speed) {
			this.timer = 0;
			return true;
		}
		this.timer++;
	}

	getNextMove(objectExist) {
		let nextMovePos = this.pos + this.dir.movement;

		//for collosions with wall or ghost:
		if (objectExist(nextMovePos, OBJECT_TYPE.WALL) || objectExist(nextMovePos, OBJECT_TYPE.GHOSTLAIR)) {
			nextMovePos = this.pos;
		}
		return { nextMovePos, direction: this.dir };
	}
	//if get next move:
	makeMove() {
		const classesToRemove = [OBJECT_TYPE.PACMAN];
		const classesToAdd = [OBJECT_TYPE.PACMAN]; // adding to new position

		return { classesToRemove, classesToAdd };
	}

	setNewPos(nextMovePos) {
		this.pos = nextMovePos;
	}

	handleKeyInput(e, objectExist) {
		let dir;

		if (e.keyCode >= 37 && e.keyCode <= 40) {
			dir = DIRECTIONS[e.key];
		} else {
			return;
		}
		//checking if theres a wall left or upwards and ensuring movement
		const nextMovePos = this.pos + dir.movement;
		if (objectExist(nextMovePos, OBJECT_TYPE.WALL || objectExist(nextMovePos, OBJECT_TYPE.GHOSTLAIR))) return;
		this.dir = dir;
	}
}

export default Pacman;
