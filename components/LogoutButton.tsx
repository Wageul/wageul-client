"use client";

import { useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_LOCAL_API_URL + "/api";

export default function LogoutButton() {
  const [dialogState, setDialogState] = useState<"logout-confirmation">(
    "logout-confirmation"
  );

  const [dialogIsVisible, setDialogIsVisible] = useState(false);
  const [dialogAnimationClass, setDialogAnimationClass] = useState("");
  const handleDialogShow = () => {
    setDialogIsVisible(true);
    setDialogAnimationClass("animate-in fade-in-0");
  };
  const handleDialogHide = async () => {
    setDialogAnimationClass("animate-out fade-out-0");
    setTimeout(() => {
      setDialogIsVisible(false);
    }, 140); // Match the animation-duration
    return new Promise((resolveInner) => {
      setTimeout(resolveInner, 140);
    });
  };

  const handleSignOut = async () => {
    if (!apiUrl) {
      throw new Error("API URL is not defined");
    }
    try {
      const url = apiUrl + "/logout";
      console.log(url);
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });
      console.log(
        `LogoutButton.tsx client logOut ${url} status code:`,
        response.status
      );
      console.log('resoponse', response);
      return;
    } catch (err) {
      console.error("Server Error:", err);
      throw new Error("Failed to logout.");
    }
  };

  const dialogs = {
    "logout-confirmation": {
      content: "Do you want to log out?",
      twoButtons: true,
      buttonContent1: "NO",
      handler1: () => {
        handleDialogHide();
      },
      buttonContent2: "YES",
      handler2: async () => {
        // submit deletion (should include setDialog to alert)
        // and
        await handleDialogHide();
        await handleSignOut();
      },
    },
  };

  return (
    <>
      <div
        className="border-b border-foreground w-fit cursor-pointer text-subtitle"
        onClick={() => {
          setDialogState("logout-confirmation");
          handleDialogShow();
        }}
      >
        Log out
      </div>
      {dialogIsVisible && (
        <div
          className={`fixed inset-0 z-50 bg-foreground/30 ${dialogAnimationClass}`}
        >
          <div className="fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] w-[275px] rounded-[20px] flex flex-col bg-background overflow-hidden break-words">
            <div className="px-[24.5px] py-[35px] text-body1 font-semibold text-center">
              {dialogs[dialogState].content}
            </div>
            <div className="flex divide-x divide-grey-3">
              <button
                className="h-[50px] bg-grey-2 flex-1 text-subtitle text-center"
                type="button"
                onClick={dialogs[dialogState].handler1}
              >
                {dialogs[dialogState].buttonContent1}
              </button>
              {dialogs[dialogState].twoButtons && (
                <button
                  className="h-[50px] bg-grey-2 flex-1 text-subtitle text-center"
                  type="button"
                  onClick={dialogs[dialogState].handler2}
                >
                  {dialogs[dialogState].buttonContent2}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
