import React from "react";
import StackNavigator from "./navigation/StackNavigator";
import ToastManager from "toastify-react-native";
import { Provider } from "react-redux";
import { ModalPortal } from "react-native-modals";
import { BackHandler, View } from "react-native";
import { UserContext } from "./UserContext";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";

// Temporary fix for react-native-modals BackHandler issue
if (!BackHandler.removeEventListener) {
  BackHandler.removeEventListener = (eventName, handler) => {};
}

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate
          loading={<View style={{ flex: 1, backgroundColor: "#fff" }} />}
          persistor={persistor}
        >
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
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
