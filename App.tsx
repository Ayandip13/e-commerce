import React from "react";
import StackNavigator from "./navigation/StackNavigator";
import ToastManager from "toastify-react-native";

const App = () => {
  return (
    <>
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
    </>
  );
};

export default App;
