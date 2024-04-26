import { StackActions, NavigationActions } from "react-navigation";

export function resetNavigationAndPush(screen, params) {
  return (resetAction = StackActions.reset({
    index: 0, // <-- currect active route from actions array
    actions: [NavigationActions.navigate({ routeName: screen, params })]
  }));
}
