import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");

  const [message, setMessage] = useState("");
  const [signedMessage, setSignedMessage] = useState("");


  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        setPrivateKey={setPrivateKey}
        setAddress={setAddress}
        address={address}
        setMessage={setMessage}
        message={message}
        setSignedMessage={setSignedMessage}
        signedMessage={signedMessage}
        setPublicKey={setPublicKey}
        publicKey={publicKey}
      />
      <Transfer setBalance={setBalance} address={address} signedMessage={signedMessage} privateKey={privateKey}/>
    </div>
  );
}

export default App;
