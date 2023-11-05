import React, { useEffect, useState } from 'react'
import './App.css'

const App= ()=>{
  let [inputData, setInputData] = useState('');
  let [title, setTitle] = useState(locData());
  let [toggleSubmit, setToggleSubmit] = useState(true);
  let [isEdit, setEdit] = useState(null);

  //=========set the data======================
  let getData=()=>
  {
    if(!inputData){
      alert("Enter your name.....")
    }else if(inputData && !toggleSubmit){
      console.log("edit", isEdit)
      setTitle(
        title.map((value)=>{
          if(value.id==isEdit){
            setToggleSubmit(true);
            return {...value, name:inputData}
          }
          return value;
        })
      )
     
      setInputData('');
      //====================add the data=================
    }else{
      let allInputData ={id:new Date().getTime().toString(), name:inputData}
      setTitle([...title, allInputData]);
      setInputData('');
    }

  }
  //=================clear all data==============
  function clearAllData(){
    setTitle([])
  }
  //=====================remove one data======================
  let remove=(id)=>{
    console.log(id);
    let x=title.filter((value)=>{
      return id !=value.id;
    })
    setTitle(x);
  }
  //===============edit data==================================
  function editData(id){
    let x=title.find((value)=>{
      return id=value.id;
    })
    setToggleSubmit(false);
    setInputData(x.name);
    setEdit(id);
  }
  //=================set data on localStorage==================
  useEffect(()=>{
    localStorage.setItem('li', JSON.stringify(title))

  }, [title])
  //===============get data from localstorage==================
  function locData(){
    let lit = localStorage.getItem('li');
    if(lit){
      return JSON.parse(localStorage.getItem('li'));
    }else{
      return [];
    }
  }
return(
  <div className='inputdata'>
  <input type="text" placeholder='Enter Name.....' value={inputData} onChange={(e)=> setInputData(e.target.value)}/>
  {
    toggleSubmit? <button onClick={getData} className='submit'>Submit</button>:<button onClick={getData}>Edit</button>

  }
  
  <div>
  <br></br>
  {
    title.map(value=>{
      return (
        <div key={value.id}>
        <span className="class">{value.name}<button onClick={()=>remove(value.id)}><i class="fa-solid fa-trash"></i></button>
                                  <button onClick={()=>editData(value.id)}><i class="fa-solid fa-pen-to-square"></i></button><br></br></span>
        </div>
      )
    })
  }
  <button onClick={clearAllData} className="clear">Clear All</button>
  </div>
  </div>
  )}
  



export default App;