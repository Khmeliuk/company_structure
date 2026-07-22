import React from "react";
import { PieChart, Shield, Users, LogOut } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router";

import myLogo from "../assets/logo.png";
import { ApiStatus, Container, FooterWrapper, HeaderWrapper, LogoImage, LogoLink, LogoutButton, Nav, NavLabel, NavLinkStyled, RightSection, StatusDot, StatusText } from "./MainLayoutStyled.js";
import { logout } from "../services/axiosAPI.js";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { useSyncAuthAcrossTabs } from "../hooks/useSyncAuthAcrossTabs.js";

const MainLayout = () => {
  const location = useLocation();
    const queryClient = useQueryClient();
      const { notifyAuthUpdate } = useSyncAuthAcrossTabs();

  const navItems = [
    { path: "/structure", label: "Структура", icon: <Shield size={18} /> },
    { path: "/employees", label: "Працівники", icon: <Users size={18} /> },
    { path: "/analytics", label: "Аналітика", icon: <PieChart size={18} /> },
  ];

  const handleLogout = async() => {
   await logout()
  queryClient.invalidateQueries(["user"])
    notifyAuthUpdate(); 
  };

  return (
 <HeaderWrapper>
      <Container>
        <LogoLink to="/">
          <LogoImage src={myLogo} alt="Logo" />
        </LogoLink>

        <Nav>
          {navItems.map((item) => (
            <NavLinkStyled
              key={item.path}
              to={item.path}
              $isActive={location.pathname === item.path}
            >
              {item.icon}
              <NavLabel>{item.label}</NavLabel>
            </NavLinkStyled>
          ))}
        </Nav>

        <RightSection>
     

          <LogoutButton onClick={handleLogout} title="Вийти з системи">
            <LogOut size={16} />
            <NavLabel>Вийти</NavLabel>
          </LogoutButton>
        </RightSection>
      </Container>
       <Outlet />
    </HeaderWrapper>
 
  
  );
};

export default MainLayout;