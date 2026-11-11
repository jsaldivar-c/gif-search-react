interface Props {
  /** Heading shown above the list. */
  title: string;
  /** Search terms to display, in order. */
  searches: string[];
  /** Called with the term when the user clicks one of the labels. */
  onLabelClicked: (term: string) => void;
}

/**
 * List of previous search terms rendered as clickable buttons.
 *
 * @example
 * <PreviousSearches title="History" searches={['cats']} onLabelClicked={search} />
 */
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
