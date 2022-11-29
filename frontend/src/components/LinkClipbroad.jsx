import React, { useState } from "react";
import { HiLink } from "react-icons/hi";
import Message from "./Message";

function LinkClipbroad({ link, className }) {
  const [copySuccess, setCopySuccess] = useState(false);
  async function copyToClip() {
    await navigator.clipboard.writeText(link);
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 2000);
  }
  return (
    <>
      <button className={className} onClick={() => copyToClip()} type="button">
        <HiLink className="font-bold text-2xl " />
      </button>
      {copySuccess && <Message message="Copied" success={true} />}
    </>
  );
}

export default LinkClipbroad;
