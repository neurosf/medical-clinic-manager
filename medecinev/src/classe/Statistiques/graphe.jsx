import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import PieChart from "./components/PieChart";

export function Graphe({Data,graph,titel}) {
  const userData = {
    labels: Data.map((data) => data.Labl),
    datasets: [
      {
        label: titel,
        data: Data.map((data) => data.Numbere),
        backgroundColor: [
          "rgba(30, 30, 30, 0.6)",
          "rgba(0, 120, 120, 0.6)",
          "rgba(120, 0, 120, 0.6)",
          "rgba(120, 120, 0, 0.6)",
          "rgba(0, 0, 120, 0.6)",
          "rgba(0, 120, 0, 0.6)",
          "rgba(120, 0, 0, 0.6)",
          "rgba(60, 60, 60, 0.6)",
          "rgba(0, 60, 60, 0.6)",
          "rgba(60, 0, 60, 0.6)",
          "rgba(60, 60, 0, 0.6)",
          "rgba(0, 0, 60, 0.6)",
        ],
        borderColor: [
          "rgba(30, 30, 30, 0.9)",
          "rgba(0, 120, 120, 0.9)",
          "rgba(120, 0, 120, 0.9)",
          "rgba(120, 120, 0, 0.9)",
          "rgba(0, 0, 120, 0.9)",
          "rgba(0, 120, 0, 0.9)",
          "rgba(120, 0, 0, 0.9)",
          "rgba(60, 60, 60, 0.9)",
          "rgba(0, 60, 60, 0.9)",
          "rgba(60, 0, 60, 0.9)",
          "rgba(60, 60, 0, 0.9)",
          "rgba(0, 0, 60, 0.9)",
        ],
        borderWidth: 2,
      },
    ],
  };
  return (
    <div className="Graph">
      {graph==1?<div style={{ width: 700}}>
        <BarChart chartData={userData} />
      </div>:null}
      {graph==2?<div style={{ width: 700}}>
        <LineChart chartData={userData} />
      </div>:null}
      {graph==3?<div style={{ width: 500}}>
        <PieChart chartData={userData} />
      </div>:null}
    </div>
  );
}

