import React from "react";
import LoadingSpinnerEachSection from "../loadingSpinner/LoadingSpinnerEachSection";
import { useSelector } from "react-redux";

export default function SupportChat() {
  const supportChatDataCommingFromApi = useSelector(
    (state) => state.user.supportChatDataCommingFromApi
  );
  if (supportChatDataCommingFromApi) {
    return;
  } else {
    return <LoadingSpinnerEachSection />;
  }
}
