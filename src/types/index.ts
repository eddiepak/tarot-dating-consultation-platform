export interface TarotCard {
  id: number;
  name: string;
  image: string;
  upright: string[];
  reversed: string[];
  description: string;
}

export type ConsultationType = 'general' | 'reconciliation' | 'true-feelings' | 'intimate';

export interface ConsultationCategory {
  id: ConsultationType;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface ConsultationResult {
  category: ConsultationType;
  cards: TarotCard[];
  interpretation: string;
  advice: string;
  timestamp: Date;
}
