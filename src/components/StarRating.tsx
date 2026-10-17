interface StarRatingProps {
  value?: number;
  name?: string;
  onChange?: (rating: number) => void;
}

const StarRating = ({ value = 0, name, onChange }: StarRatingProps) => {
  if (!onChange) {
    const filled = '★'.repeat(Math.round(value));
    const empty = '☆'.repeat(5 - Math.round(value));
    return (
      <span className="stars" aria-label={`${value} out of 5`}>
        {filled}
        {empty}
      </span>
    );
  }

  return (
    <fieldset className="star-input">
      <legend className="sr-only">Rating</legend>
      {[1, 2, 3, 4, 5].map((rating) => (
        <label key={rating}>
          <input
            type="radio"
            name={name}
            value={rating}
            checked={Number(value) === rating}
            onChange={() => onChange(rating)}
          />
          <span>{rating}</span>
        </label>
      ))}
    </fieldset>
  );
};

export default StarRating;
