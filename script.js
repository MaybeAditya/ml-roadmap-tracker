const roadmap = [
  {
    title: "Phase 1: Data Plumbing & Statistical Grounding",
    topics: [
      "Pandas & NumPy",
      "EDA & Outlier Detection",
      "Missing Values",
      "Feature Scaling",
      "SQL Joins",
      "Window Functions",
      "Hypothesis Testing",
      "Probability Distributions"
    ]
  },
  {
    title: "Phase 2: Classical ML & Deep Learning",
    topics: [
      "Linear Regression",
      "Logistic Regression",
      "Decision Trees",
      "Random Forest",
      "XGBoost",
      "SVM",
      "Backpropagation",
      "Activation Functions"
    ]
  },
  {
    title: "Phase 3: Interview Checklist",
    topics: [
      "Bias-Variance Tradeoff",
      "L1 vs L2 Regularization",
      "Cross Validation",
      "Precision vs Recall",
      "F1 Score",
      "ROC-AUC",
      "SMOTE"
    ]
  },
  {
    title: "Phase 4: Projects",
    topics: [
      "Dataset Engineering",
      "Feature Engineering",
      "Train Multiple Models",
      "Scientific Evaluation",
      "FastAPI API",
      "Docker Deployment",
      "WebSockets"
    ]
  },
  {
    title: "Phase 5: MLOps & Modern AI",
    topics: [
      "Git & GitHub",
      "GitHub Actions",
      "RAG Pipelines",
      "Vector Databases",
      "ReAct Agents",
      "Tool Calling"
    ]
  }
];

const container = document.getElementById("roadmap");

let savedProgress =
  JSON.parse(localStorage.getItem("ml-roadmap")) || {};

function updateProgress() {
  let total = 0;
  let completed = 0;

  roadmap.forEach((phase) => {
    phase.topics.forEach((topic) => {
      total++;
      if (savedProgress[topic]) completed++;
    });
  });

  const percent = Math.round((completed / total) * 100);

  document.getElementById(
    "progress-percent"
  ).innerText = `${percent}%`;

  document.getElementById(
    "progress-fill"
  ).style.width = `${percent}%`;
}

roadmap.forEach((phase) => {
  const phaseDiv = document.createElement("div");
  phaseDiv.className = "phase";

  const completedTopics = phase.topics.filter(
    (t) => savedProgress[t]
  ).length;

  phaseDiv.innerHTML = `
    <div class="phase-header">
      <div class="phase-title">${phase.title}</div>
      <div class="phase-progress">
        ${completedTopics}/${phase.topics.length}
      </div>
    </div>

    <div class="task-grid">
      ${phase.topics
        .map(
          (topic) => `
          <div class="task ${
            savedProgress[topic] ? "completed" : ""
          }" data-topic="${topic}">
            <span>${topic}</span>
          </div>
        `
        )
        .join("")}
    </div>
  `;

  container.appendChild(phaseDiv);
});

document.querySelectorAll(".task").forEach((task) => {
  task.addEventListener("click", () => {
    const topic = task.dataset.topic;

    savedProgress[topic] = !savedProgress[topic];

    localStorage.setItem(
      "ml-roadmap",
      JSON.stringify(savedProgress)
    );

    task.classList.toggle("completed");

    updateProgress();
  });
});

updateProgress();