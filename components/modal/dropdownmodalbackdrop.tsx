'use client';
import { useDropdownModal } from "@/hooks/DropdownModalContext";
import "../../styles/dropdownmodal.css"

export default function DropdownModalBackdrop() {
  const { isOpen, close } = useDropdownModal();

  if (!isOpen) return null;

  return (
    <div
      className="dropdownmodal-backdrop"
      onClick={close}
    />
  );
}