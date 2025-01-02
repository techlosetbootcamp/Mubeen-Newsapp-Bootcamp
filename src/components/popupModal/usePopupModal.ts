import { useState } from "react";

const usePopupModal = () => {
  const [iconState, setIconState] = useState({
    heart: false,
    share: false,
    save: false,
  });

  const onToggleIcon = (icon: "heart" | "share" | "save") => {
    setIconState((prevState) => ({
      ...prevState,
      [icon]: !prevState[icon],
    }));
  };
  return {
    iconState,
    onToggleIcon,
    setIconState,
  };
};

export default usePopupModal;
