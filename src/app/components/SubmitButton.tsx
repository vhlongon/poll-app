'use client';
import { useFormStatus } from 'react-dom';
type SubmitButtonProps = Partial<{
  loadingText: string;
  text: string;
  color: 'primary' | 'secondary' | 'accent' | 'info' | 'warning' | 'error';
}>;

export const SubmitButton = ({
  loadingText = 'Loading...',
  text = 'Submit',
  color: btnClass = 'primary',
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  const classeNames = `btn btn-${btnClass} w-full` as const;

  return (
    <button
      disabled={pending}
      aria-disabled={pending}
      className={classeNames}
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
