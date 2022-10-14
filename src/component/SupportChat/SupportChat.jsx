import React from "react";
import { SupportChatContextData } from "../../context/SupportChatContext";
import LoadingSpinnerEachSection from "../loadingSpinner/LoadingSpinnerEachSection";

export default function SupportChat() {
  const { supportChatDataCommingFromApi } = SupportChatContextData();
  if (supportChatDataCommingFromApi) {
    return;
  } else {
    return <LoadingSpinnerEachSection />;
  }
}
