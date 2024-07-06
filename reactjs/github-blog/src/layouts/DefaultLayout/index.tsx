import styles from "./styles.module.css"
import { Header } from "../../components/Header"
import { Outlet } from "react-router-dom"

export function DefaultLayout() {
  return (
    <div className={styles.defaultLayout}>
      <Header />

      <main>
        <Outlet />
      </main>
    </div>
  )
}
