import React, { useState } from 'react';
import CategorySelector from './components/CategorySelector';
import CardSelection from './components/CardSelection';
import ResultsDisplay from './components/ResultsDisplay';
import { ConsultationCategory, ConsultationType, TarotCard, ConsultationResult } from './types';
import { consultationCategories } from './data/categories';
import { tarotCards } from './data/tarotCards';
import { generateInterpretation, generateAdvice, shuffleAndDraw } from './lib/interpretation';

type AppState = 'category' | 'selection' | 'results';

function App() {
  const [state, setState] = useState<AppState>('category');
  const [selectedCategory, setSelectedCategory] = useState<ConsultationCategory | null>(null);
  const [shuffledCards, setShuffledCards] = useState<TarotCard[]>([]);
  const [result, setResult] = useState<ConsultationResult | null>(null);

  const handleCategorySelect = (category: ConsultationCategory) => {
    setSelectedCategory(category);
    setShuffledCards(shuffleAndDraw(tarotCards, tarotCards.length));
    setState('selection');
  };

  const handleCardsSelected = (cards: TarotCard[]) => {
    if (!selectedCategory) return;

    const interpretation = generateInterpretation(cards, selectedCategory.id as ConsultationType);
    const advice = generateAdvice(selectedCategory.id as ConsultationType);

    const consultationResult: ConsultationResult = {
      category: selectedCategory.id as ConsultationType,
      cards,
      interpretation,
      advice,
      timestamp: new Date()
    };

    setResult(consultationResult);
    setState('results');
  };

  const handleNewReading = () => {
    setState('category');
    setSelectedCategory(null);
    setResult(null);
  };

  const handleBack = () => {
    setState('category');
    setSelectedCategory(null);
  };

  return (
    <div className="min-h-screen py-8">
      {state === 'category' && (
        <CategorySelector
          categories={consultationCategories}
          onSelect={handleCategorySelect}
        />
      )}

      {state === 'selection' && selectedCategory && (
        <CardSelection
          cards={shuffledCards}
          onComplete={handleCardsSelected}
          onBack={handleBack}
          categoryTitle={selectedCategory.title}
        />
      )}

      {state === 'results' && result && (
        <ResultsDisplay
          result={result}
          onNewReading={handleNewReading}
        />
      )}
    </div>
  );
}

export default App;
