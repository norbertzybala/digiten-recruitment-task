import { useState } from "react";
import { ClipLoader } from "react-spinners";
import useAxios from "../../hooks/useAxios.jsx";
import Dropdowns from "./Dropdowns.jsx";
import HistoryChart from "./HistoryChart.jsx";
import Error from "./Error.jsx";
import "./DataVisualisation.css";
export default function DataVisualisation() {
  const [coinSelected, setCoinSelected] = useState("Qwsogvtv82FCd");
  const [timeFrame, setTimeFrame] = useState("24h");

  // Request for history data for chart
  const { response, loading, error } = useAxios(
    `https://api.coinranking.com/v2/coin/${coinSelected}/history?timePeriod=${timeFrame}`,
    true,
    coinSelected,
    timeFrame,
  );

  // Return error message if fetch data failed
  if (error) {
    return <Error title="Error!" message={error.message} />;
  }

  return (
    <section className="data-visualisation">
      {!loading ? (
        <>
          <Dropdowns
            onCoinSelect={setCoinSelected}
            onTimeFrameSelect={setTimeFrame}
            changeInPercent={response.data.change}
            actualPrice={response.data.history[0].price}
          />
          <HistoryChart data={response} />
        </>
      ) : (
        <ClipLoader color={"#333"} size={50} />
      )}
    </section>
  );
}
