import React from "react";
import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import ToDoContainer from './components/ToDoContainer'


function App() {
  return (
    <AppProvider i18n={{}}>
     <ToDoContainer/>
    </AppProvider>
  );
}

export default App;
