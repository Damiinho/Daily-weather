import CloudIcon from "@mui/icons-material/Cloud";

const Header = () => {
  return (
    <header>
      <span>Daily</span>
      <span>weather</span>
      <CloudIcon style={{ color: "#aaa" }} fontSize="large" />
    </header>
  );
};

export default Header;
