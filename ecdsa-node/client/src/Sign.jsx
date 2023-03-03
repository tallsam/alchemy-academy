import { useState } from "react";
import server from "./server";
import * as  secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils";

function Sign({ message, setMessage, setShowModal, setSignedMessage, privateKey }) {

  const hashMessage = (msg) => {
    const bytes = utf8ToBytes(msg);
    return keccak256(bytes);
  }

  const recoverKey = (msg, sig, recoveryBit) => {
    return secp.recoverPublicKey(hashMessage(msg), sig, recoveryBit);
  }

  const signMessage = async (evt) => {
    evt.preventDefault();
    const hashedMsg = hashMessage(message);
    const [signedMessage, recoveryBit] = await secp.sign(toHex(hashedMsg), privateKey, { recovered: true });
    const signedMessagePayload = { 
      message: message, 
      signature: toHex(signedMessage), 
      recoveryBit: recoveryBit 
    };
    setSignedMessage(signedMessagePayload);
    setShowModal(false);
  }

  const closeModal = (evt) => {
    evt.preventDefault();
    setShowModal(false);
  }

  return (
    <div>
      <form className="container sign display-block" onSubmit={signMessage}>
        <h1>Sign Message</h1>

        <label>
          Message
          <textarea disabled="disabled" defaultValue={message}></textarea>
        </label>

        <input type="submit" className="button" value="Sign" />
        <input type="submit" className="button cancel" onClick={closeModal} value="Cancel" />

      </form>

    </div>
  )
}

export default Sign;
