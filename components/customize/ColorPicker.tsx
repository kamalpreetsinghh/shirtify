"use client";

import state from "@/store";
import { useTheme } from "next-themes";
import { SketchPicker } from "react-color";
import { useSnapshot } from "valtio";

const ColorPicker = ({ onChange }: { onChange: (color: string) => void }) => {
  const { theme } = useTheme();
  const snap = useSnapshot(state);

  return (
    <div className="absolute left-full ml-3">
      <SketchPicker
        color={snap.color}
        disableAlpha
        onChange={(color) => onChange(color.hex)}
        styles={{
          default: {
            picker: {
              background: theme === "dark" ? "#141414" : "#ffffff",
            },
          },
        }}
      />
    </div>
  );
};

export default ColorPicker;
