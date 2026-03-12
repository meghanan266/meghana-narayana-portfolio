import { useEffect } from "react";
import { motion } from "framer-motion";

export default function LoadingScreen({ onComplete }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-dark-950"
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{ delay: 1.0, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
      onAnimationComplete={onComplete}
    >
      <motion.span
        className="font-display text-display-md text-apricot select-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      >
        MN
      </motion.span>
    </motion.div>
  );
}
