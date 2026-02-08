import React from 'react';

export interface ValentineDay {
  id: string;
  title: string;
  date: string;
  message: string;
  icon: React.ReactNode;
  color: string;
  interactionType?: 'button' | 'checklist' | 'zoom';
}

export interface LoveNote {
  id: number;
  text: string;
  rotation: number;
}

export interface Memory {
  id: number;
  url: string;
  caption: string;
}