import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Code, Smartphone, Zap, Layers } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { personalInfo } from "@/data/portfolio-data";

const highlights = [
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Cross-platform apps with React Native & Flutter",
  },
  {
    icon: Code,
    title: "Clean Code",
    description: "Maintainable, scalable, well-documented code",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Optimized for speed and smooth UX",
  },
  {
    icon: Layers,
    title: "Full Stack",
    description: "End-to-end development capabilities",
  },
];

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={containerRef} id="about" className="section-padding relative">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-sm font-medium text-blue-400 mb-2 tracking-wider">ABOUT</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            A bit about <span className="text-blue-400">me</span>
          </h3>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left: About Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-zinc-900/50 rounded-xl p-6 sm:p-8 border border-zinc-800">
              <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
                {personalInfo.bio}
              </p>

              <div className="mt-8 pt-6 border-t border-zinc-800">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: "3+", label: "Years Exp" },
                    { value: "15+", label: "Projects" },
                    { value: "5+", label: "Clients" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs sm:text-sm text-zinc-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tech Stack Preview */}
            <div className="flex flex-wrap gap-2">
              {["React Native", "Flutter", "TypeScript", "Node.js", "Firebase", "Redux"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-xs sm:text-sm bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: Highlights Grid */}
          <motion.div style={{ y }} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-colors h-full">
                  <CardContent className="p-5 sm:p-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                    </div>
                    <h4 className="font-semibold text-white mb-2 text-sm sm:text-base">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-zinc-500">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
