'use client'
import { useDeleteModal } from "@/hooks/DeleteModalContext";
import "../../styles/deletemodal.css"
import { usePostAction } from "@/hooks/PostActionContext";

const ConfirmDeleteModal = () => {
  const { isDeleteOpen, postId, closeDeleteModal } = useDeleteModal();
  const { handleDeletePost } = usePostAction();

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // ปิด modal ถ้าคลิกที่พื้นหลัง (overlay)
    closeDeleteModal();
  };
  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // กันไม่ให้ event ลอดเข้าไปที่ backdrop
  };

  return (
    <div className={`modaldelete-overlay ${isDeleteOpen ? 'show' : ''}`} onClick={handleBackdropClick} >
      <div className="modaldelete-content" onClick={stopPropagation}>
        <div className="modeldelete-text">
          <h2>Please confirm if you wish to delete the post</h2>
          <p>Are you sure you want to delete the post? Once deleted, it cannot be recovered.</p>
        </div>
        <div className="modaldelete-actions">
          <button className="button modaldelete-cancel" onClick={closeDeleteModal}>Cancel</button>
          <button className="button modaldelete-confirm" onClick={() => handleDeletePost()}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
