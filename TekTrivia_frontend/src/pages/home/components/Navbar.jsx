import React from "react";
import TekTriviaLogo from "../../../components/TekTriviaLogo";
import LoginButton from "../../../components/LoginButton";
import NavButton from "./NavButton";
import ThemeSwitcher from "../../../components/layout/ThemeSwitcher";
import CustomButton from "./CustomButton";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between">
      <TekTriviaLogo />
      {/* <div className="w-[60%] h-full">Menu</div> */}
      <div className="hidden md:flex items-center space-x-8 justify-center">
        <NavButton to="/home" label="Home" />
        <NavButton to="/categories" label="Categories" />
        <NavButton to="/ranking" label="Ranking" />
        <NavButton to="/quiz-lab" label="Quiz lab" />
        <NavButton to="/blog" label="Blog" />
        <NavButton to="/log in" label="Login" />
      </div>
      <CustomButton
        text="Sign up"
        size="lg"
        textSize="text-lg"
        fontWeight="font-bold"
        color="from-blue-600"
        textColor="text-white"
        rounded="rounded-xl"
        onClick={() => console.log("Connexion clicked!")}
      />
      <ThemeSwitcher />
    </nav>
  );
};

export default Navbar;
