import { useEffect } from "react";
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";


const Azkar = ({
  azkarArr,
  setAzkarArr,
  index,
  setIndex,
  handleSubmit,
  setZikr,
  setAddad,
  setFyda,
  setshowModel,
  setEdit,
  setEditIndex
}) => {
  function deleteHandler(i, e) {
    setAzkarArr((prevAzkarArr) => {
      if (prevAzkarArr.length > 1) {
        let newArr = prevAzkarArr.filter((item, j) => {
          return j !== i;
        });
        window.localStorage.setItem("azkar", JSON.stringify(newArr));
        return newArr;
      }
      return prevAzkarArr;
    });
  }

  useEffect(() => {
    azkarArr.length === index && setIndex(azkarArr.length - 1);
    setAzkarArr(JSON.parse(window.localStorage.getItem("azkar")));
  },[index, setAzkarArr, azkarArr.length, setIndex]);

  return (
    <div className="azkar">
      <div className="container">
        <h3>قائمة اذكاري</h3>
        {azkarArr.map((item, i) => {
          return (
            <div className={i === index ? "zikr active" : "zikr"} key={i}>
              <div
                onClick={() => {
                  setIndex(i);
                }}
              >
                {item.zikr}
              </div>
              <div>
                <span
                  onClick={() => {
                    deleteHandler(i)
                  }}
                >
                  <MdDelete />
                </span>
                <span
                  onClick={() => {
                    setZikr(item.zikr);
                    setAddad(item.addad);
                    setFyda(item.fyda);
                    setEdit(true)
                    setEditIndex(i)
                    setshowModel(true);
                  }}
                >
                  <GrEdit />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Azkar;
