import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  public http: HttpClient;
  public add: string = "+";
  public subtract: string = "–";
  public multipy: string = "*";
  public divide: string = "÷";
  public undo: string = "⌫";
  public reset: string = "C";
  public equals: string = "=";
  public negate: string = "+/-";
  public result: string = "0";
  public comma: string = ".";

  constructor(http: HttpClient) {
    this.http = http;
  }

  calculate(buttonValue: string) {
    // 22 is the length of maximum integer value
    if (this.result.length < 22) {
      switch (buttonValue) {
        case this.add:
        case this.subtract:
        case this.multipy:
        case this.divide:
          if (!this.result.endsWith(this.comma)) {
            let calculations = [this.add, this.subtract, this.multipy, this.divide];
            let index = -1;
            for (let i = 0; i < calculations.length; i++) {
              index = this.result.indexOf(calculations[i]);
              if (index > -1) {
                this.result = this.result.replace(calculations[i], buttonValue);
                break;
              }
            }
            if (index == -1) {
              this.result = this.result + " " + buttonValue + " ";
            }
          }
          break;
        case this.undo:
          // remove last character
          this.result = this.result.substring(0, this.result.length - 1);
          break;
        case this.reset:
          this.result = "0";
          break;
        case this.comma:
          if (!this.result.endsWith(this.comma)) {
            this.result = this.result + buttonValue
          }
          break;
        // all the numbers
        default:
          this.result = this.result + buttonValue
          // removing the zero otherwise 01 and the like would be displayed
          if (this.result.length == 2 && this.result.startsWith("0")) {
            this.result = this.result.substring(1, this.result.length);
          }
          break;
      }
    }
  }

  calculateResult(result: string) {
    let resultArray: string[] = result.split(' ');
    if (resultArray.length == 3) {
      try {
        let firstNumber: number = Number(resultArray[0]);
        let secondNumber: number = Number(resultArray[2]);
        let resultNumber: number = 0;
        switch (resultArray[1]) {
          case this.add:
            resultNumber = firstNumber + secondNumber;
            break;
          case this.subtract:
            resultNumber = firstNumber - secondNumber;
            break;
          case this.divide:
            resultNumber = firstNumber / secondNumber;
            break;
          case this.multipy:
            resultNumber = firstNumber * secondNumber;
            break;
        }
        result = resultNumber.toString();
      }
      catch (error)
      {
        // in case of error, just return the result
        console.error(error);
      }
    }
    this.result = result;
  }

  negateResult(result: string) {
    let resultArray: string[] = result.split(' ');
    if (resultArray.length > 0) {
      let firstNumber: number = Number(resultArray[0]);
      let resultNumber:number = 0 - firstNumber;
      result = resultNumber.toString();
    }
    this.result = result;
  }

}
class ResultModel {
  Result?: string;

  constructor(Result?: string) {
    this.Result = Result;
  }
}
