import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { getNamespacedByBlockHeight, submitPFBTransaction } from "./services";
import { getRandomHexString } from "./utils/getRandomHexString";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import {
  getLocalStorageHistory,
  setLocalStorageHistory,
} from "./utils/saveStorage";
import { isValidUrl } from "./utils/validateURL";

const keyStorage = "history-key";

function App() {
  const [hostName, setHostName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState(
    () => getLocalStorageHistory(keyStorage) || {}
  );

  const onSubmitPFB = async () => {
    const namespace_id = getRandomHexString(8);
    const dataBody = getRandomHexString(27);
    setIsLoading(true);
    const url = isValidUrl(hostName);
    if (!url) {
      setIsLoading(false);
      toast.error("Invalid URL", {
        isLoading: false,
        closeOnClick: true,
        autoClose: 3000,
      });
      return;
    }

    const dataPFB = await submitPFBTransaction(url, namespace_id, dataBody);

    if (dataPFB.isSuccess) {
      await getNamespacedByBlockHeight(url, namespace_id, dataPFB.data.height);
      setHistory((prev) => {
        const id = new Date().getTime();
        const newHistory = {
          ...prev,
          [id]: url,
        };

        setLocalStorageHistory(keyStorage, newHistory);
        return newHistory;
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="register-photo">
      <div className="form-container">
        <div style={{ padding: 60 }}>
          <div style={{ width: "100%" }}>
            <h2 className="text-center">
              Execute <strong>PFB</strong> Transaction
            </h2>
            <div className="form-group">
              <label style={{ color: "#505E6D" }}>Host Name:</label>
              <div style={{ display: "flex" }}>
                <input
                  style={{ borderRadius: 16 }}
                  className="form-control"
                  type="Host Name"
                  name="Host Name"
                  placeholder="Input host...."
                  value={hostName}
                  onChange={(e) => setHostName(e.target.value)}
                />
                <button
                  type="button"
                  className="btn bg-transparent"
                  style={{ marginLeft: -40, zIndex: 100 }}
                  onClick={() => setHostName("")}
                >
                  <i className="fa fa-times"></i>
                </button>
              </div>
            </div>

            <div className="form-group">
              <button
                disabled={isLoading}
                className="btn btn-primary btn-block"
                type="submit"
                onClick={onSubmitPFB}
              >
                Execute
              </button>
            </div>

            <div>
              <h5 style={{ textAlign: "center" }}>History</h5>
              {Object.keys(history).length <= 0 ? (
                <div style={{ textAlign: "center" }} className="text-muted">
                  History transaction is empty
                </div>
              ) : (
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginBottom: 20,
                    }}
                  >
                    <button
                      type="button"
                      class="btn btn-danger"
                      onClick={() => {
                        setLocalStorageHistory(keyStorage, {});
                        setHistory({});
                      }}
                    >
                      Delete All
                    </button>
                  </div>
                  <div>
                    <ul
                      className="list-group"
                      style={{ overflowY: "auto", height: 450 }}
                    >
                      {Object.keys(history).length > 0 &&
                        Object.keys(history).map((id) => (
                          <li
                            key={id}
                            className="list-group-item"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>
                              <span
                                style={{
                                  cursor: "pointer",
                                  fontWeight: "bold",
                                }}
                                onClick={() => setHostName(history?.[id])}
                              >
                                {history?.[id]} :&nbsp;
                              </span>
                              <span className="text-muted">{`${new Date(
                                Number(id)
                              ).toLocaleDateString()} ${new Date(
                                Number(id)
                              ).toLocaleTimeString()}`}</span>
                            </div>
                            <button
                              type="button"
                              className="btn bg-transparent"
                              style={{ marginLeft: -40, zIndex: 100 }}
                              onClick={() =>
                                setHistory((prev) => {
                                  const oldHistory = JSON.parse(
                                    JSON.stringify(prev)
                                  );
                                  delete oldHistory[id];
                                  setLocalStorageHistory(
                                    keyStorage,
                                    oldHistory
                                  );
                                  return oldHistory;
                                })
                              }
                            >
                              <i className="fa fa-times"></i>
                            </button>
                          </li>
                        ))}
                      <li></li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
