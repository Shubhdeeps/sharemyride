import React from "react";
import { Image } from "react-bootstrap";
import messanger from "./icons/messanger.png";
import whatsapp from "./icons/whatsapp.png";
import text from "./icons/text.png";
import FilledBButton from "../../inputFields/FIlledButton";

type Props = {
  buttonText: "Request to join" | "Accepted" | "Request ride";
  messanger: string | undefined;
  whatsapp: string | undefined;
  text: string | undefined;
  onClick: Function;
};

export default function ContactAndButton(data: Props) {
  return (
    <div className="d-flex align-items-center justify-content-between gap-2">
      <div className="d-flex gap-2">
        {data.messanger && (
          <Image
            onClick={() => window.open(`https://m.me/${data.messanger}`)}
            className="icon-images"
            src={messanger}
          />
        )}
        {data.whatsapp && (
          <Image
            onClick={() => window.open(`https://wa.me/${data.whatsapp}`)}
            className="icon-images"
            src={whatsapp}
          />
        )}
        {data.text && (
          <Image
            onClick={() => window.open(`sms:${data.text}`)}
            className="icon-images"
            src={text}
          />
        )}
      </div>
      <FilledBButton onClick={() => data.onClick()} title={data.buttonText} />
    </div>
  );
}
