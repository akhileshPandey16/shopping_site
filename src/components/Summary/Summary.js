import React from 'react'
import styles from './Summary.module.css'

const Summary = (props) => {
    return (
        <div className={`${styles.summary} ${styles.sticky}`}>
            <h3>{props.items} items | Rs. {props.amount}</h3>
            <h3 id="viewBag"> </h3>||
            <button className={styles.deleteAll} onClick={props.delete}>Delete All</button>
        </div>
    )
}

export default Summary
