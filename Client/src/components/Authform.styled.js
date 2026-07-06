import styled from "styled-components";
import { motion } from "framer-motion";

export const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(145deg, #f0f0f0, #d0d0d0);
  padding: 16px;
`;

export const FormWrapper = styled(motion.div)`
  background-color: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
`;

export const Icon = styled.div`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 12px;
`;

export const Title = styled.h2`
  text-align: center;
  font-weight: 700;
  font-size: 20px;
  color: #1976d2;
  margin-bottom: 20px;
`;

export const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 15px;
`;

export const SelectWrapper = styled.div`
  position: relative;
  margin-bottom: 15px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  padding-right: ${({ $hasToggle, $hasError }) =>
    $hasToggle && $hasError
      ? "70px"
      : $hasToggle
        ? "40px"
        : $hasError
          ? "60px"
          : "10px"};
  border: 2px solid ${({ $hasError }) => ($hasError ? "red" : "#ccc")};
  border-radius: 6px;
  outline: none;
  font-size: 14px;

  &:focus {
    border-color: ${({ $hasError }) => ($hasError ? "red" : "#007bff")};
    box-shadow: 0 0 8px rgba(25, 118, 210, 0.25);
  }

  &:hover {
    border-color: #1976d2;
    box-shadow: 0 3px 6px rgba(25, 118, 210, 0.12);
  }
`;

export const PasswordToggle = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  z-index: 2;
  padding: 2px;

  &:hover {
    opacity: 0.7;
  }
`;

export const ErrorInside = styled.span`
  position: absolute;
  right: ${({ theme }) => "35px"};
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  color: red;
  background: white;
  padding: 0 4px;
  border-radius: 3px;
  z-index: 1;
`;

export const SelectError = styled.span`
  position: absolute;
  right: 35px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  color: red;
  background: white;
  padding: 0 4px;
  border-radius: 3px;
  z-index: 10;
  pointer-events: none;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background: #007bff;
  border: none;
  color: white;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background: gray;
    cursor: not-allowed;
  }
`;

export const Toggle = styled.button`
  margin-top: 14px;
  background: none;
  border: none;
  color: #1976d2;
  font-size: 13px;
  cursor: pointer;
  text-align: center;
  width: 100%;
  transition: color 0.3s ease;

  &:hover {
    color: #125a9c;
    text-decoration: underline;
  }
`;

export const ErrorMessage = styled.div`
  margin-top: 10px;
  color: #d32f2f;
  font-size: 13px;
  text-align: center;
`;
