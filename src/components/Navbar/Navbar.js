import React from 'react';
import styles from './Navbar.module.css';
// import path from 'path';
// const logo = path.resolve('../../../public/logo/logo.png')
// const logo = path.resolve('./logo.png')
const Navbar = (props) => {
    return (
        <div className={`${styles.navbar} ${styles.sticky}`}>
            <img className={styles.logo} src={require('./logo.png')} alt={'img'}></img>
            <input
                type="text" 
                name="search" 
                className={styles.search} 
                onChange={props.search}
                placeholder="Search for products.. ">
            </input>
        </div>
    )
}

export default Navbar


// Problems faced:
// 1. Multiple CSS classes