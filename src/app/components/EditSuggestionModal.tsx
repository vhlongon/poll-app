'use client';
import { TimeSuggestion } from '@/db/schema';
import { EditSuggestionForm } from './EditSuggestionForm';

type EventDeleteProps = {
  suggestion: TimeSuggestion;
};

export const EditSuggestionsModal = ({ suggestion }: EventDeleteProps) => {
  return <EditSuggestionForm {...suggestion} />;
};
