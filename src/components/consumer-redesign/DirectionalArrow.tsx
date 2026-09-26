const paths = {
  "up-right": "M6 18 18 6M6 6h12v12",
  down: "M12 4v16M5 13l7 7 7-7",
  "turn-right": "M5 4v12h15m-6-6 6 6-6 6",
} as const;

// SVG avoids Safari/iOS substituting coloured emoji for Unicode arrows.
export default function DirectionalArrow({
  direction = "up-right",
}: {
  direction?: keyof typeof paths;
}) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        flexShrink: 0,
      }}
    >
      <path d={paths[direction]} />
    </svg>
  );
}
