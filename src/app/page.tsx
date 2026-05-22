"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, PlusSquare, User, Filter, Zap } from "lucide-react";
import { INITIAL_PROJECTS, MORE_PROJECTS } from "@/data/mock";
import { ProjectCard } from "@/components/ProjectCard";

const ALL_TAGS = ["All", "#3D", "#UI", "#Motion", "#Architecture", "#Web", "#Mobile"];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter(p => p.tags.includes(activeFilter));
  }, [projects, activeFilter]);

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setProjects(prev => [...prev, ...MORE_PROJECTS]);
      setHasMore(false);
      setIsLoading(false);
    }, 800);
  };

  return (
    <main className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b-4 border-foreground shadow-brutal-sm px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="text-brand-blue w-8 h-8 shrink-0" strokeWidth={3} />
          <h1 className="font-display font-black text-2xl md:text-3xl tracking-tighter uppercase whitespace-nowrap">
            SYNAPSE <span className="text-brand-pink text-opacity-80">{"//"}</span> DISCOVER THE FUTURE.
          </h1>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <button className="flex items-center gap-2 font-bold px-4 py-2 border-2 border-foreground bg-brand-yellow hover:bg-brand-pink hover:text-white transition-colors shadow-brutal-sm">
            <PlusSquare className="w-5 h-5" /> Create
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide mb-8">
          <div className="flex items-center justify-center p-2 border-2 border-foreground bg-neutral-100 shrink-0">
            <Filter className="w-5 h-5" />
          </div>
          {ALL_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`px-4 py-2 border-2 border-foreground font-bold whitespace-nowrap transition-all ${
                activeFilter === tag 
                  ? "bg-brand-blue text-white shadow-none translate-y-1 translate-x-1" 
                  : "bg-white hover:bg-neutral-100 shadow-brutal-sm hover:shadow-none hover:translate-y-1 hover:translate-x-1"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Masonry Gallery */}
        {/* Using css columns for masonry. Framer motion layout plays nicely most of the time if wrapped right */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence>
            {filteredProjects.map(project => (
              <div key={project.id} className="break-inside-avoid">
                <ProjectCard project={project} />
              </div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="py-20 text-center flex flex-col items-center">
            <h3 className="font-display font-bold text-2xl mb-2">No projects found.</h3>
            <p className="text-neutral-500">Try selecting a different filter.</p>
          </div>
        )}

        {/* Load More Sim */}
        {hasMore && filteredProjects.length > 0 && activeFilter === "All" && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={loadMore}
              disabled={isLoading}
              className={`font-display font-black text-xl px-8 py-4 border-4 border-foreground shadow-brutal hover:shadow-brutal-lg hover:-translate-y-1 hover:-translate-x-1 transition-all uppercase flex items-center gap-3 ${
                isLoading ? "bg-neutral-200 text-neutral-500 cursor-not-allowed" : "bg-brand-pink text-white"
              }`}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <Filter className="w-6 h-6" />
                </motion.div>
              ) : "Load More"}
            </button>
          </div>
        )}
      </div>

      {/* Floating Navigation */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <nav className="flex items-center gap-2 bg-white border-4 border-foreground p-2 shadow-brutal-lg rounded-2xl">
          <NavButton icon={<Compass />} label="Explore" active />
          <NavButton icon={<PlusSquare />} label="Create" />
          <NavButton icon={<User />} label="Profile" />
        </nav>
      </div>
    </main>
  );
}

function NavButton({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <button
      className={`flex flex-col items-center justify-center w-16 h-14 rounded-xl transition-colors ${
        active ? "bg-brand-blue text-white" : "hover:bg-neutral-100 text-foreground"
      }`}
    >
      <div className={`${active ? "animate-bounce" : ""}`}>
        {icon}
      </div>
      <span className="text-[10px] font-bold mt-1 uppercase tracking-wider">{label}</span>
    </button>
  );
}
