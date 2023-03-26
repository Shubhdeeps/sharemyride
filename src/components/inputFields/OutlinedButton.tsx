import { localization } from "../../service/languages/languages";

type Props = {
  title:
    | "Visit"
    | "See Rides"
    | "Cancel"
    | "Close"
    | "Apply"
    | "Clear"
    | "Reject";
  onClick: Function;
};
export default function OutlinedButton({ title, onClick }: Props) {
  return (
    <div
      onClick={() => onClick()}
      className="w-100 noselect text-center cursor p-2 button-color-border highlight-color border-r2"
    >
      {localization[title]}
    </div>
  );
}
