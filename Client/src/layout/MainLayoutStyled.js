import { Link } from "react-router";
import styled, { keyframes } from "styled-components";



export const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

// --- Styled Components ---
export const HeaderWrapper = styled .header`
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    width:100%;
`;

export const Container = styled.div`
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

`;

export const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

export const LogoImage = styled.img`
  height: 2.5rem;
  width: 10rem;
  object-fit: contain;
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const NavLinkStyled = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem 0.25rem 1rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.2s ease;
  border-bottom: 2px solid #ffed00;
  text-decoration: none;

  background-color: ${(props) => (props.$isActive ? "#eff6ff" : "transparent")};
  color: ${(props) => (props.$isActive ? "#0054a6" : "#64748b")};

  &:hover {
    background-color: ${(props) => (props.$isActive ? "#eff6ff" : "#f8fafc")};
    color: ${(props) => (props.$isActive ? "#0054a6" : "#1e293b")};
  }
`;

export const NavLabel = styled.span`
  display: none;

  @media (min-width: 640px) {
    display: inline;
  }
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

export const ApiStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const StatusDot = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  background-color: #22c55e;
  border-radius: 9999px;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

export const StatusText = styled.span`
  font-size: 10px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: -0.05em;
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #ef4444;
  background-color: transparent;
  border: 1px solid #fca5a5;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #fef2f2;
    color: #dc2626;
    border-color: #f87171;
  }
`;

