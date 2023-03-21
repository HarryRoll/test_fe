import './App.css';
import React, { useEffect, useState } from 'react';

function App() {

  const [rows, setRows] = useState ([{id : 1, price : 0, qty:1, total:0}])
  const [countRow, setCountRow] = useState(1)
  const [total,setTotal] = useState(0)
  const [ind, setInd] = useState(0)
  const [refresh,setRefresh] = useState(false)

  const newRow = () => {
      setRows([...rows, {id : Math.floor(Math.random()*1000000)}])
      setCountRow(countRow + 1)
  }

  const delRow = (e) => {
     setRows(rows.filter(data => data.id !== e.id))
     setCountRow(countRow - 1)
  }


  const handlePrice = index => e => {
    const newArray = rows.map((item, i) => {
      if (index === i) {
        return { ...item, [e.target.name]: e.target.value};
      } else {
        return item;
      }
    });
    setRows(newArray);
    setRefresh(!refresh)
    console.log(rows)
  }

  const handleQty = index => e => {
      if(e.target.value <= 0){
        alert('qty tidak boleh kurang dari 0')
        const newArray = rows.map((item, i) => {
              if (index === i) {
                return { ...item, [e.target.name]: 100};
              } else {
                return item;
              }
            });
        setRows(newArray);
        setRefresh(!refresh)
      }else{
        const newArray = rows.map((item, i) => {
              if (index === i) {
                return { ...item, [e.target.name]: e.target.value};
              } else {
                return item;
              }
            });
        setRows(newArray);
        setRefresh(!refresh)
      }
  }

  useEffect(() => {
        const newArray = rows.map((item, i) => {
              if (ind === i) {
                return { ...item, "total":  rows[ind].price* rows[ind].qty };
              } else {
                return item;
              }
            });
        setRows(newArray);
        
        let sum = 0
        const grandTotal = newArray.map(e => {
          sum+=e.total
          return sum;
        })
        if(Array.isArray(grandTotal)){
            let i = grandTotal.length - 1
            setTotal(grandTotal[i])
          }
  },[refresh])

  return (
    <div>
        <button onClick={(e) => newRow(e)} type='submit'>New</button>
    {rows.map( (e,i)  => {
      return(
          <table>
          <thead>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>QTY</th>
            <th>Total</th>
            <th></th>
          </thead>
          <tbody>
            <tr>
              <td>
                <input defaultValue={e.id} type="text"/>
              </td>              
              <td>
                <input type="number" defaultValue={e.price} 
                      name='price'
                      onClick={() => setInd(i)}
                      onChange={handlePrice(i)}
                      />
              </td>
              <td>
                <input type="number" 
                    defaultValue={e.qty}  
                    name='qty'
                    onClick={() => setInd(i)}
                    onChange={handleQty(i)}/>
              </td>
              <td>
                <input type="text" defaultValue={e.total} value={e.total} readOnly/>
              </td>
              <td>
                {countRow > 1
                ?
                  <button onClick={() => delRow(e)}>Delete</button>
                :
                <></>
                }
              </td>
            </tr>
          </tbody>
        </table>
      )
    })}
        <div>
            <label>
              Grand total
            </label>
            <input value={total} type="text" readOnly/>
        </div>
    </div>
  );
}

export default App;
