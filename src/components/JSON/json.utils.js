export function getAmplifierInformationJsonObjArr() {
  return [
    {
      id: "cIBSWVersion",
      label: "CIB SW Version :",
      fieldName: "cIBSWVersion",
      validationRegex: "^(V\\d+)R",
      value: "",
      showField: true
    },
    {
      id: "cIBSWRevision",
      label: "CIB SW Revision :",
      fieldName: "cIBSWRevision",
      validationRegex: "^V\\d+(R\\d+)\\s+",
      value: "",
      showField: true
    },
    {
      id: "cIBSWDate",
      label: "CIB SW Date :",
      fieldName: "cIBSWDate",
      validationRegex:
        "^V\\d+R\\d+\\s+([\\s\\S]+?\\d{4})\\s+\\d+\\:\\d+\\:\\d+",
      value: "",
      showField: true
    },
    {
      id: "cIBSWTime",
      label: "CIB SW Time :",
      fieldName: "cIBSWTime",
      validationRegex:
        "^V\\d+R\\d+\\s+[\\s\\S]+?\\d{4}\\s+(\\d{1,2}\\:\\d{1,2}\\:\\d{1,2})",
      value: "",
      showField: true
    },
    {
      id: "amplifierType",
      label: "Amplifier Type :",
      fieldName: "amplifierType",
      validationRegex:
        "^V\\d+R\\d+\\s+[\\s\\S]+?\\d{4}\\s+\\d{1,2}\\:\\d{1,2}\\:\\d{1,2}\\>([^>]+)\\>",
      value: "",
      showField: true
    },
    {
      id: "amplifierSerial",
      label: "Amplifier Serial :",
      fieldName: "amplifierSerial",
      validationRegex:
        "^V\\d+R\\d+\\s+[\\s\\S]+?\\d{4}\\s+\\d{1,2}\\:\\d{1,2}\\:\\d{1,2}\\>[^>]+\\>([^>]+)\\>",
      value: "",
      showField: true
    },
    {
      id: "amplifierStatus",
      label: "Amplifier Status :",
      fieldName: "amplifierStatus",
      value: "",
      validationRegex:
        "^V\\d+R\\d+\\s+[\\s\\S]+?\\d{4}\\s+\\d{1,2}\\:\\d{1,2}\\:\\d{1,2}\\>[^>]+\\>[^>]+\\>([^>]+)\\>",
      showField: true
    },
    {
      id: "amplifierDate",
      label: "Amplifier Date :",
      fieldName: "amplifierDate",
      validationRegex:
        "^V\\d+R\\d+\\s+[\\s\\S]+?\\d{4}\\s+\\d{1,2}\\:\\d{1,2}\\:\\d{1,2}\\>[^>]+\\>[^>]+\\>[^>]+\\>([^>]+)\\>",
      value: "",
      showField: true
    },
    {
      id: "amplifierTime",
      label: "Amplifier Time :",
      fieldName: "amplifierTime",
      validationRegex:
        "^V\\d+R\\d+\\s+[\\s\\S]+?\\d{4}\\s+\\d{1,2}\\:\\d{1,2}\\:\\d{1,2}\\>[^>]+\\>[^>]+\\>[^>]+\\>[^>]+\\>([^>]+)\\>",
      value: "",
      showField: true
    },
    {
      id: "pSUVersion",
      label: "PSU Version :",
      fieldName: "pSUVersion",
      validationRegex:
        "^V\\d+R\\d+\\s+[\\s\\S]+?\\d{4}\\s+\\d{1,2}\\:\\d{1,2}\\:\\d{1,2}\\>[^>]+\\>[^>]+\\>[^>]+\\>[^>]+\\>[^>]+\\>(V\\d+)R",
      value: "",
      showField: true
    },
    {
      id: "pSURevision",
      label: "PSU Revision :",
      fieldName: "pSURevision",
      validationRegex:
        "^V\\d+R\\d+\\s+[\\s\\S]+?\\d{4}\\s+\\d{1,2}\\:\\d{1,2}\\:\\d{1,2}\\>[^>]+\\>[^>]+\\>[^>]+\\>[^>]+\\>[^>]+\\>V\\d+(R\\d+)\\>",
      value: "",
      showField: true
    },
    {
      id: "fPGAVersion",
      label: "FPGA Version :",
      fieldName: "fPGAVersion",
      validationRegex:
        "^V\\d+R\\d+\\s+[\\s\\S]+?\\d{4}\\s+\\d{1,2}\\:\\d{1,2}\\:\\d{1,2}\\>[^>]+\\>[^>]+\\>[^>]+\\>[^>]+\\>[^>]+\\>V\\d+R\\d+\\>(V\\d+)R",
      value: "",
      showField: true
    },
    {
      id: "fPGARevision",
      label: "FPGA Revision :",
      fieldName: "fPGARevision",
      validationRegex:
        "^V\\d+R\\d+\\s+[\\s\\S]+?\\d{4}\\s+\\d{1,2}\\:\\d{1,2}\\:\\d{1,2}\\>[^>]+\\>[^>]+\\>[^>]+\\>[^>]+\\>[^>]+\\>V\\d+R\\d+\\>V\\d+(R\\d+)\\>",
      value: "",
      showField: true
    }
  ];
}

