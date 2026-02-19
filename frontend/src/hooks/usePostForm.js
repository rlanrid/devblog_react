import { useState } from "react";

export const usePostForm = (initialState) => {
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return { form, setForm, handleChange };
}