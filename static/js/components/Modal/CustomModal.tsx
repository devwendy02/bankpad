import Modal from '@mui/material/Modal';
interface Props {
    showModal: boolean,
    setShowModal?: any,
    title?:string,
    children?:any

}
const CustomModal: React.FC<Props> = ({showModal, setShowModal, title, children}) => {

    
    const onClose = () => {
        setShowModal(false)
    }
    return (
        <Modal
            open={showModal}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={`fixed flex items-center justify-center inset-0 dark:bg-dark-9/80 bg-black/50`}>
                {children}
            </div>
        </Modal>
    )
}
export default CustomModal;