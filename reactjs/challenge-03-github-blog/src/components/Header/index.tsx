import styles from "./styles.module.css"
import logoSvg from "../../assets/logo.svg"
import coverPng from "../../assets/cover-header.png"

export function Header() {
  return (
    <header 
      className={styles.header}
      style={{ backgroundImage: `url(${coverPng})` }}
    >
      <img src={logoSvg} alt="" />
    </header>
  )
}
