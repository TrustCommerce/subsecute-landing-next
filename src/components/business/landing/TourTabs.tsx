"use client";

import type { CSSProperties, ReactNode } from "react";
import type { ProductTour } from "./useProductTour";
import "./ProductMotion.css";

type TourTab = { label: string; leading?: ReactNode; planned?: boolean };

export function TourTabs({
  id,
  label,
  tabs,
  tour,
  variant = "line",
}: {
  id: string;
  label: string;
  tabs: TourTab[];
  tour: ProductTour;
  variant?: "line" | "steps" | "compact" | "documents";
}) {
  return (
    <div
      className={`bt-navigation bt-navigation-${variant}`}
      data-running={tour.running}
      style={
        {
          "--tour-duration": `${tour.interval}ms`,
          "--tour-index": tour.selected,
          "--tour-count": tabs.length,
        } as CSSProperties
      }
    >
      <div className="bt-tabs" role="tablist" aria-label={label}>
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            type="button"
            role="tab"
            id={`${id}-tab-${index}`}
            aria-controls={`${id}-panel`}
            aria-selected={tour.selected === index}
            tabIndex={tour.selected === index ? 0 : -1}
            onClick={() => tour.select(index)}
            onKeyDown={(event) => {
              const next =
                event.key === "ArrowRight"
                  ? (index + 1) % tabs.length
                  : event.key === "ArrowLeft"
                    ? (index + tabs.length - 1) % tabs.length
                    : event.key === "Home"
                      ? 0
                      : event.key === "End"
                        ? tabs.length - 1
                        : null;
              if (next === null) return;
              event.preventDefault();
              tour.select(next);
              document.getElementById(`${id}-tab-${next}`)?.focus();
            }}
          >
            {tab.leading && (
              <span className="bt-tab-leading" aria-hidden="true">
                {tab.leading}
              </span>
            )}
            <span>
              {tab.label}
              {tab.planned && <small className="bt-planned">Planned</small>}
            </span>
            <span className="bt-tab-track" aria-hidden="true">
              <span />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
