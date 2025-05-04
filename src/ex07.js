import "./style.css";
import {
  AlphaFilter,
  Application,
  Assets,
  BlurFilter,
  ColorMatrixFilter,
  Container,
  DisplacementFilter,
  Graphics,
  NoiseFilter,
  Sprite,
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

  // sprite
  document.body.appendChild(app.canvas);

  const texture = await Assets.load("https://pixijs.com/assets/bunny.png");

  const bunny = new Sprite(texture);
  //   stage => 요소가 나오는 화면
  app.stage.addChild(bunny);

  bunny.anchor.set(0.5);
  bunny.x = app.screen.width / 2;
  bunny.y = app.screen.height / 2;
  bunny.scale.set(2);

  //Filters
  //   const blurFilter = new BlurFilter({
  //     strength: 5,
  //   });
  //   bunny.filters = blurFilter;
  const colorMatrixFilter = new ColorMatrixFilter();
  colorMatrixFilter.hue(Math.random() * 360); // hue에서 색상 가지수가 360개가 있음

  const filterSpriteTexture = await Assets.load(
    "https://pixijs.com/assets/tutorials/fish-pond/displacement_map.png"
  );
  const filterSprite = new Sprite(filterSpriteTexture);
  const filters = [
    new BlurFilter({ strength: 5 }),
    colorMatrixFilter, // 색상
    new DisplacementFilter(filterSprite), // 이미지를 이용하여 외곡시킴
    new AlphaFilter({ alpha: 0.3 }), // 투명도
    new NoiseFilter({ noise: 0.5 }), // 노이즈
  ];
  bunny.filters = filters[2];
}
