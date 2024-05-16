"use client";

import state from "@/store";
import { SketchPicker } from "react-color";
import { useSnapshot } from "valtio";

const ColorPicker = ({ onChange }: { onChange: (color: string) => void }) => {
  const snap = useSnapshot(state);

  return (
    <div className="absolute left-full ml-3">
      <SketchPicker
        color={snap.color}
        disableAlpha
        onChange={(color) => onChange(color.hex)}
      />
    </div>
  );
};

export default ColorPicker;
