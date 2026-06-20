import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

export const SCENE_FRAMES = 165; // 5.5s per scene at 30fps (room for voiceover)
export const SCENE_COUNT = 8;

const FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif";

// ---------------------------------------------------------------------------
// Small animation helpers
// ---------------------------------------------------------------------------
const Reveal: React.FC<{
  delay?: number;
  children: React.ReactNode;
  y?: number;
  style?: React.CSSProperties;
}> = ({ delay = 0, children, y = 60, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  const opacity = interpolate(frame - delay, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(s, [0, 1], [y, 0]);
  return (
    <div style={{ opacity, transform: `translateY(${translateY}px)`, ...style }}>
      {children}
    </div>
  );
};

const Pill: React.FC<{ color: string; children: React.ReactNode; delay?: number }> = ({
  color,
  children,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 120 } });
  return (
    <div
      style={{
        transform: `scale(${interpolate(s, [0, 1], [0.6, 1])})`,
        opacity: interpolate(frame - delay, [0, 8], [0, 1], { extrapolateRight: "clamp" }),
        background: color,
        color: "#0F2747",
        fontWeight: 800,
        fontSize: 46,
        letterSpacing: 2,
        padding: "18px 44px",
        borderRadius: 999,
        textTransform: "uppercase",
      }}
    >
      {children}
    </div>
  );
};

// Animated background accents (frame-driven, not CSS)
const Accents: React.FC<{ a: string }> = ({ a }) => {
  const frame = useCurrentFrame();
  const float = Math.sin(frame / 18) * 24;
  const float2 = Math.cos(frame / 22) * 30;
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: -140 + float,
          right: -120,
          width: 460,
          height: 460,
          borderRadius: "50%",
          background: a,
          opacity: 0.18,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -160 - float2,
          left: -120,
          width: 380,
          height: 380,
          borderRadius: "50%",
          background: a,
          opacity: 0.14,
        }}
      />
    </>
  );
};

const Footer: React.FC = () => (
  <div
    style={{
      position: "absolute",
      bottom: 70,
      left: 0,
      right: 0,
      textAlign: "center",
      color: "rgba(255,255,255,0.55)",
      fontSize: 30,
      fontFamily: FONT,
    }}
  >
    Finance for Women 50+ · Educational only
  </div>
);

const SceneFrame: React.FC<{
  bg: string;
  accent: string;
  children: React.ReactNode;
}> = ({ bg, accent, children }) => {
  const frame = useCurrentFrame();
  // gentle fade at the very start of each scene
  const fade = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill
      style={{
        background: bg,
        fontFamily: FONT,
        opacity: fade,
        padding: 90,
        justifyContent: "center",
      }}
    >
      <Accents a={accent} />
      {children}
      <Footer />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Scenes
// ---------------------------------------------------------------------------
const Hook = () => (
  <SceneFrame bg="#0F2747" accent="#E0A528">
    <Reveal delay={4}>
      <div style={{ color: "#E0A528", fontWeight: 800, fontSize: 42, letterSpacing: 6 }}>
        FINANCE FOR WOMEN 50+
      </div>
    </Reveal>
    <Reveal delay={14}>
      <div style={{ color: "#fff", fontWeight: 800, fontSize: 110, lineHeight: 1.05, marginTop: 40 }}>
        5 Social Security Mistakes
      </div>
    </Reveal>
    <Reveal delay={26}>
      <div style={{ color: "#E0A528", fontWeight: 800, fontSize: 96, lineHeight: 1.05, marginTop: 20 }}>
        That Cost Women Thousands
      </div>
    </Reveal>
    <Reveal delay={40}>
      <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 44, marginTop: 50 }}>
        Most of them can&apos;t be undone.
      </div>
    </Reveal>
  </SceneFrame>
);

const Why = () => {
  const items = ["We live longer", "We outlive spouses", "We often earned less"];
  return (
    <SceneFrame bg="#155E63" accent="#7BE0C0">
      <Pill color="#7BE0C0" delay={4}>
        Why it hits women harder
      </Pill>
      <div style={{ marginTop: 60 }}>
        {items.map((t, i) => (
          <Reveal key={t} delay={20 + i * 12}>
            <div
              style={{
                color: "#fff",
                fontSize: 70,
                fontWeight: 700,
                marginBottom: 36,
                display: "flex",
                alignItems: "center",
              }}
            >
              <span style={{ color: "#7BE0C0", marginRight: 24, fontSize: 70 }}>→</span>
              {t}
            </div>
          </Reveal>
        ))}
      </div>
    </SceneFrame>
  );
};

