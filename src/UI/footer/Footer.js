import React from 'react'
import styles from './Footer.module.css';

const Footer = (props) => {
    return (
        <div className={styles.footer}>
                <span className="text-muted text" style={{marginLeft:'60px'}}>Data retrieved from <a href='https://pokeapi.co'>https://pokeapi.co</a></span>
        </div>
    )
}

export default Footer;