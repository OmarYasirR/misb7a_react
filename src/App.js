import { useEffect, useState } from "react";
import Azkar from "./component/Azkar";
import Messege from "./component/Messege";
import Misb7a from "./component/Misb7a";
import Model from "./component/Model";
import { AiTwotoneSetting } from "react-icons/ai";
import {BsInfoCircleFill } from "react-icons/bs";
import { IoArrowForward } from "react-icons/io5";

function App() {
  const [showModel, setshowModel] = useState(true);
  const [addad, setAddad] = useState("");
  const [zikr, setZikr] = useState("");
  const [fyda, setFyda] = useState("");
  const [dwrat, setHabat] = useState('');
  const [azkarArr, setAzkarArr] = useState([]);
  const [index, setIndex] = useState(0);
  const [showAzkar, setShowAzkar] = useState(false);
  const [showMessege, setshowMessege] = useState(false);

  const [edit, setEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  function handleSubmit(e, setzkErr, setadErr) {
    e.preventDefault();
    let Zikr = {
      zikr: zikr,
      addad: addad,
      dwrat: 0,
      fyda: fyda,
      ejmali: 0,
      hali: 0,
    };
    // Validation
    if (zikr.length < 3) {
      setzkErr(true);
      return;
    }
    if (!parseInt(addad)) {
      setadErr(true);
      return;
    }

    // Handling Editing
    if(edit){
      azkarArr.map((item, i) =>{
        if(item.zikr === Zikr.zikr){
          azkarArr.splice(i, 1)
        }
        if(i === editIndex && item.zikr !== Zikr.zikr){
          azkarArr.splice(i, 1)
        }
        return item
      })
    }

    // Remove repeated zikr
    if(azkarArr.length){
        setAzkarArr(prevValue => {
          let Arr = prevValue.filter((item) => {
            return item.zikr !== Zikr.zikr
          })
          return [...Arr, Zikr]
        })
      
    }else{
      setAzkarArr([Zikr])
    }

    setshowModel(false);
    setshowMessege(value => {
      if(!showAzkar){
        return value = true
      }
    });
    let handler;
    // clearTimeout(handler)
    handler = setTimeout(() => setshowMessege(false), 3000);
    setZikr("");
    setAddad("");
    setFyda("");
    setEdit(false)
    setEditIndex(null)
  }

  useEffect(() => {
      if (window.localStorage.getItem("azkar") && !azkarArr.length) {
      setshowModel(false);
      setAzkarArr(JSON.parse(window.localStorage.getItem("azkar")));
    }else{
      if (azkarArr.length) {
        window.localStorage.setItem('azkar', JSON.stringify(azkarArr))
      }
    }
  }, [azkarArr]);

  return (
    <div className="App">
      <header>
        <div className="cont">
          <div
            className="icon"
            onClick={() => {
              setShowAzkar((prev) => {
                return !prev;
              });
            }}
          >
            {showAzkar? <IoArrowForward /> : <AiTwotoneSetting />}
          </div>
          <h3>الا بذكر الله تطمئن القلوب</h3>
          <div className="icon">
            <BsInfoCircleFill />
          </div>
        </div>
      </header>
      {showModel && (
        <Model
          setshowModel={setshowModel}
          handleSubmit={handleSubmit}
          addad={addad}
          setAddad={setAddad}
          zikr={zikr}
          setZikr={setZikr}
          fyda={fyda}
          setFyda={setFyda}
          edit={edit}
        />
      )}

      {azkarArr.length && showMessege && (
        <Messege
          messege={`تمت اضافة ${
            azkarArr[azkarArr.length - 1].zikr
          } الي قائمة  الاذكار بنجاح`}
        />
      )}

      {azkarArr.length && showAzkar && (
        <Azkar
          azkarArr={azkarArr}
          setAzkarArr={setAzkarArr}
          index={index}
          setIndex={setIndex}
          handleSubmit={handleSubmit}
          setZikr={setZikr}
          setAddad={setAddad}
          setFyda={setFyda}
          setshowModel={setshowModel}
          setEdit= {setEdit}
          setEditIndex={setEditIndex}
        />
      )}

      {azkarArr.length && !showAzkar && (
        <Misb7a
          setshowModel={setshowModel}
          index={index}
          azkarArr={azkarArr}
          setAzkarArr={setAzkarArr}
          showAzkar={showAzkar}
        />
      )}
    </div>
  );
}

export default App;
