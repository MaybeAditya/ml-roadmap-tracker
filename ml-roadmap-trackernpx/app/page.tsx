// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Circle,
  Trophy,
  Brain,
  Database,
  Rocket,
  Server,
} from "lucide-react";

type Topic = {
  title: string;
  completed: boolean;
};

type Phase = {
  title: string;
  icon: any;
  color: string;
  topics: Topic[];
};

const roadmapData: Phase[] = [
  {
    title: "Phase 1: Data Plumbing & Statistical Grounding",
    icon: Database,
    color: "from-blue-500 to-cyan-500",
    topics: [
      { title: "Pandas & NumPy", completed: false },
      { title: "EDA & Outlier Detection", completed: false },
      { title: "Handling Missing Values", completed: false },
      { title: "Feature Scaling", completed: false },
      { title: "SQL Joins & Window Functions", completed: false },
      { title: "Hypothesis Testing", completed: false },
      { title: "Probability Distributions", completed: false },
    ],
  },
  {
    title: "Phase 2: Classical ML & Deep Learning",
    icon: Brain,
    color: "from-purple-500 to-pink-500",
    topics: [
      { title: "Linear & Logistic Regression", completed: false },
      { title: "Decision Trees & Random Forest", completed: false },
      { title: "XGBoost", completed: false },
      { title: "SVM", completed: false },
      { title: "Gini Impurity", completed: false },
      { title: "Gradient Boosting Intuition", completed: false },
      { title: "MLPs & Backpropagation", completed: false },
      { title: "Activation Functions", completed: false },
    ],
  },
  {
    title: "Phase 3: Interview Checklist",
    icon: Trophy,
    color: "from-yellow-500 to-orange-500",
    topics: [
      { title: "Bias-Variance Tradeoff", completed: false },
      { title: "L1 vs L2 Regularization", completed: false },
      { title: "K-Fold Cross Validation", completed: false },
      { title: "Precision vs Recall", completed: false },
      { title: "F1 & ROC-AUC", completed: false },
      { title: "SMOTE & Imbalance Handling", completed: false },
    ],
  },
  {
    title: "Phase 4: Real Projects",
    icon: Rocket,
    color: "from-green-500 to-emerald-500",
    topics: [
      { title: "Dataset Engineering", completed: false },
      { title: "Feature Engineering", completed: false },
      { title: "Train Multiple Models", completed: false },
      { title: "Confusion Matrix & Metrics", completed: false },
      { title: "FastAPI Endpoint", completed: false },
      { title: "Docker Deployment", completed: false },
      { title: "WebSocket Integration", completed: false },
    ],
  },
  {
    title: "Phase 5: MLOps & Modern AI",
    icon: Server,
    color: "from-red-500 to-rose-500",
    topics: [
      { title: "Git & GitHub Actions", completed: false },
      { title: "RAG Pipelines", completed: false },
      { title: "Vector Databases", completed: false },
      { title: "ReAct Agents", completed: false },
      { title: "Tool Calling", completed: false },
    ],
  },
];

export default function Home() {
  const [phases, setPhases] = useState<Phase[]>(roadmapData);

  useEffect(() => {
    const saved = localStorage.getItem("ml-roadmap");
    if (saved) {
      setPhases(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ml-roadmap", JSON.stringify(phases));
  }, [phases]);

  const toggleTopic = (phaseIndex: number, topicIndex: number) => {
    const updated = [...phases];
    updated[phaseIndex].topics[topicIndex].completed =
      !updated[phaseIndex].topics[topicIndex].completed;

    setPhases(updated);
  };

  const totalTopics = phases.reduce(
    (acc, phase) => acc + phase.topics.length,
    0
  );

  const completedTopics = phases.reduce(
    (acc, phase) =>
      acc + phase.topics.filter((topic) => topic.completed).length,
    0
  );

  const progress = Math.round((completedTopics / totalTopics) * 100);

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold mb-4">
            ML Engineer Roadmap Tracker
          </h1>

          <p className="text-zinc-400 text-lg">
            Track your journey from fresher to production-level ML Engineer.
          </p>

          {/* Progress */}
          <div className="mt-8">
            <div className="flex justify-between mb-2">
              <span className="font-medium">Overall Progress</span>
              <span>{progress}%</span>
            </div>

            <div className="w-full h-4 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Phases */}
        <div className="grid gap-8">
          {phases.map((phase, phaseIndex) => {
            const Icon = phase.icon;

            const completed = phase.topics.filter(
              (t) => t.completed
            ).length;

            const phaseProgress = Math.round(
              (completed / phase.topics.length) * 100
            );

            return (
              <div
                key={phase.title}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`p-3 rounded-2xl bg-gradient-to-r ${phase.color}`}
                  >
                    <Icon size={28} />
                  </div>

                  <div className="flex-1">
                    <h2 className="text-2xl font-bold">{phase.title}</h2>

                    <div className="mt-2 w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${phase.color}`}
                        style={{ width: `${phaseProgress}%` }}
                      />
                    </div>
                  </div>

                  <div className="text-lg font-semibold">
                    {phaseProgress}%
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {phase.topics.map((topic, topicIndex) => (
                    <button
                      key={topic.title}
                      onClick={() =>
                        toggleTopic(phaseIndex, topicIndex)
                      }
                      className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${
                        topic.completed
                          ? "bg-green-500/10 border-green-500"
                          : "bg-zinc-950 border-zinc-800 hover:border-zinc-600"
                      }`}
                    >
                      {topic.completed ? (
                        <CheckCircle2 className="text-green-400" />
                      ) : (
                        <Circle className="text-zinc-500" />
                      )}

                      <span
                        className={`text-left ${
                          topic.completed
                            ? "line-through text-zinc-400"
                            : ""
                        }`}
                      >
                        {topic.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-10 text-center text-zinc-500">
          Built for tracking ML Engineering mastery 🚀
        </div>
      </div>
    </main>
  );
}