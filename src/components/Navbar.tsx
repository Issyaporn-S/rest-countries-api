import { DarkModeOutlined } from "@mui/icons-material";
import { DarkMode } from "@mui/icons-material";

type Props = {
    darkMode: boolean;
    handleChangeMode: () => void;
}

function Navbar(props: Props) {
    const {darkMode, handleChangeMode} = props;

  return (
    <div className={`navbar ${darkMode === false? "nav-light" : "nav-dark"} shadow-lg`}>
      <div className="navbar-child px-[2rem] md:px-[4rem]">
        <h1 className="font-bold text-xl md:text-2xl">Where in the world?</h1>
        <button className="mode-btn" onClick={handleChangeMode}>
         {darkMode === false?  <DarkModeOutlined sx={{ fontSize: 20 }} />:  <DarkMode sx={{ fontSize: 20 }} />}
          <p className="font-semibold text-base">Dark Mode</p>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
