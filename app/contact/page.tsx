"use client";
import PageFadeIn from "@/components/PageFadeIn";
import { ContactFormState, sendContact } from "../actions/sendContact";
import { SubmitButton } from "./SubmitButton";
import { useActionState, useEffect, useRef } from "react";

export default function ContactPage() {
  const [state, formAction] = useActionState<ContactFormState, FormData>(
    sendContact,
    {}
  );
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state]);
  return (
    <>
      <PageFadeIn />
      <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-10">
        <div className="w-full max-w-2xl p-8">
          <h1 className="text-2xl mb-6 text-gray-700 text-center">
            Contact / 連絡
          </h1>
          {state?.message && (
            <p
              className={`${
                state?.success ? "text-green-600" : "text-red-600"
              }`}
            >
              {state.message}
            </p>
          )}
          <form action={formAction} className="space-y-6" ref={formRef}>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                お名前
              </label>
              <input
                type-="text"
                name="name"
                required
                defaultValue={state?.rawData?.name ?? ""}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              {state?.errors?.name && (
                <p className="text-red-500 text-xs">{state.errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                メールアドレス
              </label>
              {state?.errors?.email && (
                <p className="text-red-500 text-xs">{state.errors.email}</p>
              )}
              <input
                type-="email"
                name="email"
                required
                defaultValue={state?.rawData?.email ?? ""}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                本文
              </label>
              {state?.errors?.message && (
                <p className="text-red-500 text-xs">{state.errors.message}</p>
              )}
              <textarea
                name="message"
                required
                defaultValue={state?.rawData?.message ?? ""}
                className="w-full rounded-lg border h-80 border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-y"
              />
            </div>
            {/* honeypot */}
            <input
              type="text"
              name="company"
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
            />
            <input type="hidden" name="formStart" value={Date.now()} />
            <SubmitButton />
          </form>
        </div>
      </div>
    </>
  );
}
