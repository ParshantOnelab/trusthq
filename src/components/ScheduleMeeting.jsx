import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function ScheduleMeeting({
  className,
  buttonText = "Book Live Demo",
}) {
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  // Load Calendly script
  useEffect(() => {
    if (!open) return;

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [open]);

  // Handle click outside to close
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  // Handle escape key to close
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  return (
    <>
      {/* Trigger Button */}
      <Button
        onClick={() => setOpen(true)}
        className={`bg-white text-trustiq-blue-900 hover:bg-trustiq-neutral-100 font-primary ${
          className || ""
        }`}
      >
        {buttonText}
      </Button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[100] p-4 transition-opacity duration-200"
          onClick={handleBackdropClick}
        >
          <div
            ref={modalRef}
            className="bg-white rounded-xl shadow-2xl w-full max-w-5xl relative max-h-[90vh] flex flex-col transform transition-all duration-200 scale-100"
          >
            {/* Header with Close Button */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Schedule a Meeting
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Calendly Widget Container */}
            <div className="flex-1 overflow-hidden rounded-b-xl">
              <div
                className="calendly-inline-widget w-full h-full"
                data-url="https://calendly.com/neha-trusthq/30min"
                style={{ minHeight: "600px", height: "90vh" }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
