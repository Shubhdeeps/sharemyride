import { localization } from "../../service/languages/languages";

type Props = {
  onClick: Function;
  title:
    | "Dashboard"
    | "Alerts and News"
    | "Favourites Routes"
    | "My Schedule"
    | "Market Place"
    | "Feedback/Report"
    | "Log out";
};
export default function SideBarButton({ onClick, title }: Props) {
  return (
    <div
      onClick={() => onClick()}
      className="border-r1 primaryOverlay-bg fontLight w-100 p-3 noselect text-center"
    >
      {localization[title]}
    </div>
  );
}
