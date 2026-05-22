"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import Image from "next/image";

interface Author {
  name: string;
  avatar: string;
  location: string;
  bio: string;
  latestWorks: string[];
}

export function AvatarHoverCard({ author }: { author: Author }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-10 h-10 rounded-full border-2 border-foreground overflow-hidden cursor-pointer shadow-brutal-sm hover:shadow-brutal-hover hover:translate-x-brutal-active hover:translate-y-brutal-active transition-all bg-white relative z-20">
        <Image src={author.avatar} alt={author.name} width={40} height={40} className="object-cover w-full h-full" />
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-full mb-3 left-0 w-64 bg-white border-2 border-foreground shadow-brutal p-4 z-50 pointer-events-none"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full border-2 border-foreground overflow-hidden">
                <Image src={author.avatar} alt={author.name} width={48} height={48} className="object-cover w-full h-full" />
              </div>
              <div>
                <h4 className="font-display font-bold text-lg leading-tight">{author.name}</h4>
                <p className="text-xs text-neutral-500 font-medium flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3" /> {author.location}
                </p>
              </div>
            </div>
            <p className="text-sm font-medium leading-relaxed mb-4">{author.bio}</p>
            <div className="flex gap-2">
              {author.latestWorks.map((work, idx) => (
                <div key={idx} className="w-1/3 aspect-square border-2 border-foreground overflow-hidden shadow-brutal-sm">
                  <Image src={work} alt={`Latest work ${idx + 1}`} width={80} height={80} className="object-cover w-full h-full" />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
