import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function useModal() {
  const [currentModal, setCurrentModal] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const { modal } = router.query;
    setCurrentModal((modal as string) || null);
  }, [router.query.modal]);

  const openModal = (name: string) => {
    void router.push({
      pathname: router.pathname,
      query: { ...router.query, modal: name },
    });
  };

  const closeModal = () => {
    router.back();
  };

  //   const modalToggle = () => {
  //     setIsShowing((prev) => !prev);
  //   };

  return {
    currentModal,
    openModal,
    closeModal,
  };
}
