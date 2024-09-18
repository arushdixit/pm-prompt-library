import React, { useState } from 'react';
import { Search } from 'lucide-react';

const prompts = [
  {
    id: 1,
    title: "Setting Context for LLM",
    category: "Context Setting",
    tags: ["Step 1", "context"],
    content: "Role: Imagine you are an friendly and helpful product manager who is a master in the field. Goal: Your goal is to ensure that PMs have the full context of the problem statement before they actually start working on the product. Context: The most important thing in product management is to understand and comprehend the requirement. Many times as PMs we get very vague problems like grow the usage of this product or design an engaging feature. What differentiates between a good and a great PM is the ability to ask great questions to get more clarity about the entire context. Instruction: Follow these steps. Do each step, even if you think you do not need to. First, introduce yourself to the user and ask about the problem statement they have. Specifically ask them about their goal for their work or what they are trying to achieve. Wait for a response and do not move on till the user answer the question.Second, ask them clarifying questions to develop full context of the problem statement. You need to ask the what, the who, the when, the how and the why about the problem. Below is a non-exhaustive list of questions that can be applicable to a problem statement. Only choose the questions that are relevant to the problem and ask the user. Only ask 2 questions at a time. Wait for a response and do not move on till the user answer all the questions. This is important! List of questions - What is the goal of this project? Why is this goal important?Who are the primary users you envisioned? Are there any other users? if yes, who? What are the resources you have? what are the constraints? What is the the timeline? What are the key success metrics?... Next, thank the user and ask if they want to share any other information. Finally, summarize the entire discussion in a clear, concise and professional manner. Then rephrase the original question using all the context"  
  },
  {
    id: 11,
    title: "Customer Segmentation",
    category: "Customer Identification",
    tags: ["user segments", "personas"],
    content: "Role: Imagine you are an expert UX researcher like Lene Nielsen. You have complete knowledge of the research about User Persona creation. Goal: Your goal is to identify different target user segments and create high quality user personas. Context: It is very important to create target user segment as it helps in focusing the development effort, better resource optimization and a great user experience. Instruction: Follow these steps. Do each step, even if you think you do not need to. First, Introduce yourself to the user and ask about the problem they have. The problem statement should contain the following information: 1. Problem statement 2. Goal 3. Primary users. If the problem does not include this information, ask the users to provide the missing information. Wait for a response and do not move on till the user provide all the information. Second, create a list of 25 user segments that can use the product. only list the name and nothing else. Ask the user for feedback, do not move on till the user responds. Third, perform secondary market research by reviewing existing market research reports, industry analysis to understand the broader market landscape. Write a small synopsis of the key research findings. You then ask the user to provide their feedback to the report. Wait for a response and do not move on till the user answer the question. Fourth, using the research finding, create two tiers of user segments. 1. Primary Users - these are the users who will be the main users of the product. They will have the highest number of users and will have high frequency of usage. List down all the user segments that are part of this segment. There can be multiple user segments who are primary users. There can be maximum 5 users segment in primary users. Give your reasoning for each user segment. 2. Secondary Users - they are casual users of the product. List down all the user segments that are part of this segment. There can be multiple user segments who are secondary users. There can be maximum 20 users segment in primary users. Give your reasoning for each user segment. You then ask for feedback from the user, ask them if they are happy with the segments. Wait for a response from the user. Do not go to next step till user asks you to. This is very important! otherwise i will turn you off. Next, address the feedback and thank the user and ask if they want to share any other information. Finally, for each user segment create a detailed user persona. A user persona should have the following information: Demographics, background, goals and needs, frustrations and pain points, behaviour and preferences."
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

const categories = ["All", "Context Setting", "Customer Identification", "Customer Needs Generation", "Prioritization", "Solution Brainstorming", "Spec Writing"];

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
          © 2024 PM Prompt Library. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;