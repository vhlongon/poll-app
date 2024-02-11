export const Form = () => {
  return (
    <form>
      <label className="form-control w-full max-w-xs" htmlFor="name">
        <div className="label">
          <span className="label-text">Choose a name for the event</span>
        </div>
        <input
          type="text"
          id="name"
          placeholder="Event name"
          className="input input-bordered w-full max-w-xs"
        />
      </label>
    </form>
  );
};
