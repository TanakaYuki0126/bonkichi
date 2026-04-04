import Link from "next/link";
import { AiOutlineYoutube } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
export default function YouTubeLink() {
  return (
    <a
      href="https://www.youtube.com/channel/UCKzfF7tcNVtxyX5QFOMbjTA"
      target="_blank"
      rel="noopener noreferrer nofollow"
    >
      <IconContext.Provider value={{ size: "16px" }}>
        <AiOutlineYoutube />
      </IconContext.Provider>
    </a>
  );
}
