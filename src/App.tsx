import MyForm from "./components/MyForm";
import "./App.css";
import "semantic-ui-css/semantic.min.css";

const App = () => {
  return (
    <div className="app-layout">
      <h1>Semantic UI</h1>
      <h2>Demo Form</h2>
      <MyForm className="my-form" />
    </div>
  );
};

export default App;
