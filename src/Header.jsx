import CloudIcon from "@mui/icons-material/Cloud";

const Header = () => {
  return (
    <header>
      <span>
        <span>D</span>ai<span>l</span>y
      </span>
      <span>weather</span>
      <div className="header-logo">
        <CloudIcon style={{ color: "#aaa" }} fontSize="large" />
      </div>
    </header>
  );
};

export default Header;
