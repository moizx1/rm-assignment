import React from 'react';
import { useAuth } from "../../hooks/useAuth";
import CustomForm from "../../components/Form/CustomForm";
import { encryptPassword } from '../../utils/utils';

export default function Login() {
  const { login, message } = useAuth();

  const handleSubmit = async (formData) => {
    const encryptedPassword = encryptPassword(formData.password);
    await login(formData.username, encryptedPassword);
  };

  return (
    <CustomForm
      inputs={[
        { id: "username", type: "email", placeholder: "Username", required: true },
        { id: "password", type: "password", placeholder: "Password", required: true }
      ]}
      onSubmit={handleSubmit}
      message={message}
      toggleLink={{
        text: "Login",
        prompt: "Not a user?",
        linkText: "Register",
        link: "/register"
      }}
    />
  );
}
