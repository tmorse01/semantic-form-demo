import MyForm from "./components/MyForm";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import MyFormWithRef from "./components/MyFormWithRef";

const App = () => {
  return (
    <div className="app-layout">
      <h1>Semantic UI</h1>
      <h2>Demo Form</h2>
      <MyForm />
      <MyFormWithRef />
    </div>
  );
};

export default App;
