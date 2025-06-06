"use client";
import { redirect } from "next/navigation";
import { useState } from "react";

type Props = {
  code: string;
};

export default function SubmissionForm({ code }: Props) {
  const inputStyle = "p-2 border-2 border-black rounded-lg";
  const [info, setInfo] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    firstnameError: false,
    lastnameError: false,
    phoneError: false,
    emailError: false,
    phoneFormatError: false,
    emailFormatError: false,
  });
  const [loading, setLoading] = useState(false);
  const message = `I hope this message finds you well. My name is ${info.firstname} ${info.lastname}, and I am writing to express my strong interest in participating in your upcoming clinical trial ${code}.You can contact me by replying directly to this email or reaching me by phone at ${info.phone} or ${info.email}.Thank you for considering my interest!`;

  const resetErrors = () => {
    setErrors({
      firstnameError: false,
      lastnameError: false,
      phoneError: false,
      emailError: false,
      phoneFormatError: false,
      emailFormatError: false,
    });
  };

  const handleSubmit = async () => {
    const phonePattern = /^\d{9,12}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    setLoading(true);

    if (info.firstname.length < 1) {
      setErrors({ ...errors, firstnameError: true });
      return;
    }
    if (info.lastname.length < 1) {
      setErrors({ ...errors, lastnameError: true });
      return;
    }
    if (info.phone.length < 1) {
      setErrors({ ...errors, phoneError: true });
      return;
    }
    if (info.email.length < 1) {
      setErrors({ ...errors, emailError: true });
      return;
    }
    if (!phonePattern.test(info.phone)) {
      setErrors({ ...errors, phoneFormatError: true });
      return;
    }
    if (!emailPattern.test(info.email)) {
      setErrors({ ...errors, emailFormatError: true });
      return;
    }

    const res = await fetch("/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...info,
        message,
      }),
    });

    if (res.ok) {
      alert("Application submitted!");
      redirect("/");
    } else {
      alert("Failed to submit");
    }

    setInfo({ firstname: "", lastname: "", phone: "", email: "" });
    setLoading(false);
  };
  return (
    <form
      action={handleSubmit}
      className="bg-white shadow-lg rounded-lg h-fit py-4 px-8 flex flex-col gap-2 md:w-sm lg:w-md xl:w-lg"
    >
      <h2 className="font-semibold text-center">Basic Information</h2>
      <label htmlFor="firstname">First name:</label>
      <input
        type="text"
        name="firstname"
        id="firstname"
        placeholder="Enter your firstname:"
        className={inputStyle}
        required
        value={info.firstname}
        onChange={(event) => {
          resetErrors();
          setInfo({ ...info, firstname: event.target.value });
        }}
      />
      {errors.firstnameError && (
        <p className="text-red-500">First name is required</p>
      )}
      <label htmlFor="lastname">Last name:</label>
      <input
        type="text"
        name="lastname"
        id="lastname"
        placeholder="Enter your lastname:"
        className={inputStyle}
        required
        value={info.lastname}
        onChange={(event) => {
          resetErrors();
          setInfo({ ...info, lastname: event.target.value });
        }}
      />
      {errors.lastnameError && (
        <p className="text-red-500">Last name is required</p>
      )}
      <label htmlFor="phone">Phone:</label>
      <input
        type="tel"
        name="phone"
        id="phone"
        placeholder="Enter your phone number:"
        className={inputStyle}
        required
        value={info.phone}
        onChange={(event) => {
          resetErrors();
          setInfo({ ...info, phone: event.target.value });
        }}
      />
      {errors.phoneError && <p className="text-red-500">Phone is required</p>}
      {errors.phoneFormatError && !errors.phoneError && (
        <p className="text-red-500">Wrong format. 9-12 digits</p>
      )}
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Enter your email:"
        className={inputStyle}
        required
        value={info.email}
        onChange={(event) => {
          resetErrors();
          setInfo({ ...info, email: event.target.value });
        }}
      />
      {errors.emailError && <p className="text-red-500">Email is required</p>}
      {errors.emailFormatError && !errors.emailError && (
        <p className="text-red-500">Wrong format</p>
      )}
      <textarea
        name="message"
        id="message"
        className="p-2 border-2 border-black rounded-lg h-40 w-full"
        readOnly
        value={message}
      />
      <label htmlFor="terms">
        <input type="checkbox" name="terms" id="terms" required /> I agreed with
        terms
      </label>
      <button
        type="submit"
        className="bg-indigo-500 text-white text-semibold rounded-lg py-2 cursor-pointer hover:scale-105 duration-500"
        disabled={loading}
      >
        Send
      </button>
    </form>
  );
}
