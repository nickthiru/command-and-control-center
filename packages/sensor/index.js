import fs from "fs";
import { parse } from "csv-parse";
// import request from "request";
import axios from "axios";
// import path from "path";

const fsStream = fs.createReadStream("./data/accelerometer-data-5.csv");

const intervalId = setInterval(() => {
  fsStream
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", (row) => {
      console.log("(+) streamData:\n" + row);

      // Prepare the data for the request i.e. JSON
      const requestData = prepareDataForRequest(row);
      console.log("(+) requestData:\n" + requestData);

      // // Send GET request using "axios" package
      // axios
      //   .get("http://127.0.0.1:1880/mpu6050/data/v1/xl?testdata=12345")
      //   .then((res) => console.log(res))
      //   .catch((err) => console.log(err));

      // Send POST request using "axios" package
      axios
        .post("http://127.0.0.1:1880/node-red", requestData)
        .then((res) => console.log("(+) axios res:\n", res))
        .catch((err) => console.log("(-) axios err:\n", err));

      console.log("(+) Request sent\n")
    })
    .on("end", () => {
      console.log("(+) End of file")
      clearInterval(intervalId);
      // process.exit();
      return;
    })
    .on("error", (err) => console.log("(-) fsStream err " + err.message));
}, 1000);


function prepareDataForRequest(data) {
  return JSON.stringify({
    sensorId: 1,
    timestamp: (new Date).getTime(),
    x: data[2],
    y: data[3],
    z: data[4]
  });
}

// fs
//   .createReadStream("../sample-data/accelerometer-data.csv")
//   .pipe(parse({ delimiter: ",", from_line: 2 }))
//   .on("data", (row) => {
//     console.log(row);
//   })
//   .on("end", () => console.log("(+) finished"))
//   .on("error", (err) => console.log("(-) " + err.message));



