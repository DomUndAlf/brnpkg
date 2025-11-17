"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { createRangeHandler } from "../utils/slider";

function Lipinski() {
  const [lipinski, setLipinski] = React.useState([1, 4]);

  const handleLipinski = createRangeHandler(lipinski, setLipinski, {
  minDistance: 1,
  min: 0,
  max: 5
});
  
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
    <Box sx={{ width: 350 }}>
      <h3>Lipinski Violations</h3>
      <Slider value={lipinski} 
              onChange={handleLipinski}
              disableSwap
              marks = {marks}
              valueLabelDisplay="auto"
              min={MIN}
              max={MAX}
              />
    </Box>
  );
}

export default Lipinski;

