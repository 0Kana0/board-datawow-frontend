'use client';
import "../../styles/dropdown.css"
import { useDropdown } from "@/hooks/DropdownContext";

export default function DropdownBackdrop() {
  const { isOpen, close } = useDropdown();

  if (!isOpen) return null;

  return (
    <div
      className="dropdown-backdrop"
      onClick={close}
    />
  );
}