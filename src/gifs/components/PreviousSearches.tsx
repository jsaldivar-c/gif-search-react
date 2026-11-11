interface Props {
  title: string;
  searches: string[];
  onLabelClicked: (term: string) => void;
}

export const PreviousSearches = ({
  title,
  searches,
  onLabelClicked,
}: Props) => {
  return (
    <div className="previous-searches">
      <h2>{title}</h2>
      <ul className="previous-searches-list">
        {searches.map((term) => (
          <li key={term}>
            <button type="button" onClick={() => onLabelClicked(term)}>
              {term}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
