import React from "react";
import TekTriviaLogo from "../../../components/TekTriviaLogo";
import LoginButton from "../../../components/LoginButton";
import NavButton from "./NavButton";
import ThemeSwitcher from "../../../components/layout/ThemeSwitcher";
import CustomButton from "./CustomButton";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="flex items-center justify-between">
      <TekTriviaLogo />
      {/* <div className="w-[60%] h-full">Menu</div> */}
      <div className="hidden md:flex items-center space-x-8 justify-center">
        <NavButton to="/" label="Home" />
        <NavButton to="/categories" label="Categories" />
        <NavButton to="/rank" label="Ranking" />
        <NavButton to="/quizLab" label="Quiz lab" />
        <NavButton to="/blog" label="Blog" />
        <NavButton to="/login" label="Log in" />
      </div>
      <CustomButton
        text="Sign up"
        size="lg"
        textSize="text-lg"
        fontWeight="font-bold"
        color="bg-blue-600"
        textColor="text-white"
        rounded="rounded-xl"
        onClick={() => navigate("/login")}
      />
      <ThemeSwitcher />
    </nav>
  );
};

export default Navbar;
