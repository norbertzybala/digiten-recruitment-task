import useAxios from "../../hooks/useAxios.jsx";
import Select from "react-select";
import { TrendingDownArrow, TrendingUpArrow } from "../../icons/icons.jsx";
import { ClipLoader } from "react-spinners";
import Error from "./Error.jsx";
export default function Dropdowns({onCoinSelect, onTimeFrameSelect, changeInPercent, actualPrice,}) {

  // Request for coins list
  const { response, loading, error } = useAxios(
    "https://api.coinranking.com/v2/coins?limit=10",
    true,
  );

  // Options for coins select
  const selectCoinOptions = response
    ? response.data.coins.map((coin) => {
        return {
          value: coin.uuid,
          label: (
            <div className="data-visualisation__dropdown-label">
              <img src={coin.iconUrl} height="30px" width="30px" />
              {coin.name} ({coin.symbol})
            </div>
          ),
        };
      })
    : undefined;

  // Options for time select
  const selectTimeFrameOptions = [
    { value: "1h", label: "Last hour" },
    { value: "3h", label: "Last 3 hours" },
    { value: "12h", label: "Last 12 hours" },
    { value: "24h", label: "Last 24 hours" },
    { value: "7d", label: "Last week" },
    { value: "30d", label: "Last month" },
    { value: "1y", label: "Last year" },
    { value: "all", label: "All time" },
  ];

  // Style for select component
  const customStylesForSelect = {
    menuList: (provided) => ({
      ...provided,
      paddingTop: 0,
      paddingBottom: 0,
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#fff",
    }),
    control: (provided) => ({
      // class attribute : class=" css-i32vvf-control"
      ...provided,
      height: "100%",
      backgroundColor: "#333333",
      borderColor: "#242424",
      cursor: 'pointer',
    }),
    container: (provided) => ({
      // 'menu' is from the div class too.
      ...provided,
      height: "60px",
      boxShadow:
        "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;",
    }),
    option: (provided, state) => ({
      ...provided,
      padding: "15px 10px",
      backgroundColor: state.isSelected ? "#242424" : "#333",
      "&:hover": { backgroundColor: state.isSelected ? "" : "#242424" },
      cursor: 'pointer',
    }),
  };

  // Return error message if fetch data failed
  if (error) {
    return <Error title="Error!" message={error.message} />;
  }

  return (
    <>
      {!loading ? (
        <div className="data-visualisation__top_bar">
          <div>
            <p className="data-visualisation__coin_info_title">Price</p>
            <p className="data-visualisation__coin_info_price">
              {`$${Number(actualPrice).toLocaleString()}`}
              <span
                className={`data-visualisation__coin_info_change ${
                  changeInPercent >= 0
                    ? "data-visualisation__coin_info_change-text-green"
                    : "data-visualisation__coin_info_change-text-red"
                }`}
              >
                {changeInPercent >= 0 ? (
                  <TrendingUpArrow />
                ) : (
                  <TrendingDownArrow />
                )}
                {changeInPercent}%
              </span>
            </p>
          </div>
          <div className="data-visualisation__dropdowns_group">
            <Select
              options={selectCoinOptions}
              isSearchable={false}
              defaultValue={selectCoinOptions[0]}
              styles={customStylesForSelect}
              onChange={(choice) => onCoinSelect(choice.value)}
            />
            <Select
              options={selectTimeFrameOptions}
              isSearchable={false}
              defaultValue={selectTimeFrameOptions[3]}
              styles={customStylesForSelect}
              onChange={(choice) => onTimeFrameSelect(choice.value)}
            />
          </div>
        </div>
      ) : (
        <ClipLoader color={"#333"} size={50} />
      )}
    </>
  );
}
