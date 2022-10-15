import { useState } from "react";
import Messege from "./Messege";

function Model({
  setshowModel,
  addad,
  zikr,
  fyda,
  setAddad,
  setZikr,
  setFyda,
  setAzkarArr,
  handleSubmit,
  edit,
})
{
  function hideModel (){
    setshowModel(false)
    setzkErr(false)
    setadErr(false)
  }
  const [zkErr, setzkErr] = useState(false);
  const [adErr, setadErr] = useState(false);
  
  return (
    <div className="model">
      <form onSubmit={(e) => handleSubmit(e ,setzkErr, setadErr)}>
        <label htmlFor="zikr"> الذكر</label>
        <div className="input-cont">
        <input
          type="text"
          id="zikr"
          value={zikr}
          onFocus={() => setzkErr(false)}
          onChange={(e) => setZikr(e.target.value)}
          />
          {zkErr && <Messege messege={'هذا الحقل لايمكن ان يحتوي علي اقل من ثلاثه حروف'} />}
          </div>
          
        <label htmlFor="3add"> العدد</label>
        <div className="input-cont">
        <input
          type="number"
          id="3add"
          value={addad}
          onChange={(e) => setAddad(e.target.value)}
          onFocus={() => setadErr(false)}
        />
        {adErr && <Messege messege={'هذا الحقل يجب ان يحتوي علي عدد اكبر من الصفر'} />}
        </div>
        <label>الفائده</label>
        <textarea
          name=""
          value={fyda}
          onChange={(e) => setFyda(e.target.value)}
        ></textarea>
        <button type="submit">{edit? 'تعديل' : 'اضافه'}</button>
        <button onClick={() => hideModel()}>الغاء</button>
      </form>
    </div>
  );
}

export default Model;