const Mistake: React.FC<{
  bg: string;
  accent: string;
  num: number;
  title: string;
  big: string;
  sub: string;
  countTo?: number;
  countSuffix?: string;
}> = ({ bg, accent, num, title, big, sub, countTo, countSuffix }) => {
  const frame = useCurrentFrame();
  const counted =
    countTo !== undefined
      ? Math.round(
          interpolate(frame, [24, 60], [0, countTo], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        )
      : null;
  return (
    <SceneFrame bg={bg} accent={accent}>
      <Pill color={accent} delay={4}>
        Mistake {num}
      </Pill>
      <Reveal delay={14}>
        <div style={{ color: "#fff", fontWeight: 800, fontSize: 86, lineHeight: 1.05, marginTop: 44 }}>
          {title}
        </div>
      </Reveal>
      <Reveal delay={26}>
        <div style={{ color: accent, fontWeight: 800, fontSize: 130, marginTop: 40 }}>
          {counted !== null ? `${counted}${countSuffix ?? ""}` : big}
        </div>
      </Reveal>
      <Reveal delay={40}>
        <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 50, marginTop: 30, lineHeight: 1.35 }}>
          {sub}
        </div>
      </Reveal>
    </SceneFrame>
  );
};

const Recap = () => {
  const items = [
    "Don't rush at 62",
    "Plan the survivor benefit",
    "Check your ex's record",
    "Know the spousal cap",
    "Medicare at 65",
  ];
  return (
    <SceneFrame bg="#0F2747" accent="#E0A528">
      <Pill color="#E0A528" delay={4}>
        Recap
      </Pill>
      <div style={{ marginTop: 50 }}>
        {items.map((t, i) => (
          <Reveal key={t} delay={16 + i * 10}>
            <div
              style={{
                color: "#fff",
                fontSize: 58,
                fontWeight: 700,
                marginBottom: 30,
                display: "flex",
                alignItems: "center",
              }}
            >
              <span style={{ color: "#E0A528", marginRight: 22 }}>✓</span>
              {t}
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={80}>
        <div style={{ color: "#E0A528", fontSize: 56, fontWeight: 800, marginTop: 30 }}>
          Follow for more money tips →
        </div>
      </Reveal>
    </SceneFrame>
  );
};

// ---------------------------------------------------------------------------
// Root sequence
// ---------------------------------------------------------------------------
export const SsaMotion: React.FC = () => {
  const scenes = [
    <Hook key="hook" />,
    <Why key="why" />,
    <Mistake
      key="m1"
      bg="#6B2D5C"
      accent="#F8B400"
      num={1}
      title="Claiming too early at 62"
      big=""
      sub="Full retirement age is 67. Claiming at 62 cuts your check — for life. Wait to 70 for +24%."
      countTo={30}
      countSuffix="% smaller"
    />,
    <Mistake
      key="m2"
      bg="#1B4965"
      accent="#62B6CB"
      num={2}
      title="The survivor benefit"
      big="Keep the BIGGER check"
      sub="When a spouse dies, you keep the higher of the two — not both. His delay credits carry to you."
    />,
    <Mistake
      key="m3"
      bg="#3D348B"
      accent="#F7B801"
      num={3}
      title="The divorced-spouse rule"
      big="Married 10+ yrs?"
      sub="You can claim on your ex's record. It doesn't reduce his benefit — and he's never told."
    />,
    <Mistake
      key="m4"
      bg="#5F0F40"
      accent="#FB8B24"
      num={4}
      title="The spousal benefit"
      big="50% of his FRA"
      sub="It's 50% of his full-retirement-age amount — not his age-70 amount. You get the higher, never both."
    />,
    <Mistake
      key="m5"
      bg="#0B6E4F"
      accent="#F9C80E"
      num={5}
      title="Missing Medicare at 65"
      big="Sign up at 65"
      sub="Delaying Social Security does NOT delay Medicare. Miss the window and pay a lifetime penalty."
    />,
    <Recap key="recap" />,
  ];

  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {scenes.map((scene, i) => (
        <Sequence key={i} from={i * SCENE_FRAMES} durationInFrames={SCENE_FRAMES}>
          <Audio src={staticFile(`vo-el/scene-${i + 1}.mp3`)} />
          {scene}
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
