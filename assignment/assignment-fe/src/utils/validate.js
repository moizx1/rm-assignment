export const validatePassword = (password) => {
  const minLength = 8;
  const hasNumber = /\d/;
  const hasUpperCase = /[A-Z]/;
  const hasLowerCase = /[a-z]/;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

  return (
    password.length >= minLength &&
    hasNumber.test(password) &&
    hasUpperCase.test(password) &&
    hasLowerCase.test(password) &&
    hasSpecialChar.test(password)
  );
};

export const validateBankAccountNumber = (accountNumber) => {
  const accountNumberPattern = /^\d{10}$/;
  return accountNumberPattern.test(accountNumber);
};

export const validateForm = (formData, isEditing) => {
  if (!formData.address) return "Address is required";
  if (!isEditing && !formData.username) return "Username is required";
  if (!isEditing && !formData.name) return "Name is required";
  return null;
};