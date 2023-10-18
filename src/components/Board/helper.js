export function getRandomColor() {
  const letters = "0123456789ABCDEF";

  const isExcludedColor = (color) => {
    return color === "#FFFFFF" || color === "#FFD700" || color === "#808080";
  };

  let color;

  do {
    color = "#";

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * 16);
      color += letters[randomIndex];
    }
  } while (isExcludedColor(color));

  return color;
}

export const sortData = (data, sort) => {
  // eslint-disable-next-line
  return data.sort((a, b) => {
    if (sort === "title") {
      return a.title.localeCompare(b.title);
    } else if (sort === "priority") {
      if (a.priority === b.priority) {
        return a.title.localeCompare(b.title);
      } else {
        return -a.priority + b.priority;
      }
    }
  });
};

export let priorityLabel = {
  0: "No priority",
  1: "Low",
  2: "Medium",
  3: "High",
  4: "Urgent",
};
export let priorityOrder = [0,4,3,2,1]
