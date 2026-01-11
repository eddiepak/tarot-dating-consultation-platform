import React, { useState } from 'react';
import { TarotCard } from '../types';

interface CardSelectionProps {
  cards: TarotCard[];
  onComplete: (selectedCards: TarotCard[]) => void;
  onBack: () => void;
  categoryTitle: string;
}

export default function CardSelection({ cards, onComplete, onBack, categoryTitle }: CardSelectionProps) {
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([]);
  const [isRevealing, setIsRevealing] = useState(false);

  const handleCardClick = (card: TarotCard) => {
    if (selectedCards.length < 3 && !selectedCards.find(c => c.id === card.id)) {
      const newSelection = [...selectedCards, card];
      setSelectedCards(newSelection);
      
      if (newSelection.length === 3) {
        setIsRevealing(true);
        setTimeout(() => {
          onComplete(newSelection);
        }, 1000);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={onBack}
        className="mb-6 px-4 py-2 text-mystical-600 hover:text-mystical-700 font-medium flex items-center gap-2"
      >
        ← Back to Categories
      </button>

      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-mystical-600 to-primary-600 mb-2">
          {categoryTitle}
        </h2>
        <p className="text-lg text-gray-600">
          Select 3 cards to reveal your reading
        </p>
        <div className="mt-4 flex justify-center gap-2">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`w-4 h-4 rounded-full ${
                selectedCards.length >= num ? 'bg-mystical-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {isRevealing ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4 animate-pulse">🔮</div>
          <p className="text-2xl text-mystical-600 font-medium">
            Revealing your destiny...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-4">
          {cards.map((card) => {
            const isSelected = selectedCards.find(c => c.id === card.id);
            return (
              <button
                key={card.id}
                onClick={() => handleCardClick(card)}
                disabled={isSelected !== undefined}
                className={`aspect-[2/3] rounded-xl transition-all duration-300 ${
                  isSelected
                    ? 'opacity-30 scale-95'
                    : 'hover:scale-110 hover:shadow-2xl glass-effect border-2 border-mystical-200'
                } ${selectedCards.length >= 3 && !isSelected ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="w-full h-full flex items-center justify-center text-4xl card-gradient text-white rounded-xl">
                  {isSelected ? '✓' : card.image}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {selectedCards.length > 0 && !isRevealing && (
        <div className="mt-8 glass-effect rounded-2xl p-6 border-2 border-white/50">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Selected Cards:</h3>
          <div className="flex gap-4 justify-center">
            {selectedCards.map((card, index) => (
              <div key={card.id} className="text-center">
                <div className="text-5xl mb-2">{card.image}</div>
                <p className="text-sm font-medium text-gray-700">{card.name}</p>
                <p className="text-xs text-gray-500">
                  {index === 0 ? 'Past' : index === 1 ? 'Present' : 'Future'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
