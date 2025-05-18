"use client";

import Layout from "@/src/components/layout/Layout";
import { useAuth } from "@/src/context/AuthContext";
import { SignInSchema, SignInSchemaType } from "@/src/schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/src/i18n/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Login() {
  const { token, user, login, isLoading, error } = useAuth();
  const [callbackUrl, setCallbackUrl] = useState<string | null>(null);
  const [redirectionAttempted, setRedirectionAttempted] = useState(false);

  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("login");

  const methods = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: SignInSchemaType) => {
    const success = await login(data);

    if (success) {
      setRedirectionAttempted(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const callback = urlParams.get("callbackUrl");
      setCallbackUrl(callback);
    }
  }, []);

  useEffect(() => {
    if (token && user && !redirectionAttempted) {
      setRedirectionAttempted(true);

      const redirectUrl = callbackUrl
        ? decodeURIComponent(callbackUrl)
        : `/${locale}`;

      try {
        router.replace(redirectUrl);
        setTimeout(() => {
          window.location.href = redirectUrl;
        }, 100);
      } catch (error) {
        console.error("Error during redirection:", error);
        window.location.href = redirectUrl;
      }
    }
  }, [token, user, router, locale, callbackUrl, redirectionAttempted]);

  return (
    <>
      <Layout footerStyle={1}>
        <div className="container pt-140 pb-170">
          <div className="row">
            <div className="col-lg-5 mx-auto">
              <div className="border rounded-3 px-md-5 px-3 ptb-50">
                <div className="login-content">
                  <div className="text-center">
                    <p className="neutral-1000 px-4 py-2 bg-2 text-sm-bold rounded-12 d-inline-flex align-items-center">
                      {t("title")}
                    </p>
                    <h4 className="neutral-1000">{t("welcome")}</h4>
                  </div>
                  <div className="form-login mt-30">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="form-group">
                        <input
                          className="form-control username"
                          type="text"
                          placeholder={t("form.username.placeholder")}
                          {...register("username")}
                        />
                        {errors.username && (
                          <p className="text-danger">
                            {errors.username.message}
                          </p>
                        )}
                      </div>
                      <div className="form-group">
                        <input
                          className="form-control password"
                          type="password"
                          placeholder="****************"
                          {...register("password")}
                        />
                        {errors.password && (
                          <p className="text-danger">
                            {errors.password.message}
                          </p>
                        )}
                      </div>

                      <div className="form-group mb-30">
                        {error && (
                          <p className="text-danger text-center pb-2">
                            {error}
                          </p>
                        )}
                        <button
                          type="submit"
                          className="btn btn-primary w-100"
                          disabled={isLoading}
                        >
                          {t("form.submit")}
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8 15L15 8L8 1M15 8L1 8"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                      <p className="text-sm-medium neutral-500 text-center mt-70">
                        {t("register.text")}
                        <Link className="neutral-1000" href="/register">
                          {t("register.link")}
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
