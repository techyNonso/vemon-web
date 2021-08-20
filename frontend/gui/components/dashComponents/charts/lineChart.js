import React from "react";
import { Line } from "react-chartjs-2";

function LineChart(props) {
  let info;

  if (Object.keys(props.data).length > 0 && props.data.constructor === Object) {
    info = props.data;
  } else {
    info = {
      Jan: {
        online: 0,
        cash: 0,
        credit: 0,
      },
      Feb: {
        online: 0,
        cash: 0,
        credit: 0,
      },
      Mar: {
        online: 0,
        cash: 0,
        credit: 0,
      },
      Apr: {
        online: 0,
        cash: 0,
        credit: 0,
      },
      May: {
        online: 0,
        cash: 0,
        credit: 0,
      },
      Jun: {
        online: 0,
        cash: 0,
        credit: 0,
      },
      Jul: {
        online: 0,
        cash: 0,
        credit: 0,
      },
      Aug: {
        online: 0,
        cash: 0,
        credit: 0,
      },
      Sep: {
        online: 0,
        cash: 0,
        credit: 0,
      },
      Oct: {
        online: 0,
        cash: 0,
        credit: 0,
      },
      Nov: {
        online: 0,
        cash: 0,
        credit: 0,
      },
      Dec: {
        online: 0,
        cash: 0,
        credit: 0,
      },
    };
  }
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Cash ",
        data: [
          info.Jan.cash,
          info.Feb.cash,
          info.Mar.cash,
          info.Apr.cash,
          info.May.cash,
          info.Jun.cash,
          info.Jul.cash,
          info.Aug.cash,
          info.Sep.cash,
          info.Oct.cash,
          info.Nov.cash,
          info.Dec.cash,
        ],
        borderColor: ["#00c853"],
        borderDash: [10],
        fill: false,
        pointBackgroundColor: "#00c853",
        pointBorderColor: "#00c853",
        borderWidth: 2,
      },
      {
        label: "Credit ",
        data: [
          info.Jan.credit,
          info.Feb.credit,
          info.Mar.credit,
          info.Apr.credit,
          info.May.credit,
          info.Jun.credit,
          info.Jul.credit,
          info.Aug.credit,
          info.Sep.credit,
          info.Oct.credit,
          info.Nov.credit,
          info.Dec.credit,
        ],
        borderDash: [10],
        fill: false,
        borderColor: ["red"],
        pointBackgroundColor: "red",
        pointBorderColor: "red",
        borderWidth: 2,
      },
      {
        label: "Online ",
        data: [
          info.Jan.online,
          info.Feb.online,
          info.Mar.online,
          info.Apr.online,
          info.May.online,
          info.Jun.online,
          info.Jul.online,
          info.Aug.online,
          info.Sep.online,
          info.Oct.online,
          info.Nov.online,
          info.Dec.online,
        ],
        borderDash: [10],
        fill: false,
        borderColor: ["#2980b9"],
        borderWidth: 2,
        pointBackgroundColor: "#2980b9",
        pointBorderColor: "#2980b9",
      },
    ],
  };

  const options = {
    title: {
      display: true,
      text: "Sales Analysis",
    },
    maintainAspectRatio: false,
  };
  return <Line data={data} options={options} width={100} />;
}

export default LineChart;
