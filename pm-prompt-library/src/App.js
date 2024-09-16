import React, { useState } from 'react';
import { Search } from 'lucide-react';

const prompts = [
  {
    id: 1,
    title: "Problem Statement Formulation",
    category: "Ideation",
    tags: ["problem-solving", "user-centric"],
    content: "What is the core problem we are trying to solve? Who experiences this problem most acutely? What would success look like for the user if this problem were solved?"
  },
  {
    id: 2,
    title: "User Empathy Mapping",
    category: "Customer Interview",
    tags: ["user-research", "empathy"],
    content: "Can you walk me through a typical day where you encounter [specific problem]? What are you thinking and feeling during this experience? What are the biggest pain points?"
  },
  {
    id: 3,
    title: "Feature Prioritization Matrix",
    category: "Spec Writing",
    tags: ["prioritization", "impact-analysis"],
    content: "For each proposed feature, evaluate: 1) Effort required to implement (1-10), 2) Potential impact on user satisfaction (1-10), 3) Alignment with business goals (1-10). How do these scores inform our prioritization?"
  },
  {
    id: 4,
    title: "Edge Case Scenario Planning",
    category: "Edge Cases",
    tags: ["risk-assessment", "user-scenarios"],
    content: "What are the most extreme or unusual ways a user might interact with this feature? How might the system behave under unexpected conditions (e.g., high load, data corruption, network issues)?"
  },
  {
    id: 5,
    title: "North Star Metric Definition",
    category: "Metrics",
    tags: ["KPI", "success-criteria"],
    content: "What single metric best captures the core value we are delivering to users? How does improving this metric directly translate to business success? What are the key leading indicators for this metric?"
  },
  {
    id: 6,
    title: "A/B Test Hypothesis Formulation",
    category: "Testing",
    tags: ["experimentation", "data-driven"],
    content: "We believe that [proposed change] will result in [expected outcome]. We will know this to be true when we see [specific metric] change by [amount] over a period of [time]."
  },
  {
    id: 7,
    title: "Competitive Feature Analysis",
    category: "Ideation",
    tags: ["market-research", "differentiation"],
    content: "For our top 3 competitors, what are their standout features? How do users respond to these features? What gaps or opportunities can we identify in the competitive landscape?"
  },
  {
    id: 8,
    title: "User Story Mapping",
    category: "Spec Writing",
    tags: ["user-flow", "MVP-definition"],
    content: "Describe the entire user journey for [specific task]. What are the essential steps? Which steps could be simplified or eliminated? What is the minimum viable flow to deliver value?"
  },
  {
    id: 9,
    title: "Stakeholder Requirement Gathering",
    category: "Customer Interview",
    tags: ["internal-alignment", "requirement-analysis"],
    content: "What are your top 3 priorities for this project? What concerns or risks do you foresee? How will this project success be measured from your perspective?"
  },
  {
    id: 10,
    title: "Technical Feasibility Assessment",
    category: "Edge Cases",
    tags: ["technical-constraints", "scalability"],
    content: "What are the potential technical limitations or challenges for implementing this feature? How might these affect scalability or performance? Are there any critical dependencies or integrations to consider?"
  }
];

const categories = ["All", "Ideation", "Customer Interview", "Spec Writing", "Edge Cases", "Metrics", "Testing"];

const PromptCard = ({ prompt }) => (
  <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <h3 className="text-lg font-semibold text-gray-800">{prompt.title}</h3>
    <p className="text-sm text-gray-600 mt-1">{prompt.category}</p>
    <div className="mt-2 flex flex-wrap gap-2">
      {prompt.tags.map((tag, index) => (
        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
          {tag}
        </span>
      ))}
    </div>
    <p className="text-gray-700 mt-2">{prompt.content}</p>
  </div>
);

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPrompts = prompts.filter(prompt => 
    (selectedCategory === "All" || prompt.category === selectedCategory) &&
    (prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     prompt.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
     prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-600">PrompTech PM</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">About</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 relative">
          <input
            type="text"
            placeholder="Search for prompts..."
            className="w-full p-3 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute right-3 top-3 text-gray-400" size={24} />
        </div>

        <div className="mb-8 flex space-x-4 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      </main>

      <footer className="bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-600">
          © 2024 PrompTech PM. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;