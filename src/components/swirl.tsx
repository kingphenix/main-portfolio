import { DitheringShader } from "./dithering-shader";

export const Swirl = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <DitheringShader
        width={500}
        height={500}
        colorBack="#000000"
        colorFront="#00ffff"
        shape="swirl"
        type="8x8"
        pxSize={2}
        speed={0.5}
        className="rounded-lg"
      />
    </div>
  );
};

export default Swirl;
