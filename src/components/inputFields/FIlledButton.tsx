import React from "react";

type Props = {
  title: string;
  onClick: Function;
};
export default function FilledButton({ title, onClick }: Props) {
  return (
    <div
      onClick={() => onClick()}
      className="w-100 noselect text-center cursor p-2 button-color border-r2 fontLight"
    >
      {title}
    </div>
  );
}
