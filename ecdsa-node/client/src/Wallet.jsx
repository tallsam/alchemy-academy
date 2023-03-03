import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey, publicKey, setPublicKey }) {

  const privateKeys = [
    { value: '02165ef9df244e707bf1d708a55c2c4d51a5e0a94a43bbe4432707644acef768', label: '02165ef9df244e707bf1d708a55c2c4d51a5e0a94a43bbe4432707644acef768' },
    { value: '1f6945a43aa4b0e8b895252412074dd2b7f915e723b9584b67898eab3e8cdd17', label: '1f6945a43aa4b0e8b895252412074dd2b7f915e723b9584b67898eab3e8cdd17' },
    { value: '09abe10262851e1f88e87b4bbd55a04532dae5be884a5630c33ceaf3a88660ed', label: '09abe10262851e1f88e87b4bbd55a04532dae5be884a5630c33ceaf3a88660ed' },
  ];

  async function onChange(event) {
    
    const privateKey = event.target.value;
    if (privateKey === "") {
      return;
    }
    setPrivateKey(privateKey);
    setPublicKey(toHex(secp.getPublicKey(privateKey)));
    const address = '0x' + toHex(keccak256(secp.getPublicKey(privateKey)).slice(-20))
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
      <h1>Wallet</h1>
      <label>
        Choose a Private Key
        <select onChange={onChange} value={privateKey}>
          <option key="">Select one!</option>
          {privateKeys.map((pk) => (
            <option key={pk.value} value={pk.value}>
              {pk.value}
            </option>
          ))}
        </select>
      </label>

      <label>Public Key
        <textarea disabled width="40" value={publicKey}></textarea>
      </label>

      <label>Address
        <textarea disabled width="40" value={address}></textarea>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
