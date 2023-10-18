import React from "react";
import { ReactComponent as NoPriorityIcon } from "../../icons/three-dots.svg";
import { ReactComponent as UrgentIcon } from "../../icons/exclamation-square-fill.svg";
import { ReactComponent as HighIcon } from "../../icons/signal.svg";
import { ReactComponent as LowIcon } from "../../icons/signal-low.svg";
import { ReactComponent as MediumIcon } from "../../icons/signal-medium.svg";
import "../Card/style.css";
import "./style.css";
export default function PriorityStatus(props) {
  return (
    <>
      {
        // eslint-disable-next-line
        props.priority == 0 && (
          <NoPriorityIcon className="dotIcon2 IconClass1" />
        )
      }
      {
        // eslint-disable-next-line
        props.priority == 3 && <HighIcon className="IconClass1 dotIcon2" />
      }
      {
        // eslint-disable-next-line
        props.priority == 1 && <LowIcon className="IconClass1 dotIcon2" />
      }
      {
        // eslint-disable-next-line
        props.priority == 2 && <MediumIcon className="IconClass1 dotIcon2 " />
      }
      {
        // eslint-disable-next-line
        props.priority == 4 && <UrgentIcon className="IconClass2 dotIcon2 " />
      }
    </>
  );
}
