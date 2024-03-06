'use client';
import { useFormStatus } from 'react-dom';
type SubmitButtonProps = Partial<{
  loadingText: string;
  text: string;
}>;

export const SubmitButton = ({
  loadingText = 'Loading...',
  text = 'Submit',
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      aria-disabled={pending}
      className="btn btn-primary w-full"
      type="submit"
    >
      {pending ? (
        <>
          <span className="loading loading-spinner" />
          {loadingText}
        </>
      ) : (
        <>{text}</>
      )}
    </button>
  );
};
