'use client';
import { TimeSuggestion } from '@/db/schema';
import { useRef } from 'react';
import { Modal, openModal } from './Modal';
import { formatDate } from '../utils/utils';

type EventDeleteProps = {
  suggestion: TimeSuggestion;
};

export const EditSuggestionsModal = ({ suggestion }: EventDeleteProps) => {
  const ref = useRef<HTMLDialogElement>(null);

  const { eventId } = suggestion;
  const truncatedId =
    eventId.length > 10 ? eventId.substring(0, 10) + '...' : eventId;
  return (
    <>
      <button
        className="btn btn-accent btn-xs"
        onClick={() => openModal(ref.current)}
      >
        Edit
      </button>
      <Modal ref={ref}>
        <p className="font-bold mb-4 uppercase italic">TODO: Edit Suggestion</p>
        <div className="flex flex-col gap-1 items-start max-w-[145px] mx-auto">
          <span className="">Event: {truncatedId}</span>
          <span>Date: {formatDate(suggestion.time)}</span>
          <span>Users: {suggestion.users || 'none'}</span>
          <span>Votes: {suggestion.votes}</span>
          <span>Id: {suggestion.id}</span>
        </div>
      </Modal>
    </>
  );
};
