import React, { useState } from "react";
import styled from "styled-components";
import { useMutation } from "@tanstack/react-query";

const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 100%);
  font-family:
    "Inter",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    sans-serif;
  padding: 20px;
`;

const AuthCard = styled.div`
  background: #ffffff;
  padding: 40px;
  border-radius: 16px;
  box-shadow:
    0 10px 25px rgba(0, 0, 0, 0.05),
    0 20px 48px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 440px;
  transition: all 0.3s ease-in-out;
`;

const Title = styled.h2`
  margin-bottom: 28px;
  text-align: center;
  color: #1e293b;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.5px;
`;

const AlertMessage = styled.div`
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 500;
  transition: all 0.2s ease-in-out;

  color: ${(props) => (props.type === "error" ? "#ef4444" : "#10b981")};
  background-color: ${(props) =>
    props.type === "error" ? "#fef2f2" : "#f0fdf4"};
  border: 1px solid
    ${(props) => (props.type === "error" ? "#fca5a5" : "#86efac")};
`;

const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 13px;
  color: #475569;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  font-size: 15px;
  color: #0f172a;
  outline: none;
  background-color: #f8fafc;
  transition: all 0.2s ease-in-out;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    border-color: #6366f1;
    background-color: #ffffff;
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
  }
`;

const SubmitButton = styled.button`
  background-color: #6366f1;
  color: white;
  padding: 14px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin-top: 10px;

  &:hover {
    background-color: #4f46e5;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background-color: #cbd5e1;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ToggleText = styled.p`
  text-align: center;
  margin-top: 24px;
  font-size: 14px;
  color: #64748b;
`;

const ToggleSpan = styled.span`
  color: #6366f1;
  cursor: pointer;
  font-weight: 600;
  margin-left: 5px;
  transition: color 0.2s;

  &:hover {
    color: #4f46e5;
    text-decoration: underline;
  }
`;

// ==========================================
// ОСНОВНИЙ КОМПОНЕНТ
// ==========================================

const Auth = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Мутація для реєстрації користувача
  const registerMutation = useMutation({
    mutationFn: async (userData) => {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Помилка при реєстрації");
      }
      return response.json();
    },
    onSuccess: (data) => {
      setSuccessMessage("Акаунт успішно створено! Перенаправляємо на вхід...");
      setErrorMessage("");
      // Очищуємо форму
      setFormData({
        name: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      // Через 2 секунди перемикаємо на форму входу
      setTimeout(() => {
        setIsRegister(false);
        setSuccessMessage("");
      }, 2000);
    },
    onError: (error) => {
      setErrorMessage(error.message);
      setSuccessMessage("");
    },
  });

  // Мутація для входу в систему
  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Невірний email або пароль");
      }
      return response.json();
    },
    onSuccess: (data) => {
      setSuccessMessage("Вхід успішний! Завантажуємо дані...");
      setErrorMessage("");

      // Зберігаємо JWT токен у localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // Тут можна зробити редірект на головну сторінку або оновити стейт користувача
      console.log("Дані авторизації:", data);
    },
    onError: (error) => {
      setErrorMessage(error.message);
      setSuccessMessage("");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (isRegister) {
      if (formData.password !== formData.confirmPassword) {
        setErrorMessage("Паролі не збігаються!");
        return;
      }

      registerMutation.mutate({
        name: formData.name,
        lastname: formData.lastname,
        email: formData.email,
        password: formData.password,
      });
    } else {
      loginMutation.mutate({
        email: formData.email,
        password: formData.password,
      });
    }
  };

  const isLoading = registerMutation.isPending || loginMutation.isPending;

  return (
    <AuthContainer>
      <AuthCard>
        <Title>{isRegister ? "Створення акаунта" : "Вхід до системи"}</Title>

        {/* Відображення помилок або успішних повідомлень */}
        {errorMessage && (
          <AlertMessage type="error">{errorMessage}</AlertMessage>
        )}
        {successMessage && (
          <AlertMessage type="success">{successMessage}</AlertMessage>
        )}

        <AuthForm onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <FormGroup>
                <Label>Ім'я</Label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  placeholder="Введіть ваше ім'я"
                />
              </FormGroup>

              <FormGroup>
                <Label>Прізвище</Label>
                <Input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  placeholder="Введіть ваше прізвище"
                />
              </FormGroup>
            </>
          )}

          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
              placeholder="example@mail.com"
            />
          </FormGroup>

          <FormGroup>
            <Label>Пароль</Label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={isLoading}
              placeholder="Введіть надійний пароль"
            />
          </FormGroup>

          {isRegister && (
            <FormGroup>
              <Label>Підтвердження пароля</Label>
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                disabled={isLoading}
                placeholder="Повторіть ваш пароль"
              />
            </FormGroup>
          )}

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading
              ? "Завантаження..."
              : isRegister
                ? "Зареєструватися"
                : "Увійти"}
          </SubmitButton>
        </AuthForm>

        <ToggleText>
          {isRegister ? "Вже маєте акаунт?" : "Ще немає акаунта?"}
          <ToggleSpan
            onClick={() => {
              if (!isLoading) {
                setIsRegister(!isRegister);
                setErrorMessage("");
                setSuccessMessage("");
              }
            }}
          >
            {isRegister ? "Увійти" : "Зареєструватися"}
          </ToggleSpan>
        </ToggleText>
      </AuthCard>
    </AuthContainer>
  );
};

export default Auth;
