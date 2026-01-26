import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { experiences } from "@/data/portfolio-data";

export function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [showAll, setShowAll] = useState(false);

  const displayedExperiences = showAll ? experiences : experiences.slice(0, 3);

  return (
    <section id="experience" className="section-padding relative">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-sm font-medium text-blue-400 mb-2 tracking-wider">EXPERIENCE</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Work <span className="text-blue-400">history</span>
          </h3>
          <p className="text-zinc-400 max-w-2xl text-sm sm:text-base">
            My professional journey building products and working with amazing teams
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto space-y-4">
          {displayedExperiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer ${
                  expandedIndex === index ? "border-blue-500/30" : ""
                }`}
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              >
                <CardContent className="p-4 sm:p-6">
                  {/* Header - Always visible */}
                  <div className="flex items-start gap-3 sm:gap-4">
                    {/* Logo */}
                    <div className="shrink-0">
                      {exp.logo ? (
                        <img
                          src={exp.logo}
                          alt={exp.company}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover bg-zinc-800"
                        />
                      ) : (
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                          <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-grow min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                        <div>
                          <h4 className="font-semibold text-white text-sm sm:text-base truncate">{exp.title}</h4>
                          <p className="text-xs sm:text-sm text-zinc-400">{exp.role}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-zinc-800 text-zinc-300 text-xs whitespace-nowrap">
                            {exp.duration}
                          </Badge>
                          {expandedIndex === index ? (
                            <ChevronUp className="w-4 h-4 text-zinc-500" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-zinc-500" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {expandedIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-zinc-800"
                    >
                      <ul className="space-y-2 mb-4">
                        {exp.description.map((point, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {exp.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="outline"
                            className="text-xs border-zinc-700 text-zinc-400"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      {/* Company Link */}
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-3 h-3" />
                        View Company
                      </a>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Show More Button */}
        {experiences.length > 3 && (
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
              {showAll ? "Show Less" : `Show All ${experiences.length} Positions`}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
