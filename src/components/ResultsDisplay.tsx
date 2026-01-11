import React, { useEffect, useState } from 'react';
import { ConsultationResult } from '../types';
import { saveConsultation } from '../lib/supabase';

interface ResultsDisplayProps {
  result: ConsultationResult;
  onNewReading: () => void;
}

export default function ResultsDisplay({ result, onNewReading }: ResultsDisplayProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Auto-save consultation
    const save = async () => {
      setIsSaving(true);
      const consultationRecord = {
        category: result.category,
        cards: result.cards.map(c => c.name),
        interpretation: result.interpretation,
        advice: result.advice
      };
      
      await saveConsultation(consultationRecord);
      setIsSaving(false);
      setSaved(true);
    };
    
    save();
  }, [result]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-mystical-600 to-primary-600 mb-2">
          Your Reading
        </h2>
        <p className="text-sm text-gray-500">
          {saved ? '✓ Saved to your history' : isSaving ? 'Saving...' : ''}
        </p>
      </div>

      {/* Selected Cards Display */}
      <div className="glass-effect rounded-2xl p-8 border-2 border-white/50 mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Your Cards
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {result.cards.map((card, index) => (
            <div key={card.id} className="text-center">
              <div className="mb-3">
                <div className="text-7xl mb-3">{card.image}</div>
                <h4 className="text-xl font-bold text-gray-800 mb-1">{card.name}</h4>
                <p className="text-sm font-medium text-mystical-600">
                  {index === 0 ? 'Past Influences' : index === 1 ? 'Present Situation' : 'Future Outcome'}
                </p>
              </div>
              <div className="text-sm text-gray-600 space-y-2">
                <p>{card.description}</p>
                <div className="flex flex-wrap gap-1 justify-center">
                  {card.upright.slice(0, 3).map((keyword, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-mystical-100 text-mystical-700 rounded-full text-xs"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interpretation */}
      <div className="glass-effect rounded-2xl p-8 border-2 border-white/50 mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>🔮</span> Interpretation
        </h3>
        <p className="text-gray-700 leading-relaxed text-lg">
          {result.interpretation}
        </p>
      </div>

      {/* Advice */}
      <div className="glass-effect rounded-2xl p-8 border-2 border-white/50 mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>💫</span> Guidance
        </h3>
        <p className="text-gray-700 leading-relaxed text-lg">
          {result.advice}
        </p>
      </div>

      {/* Action Button */}
      <div className="text-center">
        <button
          onClick={onNewReading}
          className="px-8 py-4 bg-gradient-to-r from-mystical-600 to-primary-600 text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
        >
          Get Another Reading
        </button>
      </div>
    </div>
  );
}
