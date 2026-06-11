import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

export function Lightbox({
  src,
  caption,
  onClose,
}: {
  src: string | null;
  caption?: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-ink/80 p-4 backdrop-blur-sm sm:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-cream/90 text-ink shadow-lg transition hover:scale-105"
            onClick={onClose}
            aria-label="Close preview"
          >
            <X size={20} />
          </button>
          <motion.figure
            className="flex max-h-full max-w-4xl flex-col items-center gap-4"
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={src}
              alt={caption ?? "Project figure"}
              className="max-h-[78vh] w-auto rounded-2xl bg-white object-contain shadow-2xl"
            />
            {caption && (
              <figcaption className="text-center text-sm text-cream/80">{caption}</figcaption>
            )}
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
