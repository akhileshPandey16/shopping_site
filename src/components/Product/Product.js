import React, { useState } from 'react'
import styles from './Product.module.css'
const Product = (props) => {
    const [count, setCount] = useState(props.count);
    function addProduct(){
        setCount(count+1);
        props.addClicked();
        console.log(`Count updated for ${props.uid}: ${count}`)
    }
    function removeProduct(){
        setCount(count-1);
        props.removeClicked();
        console.log(`Count updated for ${props.uid}: ${count}`)
    }
    function getBtn(){
        if(count==0){
            return (<button className={styles.addBtn} key={props.uid} onClick={addProduct}>ADD</button>)
        } else {
            return (
                <div className={styles.buttonDiv}>
                    <button className={styles.addBtnSm} key={props.uid} onClick={addProduct}>ADD</button>
                    <p>{count}</p>
                    <button className={styles.delBtnSm} key={props.uid} onClick={removeProduct}>REM</button>
                </div>
                );
        }

    }
    return (
        <div className={styles.product}>
                    <div className={styles.img}>
                        <img src={props.image} alt="thumb"></img>
                     </div>
            <p className={styles.pName}>{props.name}</p>
            <h3 className={styles.price}>Rs. {props.price}</h3>
            {getBtn()}
        </div>
    )
}

export default Product
