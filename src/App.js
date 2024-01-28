import React, { useEffect, useState } from 'react';
import './App.css';
import Fliter from './component/Fliter/Fliter';
import TableData from './component/TableT/TableData.json';
import { useDispatch } from 'react-redux';
import { addItem } from './actions/actions';
import TableT from './component/TableT/TableT';

const App = () => {

  // const list = useSelector(state => state.list);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [branch, setBranch] = useState([]);
  const [type, setType] = useState([]);
  const [status, setStatus] = useState([]);

  const setFields = (data) => {
    let allBranch = new Set();
    let allTypes = new Set();
    let allStatus = new Set();
    for (let item of data) {
      allBranch.add(item.branch);
      allTypes.add(item.type);
      allStatus.add(item.status);
    }
    setBranch(allBranch);
    setType(allTypes);
    setStatus(allStatus);
  }

  useEffect(() => {
    dispatch(addItem(TableData));
    setData(TableData);
    setFields(TableData);
  }, []);

  return (
    <div className="App">
      <Fliter data={data} setData={setData} allBranch={branch} allTypes={type} allStatus={status}/>
      <br/>
      {/* <Table data={data} setData={setData}/> */}
      <TableT data={data} setData={setData}/>
    </div>
  );
}

export default App;