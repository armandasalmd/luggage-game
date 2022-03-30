import { toast, ToastOptions } from "react-toastify";
import Constants from "@utils/Constants";

const DEFAULT_OPTIONS: ToastOptions = {
  position: "top-right",
  autoClose: Constants.messageDuration,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

const items = {
  success: (message: string) => toast.success(message, DEFAULT_OPTIONS),
  error: (message: string) => toast.error(message, DEFAULT_OPTIONS),
  warning: (message: string) => toast.warning(message, DEFAULT_OPTIONS),
  information: (message: string) => toast.info(message, DEFAULT_OPTIONS),
};

export default items;
