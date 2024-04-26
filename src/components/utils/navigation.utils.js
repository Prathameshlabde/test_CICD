import { ANALOGIC_MENU_ID, UPDATED_MENU } from "../../constants/app.constants";

export function navigateToSettings(props, navigation) {
  setTimeout(() => {
    const { updateComponentState } = props;
    updateComponentState(ANALOGIC_MENU_ID, UPDATED_MENU, "AmplifierConnection");
  }, 1000);
  navigation.navigate("AmplifierConnection");
}
