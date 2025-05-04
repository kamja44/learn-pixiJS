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
  TilingSprite,
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

  const bgTexture = await Assets.load("/images/ruins2.png");
  const bgSprite = new TilingSprite({
    texture: bgTexture,
    width: app.screen.width,
    height: app.screen.height,
  });
  app.stage.addChild(bgSprite);
  //   bgSprite.tileScale.set(0.1);
  function adjustTileScale() {
    const scale = window.innerHeight / bgTexture.height;
    bgSprite.tileScale.set(scale);
    bgSprite.width = window.innerWidth;
    bgSprite.height = window.innerHeight;

    zombie.y = app.screen.height * 0.52 - zombie.height;
  }

  const texture = await Assets.load("images/Attack.png");

  const frames = [];
  for (let i = 0; i <= 4; i++) {
    const frame = new Texture({
      source: texture,
      frame: new Rectangle(128 * i, 0, 128, 128),
    });
    frames.push(frame);
  }

  const punchSound = new Audio("/sounds/punch.mp3");

  const zombie = new AnimatedSprite(frames);
  app.stage.addChild(zombie);

  zombie.animationSpeed = 0.2;
  zombie.loop = false;
  zombie.eventMode = "static";
  zombie.cursor = "pointer";

  zombie.on("pointertap", () => {
    zombie.gotoAndPlay(0);
    punchSound.currentTime = 0; // sound가 애니메이션이 시작될때 항상 실행되도록 설정
    punchSound.play();
  });

  // animation이 완료가 되었을때 onComplete가 실행된다.
  zombie.onComplete = () => {
    zombie.gotoAndStop(0);
  };
  window.addEventListener("resize", adjustTileScale);
  adjustTileScale();

  // 배경 스크롤
  app.ticker.add((delta) => {
    bgSprite.tilePosition.x -= 2 * delta.deltaTime;
  });
}
