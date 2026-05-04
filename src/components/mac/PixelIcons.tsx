/**
 * 32x32 pixel icons rendered as inline SVG with shape-rendering: crispEdges.
 * Drawn from individual <rect> elements to mimic 90s b&w icons.
 * Each icon is a black/white only pixel grid — no anti-aliasing.
 */
import type { CSSProperties } from "react";

interface IconProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

const wrap = (children: React.ReactNode, size = 32) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 32 32"
    shapeRendering="crispEdges"
    style={{ imageRendering: "pixelated" }}
  >
    {children}
  </svg>
);

/* HARD DRIVE — beige rectangle with screen */
export const HardDriveIcon = ({ size = 32 }: IconProps) =>
  wrap(
    <>
      {/* outline */}
      <rect x="3" y="9" width="26" height="16" fill="white" stroke="black" />
      <rect x="3" y="9" width="26" height="2" fill="black" />
      {/* shadow */}
      <rect x="29" y="11" width="1" height="14" fill="black" />
      <rect x="4" y="25" width="26" height="1" fill="black" />
      {/* drive label/screen */}
      <rect x="6" y="14" width="14" height="6" fill="black" />
      <rect x="7" y="15" width="12" height="4" fill="white" />
      <rect x="8" y="16" width="2" height="1" fill="black" />
      <rect x="11" y="16" width="6" height="1" fill="black" />
      <rect x="8" y="18" width="8" height="1" fill="black" />
      {/* indicator light */}
      <rect x="24" y="15" width="2" height="2" fill="black" />
      {/* slot */}
      <rect x="6" y="22" width="20" height="1" fill="black" />
    </>,
    size
  );

/* FOLDER — manila folder */
export const FolderIcon = ({ size = 32 }: IconProps) =>
  wrap(
    <>
      <rect x="3" y="9" width="11" height="3" fill="white" stroke="black" />
      <rect x="14" y="11" width="2" height="2" fill="white" />
      <rect x="3" y="11" width="26" height="16" fill="white" stroke="black" />
      <rect x="3" y="11" width="26" height="1" fill="black" />
      <rect x="3" y="26" width="26" height="1" fill="black" />
      <rect x="3" y="11" width="1" height="16" fill="black" />
      <rect x="28" y="11" width="1" height="16" fill="black" />
      {/* folder tab */}
      <rect x="3" y="9" width="12" height="1" fill="black" />
      <rect x="3" y="9" width="1" height="3" fill="black" />
      <rect x="14" y="9" width="1" height="3" fill="black" />
    </>,
    size
  );

/* DOCUMENT — page with corner fold */
export const DocIcon = ({ size = 32 }: IconProps) =>
  wrap(
    <>
      <rect x="7" y="5" width="14" height="22" fill="white" stroke="black" />
      {/* corner fold */}
      <rect x="17" y="5" width="4" height="4" fill="white" />
      <rect x="17" y="5" width="1" height="4" fill="black" />
      <rect x="17" y="8" width="4" height="1" fill="black" />
      <rect x="20" y="5" width="1" height="4" fill="black" />
      {/* extends to right */}
      <rect x="21" y="9" width="4" height="18" fill="white" stroke="black" />
      <rect x="17" y="5" width="8" height="1" fill="black" />
      <rect x="24" y="5" width="1" height="22" fill="black" />
      <rect x="7" y="26" width="18" height="1" fill="black" />
      {/* lines */}
      <rect x="9" y="12" width="13" height="1" fill="black" />
      <rect x="9" y="15" width="13" height="1" fill="black" />
      <rect x="9" y="18" width="13" height="1" fill="black" />
      <rect x="9" y="21" width="9" height="1" fill="black" />
    </>,
    size
  );

/* TRASH CAN */
export const TrashIcon = ({ size = 32, full = false }: IconProps & { full?: boolean }) =>
  wrap(
    <>
      {/* lid */}
      <rect x="6" y="7" width="20" height="2" fill="white" stroke="black" />
      <rect x="13" y="5" width="6" height="2" fill="white" stroke="black" />
      {/* body */}
      <rect x="7" y="9" width="18" height="19" fill="white" stroke="black" />
      {/* ridges */}
      <rect x="11" y="12" width="1" height="14" fill="black" />
      <rect x="15" y="12" width="1" height="14" fill="black" />
      <rect x="19" y="12" width="1" height="14" fill="black" />
      <rect x="23" y="12" width="1" height="14" fill="black" />
      {full && (
        <>
          <rect x="9" y="6" width="2" height="1" fill="black" />
          <rect x="22" y="6" width="2" height="1" fill="black" />
          <rect x="14" y="3" width="1" height="2" fill="black" />
          <rect x="18" y="3" width="1" height="2" fill="black" />
        </>
      )}
    </>,
    size
  );

