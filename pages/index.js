import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Manual_Header from "../components/Manual_Header"

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Decentralized Lottery App</title>
        <meta name="description" content="SC Lottery" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Manual_Header></Manual_Header>

      
    </div>
  )
}
