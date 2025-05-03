import { useState } from "react";
import Navbar from "./components/Navbar";
import Router from "./routes/Router";

function App() {
  const [mode, setMode] = useState(false);

  const handleChangeMode = () => {
    setMode((prev) => !prev);
  };

  return (
    <div className="app">
      <Navbar darkMode={mode} handleChangeMode={handleChangeMode} />
      <Router mode={mode} />
    </div>
  );
}

export default App;
