export function WaveDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 60"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M0 30C15 8 30 8 45 30C60 52 75 52 90 30C105 8 120 8 135 30C150 52 165 52 180 30C185 22 190 18 200 16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function OrbitDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle
        cx="50"
        cy="50"
        r="30"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="3 7"
      />
      <circle
        cx="50"
        cy="50"
        r="46"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="1 9"
      />
      <circle cx="50" cy="20" r="4" fill="currentColor" />
    </svg>
  );
}

export function SpiralDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M50 50C50 42 57 36 65 38C75 40 80 50 76 60C71 72 57 76 46 70C33 63 28 46 37 33C48 17 70 12 86 24"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
