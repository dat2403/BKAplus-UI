import { useState } from "react";
import ApiRepository from "../network/ApiRepository.ts";

export default function usePageState() {
  const [isLoading, setLoading] = useState(false)

  const repository = ApiRepository.getInstance()

  return {
    isLoading,
    setLoading,
    repository
  }
}
