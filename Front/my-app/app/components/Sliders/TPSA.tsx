"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { createRangeHandler } from "../utils/slider";

function TPSA() {
  const [TPSA, setTPSA] = React.useState([0, 500]);

  const handleTPSA = createRangeHandler(TPSA, setTPSA, {
  minDistance: 1,
  min: 0,
  max: 500
});
  
  const MAX = 500
  const MIN =0;

  const marks = [
  { value: 0, label: '0' },
  { value: 100, label: '100' },
  { value: 200, label: '200' },
  { value: 300, label: '300' },
  { value: 400, label: '400' },
  { value: 500, label: '500' },
];

  return (
    <Box sx={{ width: 350 }}>
      <h3>TPSA</h3>
      <Slider value={TPSA} 
              onChange={handleTPSA}
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

export default TPSA;

