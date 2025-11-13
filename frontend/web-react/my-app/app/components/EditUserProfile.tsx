"use client";

import { useState } from "react";
import Profile from "./Profile";

export default function EditUserProfile() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    phone: "",
    address: "",
  });

  return <Profile />;
}
