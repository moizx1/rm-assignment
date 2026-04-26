import CryptoJS from 'crypto-js';

const secretKey = import.meta.env.VITE_AES_SECRET_KEY;

export const encryptPassword = (password) => {
    return CryptoJS.AES.encrypt(password, CryptoJS.enc.Utf8.parse(secretKey), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }).toString();
}

export const getCurrentLocalDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

export const validateForm = (formData, isEditing) => {
    if (!formData.address) return "Address is required";
    if (!isEditing && !formData.username) return "Username is required";
    if (!isEditing && !formData.name) return "Name is required";
    return null;
};

export const resetForm = () => ({
    username: "",
    password: "",
    name: "",
    dob: "",
    address: "",
    createdAt: null,
});


