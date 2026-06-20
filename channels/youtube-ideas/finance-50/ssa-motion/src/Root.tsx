import "./index.css";
import { Composition } from "remotion";
import { SsaMotion, SCENE_FRAMES, SCENE_COUNT } from "./SsaMotion";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SSAMotion"
        component={SsaMotion}
        durationInFrames={SCENE_FRAMES * SCENE_COUNT}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
