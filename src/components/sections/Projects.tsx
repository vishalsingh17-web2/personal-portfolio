import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/portfolio-data";
import Tilt from "react-parallax-tilt";

export function Projects() {
  const [showAll, setShowAll] = useState(false);
  const displayedProjects = showAll ? projects : projects.slice(0, 6);

  return (
    <section id="projects" className="section-padding relative">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-sm font-medium text-blue-400 mb-2 tracking-wider">PROJECTS</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Featured <span className="text-blue-400">work</span>
          </h3>
          <p className="text-zinc-400 max-w-2xl text-sm sm:text-base">
            A selection of projects I've worked on, showcasing my skills and experience
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Tilt
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                scale={1.02}
                transitionSpeed={300}
                className="h-full"
              >
                <Card className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-all h-full group">
                  {/* Project Header */}
                  <div className="h-32 sm:h-40 bg-zinc-800/50 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-4xl sm:text-5xl font-bold text-zinc-700/50">
                        {project.title.charAt(0)}
                      </div>
                    </div>

                    {/* Hover Links */}
                    <div className="absolute inset-0 bg-zinc-900/90 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="w-5 h-5 text-white" />
                        </a>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-5 h-5 text-white" />
                        </a>
                      )}
                    </div>
                  </div>

                  <CardContent className="p-4 sm:p-6">
                    {/* Title */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h4 className="font-semibold text-white text-sm sm:text-base">{project.title}</h4>
                      <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-blue-400 transition-colors shrink-0" />
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-zinc-400 mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-1.5 mb-4">
                      {project.highlights.slice(0, 2).map((highlight, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs text-zinc-500"
                        >
                          <span className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                          <span className="line-clamp-1">{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs bg-zinc-800 text-zinc-400 border-0"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.techStack.length > 4 && (
                        <Badge
                          variant="secondary"
                          className="text-xs bg-zinc-800 text-zinc-400 border-0"
                        >
                          +{project.techStack.length - 4}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Tilt>
            </motion.div>
          ))}
        </div>

        {/* Show More Button */}
        {projects.length > 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-lg text-sm font-medium text-white transition-colors"
            >
              {showAll ? "Show Less" : `View All ${projects.length} Projects`}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
