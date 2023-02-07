import React from "react";

type Props = {
  onClick: Function;
  title: string;
};
export default function SideBarButton({ onClick, title }: Props) {
  return (
    <div
      onClick={() => onClick()}
      className="border-r1 primaryOverlay-bg fontLight w-100 p-3 noselect text-center"
    >
      {title}
    </div>
  );
}
