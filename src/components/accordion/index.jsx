import { useState } from "react"
import data from './data'
import '../accordion/style.css'

export default function Accordian (){

    const [selected,setSelected] = useState(null);
    const [enableMultiSelection , setEnableMultiSelection] = useState(false);
    const [multiple,setMultiple] = useState([]);

    function handleSingleSelection (getCurrentId){
        setSelected(getCurrentId === selected ? null : getCurrentId)
    }
    console.log(selected,multiple);
    function handleMultipleSelection (getCurrentId){
        let copyMultiple = [...multiple];
        const findIndexOfCurrentId = copyMultiple.indexOf(getCurrentId)

        console.log(findIndexOfCurrentId)
        if(findIndexOfCurrentId === -1 ){
            copyMultiple.push(getCurrentId)
        }else{
            copyMultiple.splice(findIndexOfCurrentId, 1)
        }
        setMultiple(copyMultiple)

    }

    return <div className="wrapper">
        <h2>Accordion</h2>
        <button onClick={()=> setEnableMultiSelection(!enableMultiSelection)}>Enable Multi selection</button>
        <div className="accordian">
        {
             data && data.length>0  ?
             data.map(dataitem=> <div className="item">
                <div onClick= { enableMultiSelection ? ()=> handleMultipleSelection(dataitem.id): () => handleSingleSelection(dataitem.id)}className="title">
                    <h2>{dataitem.question}</h2>
                    <span>+</span>

                </div>
                {
                    enableMultiSelection ?
                    multiple.indexOf(dataitem.id) !== -1 && 
                    <div className="content">
                        {dataitem.answer}</div> :
                     selected === dataitem.id || multiple.indexOf(dataitem.id) !== -1 ? <div className="content">
                     {dataitem.answer}
                 </div> : null   
                }
                {/* {
                    selected === dataitem.id || multiple.indexOf(dataitem.id) !== -1 ? <div className="content">
                        {dataitem.answer}
                    </div> : null
                } */}
             </div>)  
              : <div>No Data Found</div>
        }
        </div>
    </div>
}