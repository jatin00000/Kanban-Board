import React, { useState, useEffect } from "react";
import { getRandomColor, sortData, priorityLabel, priorityOrder } from "./helper";
import "./style.css";
import Header from "../Header";
import Card from "../Card";
import IconStatus from "../IconStatus";
import PriorityStatus from "../PriorityStatus";
import Profile from "../Profile";
import { ReactComponent as PlusIcon } from "../../icons/plus-lg.svg";
import { ReactComponent as FilterIcon } from "../../icons/three-dots.svg";
export default function Board() {
  const [statusData, setStatusData] = useState({});
  const [priorityData, SetPriorityData] = useState({});
  const [userData, SetUserData] = useState({});
  const [userStatus, setUserStatus] = useState({});
  const [grouping, setGrouping] = useState("status"); // Initialize grouping state with a default value
  const [sort, setSort] = useState("title"); // Initialize sort state with a default value
  const [data, setData] = useState([]);
  const [userOrder, setUserOrder] = useState([])

  async function APICall() {
    try {
      let response = await fetch(
        "https://api.quicksell.co/v1/internal/frontend-assignment",
        {
          method: "GET",
        }
      );
      let responseData = await response.json();
      setData(responseData.tickets);
      let UserStatus = {};
      responseData.users.forEach((user) => {
        UserStatus[user.id] = {
          status: user.available,
          name: user.name,
          color: getRandomColor(),
        };
      });
      setUserStatus(UserStatus);
    } catch (error) {
      console.error("Error fetching data from the API: ", error);
    }
  }

  useEffect(() => {
    APICall();

    let group = localStorage.getItem("kabanaBoardGroup");
    if (group) {
      setGrouping(group);
    }

    let x = localStorage.getItem("kabanaBoardSort");
    if (x) {
      setSort(x);
    }
    DataProcessByStatus(data);
    DataProcessByPriority(data);
    // eslint-disable-next-line
    DataProcessByUser(data);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      if (grouping === "status") {
        DataProcessByStatus(data);
      } else if (grouping === "priority") {
        DataProcessByPriority(data);
      } else if (grouping === "user") {
        DataProcessByUser(data);
      }
    }
    // eslint-disable-next-line
  }, [data, grouping, sort]);
  function DataProcessByStatus(tickets) {
    let StatusData = {
      Backlog: [],
      Todo: [],
      "In progress": [],
      Done: [],
      Canceled: [],
    };

    tickets.forEach((ticket) => {
      StatusData[ticket.status].push(ticket);
    });
    Object.values(StatusData).forEach((statusTickets) => {
      sortData(statusTickets, sort);
    });
    console.log(StatusData);
    setStatusData(StatusData);
  }

  function DataProcessByPriority(tickets) {
    let PriorityData = {
      0: [],
      4: [],
      3: [],
      2: [],
      1: [],
    };

    tickets.forEach((ticket) => {
      PriorityData[ticket.priority].push(ticket);
    });
    Object.values(PriorityData).forEach((priorityTickets) => {
      sortData(priorityTickets, sort);
    });
    SetPriorityData(PriorityData);
  }

  function DataProcessByUser(tickets) {
    let UserData = {};

    tickets.forEach((ticket) => {
      UserData[ticket.userId] = UserData[ticket.userId] || [];
      UserData[ticket.userId].push(ticket);
    });
    Object.values(UserData).forEach((priorityTickets) => {
      sortData(priorityTickets, sort);
    });
    let UserOrder = Object.keys(UserData);
    UserOrder = UserOrder.sort((a, b) => {
      return userStatus[a].name.localeCompare(userStatus[b].name);
    })
    SetUserData(UserData);
    setUserOrder(UserOrder);
  }

  return (
    <div id="boardArea">
      <Header
        grouping={grouping}
        sort={sort}
        setGrouping={setGrouping}
        setSort={setSort}
      />
      <>
        {statusData["Todo"] && grouping === "status" && (
          <div className="container">
            {Object.keys(statusData).map((status) => (
              <div key={status} className="box">
                <div className="grid-container">
                  <div className="labelContainer">
                    <div className="LabelLeft">
                      <IconStatus status={status} />
                      &nbsp;&nbsp;<span className="labelLabel">{status}</span>
                      &nbsp;&nbsp;
                      <span className="labelCnt">
                        {statusData[status].length}
                      </span>
                    </div>
                    <div className="LabelRight">
                      <PlusIcon />
                      &nbsp;&nbsp;
                      <FilterIcon />
                    </div>
                  </div>

                  {statusData[status].map((ticket) => (
                    <Card
                      key={ticket.id}
                      user={{
                        ...ticket,
                        userStatus: userStatus[ticket["userId"]],
                        grouping: grouping,
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        {grouping === "user" && (
          <div className="container">
            {userOrder.map((status) => (
              <div key={status} className="box">
                <div className="grid-container">
                  <div className="labelContainer">
                    <div className="LabelLeft">
                      <Profile user={userStatus[status]} isHeading={true} />
                      &nbsp;&nbsp;
                      <span className="labelLabelU">
                        {userStatus[status].name}
                      </span>
                      &nbsp;&nbsp;
                      <span className="labelCntU">
                        {userData[status].length}
                      </span>
                    </div>
                    <div className="LabelRight">
                      <PlusIcon />
                      &nbsp;&nbsp;
                      <FilterIcon />
                    </div>
                  </div>
                  {userData[status].map((ticket) => (
                    <Card
                      key={ticket.id}
                      user={{
                        ...ticket,
                        userStatus: userStatus[ticket["userId"]],
                        grouping: grouping,
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        {grouping === "priority" && (
          <div className="container">
            {priorityOrder.map((status) => (
              <div key={status} className="box">
                <div className="grid-container">
                  <div className="labelContainer">
                    <div className="LabelLeft">
                      <PriorityStatus priority={status} />
                      &nbsp;&nbsp;&nbsp;
                      <span className="labelLabel">
                        {priorityLabel[status]}
                      </span>
                      &nbsp;&nbsp;
                      <span className="labelCnt">
                        {priorityData[status].length}
                      </span>
                    </div>
                    <div className="LabelRight">
                      <PlusIcon />
                      &nbsp;&nbsp;
                      <FilterIcon />
                    </div>
                  </div>
                  {priorityData[status].map((ticket) => (
                    <Card
                      key={ticket.id}
                      user={{
                        ...ticket,
                        userStatus: userStatus[ticket["userId"]],
                        grouping: grouping,
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    </div>
  );
}
