import React from "react";
import { localization } from "../../service/languages/languages";

type Props = {
  title:
    | "Request to join"
    | "Accepted"
    | "Request ride"
    | "Set Offer"
    | "Add Route"
    | "Request"
    | "Accept"
    | "Cancel"
    | "Post"
    | "Let's travel"
    | "Register me :)";
  onClick: Function;
};
export default function FilledButton({ title, onClick }: Props) {
  return (
    <div
      onClick={() => onClick()}
      className="w-100 noselect text-center cursor p-2 button-color border-r2 fontLight"
    >
      {localization[title]}
    </div>
  );
}
