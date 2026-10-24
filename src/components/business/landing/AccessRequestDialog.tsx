"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, X } from "@phosphor-icons/react";
import { WAITLIST_API } from "@/config";
import s from "./AccessRequestDialog.module.css";

export function AccessRequestDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const sending = useRef(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    const element = dialog.current;
    element?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (status === "success") {
      dialog.current?.querySelector<HTMLHeadingElement>("h2")?.focus();
    }
  }, [status]);

  function close() {
    if (sending.current) return;
    if (status === "success") setStatus("idle");
    setError("");
    onClose();
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    const value = (key: string) => String(values.get(key) ?? "").trim();
    const phone = value("phone");
    const digits = phone.replace(/\D/g, "");
    if (
      !/^\+?[\d ()-]+$/.test(phone) ||
      digits.length < 10 ||
      digits.length > 15
    ) {
      setError(
        "Enter a phone number with 10 to 15 digits, including the country code if needed.",
      );
      form.querySelector<HTMLInputElement>('[name="phone"]')?.focus();
      return;
    }
    sending.current = true;
    setStatus("sending");
    setError("");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      // A company request has its own door: it is stored apart from the consumer waitlist,
      // and the reply it sends says a person will be in touch, not "you're on the list".
      const response = await fetch(`${WAITLIST_API}/company`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          name: value("name"),
          company_name: value("company"),
          role: value("role"),
          email: value("email"),
          phone,
          use_case: value("details"),
        }),
      });
      if (!response.ok) {
        setStatus("idle");
        setError(
          response.status === 400
            ? "Check your email address and contact details, then try again."
            : response.status === 429
              ? "Too many requests from this connection. Please try again in a minute."
              : "We couldn’t submit your request. Please try again shortly.",
        );
        return;
      }
      setStatus("success");
    } catch {
      setStatus("idle");
      setError(
        "We couldn’t confirm your request. Check your connection and try again.",
      );
    } finally {
      clearTimeout(timeout);
      sending.current = false;
    }
  }

  return (
    <dialog
      ref={dialog}
      className={s.dialog}
      aria-labelledby="access-title"
      aria-describedby="access-description"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className={s.content}>
        <button
          className={s.close}
          type="button"
          aria-label="Close request form"
          disabled={status === "sending"}
          onClick={close}
        >
          <X size={22} aria-hidden="true" />
        </button>
        <div className={s.brand}>
          <span aria-hidden="true" className={s.mark} />
          Subsecute <span>Business</span>
        </div>
        {status === "success" ? (
          <div className={s.success} role="status">
            <span className={s.successIcon}>
              <Check size={28} aria-hidden="true" />
            </span>
            <h2 id="access-title" tabIndex={-1}>
              Request received.
            </h2>
            <p id="access-description">
              Thank you for your interest in Subsecute Business. Our team will
              contact you about access.
            </p>
            <button type="button" className="b-button primary" onClick={close}>
              Back to Subsecute <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        ) : (
          <>
            <h2 id="access-title">Request access.</h2>
            <p id="access-description" className={s.intro}>
              Tell us about your business. We’ll get in touch to help you get
              started.
            </p>
            <form onSubmit={submit} aria-busy={status === "sending"}>
              <fieldset disabled={status === "sending"} className={s.fields}>
                <div className={s.row}>
                  <label>
                    Your name
                    <input
                      name="name"
                      autoComplete="name"
                      placeholder="Full name"
                      required
                      maxLength={120}
                      pattern=".*\S.*"
                    />
                  </label>
                  <label>
                    Company name
                    <input
                      name="company"
                      autoComplete="organization"
                      placeholder="Your business"
                      required
                      maxLength={160}
                      pattern=".*\S.*"
                    />
                  </label>
                </div>
                <div className={s.row}>
                  <label>
                    Email address
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      required
                      maxLength={254}
                    />
                  </label>
                  <label>
                    Phone number
                    <input
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="0801 234 5678"
                      required
                      maxLength={25}
                    />
                  </label>
                </div>
                <label>
                  Your role
                  <select name="role" required defaultValue="">
                    <option value="" disabled>
                      Select your role
                    </option>
                    <option value="FOUNDER_OR_CEO">Founder / CEO</option>
                    <option value="FINANCE">Finance / Accounting</option>
                    <option value="OPERATIONS">Operations</option>
                    <option value="ENGINEERING">Engineering / IT</option>
                    <option value="PRODUCT">Product</option>
                    <option value="SALES_OR_MARKETING">
                      Sales / Marketing
                    </option>
                    <option value="PEOPLE_AND_ADMIN">
                      People / Administration
                    </option>
                    <option value="OTHER">Other</option>
                  </select>
                </label>
                <label>
                  What would you like to use Subsecute for?{" "}
                  <span className={s.optional}>Optional</span>
                  <textarea
                    name="details"
                    rows={3}
                    maxLength={2000}
                    placeholder="Subscriptions, team expenses, or anything else we should know."
                  />
                </label>
              </fieldset>
              {error && (
                <p className={s.error} role="alert">
                  {error}
                </p>
              )}
              <div className={s.footer}>
                <p>
                  We’ll use these details to contact you about your request.{" "}
                  <a
                    href="/privacy-policy.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy policy
                  </a>
                </p>
                <button
                  type="submit"
                  className="b-button primary"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Sending request…" : "Request access"}
                  {status !== "sending" && (
                    <ArrowRight size={18} aria-hidden="true" />
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </dialog>
  );
}
