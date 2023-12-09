import React from "react"
import Logo from "../assets/Logo";
import Button from "../ui/Button";
import LogoName from "../assets/LogoName";


const Header = () => {
    return (
        <div className="container">
            <div className="header">
                <div className="logo">
                    <Logo />
                    <LogoName />
                </div>
                <div className="btn">
                    <Button >Users </Button>
                    <Button>Sign up </Button>
                </div>
            </div>
        </div>
    )
};

export default Header;
