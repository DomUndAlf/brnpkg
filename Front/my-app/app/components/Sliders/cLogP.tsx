"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { createRangeHandler } from "../utils/slider";

function CLogP() {
  const [CLogP, setCLogP] = React.useState([-8, 14]);

  const handleCLogP = createRangeHandler(CLogP, setCLogP, {
  minDistance: 1,
  min: -8,
  max: 14
});
  
  const MAX = 14;
  const MIN = -8;

  const marks = [
  { value: -8, label: '-8' },
  { value: -4, label: '-4' },
  { value: 0, label: '0' },
  { value: 4, label: '4' },
  { value: 8, label: '8' },
  { value: 12, label: '12' },
  { value: 14, label: '14' },
];

  return (
    <Box sx={{ width: 350 }}>
      <h3>cLogP</h3>
      <Slider value={CLogP} 
              onChange={handleCLogP}
              disableSwap
              marks = {marks}
              valueLabelDisplay="auto"
              min={MIN}
              max={MAX}
               color="success"
              />
    </Box>
  );
}

export default CLogP;

