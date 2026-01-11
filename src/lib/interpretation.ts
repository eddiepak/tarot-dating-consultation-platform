import { TarotCard, ConsultationType } from '../types';

const categoryPrompts = {
  general: 'a general love reading focusing on overall romantic prospects and opportunities',
  reconciliation: 'a reconciliation reading exploring the possibility of rekindling a past relationship',
  'true-feelings': 'a reading revealing the true feelings and intentions of a love interest',
  intimate: 'a reading about deepening emotional and physical intimacy in a relationship'
};

const categoryAdvice = {
  general: [
    'Stay open to new opportunities in love',
    'Trust the timing of your romantic journey',
    'Focus on self-love and personal growth',
    'Be authentic in your romantic connections'
  ],
  reconciliation: [
    'Consider whether reconciliation serves your highest good',
    'Communication and honesty are essential',
    'Take time to heal before making decisions',
    'Learn from past patterns to create a better future'
  ],
  'true-feelings': [
    'Actions speak louder than words in matters of the heart',
    'Trust your intuition about this person',
    'Look for consistency between words and behavior',
    'Give the relationship time to reveal its true nature'
  ],
  intimate: [
    'Emotional vulnerability deepens connection',
    'Create space for honest communication about needs',
    'Balance passion with emotional safety',
    'Build trust through consistent presence and care'
  ]
};

export function generateInterpretation(
  cards: TarotCard[],
  category: ConsultationType
): string {
  const cardNames = cards.map(c => c.name).join(', ');
  const categoryContext = categoryPrompts[category];
  
  const interpretations = cards.map((card, index) => {
    const position = index === 0 ? 'Past influences' : index === 1 ? 'Present situation' : 'Future outcome';
    return `${position}: ${card.name} - ${card.description} ${card.upright.slice(0, 2).join(' and ')} are highlighted here.`;
  });
  
  return `In this ${categoryContext}, the cards reveal: ${interpretations.join(' ')} Together, ${cardNames} suggest a journey of ${cards[0].upright[0]}, leading to ${cards[cards.length - 1].upright[0]}.`;
}

export function generateAdvice(category: ConsultationType): string {
  const adviceList = categoryAdvice[category];
  const randomAdvice = adviceList[Math.floor(Math.random() * adviceList.length)];
  
  return `${randomAdvice} Remember that tarot provides guidance, but you hold the power to shape your romantic destiny. Trust yourself and stay open to the wisdom of your heart.`;
}

export function shuffleAndDraw(cards: TarotCard[], count: number): TarotCard[] {
  const shuffled = [...cards].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
