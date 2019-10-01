import React from 'react'
import styles from './Footer.module.css';

const Footer = (props) => {
    return (
        <div className={styles.footer}>
            <div className="container">
                <span className="text-muted">{props.text}</span>
            </div>
        </div>
    )
}

export default Footer;