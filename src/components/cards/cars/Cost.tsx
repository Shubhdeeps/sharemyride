import { localization } from "../../../service/languages/languages";

type Title = "cost" | "Offered Price" | "Price" | "passengers" | "";

export default function Cost({
  cost,
  title = "cost",
}: {
  cost: string;
  title: Title;
}) {
  return (
    <div className="d-flex align-items-center gap-1">
      <span className="text-4 fw-bold">{localization[title]}</span>
      <span className="text-1-5 font-safe">{cost}</span>
    </div>
  );
}
