
import axios from "axios";
import Field from "./Field.jsx";

import { IoMdClose } from "react-icons/io";
const Modal = ({
  isModelOpen,
  setIsModelOpen,
  setContacts,
  editItem,
  setEditItem,
}) => {
  // Form gönderildiğinde çalışacak fonksiyon
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newContact = Object.fromEntries(formData.entries());
    try {
      if (!editItem) {
        const response = await axios.post("/contact", newContact);
        setContacts((contacts) => [...contacts, response.data]);
      } else {
        //kişiyi güncelle
        const response = await axios.put(`/contact/${editItem.id}`, newContact);
        setContacts((contacts) =>
          contacts.map((contact) =>
            contact.id === editItem.id ? response.data : contact
          )
        );
        setEditItem(null);
      }
      // Modalı kapat
      setIsModelOpen(() => false);
    } catch (err) {
      alert(`İşlem gerçekleştirilemedi`);
      console.log(`Hataaa: ${err}`);
    }
  };
  return (
    isModelOpen && (
      <div className="modal">
        <div className="modal-inner">
          <div className="modal-head">
            <h2>{editItem ? "Kişiyi Güncelle" : "Yeni Kişi Ekle"}</h2>
            <button onClick={() => setIsModelOpen(false)}>
              <IoMdClose />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <Field
              //
              value={editItem?.name}
              label="İsim Soyisim"
              name="name"
            />
            <Field
              //
              value={editItem?.positon}
              label="Pozisyon"
              name="positon"
            />
            <Field
              //
              value={editItem?.company}
              label="Şirket"
              name="company"
            />
            <Field
              //
              value={editItem?.phone}
              label="Telefon"
              name="phone"
            />
            <Field
              //
              value={editItem?.email}
              label="Email"
              name="email"
            />
            <div className="buttons" name="name">
              <button type="button" onClick={() => setIsModelOpen(false)}>
                Vazgeç
              </button>
              <button type="submit">Gönder</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default Modal;
