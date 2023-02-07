export const AdditionalInfoBox = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => {
  return (
    <div className="noselect d-flex flex-column align-items-center border p-1 border-r1">
      <span className="text-3">{value}</span>
      <span className="text-6 fontPrimary">{title}</span>
    </div>
  );
};
