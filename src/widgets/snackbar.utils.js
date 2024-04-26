import { Colors } from "../components/utils/colors.utils";
import Toast from "react-native-tiny-toast";

export function showToast(
  message,
  isError,
  isProgress = false,
  duration = 1000
) {
  let backGroundColors = Colors.DarkGreen;
  if (isError === true) {
    backGroundColors = Colors.Red;
  }
  if (isProgress && isProgress !== false) {
    backGroundColors = Colors.AnalogicThemeBlackGrey;
  }

  Toast.show(message, {
    position: Toast.position.center,
    containerStyle: { backgroundColor: backGroundColors },
    textStyle: {},
    textColor: Colors.White,
    mask: true,
    maskStyle: {},
    duration,
    position: 0, //positive means from top
    shadow: true
  });
}

export function showIndicator(isLoading, isVisible) {
  const ToastObj = Toast;
  ToastObj.showLoading("Loading...", {
    loading: isLoading,
    position: Toast.position.center,
    textColor: Colors.White,
    shadow: true,
    visible: isVisible
  });

  if (isVisible === false) {
    ToastObj.hide(toast);
  }
}
