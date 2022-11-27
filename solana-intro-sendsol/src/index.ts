import * as Web3 from '@solana/web3.js';
import dotenv from 'dotenv';
dotenv.config();

async function main() {
    const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'));
    const payer = await initializeKeypair(connection);
    //await sendSol(connection, 0.1 * Web3.LAMPORTS_PER_SOL, Web3.Keypair.generate().publicKey, payer)
    const phantom = new Web3.PublicKey("9TnCbksb7rFmdN6QfDorR5dynZmMYMSrvF6ESj6AYSSC")
    await sendSol(connection, 0.2 * Web3.LAMPORTS_PER_SOL, phantom, payer)
}

async function initializeKeypair(
    connection: Web3.Connection
  ): Promise<Web3.Keypair> {
    const secret = JSON.parse(process.env.PRIVATE_KEY ?? '') as number[];
    const secretKey = Uint8Array.from(secret);
    const keypairFromSecret = Web3.Keypair.fromSecretKey(secretKey);
    return keypairFromSecret;
  }

  async function sendSol(connection: Web3.Connection, amount: number, to: Web3.PublicKey, payer: Web3.Keypair) {
    const transaction = new Web3.Transaction();
    const sendfunds = Web3.SystemProgram.transfer({fromPubkey: payer.publicKey, toPubkey: to, lamports: amount, })
    transaction.add(sendfunds)
    const transactionSignature = await Web3.sendAndConfirmTransaction(connection, transaction, [payer])
  
    console.log(
      `Transaction https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`
      )
  }

main()
    .then(() => {
        console.log("Finished successfully")
        process.exit(0)
    })
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
