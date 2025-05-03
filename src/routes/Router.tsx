import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import CountryPage from "../pages/CountryPage";

type Props = {
  mode: boolean;
};

function Router(props: Props) {
  const { mode } = props;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage darkMode={mode} />} />
        <Route path="/:countryName" element={<CountryPage darkMode={mode} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
