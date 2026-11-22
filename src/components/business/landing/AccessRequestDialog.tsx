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
    const previousFocus = document.activeElement;
    element?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
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
    const role = value("role");
    const industry = value("industry");
    const cards = values.getAll("cards").map(String);
    const useCase = [
      industry && `Industry: ${industry}`,
      cards.length > 0 && `Cards: ${cards.join(", ")}`,
    ]
      .filter(Boolean)
      .join("\n");
    const digits = phone.replace(/\D/g, "");
    if (
      !/^\+?[\d ()-]+$/.test(phone) ||
      digits.length < 10 ||
      digits.length > 15
    ) {
      setError("Enter a phone number with 10–15 digits.");
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
          email: value("email"),
          phone,
          ...(role ? { role } : {}),
          ...(useCase ? { use_case: useCase } : {}),
        }),
      });
      if (!response.ok) {
        setStatus("idle");
        setError(
          response.status === 400
            ? "Check your contact details and try again."
            : response.status === 429
              ? "Too many requests. Try again shortly."
              : "Could not submit your request. Try again.",
        );
        return;
      }
      setStatus("success");
    } catch {
      setStatus("idle");
      setError("Submission unconfirmed. Check your connection and try again.");
    } finally {
      clearTimeout(timeout);
      sending.current = false;
    }
  }

  if (!open) return null;

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
              Our team will contact you about access.
            </p>
            <button type="button" className="b-button primary" onClick={close}>
              Back to Subsecute <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        ) : (
          <>
            <h2 id="access-title">Request access.</h2>
            <p id="access-description" className={s.intro}>
              We usually reply within 24 hours.
            </p>
            <form onSubmit={submit} aria-busy={status === "sending"}>
              <fieldset disabled={status === "sending"} className={s.fields}>
                <div className={s.row}>
                  <label>
                    Full name
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
                    Work email
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
                    WhatsApp number
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
                <div className={s.row}>
                  <label>
                    Your role <span className={s.optional}>Optional</span>
                    <select name="role" defaultValue="">
                      <option value="">Select your role</option>
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
                    Industry <span className={s.optional}>Optional</span>
                    <input
                      name="industry"
                      placeholder="e.g. Technology"
                      maxLength={160}
                    />
                  </label>
                </div>
                <fieldset className={s.cardTypes}>
                  <legend>
                    What cards will you need?{" "}
                    <span className={s.optional}>Optional</span>
                  </legend>
                  <div className={s.cardOptions}>
                    {[
                      "Subscription cards",
                      "Usage-based cards",
                      "Expense cards",
                    ].map((card) => (
                      <label key={card}>
                        <input type="checkbox" name="cards" value={card} />
                        <span>{card}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
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
                    href="https://www.subsecute.com/privacy-policy.html"
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
