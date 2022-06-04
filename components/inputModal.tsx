// import Modal from "react-modal"
// import { useModal, ModalProvider } from "react-modal-hook"
import styles from '../styles/inputModal.module.scss';

// // アプリのルートを識別するクエリセレクタを指定する。
// Modal.setAppElement('#__next')

// const App = () => {
//   const [showModal, hideModal] = useModal(() => (
//     <>
//       <Modal isOpen className={styles.modalArea}>
//         <p>Modal content</p>
//         <button onClick={hideModal}>Hide modal</button>
//       </Modal>
//     </>
//   ))

//   return <button className={styles.insertButton} onClick={showModal}>+</button>
// }

// const Hoge = () => {
//   return(
//     <ModalProvider>
//       <App/>
//     </ModalProvider>
//   )
// }

// export default Hoge


import {useState, useRef} from 'react';

const App = () => {
  const [modal, setModal] = useState(false)
  const modalRef = useRef()

  return (
    <div>
      <button className={styles.insertButton} onClick={() => setModal(true)}>+</button>
      <div className={`${styles.modal__overlay} ${modal && styles.is_opened}`} onClick={e => { if (modalRef.current === e.target) setModal(false) }} ref={modalRef}>
        <div className={styles.modal__box}>
          <button className={styles.modal__closeBtn} onClick={() => setModal(false)}>×</button>
          <div>モーダルテキスト</div>
        </div>
      </div>
    </div>
  );
}

export default App;
