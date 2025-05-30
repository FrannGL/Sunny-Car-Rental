"use client";

import Layout from "@/src/components/layout/Layout";
import {
  PreRegisterData,
  RegisterData,
  useAuth,
} from "@/src/context/AuthContext";
import { Link } from "@/src/i18n/navigation";
import {
  EmailFormValues,
  emailSchema,
  RegisterStepValues,
  verifySchema,
} from "@/src/schemas/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function RegisterForm() {
  const [step, setStep] = useState<0 | 1>(0);
  const [email, setEmail] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<{
    preRegisterError: string;
    verificationError: string;
  }>({
    preRegisterError: "",
    verificationError: "",
  });

  const { preRegister, register } = useAuth();
  const router = useRouter();
  const t = useTranslations("register");

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "", username: "" },
  });

  const registerForm = useForm<RegisterStepValues>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
      password: "",
      conf_pass: "",
    },
  });

  const handleSendEmail = async (data: EmailFormValues) => {
    try {
      setEmail(data.email);
      setError({ preRegisterError: "", verificationError: "" });
      const preRegisterData: PreRegisterData = {
        email: data.email,
        username: data.username,
      };
      const success = await preRegister(preRegisterData);
      if (success) {
        setStep(1);
      } else {
        setError((prevState) => ({
          ...prevState,
          preRegisterError: t("errors.user_exists"),
        }));
        console.error("Error al pre-registrar");
      }
    } catch (err) {
      console.error("Error al enviar email:", err);
      setError((prevState) => ({
        ...prevState,
        preRegisterError: t("errors.email_error"),
      }));
    }
  };

  const handleVerifyAndRegister = async (data: RegisterStepValues) => {
    try {
      const registerData: RegisterData = {
        email: email,
        code: data.code,
        password: data.password,
        conf_pass: data.conf_pass,
      };
      const success = await register(registerData);
      if (success) {
        router.push("/login");
      } else {
        setError((prevState) => ({
          ...prevState,
          verificationError: t("errors.invalid_code"),
        }));
        console.error("Error al registrar usuario");
      }
    } catch (err) {
      console.error("Error en el registro:", err);
      setError((prevState) => ({
        ...prevState,
        verificationError: t("errors.verification_error"),
      }));
    }
  };

  return (
    <Layout footerStyle={1}>
      <div className="container pt-140 pb-170">
        <div className="row">
          <div className="col-lg-5 mx-auto">
            <div className="register-content border rounded-3 px-md-5 px-3 ptb-50">
              <div className="text-center">
                <p className="neutral-1000 px-4 py-2 bg-2 text-sm-bold rounded-12 d-inline-flex align-items-center">
                  {t("title")}
                </p>
              </div>

              <h4 className="neutral-1000 text-center mt-10">{t("welcome")}</h4>

              <div className="form-login mt-20">
                {step === 0 ? (
                  <form onSubmit={emailForm.handleSubmit(handleSendEmail)}>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="email"
                        placeholder={t("form.email.placeholder")}
                        {...emailForm.register("email")}
                      />
                      {emailForm.formState.errors.email && (
                        <p className="text-danger small mt-1">
                          {emailForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder={t("form.username.placeholder")}
                        {...emailForm.register("username")}
                      />
                      {emailForm.formState.errors.username && (
                        <p className="text-danger small mt-1">
                          {emailForm.formState.errors.username.message}
                        </p>
                      )}
                    </div>

                    {error.preRegisterError && (
                      <p className="text-danger text-center mt-3">
                        {error.preRegisterError}
                      </p>
                    )}

                    <button
                      className="btn btn-primary w-100 mt-3"
                      type="submit"
                    >
                      {t("form.buttons.send_code")}
                    </button>
                  </form>
                ) : (
                  <form
                    onSubmit={registerForm.handleSubmit(
                      handleVerifyAndRegister
                    )}
                  >
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder={t("form.verification.placeholder")}
                        {...registerForm.register("code")}
                      />
                      {registerForm.formState.errors.code && (
                        <p className="text-danger small mt-1">
                          {registerForm.formState.errors.code.message}
                        </p>
                      )}
                    </div>

                    <div className="form-group position-relative">
                      <input
                        className="form-control"
                        type={showPassword ? "text" : "password"}
                        placeholder={t("form.password.placeholder")}
                        {...registerForm.register("password")}
                      />
                      <button
                        type="button"
                        className="position-absolute"
                        style={{
                          top: "50%",
                          right: "10px",
                          transform: "translateY(-50%)",
                          border: "none",
                        }}
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                      {registerForm.formState.errors.password && (
                        <p className="text-danger small mt-1">
                          {registerForm.formState.errors.password.message}
                        </p>
                      )}
                    </div>

                    <div className="form-group position-relative">
                      <input
                        className="form-control"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder={t("form.confirm_password.placeholder")}
                        {...registerForm.register("conf_pass")}
                      />
                      <button
                        type="button"
                        className="position-absolute"
                        style={{
                          top: "35%",
                          right: "10px",
                          transform: "translateY(-50%)",
                          border: "none",
                        }}
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                      {registerForm.formState.errors.conf_pass && (
                        <p className="text-danger small mt-1">
                          {registerForm.formState.errors.conf_pass.message}
                        </p>
                      )}
                    </div>

                    {error.verificationError && (
                      <p className="text-danger text-center mb-2">
                        {error.verificationError}
                      </p>
                    )}

                    <button className="btn btn-primary w-100" type="submit">
                      {t("form.buttons.register")}
                    </button>
                  </form>
                )}

                <p className="text-sm-medium neutral-500 text-center mt-4">
                  {t("login.text")}{" "}
                  <Link className="neutral-1000" href="/login">
                    {t("login.link")}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
