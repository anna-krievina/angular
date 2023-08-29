import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'heart',
  templateUrl: '../canvas.html'
})
export class HeartComponent implements AfterViewInit {

  private canvas?: HTMLCanvasElement;
  private ctx?: CanvasRenderingContext2D;
  public bgColor: string = "black";
  public canvasSizeX: number = 450;
  public canvasSizeY: number = 300;
  public canvasId: string = "heartCanvas"
  private colorArray: string[] = ["blue", "blue_gray", "dark_teal", "gold", "light_gray", "pink", "purple"];
  private imgArray: InstanceType<typeof Image>[] = [];

  constructor() {
    let imgArray = this.imgArray;
    this.colorArray.forEach(function (color) {
      let img = new Image();
      img.src = '../assets/img/heart/' + color + '.png';
      imgArray.push(img);
    });
  }

  ngAfterViewInit(): void {
    this.canvas = document.getElementById(this.canvasId) as HTMLCanvasElement;
    this.ctx = <CanvasRenderingContext2D>this.canvas.getContext("2d");
    setInterval(() => this.redrawCanvas(<HTMLCanvasElement>this.canvas, <CanvasRenderingContext2D>this.ctx), 1000);
    this.drawHeart(this.ctx);
  }

  redrawCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.drawHeart(ctx);
  }
  
  drawHeart(ctx: CanvasRenderingContext2D) {
    let startx = 180;
    let rowx = startx;
    let rowy = 250;
    let subrowx = 0;
    let subrowy = 0;
    let rowLenth = 6;
    for (var i = 0; i < rowLenth; i++) {
      subrowx = rowx;
      subrowy = rowy;
      let subrowCount = rowx <= startx - 75 ? 3 : 6;
      for (var j = 0; j < subrowCount; j++) {
        subrowx = subrowx + 25;
        subrowy = subrowy - 25;
        let img = this.imgArray[Math.floor(Math.random() * this.imgArray.length)];
        ctx.drawImage(img, subrowx, subrowy);
      }
      rowx = rowx - 25;
      rowy = rowy - 25;
    }
  }

}