export function getVoltageMonitoringJsonObjArr() {
  return [
    {
      id: "amplifierSerial",
      label: "Amplifier Serial :",
      fieldName: "amplifierSerial",
      validationRegex: "^([A-Z0-9]{8})",
      value: "",
      showField: false
    },
    {
      id: "VDD",
      label: "VDD :",
      fieldName: "VDD",
      validationRegex: "VDD\\s+(\\d+?\\.\\d+?)48V\\s+",
      showField: true
    },
    {
      id: "48V",
      label: "48V :",
      fieldName: "48V",
      validationRegex: "48V\\s+(\\d+\\.\\d+)15V\\s+",
      showField: true
    },
    {
      id: "15V",
      label: "15V :",
      fieldName: "15V",
      validationRegex: "15V\\s+(\\d+\\.\\d+)-15V\\s+",
      showField: true
    },
    {
      id: "-15V",
      label: "-15V :",
      fieldName: "-15V",
      validationRegex: "\\-15V\\s+(\\d+\\.\\d+)5V\\s+",
      showField: true
    },
    {
      id: "5V",
      label: "5V :",
      fieldName: "5V",
      validationRegex: "5V\\s+(\\d+\\.\\d+)-5V\\s+",
      showField: true
    },
    {
      id: "-5V",
      label: "-5V :",
      fieldName: "-5V",
      validationRegex: "-5V\\s+(\\d+\\.\\d+)3\\.3V\\s+",
      showField: true
    },
    {
      id: "3.3V",
      label: "3.3V :",
      fieldName: "3.3V",
      validationRegex: "3\\.3V\\s+(\\d+\\.\\d+)1\\.8V\\s+",
      showField: true
    },
    {
      id: "1.8V",
      label: "1.8V :",
      fieldName: "1.8V",
      validationRegex: "1\\.8V\\s+(\\d+\\.\\d+)1\\.0V\\s+",
      showField: true
    },
    {
      id: "1.0V",
      label: "1.0V :",
      fieldName: "1.0V",
      validationRegex: "1\\.8V\\s+\\d+\\.\\d+1\\.0V\\s+(\\d+?\\.\\d+)",
      showField: true
    }
  ];
}

export function getCurrentMonitoringJsonObjArr() {
  return [
    {
      id: "amplifierSerial",
      label: "Amplifier Serial :",
      fieldName: "amplifierSerial",
      validationRegex: "^([A-Z0-9]{8})",
      value: "",
      showField: false
    },
    {
      id: "finalDrain",
      label: "Final Drain :",
      fieldName: "finalDrain",
      validationRegex: "FIN\\s+(\\d+?\\.\\d+)DRV\\s+",
      showField: true
    },
    {
      id: "driverDrainCurrent",
      label: "Driver Drain :",
      fieldName: "driverDrainCurrent",
      validationRegex: "FIN\\s+\\d+?\\.\\d+DRV\\s+(\\d+?\\.\\d+)PRE",
      showField: true
    },
    {
      id: "48VPreAmpDrain",
      label: "48V PreAmp Drain :",
      fieldName: "48VPreAmpDrain",
      validationRegex:
        "FIN\\s+\\d+?\\.\\d+DRV\\s+\\d+?\\.\\d+PRE\\s+(\\d+?\\.\\d+)",
      showField: true
    }
  ];
}

