import { useProductTour } from "./useProductTour";
import { ArrowRight } from "@phosphor-icons/react";
import { steps } from "./content";
import { SetupArtwork } from "./SetupArtwork";
import "./ProductProof.css";
import "./CompositionSections.css";

export function WorkflowSection() {
  const tour = useProductTour(steps.length);
  const step = tour.selected;
  return (
    <section
      className="bc-workflow"
      id="how-it-works"
      aria-labelledby="workflow-title"
    >
      <div className="b-landing-section-intro">
        <h2 id="workflow-title">
          Set up your business account. <br />
          Issue your first card.
        </h2>
        <p>After our team arranges access, here’s how to set up.</p>
      </div>
      <div className="bc-workflow-guide" {...tour.regionProps}>
        <ol className="bc-setup-list" aria-label="Setup steps">
          {steps.map((item, index) => (
            <li key={item.number} data-active={step === index}>
              <button
                type="button"
                id={`setup-step-${index}`}
                aria-pressed={step === index}
                aria-controls="setup-panel"
                onClick={() => {
                  tour.select(index);
                  if (window.matchMedia("(max-width: 800px)").matches) {
                    document.getElementById("setup-panel")?.scrollIntoView({
                      behavior: tour.reducedMotion ? "instant" : "smooth",
                      block: "start",
                    });
                  }
                }}
              >
                <span className="bc-setup-number" aria-hidden="true">
                  {item.number}
                </span>
                <span>{item.title}</span>
                <ArrowRight size={18} aria-hidden="true" />
              </button>
              <p>{item.description}</p>
            </li>
          ))}
        </ol>
        <div
          className="bt-stage-stack bc-setup-artwork"
          id="setup-panel"
          role="region"
          aria-labelledby={`setup-step-${step}`}
          tabIndex={0}
        >
          {steps.map((item, index) => (
            <div
              className="bc-setup-scene"
              key={`${item.number}-${tour.revision}`}
              data-active={step === index}
              aria-hidden={step !== index}
              inert={step !== index}
            >
              <div
                className={
                  step === index ? "bt-stage-art bt-swap" : "bt-stage-art"
                }
              >
                <SetupArtwork active={index} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
