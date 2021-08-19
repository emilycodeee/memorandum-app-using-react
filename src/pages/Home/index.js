import { useState, useEffect, useRef } from "react";
import { API_GET_DATA } from "../../global/constants";
import "./index.css";
import Edit from "./components/Edit";
import List from "./components/List";

//"GET" method
async function fetchData(setData) {
  const res = await fetch(API_GET_DATA);
  const { data } = await res.json();
  setData(data);
} //fetchData()也會被包裝成一個promise

//"PUT" method 用PUT方法因為npm指定如此
async function fetchSetData(data) {
  await fetch(API_GET_DATA, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ data }),
  });
}

const Home = () => {
  const [data, setData] = useState([]);
  const submittingStatus = useRef(false);
  //永遠維持最新狀態的值，不影響渲染

  //將effect與state功能切開，例如用state管理刷新，用effect管理db的寫入與讀取
  //將post資料寫入db
  //依賴data變動，當data變動，則寫入資料庫
  useEffect(() => {
    if (!submittingStatus.current) {
      return;
      //用useRef唯一值概念作守門員，如果是第一次，就不用刷新，不然data空值刷新資料庫，將會洗掉資料庫預設資料
    }
    fetchSetData(data).then((data) => (submittingStatus.current = false));
  }, [data]);

  //從database導入初始資料
  useEffect(() => {
    fetchData(setData);
  }, []);

  // useEffect 一定會執行第一次
  //記得加依賴，避免落入無限迴圈，因若沒設依賴去連動判斷依賴根據是否刷新，則會每次render

  //ex 模擬class生命週期
  //(但不要把生命週期概念放進來)
  // useEffect(()=>{
  // //綁定的事情
  // return()=>{
  // //取消綁定的事情
  // }

  // })

  return (
    <div className="app">
      <Edit setData={setData} submittingStatus={submittingStatus} />
      <List
        data={data}
        deleteData={setData}
        submittingStatus={submittingStatus}
      />
    </div>
  );
};

export default Home;