export function getPowerMonitoringJsonObjArr() {
  return [
    {
      id: "amplifierSerial",
      label: "Amplifier Serial :",
      fieldName: "amplifierSerial",
      validationRegex: "^([A-Z0-9]{8})",
      value: "",
      showField: false
    },
    {
      id: "peakForward",
      label: "Peak Forward(W):",
      fieldName: "peakForward",
      validationRegex: "^[A-Z0-9]{8}\\>FWD\\s+PWR\\s+(\\d+?\\.\\d+)RFL",
      showField: true
    },
    {
      id: "peakReflected",
      label: "Peak Reflected(W) :",
      fieldName: "peakReflected",
      validationRegex:
        "^[A-Z0-9]{8}\\>FWD\\s+PWR\\s+\\d+?\\.\\d+RFL\\s+PWR\\s+(\\d+?.\\d+)IN",
      showField: true
    },
    {
      id: "peakRFInput",
      label: "Peak RF Input(µW) :",
      fieldName: "peakRFInput",
      validationRegex:
        "^[A-Z0-9]{8}\\>FWD\\s+PWR\\s+\\d+?\\.\\d+RFL\\s+PWR\\s+\\d+?\\.\\d+IN\\s+PWR\\s+(\\d+?\\.\\d+)\\>",
      showField: true
    },
    {
      id: "averageForward",
      label: "Average Forward(W) :",
      fieldName: "averageForward",
      validationRegex:
        "^[A-Z0-9]{8}\\>FWD\\s+PWR\\s+\\d+?\\.\\d+RFL\\s+PWR\\s+\\d+?\\.\\d+IN\\s+PWR\\s+\\d+?\\.\\d+\\>FWD\\s+PWR\\s+(\\d+?\\.\\d+)RFL",
      showField: true
    },
    {
      id: "averageReflected",
      label: "Average Reflected(W) :",
      fieldName: "averageReflected",
      validationRegex:
        "^[A-Z0-9]{8}\\>FWD\\s+PWR\\s+\\d+?\\.\\d+RFL\\s+PWR\\s+\\d+?\\.\\d+IN\\s+PWR\\s+\\d+?\\.\\d+\\>FWD\\s+PWR\\s+\\d+?\\.\\d+RFL\\s+PWR\\s+(\\d+?\\.\\d+)\\>FWD",
      showField: true
    },
    {
      id: "windowForward",
      label: "Window Forward(W) :",
      fieldName: "windowForward",
      validationRegex:
        "^[A-Z0-9]{8}\\>FWD\\s+PWR\\s+\\d+?\\.\\d+RFL\\s+PWR\\s+\\d+?\\.\\d+IN\\s+PWR\\s+\\d+?\\.\\d+\\>FWD\\s+PWR\\s+\\d+?\\.\\d+RFL\\s+PWR\\s+\\d+?\\.\\d+\\>FWD\\s+PWR\\s+(\\d+?\\.\\d+)RFL",
      showField: true
    },
    {
      id: "windowReflected",
      label: "Window Reflected(W) :",
      fieldName: "windowReflected",
      validationRegex:
        "^[A-Z0-9]{8}\\>FWD\\s+PWR\\s+\\d+?\\.\\d+RFL\\s+PWR\\s+\\d+?\\.\\d+IN\\s+PWR\\s+\\d+?\\.\\d+\\>FWD\\s+PWR\\s+\\d+?\\.\\d+RFL\\s+PWR\\s+\\d+?\\.\\d+\\>FWD\\s+PWR\\s+\\d+?\\.\\d+RFL\\s+PWR\\s+(\\d+?\\.\\d+)IN",
      showField: true
    },
    {
      id: "windowInput",
      label: "Window Input(µW) :",
      fieldName: "windowInput",
      validationRegex:
        "^[A-Z0-9]{8}\\>FWD\\s+PWR\\s+\\d+?\\.\\d+RFL\\s+PWR\\s+\\d+?\\.\\d+IN\\s+PWR\\s+\\d+?\\.\\d+\\>FWD\\s+PWR\\s+\\d+?\\.\\d+RFL\\s+PWR\\s+\\d+?\\.\\d+\\>FWD\\s+PWR\\s+\\d+?\\.\\d+RFL\\s+PWR\\s+\\d+?\\.\\d+IN\\s+PWR\\s+(\\d+?\\.\\d+)\\>",
      showField: true
    },
    {
      id: "lastPeakForward",
      label: "Last Peak Forward(W) :",
      fieldName: "lastPeakForward",
      validationRegex:
        "^[A-Z0-9]{8}\\>FWD\\s+PWR\\s+\\d+?\\.\\d+RFL\\s+PWR\\s+\\d+?\\.\\d+IN\\s+PWR\\s+\\d+?\\.\\d+\\>FWD\\s+PWR\\s+\\d+?\\.\\d+RFL\\s+PWR\\s+\\d+?\\.\\d+\\>FWD\\s+PWR\\s+\\d+?\\.\\d+RFL\\s+PWR\\s+\\d+?\\.\\d+IN\\s+PWR\\s+\\d+?\\.\\d+\\>FWD\\s+PWR\\s+(\\d+?\\.\\d+)RFL",
      showField: true
    },
    {
      id: "lastPeakReflected",
      label: "Last Peak Reflected(W) :",
      fieldName: "lastPeakReflected",
      validationRegex:
        "^[A-Z0-9]{8}\\>FWD\\s+PWR\\s+\\d+?\\.\\d+RFL\\s+PWR\\s+\\d+?\\.\\d+IN\\s+PWR\\s+\\d+?\\.\\d+\\>FWD\\s+PWR\\s+\\d+?\\.\\d+RFL\\s+PWR\\s+\\d+?\\.\\d+\\>FWD\\s+PWR\\s+\\d+?\\.\\d+RFL\\s+PWR\\s+\\d+?\\.\\d+IN\\s+PWR\\s+\\d+?\\.\\d+\\>FWD\\s+PWR\\s+\\d+?\\.\\d+RFL\\s+PWR\\s+(\\d+?\\.\\d+)IN",
      showField: true
    },
    {
      id: "lastPeakInput",
      label: "Last Peak Input(µW) :",
      fieldName: "lastPeakInput",
      validationRegex:
        "^[A-Z0-9]{8}\\>FWD\\s+PWR\\s+\\d+?\\.\\d+RFL\\s+PWR\\s+\\d+?\\.\\d+IN\\s+PWR\\s+\\d+?\\.\\d+\\>FWD\\s+PWR\\s+\\d+?\\.\\d+RFL\\s+PWR\\s+\\d+?\\.\\d+\\>FWD\\s+PWR\\s+\\d+?\\.\\d+RFL\\s+PWR\\s+\\d+?\\.\\d+IN\\s+PWR\\s+\\d+?\\.\\d+\\>FWD\\s+PWR\\s+\\d+?\\.\\d+RFL\\s+PWR\\s+\\d+?\\.\\d+IN\\s+PWR\\s+(\\d+?\\.\\d+)\\>",
      showField: true
    }
  ];
}

