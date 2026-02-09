import React from "react";
import StackNavigator from "./navigation/StackNavigator";
import ToastManager from "toastify-react-native";
import { Provider } from "react-redux";
import { ModalPortal } from "react-native-modals";
import { BackHandler, View } from "react-native";
import { UserContext } from "./UserContext";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Temporary fix for react-native-modals BackHandler issue
if (!BackHandler.removeEventListener) {
  BackHandler.removeEventListener = (eventName, handler) => { };
}

// ✅ Create client OUTSIDE component
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60, // 1 min
    },
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
