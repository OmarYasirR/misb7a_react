import { useState, useReducer } from "react";

const Misb7a = ({ setshowModel, index, azkarArr, setAzkarArr }) => {
  const [currntZikr, setCurrntZikr] = useState(azkarArr[index]);

  function Reducer(Azkar) {
    if (Azkar.hali < currntZikr.addad) {
      setCurrntZikr((prevZikr) => {
        prevZikr.hali = Azkar.hali + 1;
        prevZikr.ejmali = Azkar.ejmali + 1;
        return prevZikr;
      });
      setAzkarArr((prevArr) => {
        prevArr.splice(index, 1, currntZikr);
        return prevArr;
      });
      window.localStorage.setItem("azkar", JSON.stringify(azkarArr));
      return {
        hali: Azkar.hali + 1,
        ejmali: Azkar.ejmali + 1,
        dwrat: Azkar.dwrat
      };
    } else {
      setCurrntZikr((prevZikr) => {
        prevZikr.hali = 0;
        prevZikr.dwrat = prevZikr.dwrat + 1;
        prevZikr.ejmali = prevZikr.ejmali + 1;
        return prevZikr;
      });
      setAzkarArr((prevArr) => {
        prevArr.splice(index, 1, currntZikr);
        return prevArr;
      });
      window.localStorage.setItem("azkar", JSON.stringify(azkarArr));
      return {
        hali: 0,
        ejmali: Azkar.ejmali + 1,
        dwrat: Azkar.dwrat + 1,
      };
    }
  }

  const [Azkar, dispatch] = useReducer(Reducer, {
    dwrat: currntZikr.dwrat,
    hali: currntZikr.hali,
    ejmali: currntZikr.ejmali,
  });

  return (
    <div className="misb7a">
      {currntZikr && (
        <div className="container">
          <h3 className="zikr">{currntZikr.zikr}</h3>
          <div className="cout-box">
            <div className="3add">{currntZikr.addad}</div>
            <div>{Azkar.dwrat}</div>
            <div className="7ali">{Azkar.hali}</div>
            <div className="ejmali">{Azkar.ejmali}</div>
          </div>
          <div
            className="btn"
            onClick={() => {
              dispatch();
            }}
          ></div>
          <div className="add" onClick={() => setshowModel(true)}>
            +
          </div>
        </div>
      )}
    </div>
  );
};

export default Misb7a;
