import * as PIXI from "pixi.js";
import "./style.css";

(async () => {
  // Application
  const app = new PIXI.Application();

  await app.init({
    background: "coral",
  });

  app.canvas.id = "app-canvas";

  document.body.appendChild(app.canvas);
})();
