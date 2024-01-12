import { AnimatePresence, motion } from "framer-motion";

export default function ErrorMessage({ text }: { text: string }) {
  return (
    <AnimatePresence>
      <motion.p
        className="text-xs text-destructive font-medium"
        initial={{ scaleY: 0, y: -5 }}
        animate={{ scaleY: 1, y: 0 }}
        transition={{ duration: 0.1 }}
        exit={{ scaleY: 0, y: -5 }}
      >
        {text}
      </motion.p>
    </AnimatePresence>
  );
}
