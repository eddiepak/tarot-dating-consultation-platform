import { ConsultationCategory } from '../types';

export const consultationCategories: ConsultationCategory[] = [
  {
    id: 'general',
    title: 'General Love Reading',
    description: 'Get insights into your overall love life and romantic future',
    icon: '💝',
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 'reconciliation',
    title: 'Reconciliation',
    description: 'Explore the possibilities of rekindling a past relationship',
    icon: '💞',
    color: 'from-purple-500 to-indigo-500'
  },
  {
    id: 'true-feelings',
    title: 'True Feelings',
    description: 'Discover the genuine emotions and intentions of your love interest',
    icon: '💗',
    color: 'from-red-500 to-pink-500'
  },
  {
    id: 'intimate',
    title: 'Intimate Connection',
    description: 'Explore deeper emotional and physical connection possibilities',
    icon: '💕',
    color: 'from-fuchsia-500 to-purple-500'
  }
];
