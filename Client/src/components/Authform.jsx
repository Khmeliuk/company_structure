import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { login, registration } from "../services/axiosAPI";
import { useAuthMutation } from "../hooks/reactMutation";
import {
  Wrapper,
  FormWrapper,
  Icon,
  Title,
  InputWrapper,
  Input,
  PasswordToggle,
  SubmitButton,
  Toggle,
  ErrorMessage,
  ErrorInside,
} from "./Authform.styled";

const registrationFormField = {
  name: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(false);
  const [formValues, setFormValues] = useState({ ...registrationFormField });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const loginMutation = useAuthMutation(login);
  const registrationMutation = useAuthMutation(registration);

  const navigate = useNavigate();

  const toggleForm = () => {
    setFormValues({ ...registrationFormField });
    setIsLogin(!isLogin);
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  useEffect(() => {
    const backendError =
      loginMutation.error?.response?.data?.errors ||
      registrationMutation.error?.response?.data?.errors;

    if (backendError && typeof backendError === "object") {
      setErrors(backendError);
    } else if (
      loginMutation.error?.response?.data?.message ||
      registrationMutation.error?.response?.data?.message
    ) {
      setErrors({
        general:
          loginMutation.error?.response?.data?.message ||
          registrationMutation.error?.response?.data?.message,
      });
    }
  }, [loginMutation.error, registrationMutation.error]);

  const validateForm = () => {
    const newErrors = {};

    if (!isLogin) {
      if (!formValues.name.trim()) newErrors.name = "Required";
      if (!formValues.lastName.trim()) newErrors.lastName = "Required";
      if (formValues.password !== formValues.confirmPassword)
        newErrors.confirmPassword = "No match";
    }

    if (!formValues.email.trim()) newErrors.email = "Required";
    if (!formValues.password.trim()) newErrors.password = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = isLogin
      ? { email: formValues.email, password: formValues.password }
      : formValues;
    const mutation = isLogin ? loginMutation : registrationMutation;

    console.log("====================================");
    console.log("formValues", formValues);
    console.log("====================================");

    mutation.mutate(payload, {
      onSuccess: () => navigate("/outLogin"),
    });
  };

  return (
    <Wrapper>
      <FormWrapper
        as={motion.div}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Icon>🔒</Icon>
        <Title>{isLogin ? "Залогінитись" : "Зареєструватись"}</Title>

        <form onSubmit={handleSubmit} autoComplete="off">
          {!isLogin && (
            <>
              <InputWrapper>
                <Input
                  name="name"
                  placeholder="Ім'я"
                  value={formValues.name}
                  onChange={handleChange}
                  $hasError={!!errors.name}
                />
                {errors.name && <ErrorInside>{errors.name}</ErrorInside>}
              </InputWrapper>

              <InputWrapper>
                <Input
                  name="lastName"
                  placeholder="Фамілія"
                  value={formValues.lastName}
                  onChange={handleChange}
                  $hasError={!!errors.lastName}
                />
                {errors.lastName && (
                  <ErrorInside>{errors.lastName}</ErrorInside>
                )}
              </InputWrapper>
            </>
          )}

          <InputWrapper>
            <Input
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
              $hasError={!!errors.email}
            />
            {errors.email && <ErrorInside>{errors.email}</ErrorInside>}
          </InputWrapper>

          <InputWrapper>
            <Input
              name="password"
              placeholder="Пароль"
              type={showPassword ? "text" : "password"}
              value={formValues.password}
              onChange={handleChange}
              $hasError={!!errors.password}
              $hasToggle={true}
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </PasswordToggle>
            {errors.password && <ErrorInside>{errors.password}</ErrorInside>}
          </InputWrapper>

          {!isLogin && (
            <InputWrapper>
              <Input
                name="confirmPassword"
                placeholder="Повторіть пароль"
                type={showConfirmPassword ? "text" : "password"}
                value={formValues.confirmPassword}
                onChange={handleChange}
                $hasError={!!errors.confirmPassword}
                $hasToggle={true}
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
              </PasswordToggle>
              {errors.confirmPassword && (
                <ErrorInside>{errors.confirmPassword}</ErrorInside>
              )}
            </InputWrapper>
          )}

          <SubmitButton
            type="submit"
            disabled={loginMutation.isPending || registrationMutation.isPending}
          >
            {isLogin ? "Увійти" : "Зареєструватись"}
          </SubmitButton>

          {(loginMutation.error || registrationMutation.error) && (
            <ErrorMessage>
              {loginMutation.error?.response?.data?.message ||
                registrationMutation.error?.response?.data?.message ||
                "Невірний логін чи пароль"}
            </ErrorMessage>
          )}

          {errors.general && <ErrorInside>{errors.general}</ErrorInside>}

          <Toggle type="button" onClick={toggleForm}>
            {isLogin ? "Створити новий акаунт" : "Вже маєте акаунт? Увійти"}
          </Toggle>
        </form>
      </FormWrapper>
    </Wrapper>
  );
}
