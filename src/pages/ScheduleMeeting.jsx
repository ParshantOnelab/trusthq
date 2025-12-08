import { useEffect } from "react";

export default function ScheduleMeetingPage() {
  // Load Calendly script when page loads
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="w-full min-h-screen flex justify-center items-start bg-white">
      <div
        className="calendly-inline-widget w-full max-w-5xl"
        data-url="https://calendly.com/neha-trusthq/30min"
        style={{ minHeight: "800px", height: "100vh" }}
      ></div>
    </div>
  );
}
