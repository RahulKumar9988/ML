import { useState } from "react";
function Home() {
  const [power, setPower] = useState("");
  const [current, setCurrent] = useState("");
  const [temprature, setTemperature] = useState("");
  const [answer, setAnswer] = useState("");

  return (
    <div className="flex flex-col gap-5 md:gap-10  w-full h-full justify-center items-center ">
      <p className="text-6xl text-center text-white">
        Motor fault <br />
        <span className="text-green-600">Detector</span>
      </p>
      <div className="flex flex-col md:flex-row gap-0 md:gap-5">
        <input
          className="gap-10 mt-6 h-16 rounded-md text-center"
          type="text"
          placeholder="Power"
          onChange={(e) => {
            setPower(e.target.value);
          }}
        />
        <br />
        <input
          className="gap-10 mt-6 h-16 rounded-md text-center"
          type="text"
          placeholder="Current"
          onChange={(e) => {
            setCurrent(e.target.value);
          }}
        />
        <br />
        <input
          className="gap-10 mt-6 h-16 rounded-md text-center"
          type="text"
          placeholder="Temperature"
          onChange={(e) => {
            setTemperature(e.target.value);
          }}
        />
      </div>
      <button
        className="bg-green-600 w-60 h-16 text-2xl rounded-3xl"
        type="button"
        onClick={async () => {
          var fb = new FormData();
          fb.append("power", power);
          fb.append("current", current);
          fb.append("temprature", temprature);
          var resp = await fetch("/pred/", {
            method: "POST",
            body: fb,
          });
          var data = await resp.json();
          console.log(data);
          setAnswer(data);
        }}
      >
        Predict
      </button>

      {answer.length === 0 ? (
        <div></div>
      ) : answer ? (
        <h1 className="text-red-700 text-3xl font-bold text-wrap">
          {" "}
          Fault found
        </h1>
      ) : (
        <div>
          <h1 className="text-green-700 text-3xl font-bold text-wrap">
            fault not found
          </h1>
        </div>
      )}
    </div>
  );
}

export default Home;
