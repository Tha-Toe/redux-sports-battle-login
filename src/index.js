import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { PropsContextProvider } from "./context/PropsContext";
import { MyPropsContextProvider } from "./context/MyPropsContext";
import { TxHistoryContextProvider } from "./context/TxHistoryContext";
import { MyAccountContextProvider } from "./context/MyAccountContext";
import { EnterReferalContextProvider } from "./context/EnterReferalCodeContext";
import { KnowMoreContextProvider } from "./context/KnowMoreContext";
import { EmailPrefrenceContextProvider } from "./context/EmailPrefrencesContext";
import { SupportChatContextProvider } from "./context/SupportChatContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PropsContextProvider>
        <MyPropsContextProvider>
          <TxHistoryContextProvider>
            <MyAccountContextProvider>
              <EnterReferalContextProvider>
                <KnowMoreContextProvider>
                  <EmailPrefrenceContextProvider>
                    <SupportChatContextProvider>
                      <App />
                    </SupportChatContextProvider>
                  </EmailPrefrenceContextProvider>
                </KnowMoreContextProvider>
              </EnterReferalContextProvider>
            </MyAccountContextProvider>
          </TxHistoryContextProvider>
        </MyPropsContextProvider>
      </PropsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
