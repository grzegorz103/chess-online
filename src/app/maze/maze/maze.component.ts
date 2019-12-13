import { Component, OnInit, HostListener } from '@angular/core';
import { Maze } from '../models/maze';
import { Player } from '../models/player';
import { Computer } from '../models/computer';
import { Point } from '../models/point';
import { Level } from '../models/levels/level';
import { Hard } from '../models/levels/hard';
import { Easy } from '../models/levels/easy';
import { Master } from '../models/levels/master';
import { Path } from '../models/path';

@Component({
  selector: 'app-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.scss']
})
export class MazeComponent implements OnInit {

  player: Player;
  loaded = false;
  computer: Computer;
  meta: Point;
  level: Level;

  static maze: Maze;
  static oppositeDirections = [1, 0, 3, 2];
  static UP = 0;
  static DOWN = 1;
  static LEFT = 2;
  static RIGHT = 3;

  metaNode: Path;
  found: boolean;
  visited: Point[];

  constructor() {
    MazeComponent.maze = this.generateMaze();
    this.createPlayer();
    this.loaded = true;
    this.level = new Easy();
    this.visited = [];
    this.createComputer();
    this.createMetaPoint();
    this.computerMove();
  }

  ngOnInit() {
  }

  generateMaze() {
    return new Maze();
  }

  createComputer() {
    let row, col;
    do {
      row = Math.floor(Math.random() * (28 - 1 + 1)) + 1;
      col = Math.floor(Math.random() * (28 - 1 + 1)) + 1;
    } while (!MazeComponent.maze.points[row][col].isOccupied);
    this.computer = new Computer(row, col, 'Computer');
  }

  createPlayer() {
    this.player = new Player(0, 0, 'Player');
  }

  isPlayerOnField(i: number, j: number) {
    return this.player.row === i && this.player.col === j;
  }

  isComputerOnField(i: number, j: number) {
    return this.computer.row === i && this.computer.col === j;
  }

  isPathOnField(i: number, j: number) {
    if(!this.metaNode) return;
    let node = this.metaNode.current;
    if (node.row === i && node.col === j) {
      return true;
    }

    if (this.metaNode.previous) {
      for (let prev = this.metaNode.previous; prev !== null; prev = prev.previous) {
        if (prev.current.row === i && prev.current.col === j) {
          return true;
        }
      }
    }
  }

  computerMove() {
    this.level.move(this.computer);
    this.checkForWin(this.computer);
    setTimeout(() => this.computerMove(), 100);
  }

  static neighbours(point: Point): number[] {
    let neighbours = [];
    let x = point.row;
    let y = point.col;

    if (x > 0 && MazeComponent.maze.points[x - 1][y].isOccupied) {
      neighbours.push(this.UP);
    }
    if (y > 0 && MazeComponent.maze.points[x][y - 1].isOccupied) {
      neighbours.push(this.LEFT);
    }
    if (x < 28 && MazeComponent.maze.points[x + 1][y].isOccupied) {
      neighbours.push(this.DOWN);
    }
    if (y < 28 && MazeComponent.maze.points[x][y + 1].isOccupied) {
      neighbours.push(this.RIGHT);
    }

    return neighbours;
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    // event.key === 'ArrowUp'
    switch (event.key) {
      case 'w':
        if (this.player.row > 0 && MazeComponent.maze.points[this.player.row - 1][this.player.col].isOccupied)
          this.player.row -= 1;
        break;
      case 's':
        if (this.player.row < 28 && MazeComponent.maze.points[this.player.row + 1][this.player.col].isOccupied)
          this.player.row += 1;
        break;
      case 'a':
        if (this.player.col > 0 && MazeComponent.maze.points[this.player.row][this.player.col - 1].isOccupied)
          this.player.col -= 1;
        break;
      case 'd':
        if (this.player.col < 28 && MazeComponent.maze.points[this.player.row][this.player.col + 1].isOccupied)
          this.player.col += 1;
        break;
    }

    this.checkForWin(this.player);
  }

  createMetaPoint() {
    let x;
    let y = 28;

    do {
      x = Math.floor(Math.random() * (28 - 1 + 1)) + 1
    } while (!MazeComponent.maze.points[x][x].isOccupied);

    this.meta = new Point(x, y, null);
  }

  isMetaOnField(row: number, col: number) {
    return this.meta.row === row && this.meta.col === col;
  }

  checkForWin(point: Point) {
    if (point.row === this.meta.row && point.col === this.meta.col) {
      alert(point.name + ' has won the game!!!');
    }
  }

  getMazePoints() {
    return MazeComponent.maze.points;
  }

  changeDifficultLevel(event) {
    if (event) {
      switch (event.value) {
        case 'EASY':
          this.level = new Easy();
          break;
        case 'HARD':
          this.level = new Hard();
          break;
        case 'GODMODE':
          this.metaNode = new Path(null, new Point(this.computer.row, this.computer.col, null));
          this.calculateShortestPath(this.metaNode);
          this.level = new Master();
          console.log(this.metaNode);
          break;
      }
    }
  }

  static moveComputer(computer: Computer, move: number) {
    switch (move) {
      case MazeComponent.UP:
        computer.row -= 1;
        break;
      case MazeComponent.DOWN:
        computer.row += 1;
        break;
      case MazeComponent.LEFT:
        computer.col -= 1;
        break;
      case MazeComponent.RIGHT:
        computer.col += 1;
        break;
    }
  }
  calculateShortestPath(path: Path) {
    console.log(path);
    if (this.found || this.visited.some(e => e.col === path.current.col && e.row === path.current.row)) return;
    this.visited.push(path.current);
    if (path.current.row === this.meta.row && path.current.col === this.meta.col) {
      this.metaNode = path;
      this.found = true;
    }

    let neighbours = MazeComponent.neighbours(path.current);


    neighbours.forEach(neighbour => {
      let p = null;
      switch (neighbour) {
        case MazeComponent.UP:
          p = new Path(path, new Point(path.current.row - 1, path.current.col, null));
          this.calculateShortestPath(p)
          break;
        case MazeComponent.DOWN:
          p = new Path(path, new Point(path.current.row + 1, path.current.col, null));
          this.calculateShortestPath(p)
          break;
        case MazeComponent.LEFT:
          p = new Path(path, new Point(path.current.row, path.current.col - 1, null));
          this.calculateShortestPath(p)
          break;
        case MazeComponent.RIGHT:
          p = new Path(path, new Point(path.current.row, path.current.col + 1, null));
          this.calculateShortestPath(p)
          break;
      }
    })
  }
}
