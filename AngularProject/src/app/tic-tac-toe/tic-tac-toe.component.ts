import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.css']
})
export class TicTacToeComponent {
  public board: TicTacModel[] = [];
  public gameOver: boolean = false;
  public http: HttpClient;
  private boardSize: number = 9;
  private boardArraySize: number = 3;
  private winCombinationOuter: number = 8;
  private winCombinationInner: number = 3;
  /*
    * the game board for tic tac toe is laid out like this:
    * 1|2|3
    * 4|5|6
    * 7|8|9
    */
  private winCombination: number[][] = [  [ 1, 5, 9 ], [ 3, 5, 7 ], [ 1, 2, 3 ], [ 4, 5, 6 ],
[ 7, 8, 9 ], [ 1, 4, 7 ], [ 2, 5, 8 ], [ 3, 6, 9 ] ];

  constructor(http: HttpClient) {
    this.clearBoard();
    this.http = http;
  }

  move(index: number) {
    if (this.board && !this.gameOver) {
      if (!this.board[index].Value) {
        this.board[index].Value = "X";
        this.calculateMoveAndResult();
      }
    }
  }

  calculateMoveAndResult() {
    let result = this.GetMove();
    if (result == -1) {
      this.gameOver = true;
    } else {
      this.board[result].Value = "O";
      // after both moves are made, need to calculate if winning conditions are met.
      this.gameOver = this.CalculateGameOver();
    }
  }

  clearBoard() {
    const BoardSize: number = 9;
    let idCounter: number = 1;

    for (let i = 0; i < BoardSize; i++) {
      this.board[i] = new TicTacModel(idCounter);
      idCounter++;
    }
    this.gameOver = false;
  }

  GetMove() {
    let returnId: number = -1;
    let result: TicTacModel[] = [new TicTacModel(this.winCombinationInner)];
    // goes over the winning combinations to see if two in a row is occuring
    for (let i = 0; i < this.winCombinationOuter; i++)
    {
      let nonEmptyCounter: number = 0;
      let xCounter: number = 0;
      let oCounter:number = 0;
      for (let j = 0; j < this.winCombinationInner; j++)
      {
        result[j] = <TicTacModel>this.board.find(e => e.Id == this.winCombination[i][j]);
        if (result[j].Value) {
          nonEmptyCounter++;
          if (result[j].Value == "X") {
            xCounter++;
          }
          else if (result[j].Value == "O") {
            oCounter++;
          }
        }
      }
      if (nonEmptyCounter == 2 && (xCounter == 2 || oCounter == 2)) {
        for (let j = 0; j < this.winCombinationInner; j++)
        {
          result[j] = <TicTacModel> this.board.find(e => e.Id == this.winCombination[i][j]);
          if (!result[j].Value) {
            returnId = result[j].Id - 1;
            break;
          }
        }
      }
      if (returnId != -1) {
        break;
      }
    }
    if (returnId == -1) {
      // if no win conditions are found, searches for available free space. order is determined by which position I think is the best
      let possibleMoves: number[] = [ 4, 0, 8, 5, 3, 6, 7 ];
      for (let i = 0; i < possibleMoves.length; i++)
      {
        if (!this.board[possibleMoves[i]].Value) {
          returnId = possibleMoves[i];
          break;
        }
      }
    }
    return returnId;
  }

  CalculateGameOver() {
    let isGameOver: boolean = false;
    let result: TicTacModel[] = [new TicTacModel(this.winCombinationInner)];
    for (let i = 0; i < this.winCombinationOuter; i++)
    {
      let xCounter: number = 0;
      let oCounter: number = 0;
      for (let j = 0; j < this.winCombinationInner; j++)
      {
        // checks only winning combinations on the board
        result[j] = <TicTacModel>this.board.find(e => e.Id == this.winCombination[i][j]);
        if (result[j].Value) {
          if (result[j].Value == "X") {
            xCounter++;
          }
          else if (result[j].Value == "O") {
            oCounter++;
          }
        }
      }
      // none of the fields are free or three in a row is achieved
      if (!this.board.find(e => e.Value) ||
        (xCounter == 3 || oCounter == 3)) {
        // win condition
        isGameOver = true;
        break;
      }
    }
    return isGameOver;
  }
}

class TicTacModel {
  Id: number;
  Value?: string;

  constructor(Id: number, Value?: string) {
    this.Id = Id;
    this.Value = Value;
  }
}
