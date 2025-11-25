"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { createRangeHandler } from "../utils/slider";

function HBondA() {
  const [hBondA, setHBondA] = React.useState([0, 30]);

  const handleHBondA = createRangeHandler(hBondA, setHBondA, {
  minDistance: 1,
  min: 0,
  max: 30
});
  
  const MAX = 30;
  const MIN =0;

  const marks = [
  { value: 0, label: '0' },
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 15, label: '15' },
  { value: 20, label: '20' },
  { value: 25, label: '25' },
  { value: 30, label: '30' },
];

  return (
    <Box sx={{ width: 350 }}>
      <h3>H-Bond Acceptors</h3>
      <Slider value={hBondA} 
              onChange={handleHBondA}
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

export default HBondA;

