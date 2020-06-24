import { Piece } from './piece';
import { Color } from './color';
import { Point } from './point';
import {ChessMultiplayerComponent} from "../chess-multiplayer.component";
import { King } from './king';

export class Bishop extends Piece {

    constructor(point: Point, color: Color, image: string) {
        super(point, color, image, 3);
    }

    getPossibleMoves(): Point[] {
        let possiblePoints = [];

        let row = this.point.row;
        let col = this.point.col;

        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; --i, --j) { // lewa gorna przekatna
            if (ChessMultiplayerComponent.isFieldEmpty(i, j)) {
                possiblePoints.push(new Point(i, j));
            } //else if (ChessMultiplayerComponent.getPieceByField(i, j) instanceof King && (ChessMultiplayerComponent.getPieceByField(i, j).color !== this.color)){
               // for( let a = row - 1, b = col - 1; a > i && j >= col; --a, --b){
                 //   possiblePoints.push(new Point(i, j));
             //   }
           // }
            else {
                break;
            }
        }

        for (let i = row - 1, j = col + 1; i >= 0 && j < 8; --i, ++j) { // prawa gorna przekatna
            if (ChessMultiplayerComponent.isFieldEmpty(i, j)) {
                possiblePoints.push(new Point(i, j));
            } else {
                break;
            }
        }

        for (let i = row + 1, j = col - 1; i < 8 && j >= 0; ++i, --j) { // lewa dolna przekatna
            if (ChessMultiplayerComponent.isFieldEmpty(i, j)) {
                possiblePoints.push(new Point(i, j));
            } else {
                break;
            }
        }

        for (let i = row + 1, j = col + 1; i < 8 && j < 8; ++i, ++j) { // prawa dolna przekatna
            if (ChessMultiplayerComponent.isFieldEmpty(i, j)) {
                possiblePoints.push(new Point(i, j));
            } else {
                break;
            }
        }

        return possiblePoints;
    }

    getPossibleCaptures() {
        let possiblePoints = [];

        let row = this.point.row;
        let col = this.point.col;

        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; --i, --j) { // lewa gorna przekatna
            if (ChessMultiplayerComponent.isFieldTakenByEnemy(i, j, this.color === Color.WHITE ? Color.BLACK : Color.WHITE)) {
                possiblePoints.push(new Point(i, j));
                break;
            } else {
                if (!ChessMultiplayerComponent.isFieldEmpty(i, j)) {
                    break;
                }
            }
        }

        for (let i = row - 1, j = col + 1; i >= 0 && j < 8; --i, ++j) { // prawa gorna przekatna
            if (ChessMultiplayerComponent.isFieldTakenByEnemy(i, j, this.color === Color.WHITE ? Color.BLACK : Color.WHITE)) {
                possiblePoints.push(new Point(i, j));
                break;
            } else {
                if (!ChessMultiplayerComponent.isFieldEmpty(i, j)) {
                    break;
                }
            }
        }

        for (let i = row + 1, j = col - 1; i < 8 && j >= 0; ++i, --j) { // lewa dolna przekatna
            if (ChessMultiplayerComponent.isFieldTakenByEnemy(i, j, this.color === Color.WHITE ? Color.BLACK : Color.WHITE)) {
                possiblePoints.push(new Point(i, j));
                break;
            } else {
                if (!ChessMultiplayerComponent.isFieldEmpty(i, j)) {
                    break;
                }
            }
        }

        for (let i = row + 1, j = col + 1; i < 8 && j < 8; ++i, ++j) { // prawa dolna przekatna
            if (ChessMultiplayerComponent.isFieldTakenByEnemy(i, j, this.color === Color.WHITE ? Color.BLACK : Color.WHITE)) {
                possiblePoints.push(new Point(i, j));
                break;
            } else {
                if (!ChessMultiplayerComponent.isFieldEmpty(i, j)) {
                    break;
                }
            }
        }

        return possiblePoints;
    }

    getCoveredFields(): Point[] {
        let possiblePoints = [];

        let row = this.point.row;
        let col = this.point.col;

        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; --i, --j) { // lewa gorna przekatna
            if (ChessMultiplayerComponent.isFieldEmpty(i, j))
                possiblePoints.push(new Point(i, j));
            else {
                if (!(ChessMultiplayerComponent.getPieceByField(i, j) instanceof King)) {
                    possiblePoints.push(new Point(i, j));
                    break;
                }
            }
        }

        for (let i = row - 1, j = col + 1; i >= 0 && j < 8; --i, ++j) { // prawa gorna przekatna
            if (ChessMultiplayerComponent.isFieldEmpty(i, j))
                possiblePoints.push(new Point(i, j));
            else {
                if (!(ChessMultiplayerComponent.getPieceByField(i, j) instanceof King)) {
                    possiblePoints.push(new Point(i, j));
                    break;
                }
            }
        }

        for (let i = row + 1, j = col - 1; i < 8 && j >= 0; ++i, --j) { // lewa dolna przekatna
            if (ChessMultiplayerComponent.isFieldEmpty(i, j))
                possiblePoints.push(new Point(i, j));
            else {
                if (!(ChessMultiplayerComponent.getPieceByField(i, j) instanceof King)) {
                    possiblePoints.push(new Point(i, j));
                    break;
                }
            }
        }

        for (let i = row + 1, j = col + 1; i < 8 && j < 8; ++i, ++j) { // prawa dolna przekatna
            if (ChessMultiplayerComponent.isFieldEmpty(i, j))
                possiblePoints.push(new Point(i, j));
            else {
                if (!(ChessMultiplayerComponent.getPieceByField(i, j) instanceof King)) {
                    possiblePoints.push(new Point(i, j));
                    break;
                }
            }
        }

        return possiblePoints;
    }

}
