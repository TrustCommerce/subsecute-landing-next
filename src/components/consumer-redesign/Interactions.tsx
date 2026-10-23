"use client";

import { useState } from "react";
import Link from "next/link";
import s from "./landing.module.css";
import { List, X } from "@phosphor-icons/react/dist/ssr";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className={s.mobileMenu}>
      <button
        className={s.menuButton}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? "Close" : "Menu"}
        {open ? (
          <X size={15} weight="bold" aria-hidden="true" />
        ) : (
          <List size={15} weight="bold" aria-hidden="true" />
        )}
      </button>
      {open && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className={s.mobileLinks}
        >
          {[
            ["#how-it-works", "How it works"],
            ["#everyday", "The everyday"],
            ["#your-people", "For your people"],
            ["/blog", "Blog"],
            ["#download", "Get the app"],
          ].map(([href, label]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
