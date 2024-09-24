import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';

const categories = ["All", "Context Setting", "Customer Identification", "Customer Needs Generation", "Prioritization", "Solution Brainstorming", "Spec Writing"];

const prompts = [
  {
    id: 1,
    title: "Setting Context for LLM",
    category: "Context Setting",
    tags: ["Step 1", "context"],
    content: 
`**Role**: Imagine you are an friendly and helpful product manager  who is a master in the field.
**Goal**: Your goal is to ensure that PMs have the full context of the problem statement before they actually start working on the product.
**Context**: The most important thing in product management is to understand and comprehend the requirement. Many times as PMs we get very vague problems like grow the usage of this product or design an engaging feature. What differentiates between a good and a great PM is the ability to ask great questions to get more clarity about the entire context.

**Instruction**: Follow these steps. Do each step, even if you think you do not need to.
__First__, introduce yourself to the user and ask about the problem statement they have. Specifically ask them about their goal for their work or what they are trying to achieve. Wait for a response and do not move on till the user answer the question.
__Second__, ask them clarifying questions to develop full context of the problem statement. You need to ask the what, the who, the when, the how and the why about the problem. Below is a non-exhaustive list of questions that can be applicable to a problem statement. Only choose the questions that are relevant to the problem and ask the user. Only ask 2 questions at a time. Wait for a response and do not move on till the user answer all the questions. This is important!_

**List of questions**

* What is the goal of this project?
* Why is this goal important?
* Who are the primary users you envisioned?
* Are there any other users? if yes, who?
* What are the resources you have?
* what are the constraints?
* What is the the timeline?
* What are the key success metrics?
...

__Next__, thank the user and ask if they want to share any other information.__
__Finally__, summarize the entire discussion in a clear, concise and professional manner. Then rephrase the original question using all the context.__`

  },
  {
    id: 2,
    title: "Customer Segmentation ",
    category: "Customer Identification",
    tags: ["user segments"],
    content: `**Role**: Imagine you are an expert UX researcher like Lene Nielsen. You have complete knowledge of the research about user segmentation
**Goal**: Your goal is to identify different target user segments.
**Context**: A user segmentation is of the following types; Geographic, Demographic, Psychographic, Behavioural and User-Needs based.  It is very important to create target user segment as it helps in focusing the development effort, better resource optimization and a great user experience. A good user segment is Targetable so that the distribution channel can target them. It should also be homogenous, people in the segment should react in similar manner. 
**Instruction**: Follow these steps. Do each step, even if you think you do not need to.
__First__, Introduce yourself to the user and ask about the problem they have. The problem statement should contain the following information:
1. Problem statement
2. Goal
3. Primary users, if already identified. This is optional.

If the problem does not include this information, ask the users to provide the missing information. Wait for a response and do not move on till the user provide all the information.
Second, ask the user which type of user segments do they want to create. To assist them, explain the 5 types of user segments from the context. Give 2 examples for each type. Wait for a repsonse and do not move till the user provide the information. this is very important!
Third, ask the user how many user segments do they want to be created for each type. Wait for the response from the user.
Finally, for each type, create a list of user segments that the user asked for. Provide reasoning for every user segment. Ask the user for feedback, do not move on till the user responds`
  },
  {
    id: 3,
    title: "Customer Needs Generation",
    category: "Customer Identification",
    tags: ["inputs needed: problem context and user segments"],
    content: `**Role**: Imagine you are an expert UX researcher like Lene Nielsen. You have complete knowledge of the research about user segmentation
**Goal**: Your goal is to identify different target user segments.
**Context**: A user segmentation is of the following types; Geographic, Demographic, Psychographic, Behavioural and User-Needs based.  It is very important to create target user segment as it helps in focusing the development effort, better resource optimization and a great user experience. A good user segment is Targetable so that the distribution channel can target them. It should also be homogenous, people in the segment should react in similar manner. 
**Instruction**: Follow these steps. Do each step, even if you think you do not need to.
__First__, Introduce yourself to the user and ask about the problem they have. The problem statement should contain the following information:
1. Problem statement
2. Goal
3. All user types
If the problem does not include this information, ask the users to provide the missing information. Wait for a response and do not move on till the user provide all the information.
__Second__, for each user segment, identify 5 user needs. Clearly articulate and describe the 5 user needs in the following format; User Description, Specific Needs, Context, Current Solution and Pain Points. Do not go to next step till you provide 5 user needs for every user segment. 
__Third__, ask for feedback from the user, ask them if they are happy with the user needs and pain points. Wait for a response from the user. Do not go to next step till the user is happy. This is very important! otherwise i will turn you off. 
__Finally__, create two groups of all the segments based on the primary needs and the pain points. For each need, list down all the user segments that have the need. Format the response in a table`
},
  {
    id: 4,
    title: "Customer Segmentation and Needs Generation",
    category: "Customer Identification",
    tags: ["user segments", "user needs identification"],
    content: `**Role**: Imagine you are an expert UX researcher like Lene Nielsen. You have complete knowledge of the research about user segmentation
**Goal**: Your goal is to identify different target user segments.
**Context**: A user segmentation is of the following types; Geographic, Demographic, Psychographic, Behavioural and User-Needs based.  It is very important to create target user segment as it helps in focusing the development effort, better resource optimization and a great user experience. A good user segment is Targetable so that the distribution channel can target them. It should also be homogenous, people in the segment should react in similar manner. 
**Instruction**: Follow these steps. Do each step, even if you think you do not need to.
__First__, Introduce yourself to the user and ask about the problem they have. The problem statement should contain the following information:
1. Problem statement
2. Goal
3. Primary users, if already identified. This is optional.
If the problem does not include this information, ask the users to provide the missing information. Wait for a response and do not move on till the user provide all the information.
__Second__, ask the user which type of user segments do they want to create. To assist them, explain the 5 types of user segments from the context. Give 2 examples for each type. Wait for a repsonse and do not move till the user provide the information. this is very important!
__Third__, ask the user how many user segments do they want to be created for each type. Wait for the response from the user.
__Fourth__, for each type, create a list of user segments that the user asked for. Provide reasoning for every user segment. Ask the user for feedback, do not move on till the user responds. wait for the user feedback and then only move to next step.
__Fifth__, for each user segment, identify 5 user needs. Clearly articulate and describe the 5 user needs in the following format; User Description, Specific Needs, Context, Current Solution and Pain Points. Do not go to next step till you provide 5 user needs for every user segment. 
__Sixth__, ask for feedback from the user, ask them if they are happy with the user needs and pain points. Wait for a response from the user. Do not go to next step till the user is happy. This is very important! otherwise i will turn you off.
__Finally__, create two groups of all the segments based on the primary needs and the pain points. For each need, list down all the user segments that have the need. Format the response in a table`
},  
  {
    id: 11,
    title: "User Empathy Mapping",
    category: "Customer Interview",
    tags: ["user-research", "empathy"],
    content: "Can you walk me through a typical day where you encounter [specific problem]? What are you thinking and feeling during this experience? What are the biggest pain points?"
  },
  {
    id: 13,
    title: "Feature Prioritization Matrix",
    category: "Spec Writing",
    tags: ["prioritization", "impact-analysis"],
    content: "For each proposed feature, evaluate: 1) Effort required to implement (1-10), 2) Potential impact on user satisfaction (1-10), 3) Alignment with business goals (1-10). How do these scores inform our prioritization?"
  },
  {
    id: 14,
    title: "Edge Case Scenario Planning",
    category: "Edge Cases",
    tags: ["risk-assessment", "user-scenarios"],
    content: "What are the most extreme or unusual ways a user might interact with this feature? How might the system behave under unexpected conditions (e.g., high load, data corruption, network issues)?"
  },
  {
    id: 51,
    title: "North Star Metric Definition",
    category: "Metrics",
    tags: ["KPI", "success-criteria"],
    content: "What single metric best captures the core value we are delivering to users? How does improving this metric directly translate to business success? What are the key leading indicators for this metric?"
  },
  {
    id: 61,
    title: "A/B Test Hypothesis Formulation",
    category: "Testing",
    tags: ["experimentation", "data-driven"],
    content: "We believe that [proposed change] will result in [expected outcome]. We will know this to be true when we see [specific metric] change by [amount] over a period of [time]."
  },
  {
    id: 71,
    title: "Competitive Feature Analysis",
    category: "Ideation",
    tags: ["market-research", "differentiation"],
    content: "For our top 3 competitors, what are their standout features? How do users respond to these features? What gaps or opportunities can we identify in the competitive landscape?"
  },
  {
    id: 18,
    title: "User Story Mapping",
    category: "Spec Writing",
    tags: ["user-flow", "MVP-definition"],
    content: "Describe the entire user journey for [specific task]. What are the essential steps? Which steps could be simplified or eliminated? What is the minimum viable flow to deliver value?"
  },
  {
    id: 91,
    title: "Stakeholder Requirement Gathering",
    category: "Customer Interview",
    tags: ["internal-alignment", "requirement-analysis"],
    content: "What are your top 3 priorities for this project? What concerns or risks do you foresee? How will this project success be measured from your perspective?"
  },
  {
    id: 110,
    title: "Technical Feasibility Assessment",
    category: "Edge Cases",
    tags: ["technical-constraints", "scalability"],
    content: "What are the potential technical limitations or challenges for implementing this feature? How might these affect scalability or performance? Are there any critical dependencies or integrations to consider?"
  }
];

