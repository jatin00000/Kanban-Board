import React from "react";
import "./style.css";
import IconStatus from "../IconStatus";
import PriorityStatus from "../PriorityStatus";
import { ReactComponent as DotIcon } from "../../icons/circle-fill.svg";

import Profile from "../Profile";

export default function Card(props) {
  return (
    <div className="Card">
      {props.user.grouping !== "user" && (
        <Profile user={props.user.userStatus} isHeading={false} />
      )}
      <p className="id">{props.user.id}</p>

      <div className="content-container">
        {props.user.grouping !== "status" && (
          <IconStatus status={props.user.status} />
        )}
        <p className="title">{props.user.title}</p>
      </div>

      {props.user.tag.map((e) => {
        return (
          <div className="tagItem">
            {props.user.grouping !== "priority" && (
              <span className="boundary">
                <PriorityStatus priority={props.user.priority} />
              </span>
            )}

            <span className="boundary">
              <DotIcon className="dotIcon" />
              {e}
            </span>
          </div>
        );
      })}
    </div>
  );
}
