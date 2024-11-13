import React, { useState } from 'react';
import { templates } from './data/templates';
import { TemplateCard } from './components/TemplateCard';
import { Search } from 'lucide-react';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter templates based on search query
  const filteredTemplates = templates.filter((template) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      template.title.toLowerCase().includes(searchTerm) ||
      template.description.toLowerCase().includes(searchTerm) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  });

  return (
    <div className="min-h-screen bg-[#13141a] text-white">
      {/* Header */}
      <header className="py-20 text-center px-4">
        <h1 className="text-5xl font-bold mb-4">
          <span className="text-white">101 </span>
          <span className="bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text">
            Automations
          </span>
          <span className="text-white"> Templates</span>
        </h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto">
          Your comprehensive collection of n8n automation templates for instant workflow deployment
        </p>
      </header>

      {/* Search Bar */}
      <div className="max-w-6xl mx-auto px-4 mb-12">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search templates..."
            className="w-full bg-[#1a1b23] border border-purple-500/20 rounded-lg py-4 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/40"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Templates Grid */}
      <main className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;