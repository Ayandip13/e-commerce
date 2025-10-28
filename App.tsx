import React from "react";
import StackNavigator from "./navigation/StackNavigator";
import ToastManager from "toastify-react-native";
import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <StackNavigator />
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
      </Provider>
    </>
  );
};

export default App;
