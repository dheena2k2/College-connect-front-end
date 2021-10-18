import Login from "./components/login/login"
import Footer from "./components/common/footer"
import './App.css';

function App() {
  return (
    <div className="App">
      <Login />
      <Footer loggedin={false} />
    </div>
  );
}

export default App;
