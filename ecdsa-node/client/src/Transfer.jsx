import { toHex } from "ethereum-cryptography/utils";
import { useEffect, useState } from "react";
import server from "./server";
import Sign from "./Sign";

function Transfer({ address, setBalance, privateKey}) {
  const [sendAmount, setSendAmount] = useState("1");
  const [recipient, setRecipient] = useState("049f195d49129f3030f0c6e2d53e7da5b5532c8b1325c55df39d2afe826bb8e186dfbef51afac0a86cb74927b32a00e3c687a9a1b7fd518edd4b309d2d4e5c9844");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [signedMessage, setSignedMessage] = useState(null);

  const setValue = (setter) => (evt) => setter(evt.target.value);


  async function transfer(evt) {
    evt.preventDefault();
    setMessage("transfer " + sendAmount + " to " + recipient);
    setShowModal(true);
  }

  useEffect(() => {
    async function onChange() {
      if (signedMessage !== null) {
        try {
          const {
            data: { balance },
          } = await server.post(`send`, {
            sender: address,
            amount: parseInt(sendAmount),
            signedMessage: signedMessage,
            recipient,
          });
          setBalance(balance);
        } catch (ex) {
          alert(ex.response.data.message);
        }
      }
    }
    onChange();
  }, [signedMessage]);

  const updateMessage = (msg) => {
    setSignedMessage(msg);
  };

  return (
    <div>
      <form className="container transfer" onSubmit={transfer}>
        <h1>Send Transaction</h1>

        <label>
          Send Amount
          <input
            type="number"
            placeholder="1, 2, 3..."
            value={sendAmount}
            onChange={setValue(setSendAmount)}
          ></input>
        </label>

        <label>
          Recipient
          <input
            type="text"
            placeholder="Type an address, for example: 0x2"
            value={recipient}
            onChange={setValue(setRecipient)}
          ></input>
        </label>

        <input type="submit" className="button" value="Transfer" />
      </form>
      {showModal && <Sign message={message} setShowModal={setShowModal} setSignedMessage={updateMessage} privateKey={privateKey}></Sign>}

    </div>
  );
}

export default Transfer;
