import { useState } from "react";
import ApiRepository from "../network/ApiRepository.ts";
import { AppToastRef } from "../App.tsx";
import { ToastMessage } from "primereact/toast";

export default function usePageState() {
  const [isLoading, setLoading] = useState(false);
  const apiRepository = ApiRepository.getInstance();
  const appToast = AppToastRef.current;

  function showToast(message: string, config?: Omit<ToastMessage, "detail">) {
    appToast?.show({
      detail: message,
      severity: "info",
      ...config
    });
  }

  function showSuccess(message?: string, config?: Omit<ToastMessage, "detail">) {
    appToast?.show({
      detail: message || "Success!",
      severity: "success",
      ...config
    });
  }

  function showError(message?: string, config?: Omit<ToastMessage, "detail">) {
    appToast?.show({
      detail: message || "An error occurred!",
      severity: "error",
      ...config
    });
  }

  const toaster = {
    showSuccess,
    showError,
    showToast
  }

  return {
    isLoading,
    setLoading,
    repository: apiRepository,
    ...toaster,
  };
}
