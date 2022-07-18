import React, { useEffect, useState } from "react";
import { generateEncryptedCipher, decryptCipher } from "./CipherBackend";

const randomKey = Math.floor(Math.random() * 5) + 1;

const encryptedCipher = generateEncryptedCipher();
const decryptedCipher = decryptCipher(encryptedCipher, randomKey);

function Cipher({ history }) {
  const [userInfo, updateUserInfo] = useState({
    decryptedCipherText: "",
  });
  const [errors, setErrors] = useState({
    decryptedCipherTextValid: false,
  });

  const onChange = (e) => {
    validate(e);
    updateUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const validate = (e) => {
    switch (e.target.name) {
      case "decryptedCipherText":
        if (e.target.value === "" || e.target.value === null) {
          errors["decryptedCipherText"] = "Decrypted cipher text is required.";
          errors["decryptedCipherTextValid"] = false;
        } else if (e.target.value !== decryptedCipher) {
          errors["decryptedCipherText"] = "Incorrect decrypted cipher text.";
          errors["decryptedCipherTextValid"] = false;
        } else {
          errors["decryptedCipherText"] = "";
          errors["decryptedCipherTextValid"] = true;
        }
        break;
      default:
        break;
    }
    setErrors(errors);
  };

  const validateFields = () => {
    if (errors.decryptedCipherTextValid) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateFields()) {
      console.log("Login success!");
      history.push("/");
    }
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1>Login</h1>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="row">
              <span
                style={{
                  fontWeight: "bold",
                  marginTop: "20px",
                  paddingLeft: "150px",
                }}
              >
                Decrypt Ceaser Cipher: {encryptedCipher}
              </span>
            </div>
            <div className="row">
              {" "}
              <span
                style={{
                  fontWeight: "bold",
                  paddingLeft: "150px",
                }}
              >
                Key = {randomKey}{" "}
              </span>
            </div>
            <form onSubmit={handleSubmit} className="mt-3">
              <div className="form-group mb-3">
                <label className="form-label">Cipher Text</label>
                <input
                  type="text"
                  name="decryptedCipherText"
                  className="form-control"
                  placeholder="Cipher"
                  value={userInfo.decryptedCipherText}
                  onChange={(e) => onChange(e)}
                />
              </div>
              {errors["decryptedCipherText"]}
              <br />

              <button disabled={!validateFields()} className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cipher;
