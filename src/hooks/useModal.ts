import { ReactNode, useState } from "react";

/**
 * A function that takes a result of a variable type and returns nothing.
 * This will close our modal and return to the caller of `openModal`.
 */
export type CloseModal<ResultType = any> = (result?: ResultType) => void;

/**
 * A function that builds the UI for a modal dialog.
 * It takes the close function as a parameter and returns a `ReactNode`
 * that we can display.
 */
type ModalFactory<ResultType> = (close: CloseModal<ResultType>) => ReactNode;
export default function useModal() {
  const [modalNode, setModalNode] = useState<ReactNode>(null);

  function openModal<ModalResult>(modalFactory: ModalFactory<ModalResult>) {
    return new Promise<ModalResult | undefined>((resolve) => {
      function close(value?: ModalResult) {
        resolve(value);
        setModalNode(null);
      }

      setModalNode(modalFactory(close));
    });
  }

  return { modalNode, openModal } as const;
}
