import "./style.css";
import { Application, Assets, Container, Graphics, Sprite } from "pixi.js";

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

  // sprite
  document.body.appendChild(app.canvas);

  const texture = await Assets.load("https://pixijs.com/assets/bunny.png");

  const bunny = new Sprite(texture);
  //   stage => 요소가 나오는 화면
  app.stage.addChild(bunny);

  bunny.anchor.set(0.5);
  bunny.x = app.screen.width / 2;
  bunny.y = app.screen.height / 2;

  bunny.eventMode = "static";
  bunny.cursor = "pointer";

  let n = 1;

  bunny.on("pointertap", () => {
    bunny.scale.set(++n);
  });
}
