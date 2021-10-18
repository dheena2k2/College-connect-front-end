import Login from "./components/login/login"
import Footer from "./components/common/footer"
import Header from "./components/common/header"
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <hr />
      <Footer loggedin={false} />
    </div>
  );
}

export default App;
