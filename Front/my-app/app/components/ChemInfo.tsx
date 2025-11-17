"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { rangeValue} from "./utils/slider";

export default function ReusableRangeSlider() {
  const [value, setValue] = React.useState([1, 4]);

  const handleChange = (_: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) return;

    const updated = rangeValue(
      value,
      newValue,
      activeThumb,
      1,   // minDistance
      0,   // min
      5    // max
    );

    setValue(updated);
  };

  const MAX = 5;
  const MIN =0;

  const marks = [
  { value: 0, label: '0' },
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
];

  return (
    <Box sx={{ width: 300 }}>
      <h3>Lipinski Violations</h3>
      <Slider className="pt-10"
        min={MIN}
        max={MAX}
        step={1}
        value={value}
        onChange={handleChange}
        disableSwap
        marks = {marks}
        valueLabelDisplay="off"
      />
    </Box>
  );
}
