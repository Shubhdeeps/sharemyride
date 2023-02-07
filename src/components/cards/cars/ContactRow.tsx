import React from "react";
import { Image } from "react-bootstrap";
import messanger from "./icons/messanger.png";
import whatsapp from "./icons/whatsapp.png";
import text from "./icons/text.png";

type Props = {
  messanger: string | undefined;
  whatsapp: string | undefined;
  text: string | undefined;
};

export default function ContactRow(data: Props) {
  return (
    <>
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
    </>
  );
}
