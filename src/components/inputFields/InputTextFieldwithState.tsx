import { localization } from "../../service/languages/languages";

type Props = {
  placeholder: string;
  type: string;
  title:
    | "New depart time"
    | "Depart time*"
    | "Arriving time*"
    | "Country"
    | "Arriving point*"
    | "Departing from"
    | "Arriving at"
    | "Departing point"
    | "Arriving point"
    | "Departing point*";
  setData: Function;
  isAnArray: boolean;
  currValue: any;
};
export default function InputTextFieldwitState(props: Props) {
  const title = localization[props.title];
  return (
    <div className="d-flex flex-column align-items-start fontPrimary gap-1">
      <span className="text-3">{title}</span>
      <div className="border-r1 w-100 p-2 ps-3 textField2">
        <input
          maxLength={18}
          className="fontPrimary"
          autoComplete="new-password"
          type={props.type}
          value={props.currValue}
          placeholder={props.placeholder}
          onChange={(e) => {
            if (props.isAnArray) {
              props.setData(() => [e.target.value]);
            } else {
              props.setData(e.target.value);
            }
          }}
        />
      </div>
    </div>
  );
}
