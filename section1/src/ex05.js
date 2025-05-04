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

  const container = new Container();
  app.stage.addChild(container);
  container.x = 200;
  container.y = 200;

  // sprite
  document.body.appendChild(app.canvas);

  const texture = await Assets.load("https://pixijs.com/assets/bunny.png");

  const bunny = new Sprite(texture);
  //   stage => 요소가 나오는 화면
  container.addChild(bunny);

  bunny.x = 100;
  bunny.y = 100;

  const rect = new Graphics();
  rect.rect(0, 0, 50, 50);
  rect.fill();
  container.addChild(rect);
  app.ticker.add((delta) => {
    container.rotation += delta.deltaTime * 0.1;
  });
}
