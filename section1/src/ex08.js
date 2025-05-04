import "./style.css";
import {
  AlphaFilter,
  AnimatedSprite,
  Application,
  Assets,
  BlurFilter,
  ColorMatrixFilter,
  Container,
  DisplacementFilter,
  Graphics,
  NoiseFilter,
  Rectangle,
  Sprite,
  Texture,
} from "pixi.js";

export default async function main() {
  // Application
  const app = new Application();

  await app.init({
    background: "coral",
    // resizeTo: window => 현재 창 사이즈에 딱 맞게 설정됨
    resizeTo: window,
    // resolution => 해상도
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
  });

  app.canvas.id = "app-canvas";
  document.body.appendChild(app.canvas);

  const texture = await Assets.load("images/Attack.png");

  const frames = [];
  for (let i = 0; i <= 4; i++) {
    const frame = new Texture({
      source: texture,
      frame: new Rectangle(128 * i, 0, 128, 128),
    });
    frames.push(frame);
  }

  const zombie = new AnimatedSprite(frames);
  app.stage.addChild(zombie);
  zombie.animationSpeed = 0.2;
  zombie.loop = false;
  zombie.eventMode = "static";
  zombie.cursor = "pointer";

  zombie.on("pointertap", () => {
    zombie.gotoAndPlay(0);
  });

  // animation이 완료가 되었을때 onComplete가 실행된다.
  zombie.onComplete = () => {
    zombie.gotoAndStop(0);
  };
}
