import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'sakura',
  templateUrl: '../canvas.html'
})
export class SakuraComponent implements AfterViewInit {

  private canvas?: HTMLCanvasElement;
  private ctx?: CanvasRenderingContext2D;
  public bgColor: string = "#2f2f42";
  public canvasSizeX: number = 450;
  public canvasSizeY: number = 400;
  public canvasId: string = "sakuraCanvas" 
  private circleDiameter: number = 20;
  private circle2Diameter: number = 180;
  private expand: boolean = true;

  constructor() {
  }

  ngAfterViewInit(): void {
    this.canvas = document.getElementById(this.canvasId) as HTMLCanvasElement;
    this.ctx = <CanvasRenderingContext2D>this.canvas.getContext("2d");
    setInterval(() => this.redrawCanvas(<HTMLCanvasElement>this.canvas, <CanvasRenderingContext2D>this.ctx), 30);
    this.drawSakura(this.ctx);
    this.drawCircle(this.ctx);
   }

  redrawCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.drawSakura(ctx);
    this.drawCircle(ctx);
  }
  
  drawCircle(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.strokeStyle = "#34aeeb";
    ctx.lineWidth = 4;
    ctx.beginPath();
    // canvas size is and 400, 225 and 200 would be the center of the canvas
    ctx.arc(225, 200, this.circleDiameter, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(225, 200, this.circle2Diameter, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();

    if (this.expand) {
      this.circleDiameter += 5
      this.circle2Diameter -= 5
    } else {
      this.circleDiameter -= 5;
      this.circle2Diameter += 5;

    }

    if (this.circleDiameter >= 180) {
      this.expand = false;
    } else if (this.circleDiameter <= 10) {
      this.expand = true;
    }
  }

  // the coordinates were chosen with trial and error
  drawSakura(ctx: CanvasRenderingContext2D) {
    ctx.save();
    // left
    ctx.beginPath();
    ctx.moveTo(100, 175);
    ctx.bezierCurveTo(100, 215, 200, 175, 200, 175);
    ctx.moveTo(100, 175)
    ctx.bezierCurveTo(100, 115, 200, 175, 200, 175);

    // right
    ctx.moveTo(350, 175);
    ctx.bezierCurveTo(350, 225, 250, 175, 250, 175);
    ctx.moveTo(350, 175)
    ctx.bezierCurveTo(350, 125, 250, 175, 250, 175);

    // top
    ctx.moveTo(225, 60);
    ctx.bezierCurveTo(225, 60, 275, 60, 225, 150);
    ctx.moveTo(225, 60)
    ctx.bezierCurveTo(225, 60, 175, 60, 225, 150);
    ctx.stroke();

    ctx.fillStyle = "#db799d";
    ctx.fill();
    ctx.restore();

    // bottom left
    ctx.save();
    ctx.beginPath();
    ctx.rotate(-25 * Math.PI / 180);
    ctx.moveTo(-10, 335);
    ctx.bezierCurveTo(-10, 375, 100, 290, 100, 290);
    ctx.moveTo(-10, 335)
    ctx.bezierCurveTo(-10, 275, 100, 290, 100, 290);
    ctx.stroke();
    ctx.fillStyle = "#db799d";
    ctx.fill();
    ctx.restore();

    // bottom right
    ctx.save();
    ctx.beginPath();
    ctx.rotate(20 * Math.PI / 180);
    ctx.moveTo(400, 175);
    ctx.bezierCurveTo(400, 225, 300, 125, 300, 125);
    ctx.moveTo(400, 175)
    ctx.bezierCurveTo(400, 115, 300, 125, 300, 125);
    ctx.stroke();
    ctx.fillStyle = "#db799d";
    ctx.fill();
    ctx.restore();
  }
}