export function getJoulesCounterJsonObjArr() {
  return [
    {
      id: "amplifierSerial",
      label: "Amplifier Serial :",
      fieldName: "amplifierSerial",
      validationRegex: "^([A-Z0-9]{8})",
      value: "",
      showField: false
    },
    {
      id: "joules",
      label: "Joules :",
      fieldName: "joules",
      validationRegex: "^[A-Z0-9]{8}\\>([^>]+?)[A-Z0-9]{8}\\>",
      value: "",
      showField: true
    },
    {
      id: "microJoules",
      label: "Micro Joules :",
      fieldName: "microJoules",
      validationRegex: "^[A-Z0-9]{8}\\>[^>]+?([A-Z0-9]{8})\\>",
      value: "",
      showField: true
    }
  ];
}

export function getTimerLogJsonObjArr() {
  return [
    {
      id: "amplifierSerial",
      label: "Amplifier Serial :",
      fieldName: "amplifierSerial",
      validationRegex: "^([A-Z0-9]{8})",
      value: "",
      showField: false
    },
    {
      id: "tlPOWERED",
      label: "POWERED :",
      fieldName: "tlPOWERED",
      validationRegex: `([A-Z0-9]{8})\\s+POWERED`,
      value: "",
      showField: true
    },
    {
      id: "tlOFF",
      label: "OFF :",
      fieldName: "tlOFF",
      validationRegex: `POWERED([A-Z0-9]{8})\\s+OFF`,
      value: "",
      showField: true
    },
    {
      id: "tlFAULT",
      label: "FAULT :",
      fieldName: "tlFAULT",
      validationRegex: `OFF([A-Z0-9]{8})\\s+FAULT`,
      value: "",
      showField: true
    },
    {
      id: "tlSTANDBY",
      label: "STANDBY :",
      fieldName: "tlSTANDBY",
      validationRegex: `FAULT([A-Z0-9]{8})\\s+STANDBY`,
      value: "",
      showField: true
    },
    {
      id: "tlOPERATE",
      label: "OPERATE :",
      fieldName: "tlOPERATE",
      validationRegex: `STANDBY([A-Z0-9]{8})\\s+OPERATE`,
      value: "",
      showField: true
    },
    {
      id: "tlGATED",
      label: "GATED :",
      fieldName: "tlGATED",
      validationRegex: `OPERATE([A-Z0-9]{8})\\s+GATED`,
      value: "",
      showField: true
    },
    {
      id: "tlINIT",
      label: "INIT :",
      fieldName: "tlINIT",
      validationRegex: `GATED([A-Z0-9]{8})\\s+INIT`,
      value: "",
      showField: true
    },
    {
      id: "tlUPDATE",
      label: "UPDATE :",
      fieldName: "tlUPDATE",
      validationRegex: `INIT([A-Z0-9]{8})\\s+UPDATE`,
      value: "",
      showField: true
    }
  ];
}

