import "./App.css";
import { Header, MainContainer, CreateItem } from "./components";
import { AnimatePresence } from "framer-motion";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <AnimatePresence>
      <div className="w-screen min-h-screen bg-primary flex flex-col">
        <Header />
        <main className="h-full p-5 mt-20">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/create-item" element={<CreateItem />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
