import "./style.css";
import { Application } from "pixi.js";

export default async function main() {
  // Application
  const app = new Application();

  await app.init({
    background: "coral",
    // resizeTo: window => 현재 창 사이즈에 딱 맞게 설정됨
    resizeTo: window,
  });

  app.canvas.id = "app-canvas";

  document.body.appendChild(app.canvas);
}
