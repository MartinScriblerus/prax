import React from "react";
// import ReactDOM from "react-dom";
import {
  ThemeProvider,
  Box,
  Heading,
  InputField,
  Flex,
  // Image,
  Set,
  styled
} from "fannypack";

import MinipopsKick from "./audioAssets/MinipopsTomHigh.wav";
import MinipopsKick1 from "./audioAssets/MinipopsTomLow.wav";
// import Clouds from "./simpsons-clouds-background.jpg";
import { useMetronome } from "react-metronome-hook";

const StyledInputField = styled(InputField)`
  & input {
    border: 0.5px solid black;
    border-radius: 4px;
    opacity: 0.9;
    text-align: center;
  }
`;

const StyledMetronomeButton = styled(Flex)`
  &:hover {
    cursor: pointer;
  }
`;

export default function MetronomeApp(){
  return (
    <ThemeProvider>
      <Metronome />
    </ThemeProvider>
  );
};

const Metronome = () => {
  const styles = {
    flex: {
      borderStyle: "solid",
      borderRadius: 2,
      // borderColor: "#030303",
     position: "relative", 
     right: 0,
     bottom: 0
    }
  }
  const {
    startMetronome,
    stopMetronome,
    isTicking,
    setBpm,
    setBeatsPerMeasure,
    bpm,
    beatsPerMeasure
  } = useMetronome(120, 4, [MinipopsKick, MinipopsKick1]);

  return (

    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="5vh"
    >
<div style={styles.flex}>
      <Heading
        fontFamily="Helvetica"
        color="#f6deba"
        textShadow="-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"
        // marginBottom="major-1"
        textAlign="center"
      >
        Metronome
      </Heading>

      <StyledMetronomeButton
        height="80px"
        width="100%"
        backgroundColor="#030303"
        color="#f6deba"
        marginTop="major-1"
        border="1px solid black"
        alignItems="center"
        justifyContent="center"
        position= "relative"
        // right={5}
        flexDirection="column"
        onClick={isTicking ? stopMetronome : startMetronome}
      >
        <Box textAlign="center">
          <Box color="blue" fontSize="20px">
            {isTicking ? "STOP" : "START"}
          </Box>
          <Box fontSize="12px" color="#f6f6f6">
            {bpm} BPM
          </Box>
          <Box fontSize="12px" color="textTint">
            {beatsPerMeasure} BEATS PER MEASURE
          </Box>
        </Box>
      </StyledMetronomeButton>

      <Set marginTop="major-1">
        <StyledInputField
          type="number"
          width="45%"
          placeholder="Set beats per minute"
          onChange={e => setBpm(e.target.value)}
        />
        <StyledInputField
          type="number"
          width="45%"
          placeholder="Set beats per measure"
          onChange={e => setBeatsPerMeasure(e.target.value)}
        />
     
      </Set>
     
      </div>
    </Flex>
    
  );
};