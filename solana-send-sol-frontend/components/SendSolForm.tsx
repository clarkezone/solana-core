import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import * as Web3 from '@solana/web3.js'
import { FC } from 'react'
import styles from '../styles/Home.module.css'


export const SendSolForm: FC = () => {
    const { connection } = useConnection();
	const { publicKey, sendTransaction } = useWallet();

    const sendSol = event => {
        event.preventDefault()
        console.log(`Send ${event.target.amount.value} SOL to ${event.target.recipient.value}`)
        if (!connection || !publicKey) { 
			alert("Please connect your wallet first lol")
			return
		}

        const transaction = new Web3.Transaction();
        const sendfunds = Web3.SystemProgram.transfer({fromPubkey: publicKey, toPubkey: event.target.recipient.value, lamports: event.target.amount.value, })
        transaction.add(sendfunds)
        const transactionSignature = sendTransaction( transaction, connection)
      
        console.log(
          `Transaction https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`
          )
    }

    return (
        <div>
            <form onSubmit={sendSol} className={styles.form}>
                <label htmlFor="amount">Amount (in SOL) to send:</label>
                <input id="amount" type="text" className={styles.formField} placeholder="e.g. 0.1" required />
                <br />
                <label htmlFor="recipient">Send SOL to:</label>
                <input id="recipient" type="text" className={styles.formField} placeholder="e.g. 4Zw1fXuYuJhWhu9KLEYMhiPEiqcpKd6akw3WRZCv84HA" required />
                <button type="submit" className={styles.formButton}>Send</button>
            </form>
        </div>
    )
}