'use client';
import { TimeSuggestion } from '@/db/schema';
import { EditSuggestionForm } from './EditSuggestionForm';

type EventDeleteProps = {
  suggestion: TimeSuggestion;
  maxParticipants: number;
  totalUniqueVoters: number;
};

export const EditSuggestionsModal = ({
  suggestion,
  maxParticipants,
  totalUniqueVoters,
}: EventDeleteProps) => {
  return (
    <EditSuggestionForm
      {...suggestion}
      maxParticipants={maxParticipants}
      totalUniqueVoters={totalUniqueVoters}
    />
  );
};
