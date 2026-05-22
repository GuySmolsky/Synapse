"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

export function LikeButton() {
  const [liked, setLiked] = useState(false);
  const [clicks, setClicks] = useState(0);

  const handleLike = () => {
    setLiked(!liked);
    if (!liked) {
      setClicks((c) => c + 1);
    }
  };

  const confettiParticles = Array.from({ length: 8 });

  return (
    <div className="relative flex items-center justify-center">
      <button
        onClick={handleLike}
        className="relative z-10 p-2 rounded-full hover:bg-neutral-100 transition-colors focus:outline-none"
      >
        <motion.div whileTap={{ scale: 0.8 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
          <Heart
            className={`w-6 h-6 transition-colors ${liked ? "fill-brand-pink text-brand-pink" : "text-foreground"}`}
          />
        </motion.div>
      </button>

      <AnimatePresence>
        {liked && (
          <div className="absolute inset-0 pointer-events-none">
            {confettiParticles.map((_, i) => (
              <motion.div
                key={`confetti-${clicks}-${i}`}
                initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: 0,
                  scale: Math.random() * 0.5 + 0.5,
                  x: Math.cos((i * 45 * Math.PI) / 180) * (Math.random() * 30 + 20),
                  y: Math.sin((i * 45 * Math.PI) / 180) * (Math.random() * 30 + 20),
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full"
                style={{
                  backgroundColor: ["#FB2576", "#2563EB", "#FBBF24", "#000000"][Math.floor(Math.random() * 4)],
                  marginLeft: -4,
                  marginTop: -4,
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
