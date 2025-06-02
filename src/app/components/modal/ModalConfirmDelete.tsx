import Button from "../button/Button";

interface ModalConfirmDeleteProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    message?: string;
    isLoading?: boolean;
}

const ModalConfirmDelete: React.FC<ModalConfirmDeleteProps> = ({
    isOpen,
    onConfirm,
    onCancel,
    message = "Apakah Anda yakin ingin menghapus data ini?",
    isLoading = false,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-auto"></div>
            <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg z-10">
                <p className="mb-6 text-left">{message}</p>
                <div className="flex justify-end gap-3">
                    <Button
                        onClick={onConfirm}
                        className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-md"
                        disabled={isLoading}
                    >
                        {isLoading ? "Menghapus..." : "Hapus"}
                    </Button>
                    <Button
                        onClick={onCancel}
                        className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-md"
                        disabled={isLoading}
                    >
                        Batal
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ModalConfirmDelete;