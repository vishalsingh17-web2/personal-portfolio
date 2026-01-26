import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GitFork, Star, ExternalLink, Code2, Calendar, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { personalInfo } from "@/data/portfolio-data";

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  topics: string[];
}

interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  bio: string;
}

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Dart: "#00B4AB",
  Java: "#b07219",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
  "C++": "#f34b7d",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
};

export function GitHubSection() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const username = personalInfo.social.github.split("/").pop() || "vishalsingh17-web2";

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Fetch user stats
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userRes.json();
        setStats(userData);

        // Fetch repositories
        const reposRes = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=30`
        );
        const reposData = await reposRes.json();
        setRepos(reposData.filter((repo: Repository) => !repo.name.includes(".github")));
      } catch (error) {
        console.error("Failed to fetch GitHub data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, [username]);

  const displayedRepos = showAll ? repos : repos.slice(0, 6);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <section id="github" className="section-padding relative">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-sm font-medium text-blue-400 mb-2 tracking-wider">OPEN SOURCE</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            My GitHub <span className="text-blue-400">Activity</span>
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore my open source contributions and personal projects
          </p>
        </motion.div>

        {/* GitHub Stats */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12"
          >
            {[
              { label: "Repositories", value: stats.public_repos, icon: Code2 },
              { label: "Followers", value: stats.followers, icon: Activity },
              { label: "Following", value: stats.following, icon: Activity },
              { label: "Stars Earned", value: repos.reduce((acc, repo) => acc + repo.stargazers_count, 0), icon: Star },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-colors">
                  <CardContent className="p-4 md:p-6 text-center">
                    <stat.icon className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-2 text-blue-400" />
                    <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Repository Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="bg-zinc-900/50 border-zinc-800 animate-pulse">
                <CardContent className="p-6">
                  <div className="h-5 bg-zinc-800 rounded w-3/4 mb-3" />
                  <div className="h-4 bg-zinc-800 rounded w-full mb-2" />
                  <div className="h-4 bg-zinc-800 rounded w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {displayedRepos.map((repo, index) => (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    <Card className="bg-zinc-900/50 border-zinc-800 hover:border-blue-500/50 transition-all duration-300 h-full group">
                      <CardContent className="p-4 md:p-6 flex flex-col h-full">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <h4 className="font-semibold text-white group-hover:text-blue-400 transition-colors truncate">
                            {repo.name}
                          </h4>
                          <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                        </div>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">
                          {repo.description || "No description provided"}
                        </p>

                        {/* Topics */}
                        {repo.topics && repo.topics.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {repo.topics.slice(0, 3).map((topic) => (
                              <Badge
                                key={topic}
                                variant="secondary"
                                className="text-xs bg-blue-500/10 text-blue-400 border-0"
                              >
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {/* Footer */}
                        <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-3 border-t border-zinc-800">
                          <div className="flex items-center gap-3">
                            {repo.language && (
                              <span className="flex items-center gap-1">
                                <span
                                  className="w-2.5 h-2.5 rounded-full"
                                  style={{
                                    backgroundColor: languageColors[repo.language] || "#8b8b8b",
                                  }}
                                />
                                {repo.language}
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <Star className="w-3.5 h-3.5" />
                              {repo.stargazers_count}
                            </span>
                            <span className="flex items-center gap-1">
                              <GitFork className="w-3.5 h-3.5" />
                              {repo.forks_count}
                            </span>
                          </div>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(repo.updated_at)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Show More Button */}
            {repos.length > 6 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mt-8"
              >
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-lg text-sm font-medium transition-colors"
                >
                  {showAll ? "Show Less" : `Show All ${repos.length} Repositories`}
                </button>
              </motion.div>
            )}
          </>
        )}

        {/* GitHub Contribution Graph Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href={personalInfo.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View Full GitHub Profile
          </a>
        </motion.div>
      </div>
    </section>
  );
}
