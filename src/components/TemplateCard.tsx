import React from 'react';
import { Copy } from 'lucide-react';
import type { Template } from '../data/templates';

interface TemplateCardProps {
  template: Template;
}

export function TemplateCard({ template }: TemplateCardProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(template.json);
  };

  return (
    <div className="bg-[#1a1b23] rounded-lg overflow-hidden border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-white mb-2">{template.name}</h3>
          <button
            onClick={copyToClipboard}
            className="p-2 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 transition-colors duration-200"
            title="Copy JSON"
          >
            <Copy className="w-5 h-5 text-purple-400" />
          </button>
        </div>
        <p className="text-gray-400 mb-4">{template.description}</p>
        <div className="flex flex-wrap gap-2">
          {template.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-sm bg-purple-500/10 text-purple-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}