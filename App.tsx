import React from "react";
import StackNavigator from "./navigation/StackNavigator";
import ToastManager from "toastify-react-native";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ModalPortal } from "react-native-modals";
import { BackHandler } from "react-native";
import { UserContext } from "./UserContext";

// Temporary fix for react-native-modals BackHandler issue
if (!BackHandler.removeEventListener) {
  BackHandler.removeEventListener = (eventName, handler) => {};
}

const App = () => {
  return (
    <>
      <Provider store={store}>
        <UserContext>
          <StackNavigator />
          <ModalPortal />
          <ToastManager
            position="top"
            style={{
              width: 350,
              height: 35,
              borderRadius: 10,
              alignSelf: "center",
            }}
            duration={2000}
            dismissOnPress={true}
            swipeable={true}
          />
        </UserContext>
      </Provider>
    </>
  );
};

export default App;
