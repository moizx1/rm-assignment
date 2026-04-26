import { useAuth } from "../../hooks/useAuth";
import CustomForm from "../../components/Form/CustomForm";
import bcrypt from 'bcryptjs'

export default function Register() {
  const { register, message } = useAuth();

  const getCurrentLocalDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  const handleSubmit = async (formData) => {
    const salt = await bcrypt.genSalt(10);  
    const hashedPassword = await bcrypt.hash(formData.password, salt);

    await register(
      formData.username,
      hashedPassword,
      formData.name,
      formData.dob,
      formData.address,
      getCurrentLocalDateTime()
    );
  };

  return (
    <CustomForm
      inputs={[
        { id: "username", type: "email", placeholder: "Username", required: true },
        { id: "password", type: "password", placeholder: "Password", required: true },
        { id: "name", type: "text", placeholder: "Name", required: true },
        { id: "dob", type: "date", placeholder: "Date of Birth", required: true },
        { id: "address", type: "text", placeholder: "Address", required: false }
      ]}
      onSubmit={handleSubmit}
      message={message}
      toggleLink={{
        text: "Register",
        prompt: "Already a user?",
        linkText: "Login",
        link: "/login"
      }}
    />
  );
}