/* APPLICATION DIAMOND (generic app) */
export const AppIcon = ({ size = 32 }: IconProps) =>
  wrap(
    <>
      <rect x="15" y="3" width="2" height="2" fill="black" />
      <rect x="13" y="5" width="6" height="2" fill="black" />
      <rect x="11" y="7" width="10" height="2" fill="black" />
      <rect x="9" y="9" width="14" height="2" fill="black" />
      <rect x="7" y="11" width="18" height="2" fill="black" />
      <rect x="5" y="13" width="22" height="2" fill="black" />
      <rect x="7" y="15" width="18" height="2" fill="black" />
      <rect x="9" y="17" width="14" height="2" fill="black" />
      <rect x="11" y="19" width="10" height="2" fill="black" />
      <rect x="13" y="21" width="6" height="2" fill="black" />
      <rect x="15" y="23" width="2" height="2" fill="black" />
      {/* white inset */}
      <rect x="14" y="11" width="4" height="3" fill="white" />
      <rect x="11" y="13" width="10" height="2" fill="white" />
      <rect x="14" y="15" width="4" height="2" fill="white" />
    </>,
    size
  );

/* CALCULATOR */
export const CalcIcon = ({ size = 32 }: IconProps) =>
  wrap(
    <>
      <rect x="6" y="4" width="20" height="24" fill="white" stroke="black" />
      <rect x="8" y="6" width="16" height="5" fill="black" />
      <rect x="9" y="7" width="14" height="3" fill="white" />
      <rect x="19" y="8" width="3" height="1" fill="black" />
      {/* buttons */}
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2, 3].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={8 + col * 4}
            y={13 + row * 4}
            width="3"
            height="3"
            fill="black"
          />
        ))
      )}
    </>,
    size
  );

/* NOTEPAD */
export const NoteIcon = ({ size = 32 }: IconProps) =>
  wrap(
    <>
      <rect x="6" y="4" width="20" height="24" fill="white" stroke="black" />
      <rect x="6" y="4" width="20" height="3" fill="black" />
      {/* spiral */}
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={8 + i * 4} y="3" width="2" height="5" fill="black" />
      ))}
      {/* lines */}
      <rect x="9" y="11" width="14" height="1" fill="black" />
      <rect x="9" y="14" width="14" height="1" fill="black" />
      <rect x="9" y="17" width="14" height="1" fill="black" />
      <rect x="9" y="20" width="14" height="1" fill="black" />
      <rect x="9" y="23" width="9" height="1" fill="black" />
    </>,
    size
  );

/* PUZZLE (8-tile) */
export const PuzzleIcon = ({ size = 32 }: IconProps) =>
  wrap(
    <>
      <rect x="5" y="5" width="22" height="22" fill="white" stroke="black" />
      {[0, 1, 2].map((r) =>
        [0, 1, 2].map((c) => (
          <rect
            key={`${r}-${c}`}
            x={6 + c * 7}
            y={6 + r * 7}
            width="6"
            height="6"
            fill={r === 2 && c === 2 ? "black" : "white"}
            stroke="black"
          />
        ))
      )}
    </>,
    size
  );

/* MAIL / CONTACT */
export const MailIcon = ({ size = 32 }: IconProps) =>
  wrap(
    <>
      <rect x="4" y="9" width="24" height="16" fill="white" stroke="black" />
      <rect x="4" y="9" width="24" height="1" fill="black" />
      {/* fold */}
      <rect x="4" y="9" width="13" height="9" fill="white" stroke="black" />
      <rect x="15" y="9" width="13" height="9" fill="white" stroke="black" />
      <rect x="4" y="9" width="2" height="2" fill="black" />
      <rect x="6" y="11" width="2" height="2" fill="black" />
      <rect x="8" y="13" width="2" height="2" fill="black" />
      <rect x="10" y="15" width="2" height="2" fill="black" />
      <rect x="12" y="17" width="8" height="1" fill="black" />
      <rect x="20" y="15" width="2" height="2" fill="black" />
      <rect x="22" y="13" width="2" height="2" fill="black" />
      <rect x="24" y="11" width="2" height="2" fill="black" />
      <rect x="26" y="9" width="2" height="2" fill="black" />
    </>,
    size
  );

/* FINDER FACE (apple menu Mac) */
export const HappyMacIcon = ({ size = 16 }: IconProps) =>
  wrap(
    <>
      <rect x="3" y="3" width="26" height="26" fill="white" stroke="black" />
      {/* eyes */}
      <rect x="10" y="11" width="3" height="3" fill="black" />
      <rect x="19" y="11" width="3" height="3" fill="black" />
      {/* smile */}
      <rect x="11" y="19" width="10" height="1" fill="black" />
      <rect x="10" y="18" width="1" height="1" fill="black" />
      <rect x="21" y="18" width="1" height="1" fill="black" />
    </>,
    size
  );

/* APPLE LOGO (rainbow stripes, but b&w System 7) */
export const AppleIcon = ({ size = 14 }: IconProps) =>
  wrap(
    <>
      <rect x="14" y="4" width="3" height="3" fill="black" />
      <rect x="11" y="6" width="2" height="2" fill="black" />
      <rect x="8" y="9" width="16" height="2" fill="black" />
      <rect x="6" y="11" width="20" height="2" fill="black" />
      <rect x="5" y="13" width="22" height="6" fill="black" />
      <rect x="6" y="19" width="20" height="2" fill="black" />
      <rect x="7" y="21" width="18" height="2" fill="black" />
      <rect x="9" y="23" width="6" height="2" fill="black" />
      <rect x="17" y="23" width="6" height="2" fill="black" />
      <rect x="11" y="25" width="3" height="2" fill="black" />
      <rect x="18" y="25" width="3" height="2" fill="black" />
      {/* bite */}
      <rect x="20" y="11" width="4" height="3" fill="white" />
    </>,
    size
  );
