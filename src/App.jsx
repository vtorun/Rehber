import { useEffect, useState } from "react";
import axios from "axios";
import { RiSearchLine } from "react-icons/ri";
import { IoMenu } from "react-icons/io5";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { IoPersonAdd } from "react-icons/io5";
import Card from "./components/Card";
import Modal from "./components/Modal";

axios.defaults.baseURL = "http://localhost:3000";
function App() {
  //state tanımla
  const [contacts, setContacts] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // ! Sayfa yüklendiğinde api'dan verileri al
  useEffect(() => {
    axios.get("/contact").then((res) => setContacts(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = e.target[1].value;
    axios.get(`contact?name=${text}`).then((res) => setContacts(res.data));
  };

  const handleDelete = (id) => {
    debugger;
    const res = confirm("Kişiyi silmek istediğinizden eminmisiniz ?");

    if (res) {
      //kullanıcıyı sil
      axios
        .delete(`/contact/${id}`)
        .then(() => {
          // Silinen kişiyi state'den kaldır
          const updated = contacts.filter((contact) => contact.id !== id);
          setContacts(updated);
        })
        .catch((err) => {
          alert("Silme işlemi sırasında bir hata oluştu !!");
          alert(err);
        });
    }
  };

  const handleEdit = (contact) => {
    setIsModelOpen(true);
    setEditItem(contact);
  };

  return (
    <div className="app">
      <header>
        <h1>Rehber</h1>

        <div>
          <form onSubmit={handleSubmit}>
            <button>
              <RiSearchLine />
            </button>
            <input type="text" placeholder="kişi aratınız ..." />
          </form>

          <button className="ns">
            <IoMenu />
          </button>
          <button className="ns">
            <HiMiniSquares2X2 />
          </button>

          <button onClick={() => setIsModelOpen(true)} className="add">
            <IoPersonAdd />
            <span>Yeni Kişi</span>
          </button>
        </div>
      </header>
      <main>
        {contacts.map((contact) => (
          <Card
            key={contact.id}
            contact={contact}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </main>
      <Modal
        isModelOpen={isModelOpen}
        setIsModelOpen={setIsModelOpen}
        setContacts={setContacts}
        editItem={editItem}
        setEditItem={setEditItem}
      />
    </div>
  );
}

export default App;
