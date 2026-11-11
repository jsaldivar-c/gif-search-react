interface Props {
  /** Main heading of the page. */
  title: string;
  /** Optional subtitle rendered below the heading. */
  description?: string;
}

/**
 * Page header with a title and an optional description.
 *
 * @example
 * <CustomHeader title="Gif Finder" description="Find the perfect gif." />
 */
export const CustomHeader = ({ title, description }: Props) => {
  return (
    <div className="content-center">
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </div>
  );
};
