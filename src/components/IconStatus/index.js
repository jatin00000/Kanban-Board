import React from "react";
import "./style.css";
import { ReactComponent as BacklogIcon } from "../../icons/circle_dash_icon.svg";
import { ReactComponent as TodoIcon } from "../../icons/circle.svg";
import { ReactComponent as ProgressIcon } from "../../icons/circle-half.svg";
import { ReactComponent as DoneIcon } from "../../icons/check-circle-fill.svg";
import { ReactComponent as CancelIcon } from "../../icons/x-circle-fill.svg";
export default function IconStatus(props) {
  return (
    <>
      {
        // eslint-disable-next-line
        props.status == "Todo" && <TodoIcon className="TodoIcon" />
      }
      {
        // eslint-disable-next-line
        props.status == "In progress" && (
          <ProgressIcon className="ProgressIcon" />
        )
      }
      {
        // eslint-disable-next-line
        props.status == "Backlog" && <BacklogIcon className="TodoIcon" />
      }
      {
        // eslint-disable-next-line
        props.status == "Done" && <DoneIcon className="DoneIcon" />
      }
      {
        // eslint-disable-next-line
        props.status == "Canceled" && <CancelIcon className="TodoIcon" />
      }
    </>
  );
}
