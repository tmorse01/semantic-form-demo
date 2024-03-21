import MyForm from "./components/MyForm";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import MyFormWithRef from "./components/MyFormWithRef";
import { TabPane, Tab } from 'semantic-ui-react'
import MyAddressForm from "./components/MyAddressForm";

const App = () => {

  const panes = [
    { menuItem: 'Form with Fields Prop', render: () => <TabPane><MyForm /></TabPane> },
    { menuItem: 'Form with Ref', render: () => <TabPane><MyFormWithRef /></TabPane> },
    { menuItem: 'Address Form', render: () => <TabPane><MyAddressForm /></TabPane> },
  ]

  return (
    <div className="app-layout">
      <h1>Semantic UI</h1>
      <h2>Demo Form</h2>
      <Tab panes={panes} />
    </div>
  );
};

export default App;
