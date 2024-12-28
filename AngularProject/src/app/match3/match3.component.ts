import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'match3',
  templateUrl: './match3.component.html',
  styleUrls: ['./match3.component.css']
})
export class Match3Component {
  public check: boolean = '💕' == '💕';
  private pieces: string[] = ['💙', '🐙', '⭐', '🍃', '🌸'];
  public board: string[][] = [];
  private boardSize: number = 8;

  private selectedI: number = -1;
  private selectedJ: number = -1;

  constructor(private renderer: Renderer2) {
    this.generateBoard();
    while (this.findMatches()) {
       //call findMatches until there are no more matches
    }
  }

  generateBoard() {
    this.board = [];
    for (let i = 0; i < this.boardSize; i++) {
      this.board[i] = [];
      for (let j = 0; j < this.boardSize; j++) {
        this.board[i][j] = this.pieces[this.getRandomNumber(0, this.pieces.length - 1)];
      }
    }
  }

  select(i: number, j: number) {
    this.removeSelectedClass();
    const element = document.getElementById(i + ',' + j);
    if (element) {
      this.renderer.addClass(element, 'selected');
    }

    if (this.selectedI == -1) {
      this.selectedI = i;
      this.selectedJ = j;
    } else {
      if ((this.selectedJ - j == 0 && Math.abs(this.selectedI - i) == 1) ||
        (this.selectedI - i == 0 && Math.abs(this.selectedJ - j) === 1)) {
        const temp = this.board[this.selectedI][this.selectedJ];
        this.board[this.selectedI][this.selectedJ] = this.board[i][j];
        this.board[i][j] = temp;
        setTimeout(() => {
          while (this.findMatches()) {
            //call findMatches until there are no more matches
          }
        }, 1000);
      }
      if (element) {
        this.renderer.removeClass(element, 'selected');
      }
      this.selectedI = -1;
      this.selectedJ = -1;
    }
  }

  removeSelectedClass() {
    for (let i = 0; i < this.boardSize; i++) {
      for (let j = 0; j < this.boardSize; j++) {
        const element = document.getElementById(i + ',' + j);
        if (element) {
          this.renderer.removeClass(element, 'selected');
        }
      }
    }
  }

  findMatches(): boolean {
    let hasMatches = false;
    for (let i = 0; i < this.boardSize; i++) {
      for (let j = 0; j < this.boardSize; j++) {
        let matchCountRows = this.processRowsAndCols(i, j, true);
        let matchCountCols = this.processRowsAndCols(i, j, false);
        if (matchCountRows >= 3 || matchCountCols >= 3) {
          hasMatches = true;
        }
      }
    }
    return hasMatches;
  }

  processRowsAndCols(i: number, j: number, rows: boolean): number {
    let matchCount = this.getMatchForRowOrCol(i, j, 0, 1, rows);
    // thanks ChatGPT, I was on the right track but you fixed it
    if (matchCount >= 3) {
      if (rows) {
        for (let n = j; n < j + matchCount; n++) {
          for (let k = i; k > 0; k--) {
            this.board[k][n] = this.board[k - 1][n];
          }
          this.board[0][n] = this.pieces[this.getRandomNumber(0, this.pieces.length - 1)];
        }
      } else {
        for (let n = i; n < i + matchCount; n++) {
          for (let k = n; k > 0; k--) {
            this.board[k][j] = this.board[k - 1][j];
          }
          this.board[0][j] = this.pieces[this.getRandomNumber(0, this.pieces.length - 1)];
        }
      }
      
    }
    return matchCount;
  }

  getMatchForRowOrCol(i: number, j: number, cur: number, matchCount: number, rows: boolean): number {
    if ((rows && j + cur < this.board.length - 1) ||
      (!rows && i + cur < this.board.length - 1)) {
      cur++;
      if ((rows && this.board[i][j + cur] == this.board[i][j]) ||
        (!rows && this.board[i + cur][j] == this.board[i][j])) {
        matchCount++;
        return this.getMatchForRowOrCol(i, j, cur, matchCount, rows);
      } else {
        return matchCount;
      }
    } else {
      return matchCount;
    }
  }

  getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
