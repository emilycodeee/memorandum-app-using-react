import { useState } from "react";
import { v4 } from "uuid";

const Edit = ({ setData, submittingStatus }) => {
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const inputNote = (e) => {
    setNote(e.target.value);
  };

  const inputDate = (e) => {
    setDate(e.target.value);
  };

  const inputTime = (e) => {
    setTime(e.target.value);
  };

  function addItem() {
    submittingStatus.current = true;
    setData(function (prev) {
      return [{ id: v4(), note, date, time }, ...prev];
    });
  }
  console.log(note);
  return (
    <div>
      <h1>備忘錄</h1>
      <p>記事：</p>
      <input type="text" onChange={inputNote} value={note} />
      <p>日期：</p>
      <input type="date" onChange={inputDate} value={date} />
      <p>時間：</p>
      <input type="time" onChange={inputTime} value={time} />
      <button className="add" onClick={addItem}>
        新增
      </button>
    </div>
  );
};

export default Edit;
