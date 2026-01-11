import React from 'react';
import { ConsultationCategory as CategoryType } from '../types';

interface CategorySelectorProps {
  categories: CategoryType[];
  onSelect: (category: CategoryType) => void;
}

export default function CategorySelector({ categories, onSelect }: CategorySelectorProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-mystical-600 to-primary-600 mb-4">
          Tarot Dating Consultation
        </h1>
        <p className="text-lg text-gray-600">
          Choose your consultation category to receive guidance from the cards
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelect(category)}
            className="group relative overflow-hidden rounded-2xl glass-effect border-2 border-white/50 p-8 text-left transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
            
            <div className="relative z-10">
              <div className="text-6xl mb-4">{category.icon}</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {category.title}
              </h3>
              <p className="text-gray-600">
                {category.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