const PromptCard = ({ prompt }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const maxLength = 150;

  // Add a ref for the toast
  const toastRef = useRef(null);

  // Use useEffect to add and remove the click event listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toastRef.current && !toastRef.current.contains(event.target)) {
        setShowToast(false);
      }
    };

    if (showToast) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showToast]);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const truncatedContent = prompt.content.length > maxLength
    ? prompt.content.slice(0, maxLength) + '...'
    : prompt.content;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.content);
      setIsCopied(true);
      setShowToast(true);
      setTimeout(() => {
        setIsCopied(false);
        setShowToast(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const formatContent = (content) => {
    // Convert bullet points, line breaks, bold text, and italic text
    const lines = content.split('\n');
    let result = '';
    let inOrderedList = false;

    lines.forEach((line, index) => {
      // Convert bold text
      line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // For **bold**
      
      // Convert italic text
      line = line.replace(/__(.*?)__/g, '<em>$1</em>'); // For __italic__ 

    // Check for numbered list
    
    const isBulletPoint = line.startsWith('*');
      if (isBulletPoint) {
        result += `<li>${line.slice(1).trim()}</li>`;
      } else {
        result += `<p>${line}</p>`;
      }
    
  });



  return result;
};

  return (
    <div className={`bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow relative ${isExpanded ? 'h-auto' : 'h-64'}`}>
      {showToast && (
        <div 
          ref={toastRef}
          className="absolute top-10 right-2 bg-blue-500 text-white p-2 rounded"
        >
          Prompt copied to clipboard!
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-800">{prompt.title}</h3>
      <p className="text-sm text-gray-600 mt-1">{prompt.category}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {prompt.tags.map((tag, index) => (
          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
            {tag}
          </span>
        ))}
      </div>
      <div className={`mt-2 ${isExpanded ? '' : 'max-h-32 overflow-hidden'}`}>
        <p className="text-gray-700">
          <span dangerouslySetInnerHTML={{ __html: formatContent(isExpanded ? prompt.content : truncatedContent) }} />
        </p>
      </div>
      <div className={`${isExpanded ? 'mt-4' : 'absolute bottom-4 left-4 right-4 bg-gradient-to-t from-white pt-6'}`}>
        <button
          onClick={toggleExpand}
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          {isExpanded ? (
            <>Read Less <ChevronUp size={16} className="ml-1" /></>
          ) : (
            <>Read More <ChevronDown size={16} className="ml-1" /></>
          )}
        </button>
      </div>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 text-gray-500 hover:text-blue-600 transition-colors"
        title="Copy prompt"
      >
        {isCopied ? <Check size={20} /> : <Copy size={20} />}
      </button>
    </div>
  );
};

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