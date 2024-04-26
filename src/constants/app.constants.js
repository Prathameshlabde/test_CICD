export const START_SCREEN = "AmplifierConnection";
export const START_SCREEN_MENU = "Amplifier Connection";
// export const APP_BASE_URL = "http://analogicstaging.keenesystems.com/api/";  //keene systems
// export const APP_BASE_URL = "http://192.168.2.96/analogics/api/";  //
export const API_HOST = "peabluet.analogic.com";
export const APP_BASE_URL = `https://${API_HOST}/api/`; //analogic
export const APP_BASE_URL_METHOD = "POST";
export const AMPLIFIER_INFORMATION_ID = "AMPLIFIER_INFORMATION_ID";
export const POWER_MONITORING_ID = "POWER_MONITORING_ID";
export const CURRENT_MONITORING_ID = "CURRENT_MONITORING_ID";
export const VOLTAGE_MONITORING_ID = "VOLTAGE_MONITORING_ID";
export const FAULT_LOG_ID = "FAULT_LOG_ID";
export const ERROR_LOG_ID = "ERROR_LOG_ID";
export const COUNTER_LOG_ID = "COUNTER_LOG_ID";
export const TIMER_LOG_ID = "TIMER_LOG_ID";
export const PEAK_COUNTER_ID = "PEAK_COUNTER_ID";
export const AVG_COUNTER_ID = "AVG_COUNTER_ID";
export const JTR_DRV_COUNTER_ID = "JTR_DRV_COUNTER_ID";
export const JTR_FIN_COUNTER_ID = "JTR_FIN_COUNTER_ID";
export const JOULES_COUNTER_ID = "JOULES_COUNTER_ID";
export const DDL_PLACEHOLDER = { label: "Select", value: null };
export const IS_LOADER = false;
export const BLE_MANAGER_ID = "BLE_MANAGER_ID";
export const BLE_MANAGER_ID2 = "BLE_MANAGER_ID2";
export const BLE_PERIPHERAL_WRITTEN_INFO = "BLE_PERIPHERAL_WRITTEN_INFO";
export const BLE_PERIPHERAL_NEXTWRITE = "";
export const BLE_CONNECTED_PERIPHERAL = "";
export const BLE_RESPONSE = "";
export const ANALOGIC_MENU_ID = "ANALOGIC_MENU_ID";
export const UPDATED_MENU = "";
export const MOBILE_UNIQUE_ID = "";
export const DEVICE_ID = "";
export const LOG_LIMIT = 30;
export const LOG_LIMIT_STR = LOG_LIMIT.toString();

export const PEAK_TABLE_OLD_ARR = [
  [
    "",
    "NO RF detected",
    "Y < 500",
    "500 <=Y< 1500",
    "1500 <=Y< 2500",
    "2500 <=Y< 3500",
    "3500 <=Y< 4500",
    "Y >= 4500",
  ],
  ["NO RF detected"],
  ["X < 500"],
  ["500 <=X< 1500"],
  ["1500 <=X< 2500"],
  ["2500 <=X< 3500"],
  ["3500 <=X< 4500"],
  ["4500 <=X< 5500"],
  ["5500 <=X< 6500"],
  ["6500 <=X< 7500"],
  ["7500 <=X< 8500"],
  ["8500 <=X< 9500"],
  ["9500 <=X< 10500"],
  ["10500 <=X< 11500"],
  ["11500 <=X< 12500"],
  ["12500 <=X< 13500"],
  ["13500 <=X< 14500"],
  ["14500 <=X< 15500"],
  ["15500 <=X< 16500"],
  ["16500 <=X< 17500"],
  ["17500 <=X< 18500"],
  ["18500 <=X< 19500"],
  ["X >= 19500"],
];

export const AVG_TABLE_OLD_ARR = [
  [
    "",
    "NO RF detected",
    "Y < 50",
    "50 <=Y< 150",
    "150 <=Y< 250",
    "250 <=Y< 350",
    "350 <=Y< 450",
    "Y >= 450",
  ],
  ["NO RF detected"],
  ["X < 50"],
  ["50 <=X< 150"],
  ["150 <=X< 250"],
  ["250 <=X< 350"],
  ["350 <=X< 450"],
  ["450 <=X< 550"],
  ["550 <=X< 650"],
  ["650 <=X< 750"],
  ["750 <=X< 850"],
  ["850 <=X< 950"],
  ["950 <=X< 1050"],
  ["1050 <=X< 1150"],
  ["1150 <=X< 1250"],
  ["1250 <=X< 1350"],
  ["1350 <=X< 1450"],
  ["1450 <=X< 1550"],
  ["1550 <=X< 1650"],
  ["1650 <=X< 1750"],
  ["1750 <=X< 1850"],
  ["1850 <=X< 1950"],
  ["X >= 1950"],
];

export const ABOUT_US = {
  appVersionLabel: "App Version",
  appVersionTxt: "1.0.0",
  WebsiteLink: "www.analogic.com",
  teamText: "The Analogic Amplifier Team",
  regards: "Best regards,",
  thankText:
    "Thank you for choosing Analogic to fulfill your MRI amplifier needs!",
  headquarter:
    "Analogic, headquartered in Peabody, MA, with manufacturing in Shanghai, China and an engineering center in Canton, MA, has a reputation for providing high reliability, state-of-the-art products for medical and security imaging.",
  product:
    "The products that we provide to the MRI community center around RF and Gradient amplifiers. Our products have evolved over the past quarter century to provide unparalleled diagnostic imaging for our customers and have enabled exploration into the deep recesses of our own human brain.",
  contact:
    "We continue to strive, not only to advance our products’ capability and reliability, but to advance MR imaging as a whole. As such, we would love to hear your ideas on how we can improve. Please drop us a note or visit us on the web at",
};
