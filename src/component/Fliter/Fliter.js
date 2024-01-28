import React, { useEffect, useState } from 'react'
import './Fliter.css'
import { useSelector } from 'react-redux';

const Fliter = ({data, setData, allBranch, allTypes, allStatus}) => {
  const list = useSelector(state => state.list);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [branch, setBranch] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [searchExt, setSearchExt] = useState('');
  const [error, setError] = useState(false);

  function parseDate(dateString) {
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
  }

  const filterData = () => {
    let filtered = list;
    if (fromDate && toDate) {
      const fromDateObject = new Date(fromDate);
      const toDateObject = new Date(toDate);
      filtered = filtered.filter(item => {
        const itemDate = parseDate(item.date);
        return itemDate >= fromDateObject && itemDate <= toDateObject;
      });
    }
    if (branch && branch !== "all") {
      filtered = filtered.filter(item => branch === item.branch);
    }
    if (type && type !== "all") {
      filtered = filtered.filter(item => type === item.type);
    }
    if (status && status !== "all") {
      filtered = filtered.filter(item => status === item.status);
    }
    setData(filtered);
  };

  const reset = () => {
    setFromDate('');
    setToDate('');
    setBranch('all');
    setType('all');
    setStatus('all');
  }

  const search = () => {
    if (searchExt) {
      let filtered = list;
      filtered = filtered.filter(item => {
        let id = item.id;
        return id.startsWith(searchExt)
      });
      setData(filtered);
    } else {
      setData(list);
    }
  }

  const validation = (event) => {
    if (fromDate) {
      let fDate = parseDate(fromDate);
      let tDate = parseDate(event);
      setError(fDate > tDate);
    }
  }

  useEffect(() => {
    filterData();
  }, [fromDate, toDate, branch, type, status]);

  return (
    <div>
      <div className='search_section'>
        <p>Total({list.length})</p>
        <div className="search-container">
          <input type="text" placeholder="Search.." name="search" onChange={(event) => setSearchExt(event.target.value)}/>
          <button type="submit" onClick={() => search()}>Search ID</button>
        </div>
      </div>
      <div className='fliter_section'>
        <div className='fliter_sec'>
          <div className="form__group field">
            <input type="date" className="form__field" pattern="\d{2}-\d{2}-\d{4}" name="name" id='name' value={fromDate} onChange={(event)=> setFromDate(event.target.value)}/>
            <label htmlFor="name" className="form__label">From</label>
          </div>
          <div className="form__group field" style={{marginTop: error ? '20px' : '10px'}}>
            <input type="date" className="form__field" style={{borderBottom: error ? '1px solid red' : '1px solid #9b9b9b'}} placeholder="dd/mm/yyyy" name="name" id='name' value={toDate} onChange={(event)=> {setToDate(event.target.value); validation(event.target.value);}}/>
            <label htmlFor="name" className="form__label">To</label>
            <span className='error' style={{display: error ? 'block' : 'none'}}>To date cannot be less than From date</span>
          </div>
        </div>
        <div className='fliter_sec'>
          <div className="form__group field">
            <label htmlFor="name" className="form__label">Branch</label>
            <select className='custom-select' onChange={(event) => setBranch(event.target.value)} value={branch}>
              <option value="all">All</option>
              {allBranch.size > 0 ? Array.from(allBranch).map((item)=> (
                <option value={item} key={item}>{item}</option>
              )): <option value="all">All</option>}
            </select>
          </div>
          <div className="form__group field">
            <label htmlFor="name" className="form__label">Type</label>
            <select className='custom-select' onChange={(event) => setType(event.target.value)} value={type}>
              <option value="all">All</option>
              {allTypes.size > 0 ? Array.from(allTypes).map((item)=> (
                <option value={item} key={item}>{item}</option>
              )): <option value="all">All</option>}
            </select>
          </div>
          <div className="form__group field">
            <label htmlFor="name" className="form__label">Status</label>
            <select className='custom-select' onChange={(event) => setStatus(event.target.value)} value={status}>
              <option value="all">All</option>
              {allStatus.size > 0 ? Array.from(allStatus).map((item)=> (
                <option value={item} key={item}>{item}</option>
              )): <option value="all">All</option>}
            </select>
          </div>
        </div>
        <div className="form__group search-container" style={{cursor:'pointer'}}>
        <button onClick={()=> reset()}>Reset</button>
        </div>
      </div>
    </div>
  )
}

export default Fliter;