export function getCounterLogJsonObjArr() {
  return [
    {
      id: "amplifierSerial",
      label: "Amplifier Serial :",
      fieldName: "amplifierSerial",
      validationRegex: "^([A-Z0-9]{8})[A-Z0-9]{8}\\s+POWER",
      value: "",
      showField: false
    },
    {
      id: "clPOWER",
      label: "POWER :",
      fieldName: "clPOWER",
      validationRegex: `([A-Z0-9]{8})\\s+POWER`,
      value: "",
      showField: true
    },
    {
      id: "clOFFST",
      label: "OFF ST :",
      fieldName: "clOFFST",
      validationRegex: `POWER([A-Z0-9]{8})\\s+OFF\\s+ST`,
      value: "",
      showField: true
    },
    {
      id: "clSTOP",
      label: "ST OP :",
      fieldName: "clSTOP",
      validationRegex: `OFF\\s+ST([A-Z0-9]{8})\\s+ST+\\s+OP`,
      value: "",
      showField: true
    },
    {
      id: "clSTOFF",
      label: "ST OFF :",
      fieldName: "clSTOFF",
      validationRegex: `ST\\s+OP([A-Z0-9]{8})\\s+ST+\\s+OFF`,
      value: "",
      showField: true
    },
    {
      id: "clSTWAITFLT",
      label: "ST WAIT FLT :",
      fieldName: "clSTWAITFLT",
      validationRegex: `ST\\s+OFF([A-Z0-9]{8})\\s+ST+\\s+WAIT\\s+FLT`,
      value: "",
      showField: true
    },
    {
      id: "clOPOFF",
      label: "OP OFF :",
      fieldName: "clOPOFF",
      validationRegex: `ST\\s+WAIT\\s+FLT([A-Z0-9]{8})\\sOP\\s+OFF`,
      value: "",
      showField: true
    },
    {
      id: "clOPST",
      label: "OP ST :",
      fieldName: "clOPST",
      validationRegex: `OP\\s+OFF([A-Z0-9]{8})\\s+OP\\s+ST`,
      value: "",
      showField: true
    },
    {
      id: "clOFFFLT",
      label: "OFF FLT :",
      fieldName: "clOFFFLT",
      validationRegex: `OP\\s+ST([A-Z0-9]{8})\\s+OFF\\s+FLT`,
      value: "",
      showField: true
    },
    {
      id: "clSTFLT",
      label: "ST FLT :",
      fieldName: "clSTFLT",
      validationRegex: `OFF\\s+FLT([A-Z0-9]{8})\\s+ST\\s+FLT`,
      value: "",
      showField: true
    },
    {
      id: "clOPFLT",
      label: "OP FLT :",
      fieldName: "clOPFLT",
      validationRegex: `ST\\s+FLT([A-Z0-9]{8})\\s+OP\\s+FLT`,
      value: "",
      showField: true
    },
    {
      id: "clFLTOFF",
      label: "FLT OFF :",
      fieldName: "clFLTOFF",
      validationRegex: `OP\\s+FLT([A-Z0-9]{8})\\s+FLT\\s+OFF`,
      value: "",
      showField: true
    },
    {
      id: "clREQOFFOP",
      label: "REQ OFF OP :",
      fieldName: "clREQOFFOP",
      validationRegex: `FLT\\s+OFF([A-Z0-9]{8})\\s+REQ\\s+OFF\\s+OP`,
      value: "",
      showField: true
    },
    {
      id: "clFLTOVLD",
      label: "FLT OVLD :",
      fieldName: "clFLTOVLD",
      validationRegex: `REQ\\s+OFF\\s+OP([A-Z0-9]{8})\\s+FLT\\s+OVLD`,
      value: "",
      showField: true
    },
    {
      id: "clUCUPDATE",
      label: "UC UPDATE :",
      fieldName: "clUCUPDATE",
      validationRegex: `FLT\\s+OVLD([A-Z0-9]{8})\\s+UC\\s+UPDATE`,
      value: "",
      showField: true
    },
    {
      id: "clFPGAUPDATE",
      label: "FPGA UPDATE :",
      fieldName: "clFPGAUPDATE",
      validationRegex: `UC\\s+UPDATE([A-Z0-9]{8})\\s+FPGA\\s+UPDATE`,
      value: "",
      showField: true
    }
  ];
}

