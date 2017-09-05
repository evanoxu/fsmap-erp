import React from 'react'
import { Config } from '../../utils'
import styles from './Footer.less'

const Footer = () => (<div className={styles.footer}>
  {Config.footerText}
</div>)

export default Footer
