import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import {toHex} from "ethereum-cryptography/utils";


function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    const address = toHex(secp.getPublicKey(privateKey));
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
       Private Key
        <input placeholder="Type a private key" value={privateKey} onChange={onChange}></input>
      </label>

      <label>Address</label>
      <p>{address.slice(0,10)}...</p>

      <label>Message to sign</label>
      <textarea defaultValue="Sign this message to send a transaction"></textarea>
      <label>Signed Message</label>
      <textarea placeholder="Paste the signed message here"></textarea>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