export function getJtrJsonObjArr() {
  return [
    {
      id: "amplifierSerial",
      label: "Amplifier Serial :",
      fieldName: "amplifierSerial",
      validationRegex: "^([A-Z0-9]{8})",
      value: "",
      showField: false
    },
    {
      id: "Z < 5.0",
      label: "Z < 5.0 :",
      fieldName: "Z < 5.0",
      validationRegex: `^[A-Z0-9]{8}([A-Z0-9]{9})`, //1
      value: "",
      showField: true
    },
    {
      id: "5.0 <= Z < 15.0",
      label: "5.0 <= Z < 15.0 :",
      fieldName: "5.0 <=Z< 15.0",
      validationRegex: `^[A-Z0-9]{8}[A-Z0-9]{9}([A-Z0-9]{9})`, //2
      value: "",
      showField: true
    },
    {
      id: "15.0 <= Z < 25.0",
      label: "15.0 <= Z < 25.0 :",
      fieldName: "15.0 <=Z< 25.0",
      validationRegex: `^[A-Z0-9]{8}[A-Z0-9]{9}[A-Z0-9]{9}([A-Z0-9]{9})`, //3
      value: "",
      showField: true
    },
    {
      id: "25.0 <= Z < 35.0",
      label: "25.0 <= Z < 35.0 :",
      fieldName: "25.0 <=Z< 35.0",
      validationRegex: `^[A-Z0-9]{8}[A-Z0-9]{9}[A-Z0-9]{9}[A-Z0-9]{9}([A-Z0-9]{9})`, //4
      value: "",
      showField: true
    },
    {
      id: "35.0 <= Z < 45.0",
      label: "35.0 <= Z < 45.0 :",
      fieldName: "35.0 <=Z< 45.0",
      validationRegex: `^[A-Z0-9]{8}[A-Z0-9]{9}[A-Z0-9]{9}[A-Z0-9]{9}[A-Z0-9]{9}([A-Z0-9]{9})`, //5
      value: "",
      showField: true
    },
    {
      id: "45.0 <= Z < 55.0",
      label: "45.0 <= Z < 55.0 :",
      fieldName: "45.0 <=Z< 55.0",
      validationRegex: `^[A-Z0-9]{8}[A-Z0-9]{9}[A-Z0-9]{9}[A-Z0-9]{9}[A-Z0-9]{9}[A-Z0-9]{9}([A-Z0-9]{9})`, //6
      value: "",
      showField: true
    },
    {
      id: "55.0 <= Z < 65.0",
      label: "55.0 <= Z < 65.0 :",
      fieldName: "55.0 <=Z< 65.0",
      validationRegex: `^[A-Z0-9]{8}[A-Z0-9]{9}[A-Z0-9]{9}[A-Z0-9]{9}[A-Z0-9]{9}[A-Z0-9]{9}[A-Z0-9]{9}([A-Z0-9]{9})`, //7
      value: "",
      showField: true
    },
    {
      id: "65.0 <= Z < 75.0",
      label: "65.0 <= Z < 75.0 :",
      fieldName: "65.0 <=Z< 75.0",
      validationRegex: `^[A-Z0-9]{8}[A-Z0-9]{9}[A-Z0-9]{9}[A-Z0-9]{9}[A-Z0-9]{9}[A-Z0-9]{9}[A-Z0-9]{9}[A-Z0-9]{9}([A-Z0-9]{9})`, //8
      value: "",
      showField: true
    },
    {
      id: "75.0 <= Z < 85.0",
      label: "75.0 <= Z < 85.0 :",
      fieldName: "75.0 <=Z< 85.0",
      validationRegex: `^[A-Z0-9]{8}[A-Z0-9]{9}[A-Z0-9]{9}[A-Z0-9]{9}[A-Z0-9]{9}[A-Z0-9]{9}[A-Z0-9]{9}[A-Z0-9]{9}[A-Z0-9]{9}([A-Z0-9]{9})`, //9
      value: "",
      showField: true
    },
    {
      id: "85.0 <= Z < 95.0",
      label: "85.0 <= Z < 95.0 :",
      fieldName: "85.0 <=Z< 95.0",
      validationRegex: `^[A-Z0-9]{8}[A-Z0-9]{9}[A-Z0-9]{9}[A-Z0-9]{9}[A-Z0-9]{9}[A-Z0-9]{9}[A-Z0-9]{9}[A-Z0-9]{9}[A-Z0-9]{9}[A-Z0-9]{9}([A-Z0-9]{9})`, //10
      value: "",
      showField: true
    },
    {
      id: "95.0 <= Z < 105.0",
      label: "95.0 <= Z < 105.0 :",
      fieldName: "95.0 <=Z< 105.0",
      validationRegex: `^[A-Z0-9]{8}[A-Z0-9]{9}[A-Z0-9]{9}[A-Z0-9]{9}[A-Z0-9]{9}[A-Z0-9]{9}[A-Z0-9]{9}[A-Z0-9]{9}[A-Z0-9]{9}[A-Z0-9]{9}[A-Z0-9]{9}([A-Z0-9]{9})`, //11
      value: "",
      showField: true
    },
    {
      id: "105.0 <= Z",
      label: "105.0 <= Z :",
      fieldName: "105.0 <= Z",
      validationRegex: `^[A-Z0-9]{8}[A-Z0-9]{9}[A-Z0-9]{9}[A-Z0-9]{9}[A-Z0-9]{9}[A-Z0-9]{9}[A-Z0-9]{9}[A-Z0-9]{9}[A-Z0-9]{9}[A-Z0-9]{9}[A-Z0-9]{9}[A-Z0-9]{9}([A-Z0-9]{9})`, //12
      value: "",
      showField: true
    }
  ];
}
