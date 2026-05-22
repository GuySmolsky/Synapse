"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MessageSquare, Share2 } from "lucide-react";
import { LikeButton } from "./LikeButton";
import { AvatarHoverCard } from "./AvatarHoverCard";

interface Author {
  name: string;
  avatar: string;
  location: string;
  bio: string;
  latestWorks: string[];
}

interface Project {
  id: number;
  title: string;
  author: Author;
  image: string;
  likes: number;
  tags: string[];
  height: number;
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white border-4 border-foreground shadow-brutal hover:shadow-brutal-lg hover:-translate-y-1 hover:-translate-x-1 transition-all duration-300 flex flex-col mb-6"
    >
      <div 
        className="w-full relative border-b-4 border-foreground overflow-hidden group"
        style={{ height: project.height }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
        />
        <div className="absolute inset-0 bg-brand-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-multiply" />
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-grow bg-white">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <AvatarHoverCard author={project.author} />
            <div className="flex flex-col">
              <h3 className="font-display font-bold text-lg leading-tight line-clamp-1">{project.title}</h3>
              <p className="text-sm font-medium text-neutral-600">by {project.author.name}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 bg-brand-yellow/30 border-2 border-foreground text-xs font-bold uppercase tracking-wider">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between border-t-2 border-foreground pt-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 font-bold text-sm">
              <LikeButton />
              <span>{project.likes}</span>
            </div>
            <button className="flex items-center gap-1 font-bold text-sm hover:text-brand-blue transition-colors group">
              <MessageSquare className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
              <span>24</span>
            </button>
          </div>
          <button className="hover:text-brand-pink transition-colors">
            <Share2 className="w-5 h-5 hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
