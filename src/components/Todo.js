import React, { useEffect, useState,useRef } from 'react'


// get the data from local storage
const getLocalStorage = () => {
    let list = localStorage.getItem('task');
    if(list){
        return JSON.parse(localStorage.getItem('task'));
    }else{
        return [];
    }
}

const Todo = () => {
    const [inputData, setInputData] = useState('');
    const [items,setItems] = useState(getLocalStorage());
    const [isChecked, setIsChecked] = useState([]);
    const [agree,disAgree] = useState(true);
    const ref = useRef(null);


    // add new task in todo
    const addItem = () => {
        if(!inputData.trim()){
            setInputData('')
        }else{
           setItems([...items,inputData]);
           setInputData('');
        }
        ref.current.focus();
    }
    

    // add to local storage
    useEffect(() => {
       localStorage.setItem('task', JSON.stringify(items));
       ref.current.focus();
    },[items]);

    
// checked the items
    const handleChange =(e) => {
        let updatedList = [...isChecked];
      if(e.target.checked){
       
          updatedList=[...isChecked,e.target.value];  
      }else{
          updatedList.splice(isChecked.indexOf(e.target.value),1);
      }
      setIsChecked(updatedList);
     if(updatedList.length ===0){
        disAgree(true);
     }else{
        disAgree(false);
     }
       }

   
// Delete all the checked items
    const allDelete = () => {
       let uni1 = isChecked.filter((o) => items.indexOf(o) === -1)
       let uni2 = items.filter((o) => isChecked.indexOf(o) === -1)
       let result = uni1.concat(uni2);
        setItems(result);
        disAgree(true);
        setIsChecked([]);
            }

    return (
        <>
        <div className='main-div'>
            <h1 className='child'>
                Todo-List
            </h1>

            <div className='add-items'>
                <input type="text"
                className='main-input'
                 placeholder='Type your todo task here...'
                 value={inputData}
                 onChange={(e) => setInputData(e.target.value)}
                 ref={ref}/>
                <button onClick={addItem} className="addBtn">Add</button>
                <button onClick={allDelete} className= "delBtn" disabled={agree}>Delete</button>
            </div>

            <div className='showItems'>
                {
                    items.map((elem,ind) => {
                        return(
                            <div className='eachItem' key={elem+" "+ind} > 
                            <input type="checkbox" value = {elem} onClick={ handleChange} className="checkBtn"/>
                                <span className='newItem'>{elem}</span>
                </div>
                        )
                    })
                }
            
            </div>
            
        </div>
        
        </>
    )

}
export default Todo