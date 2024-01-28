import React from 'react';
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { addItem } from '../../actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import './TableT.css'
const TableT = ({data, setData}) => {
    const list = useSelector(state => state.list);
    const dispatch = useDispatch();

    const deleteObjectById = (idToDelete) => {
        let filterList = list.filter(obj => obj.id !== idToDelete);
        let filterData = data.filter(obj => obj.id !== idToDelete);
        setData(filterData);
        dispatch(addItem(filterList));
    }
    
    const parseDate =(dateString) => {
        const [day, month, year] = dateString.split('/');
        return new Date(`${year}-${month}-${day}`);
    }
    
    const sortDate = () => {
        const sortedList = [...data].sort((a, b) => parseDate(a.date) - parseDate(b.date));
        setData(sortedList);
    }
  return (
    <div style={{overflowX: 'auto'}}>
        <table>
            <tr>
            <th>ID</th>
            <th>DATE <HiOutlineArrowsUpDown onClick={()=>sortDate()}/></th>
            <th>BRANCH</th>
            <th>TYPE</th>
            <th>AMOUNT <br/> (IN RUPEES)</th>
            <th>BANK</th>
            <th>REQUESTED BY <br/> (EMPLOYEE CODE)</th>
            <th>STATUS</th>
            </tr>
            {data.length > 0 ? data.map((data) => (
                <tr>
                <td>{data.id}</td>
                <td>{data.date}</td>
                <td>{data.branch}</td>
                <td>{data.type}</td>
                <td>{data.amount}</td>
                <td>{data.bank}</td>
                <td>{data.request_by} <br/> <span>{data.request_code}</span></td>
                <td className='delete-section'> {data.status} 
                    <span style={{marginTop: '10px'}}>
                        <img src='./cross.svg' alt='' onClick={()=> deleteObjectById(data.id)}/>
                    </span> </td>
                </tr>
            )) : (
                <tr className='no-list'>No Results</tr>
              )}
        </table>
    </div>
  )
}

export default TableT