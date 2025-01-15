import { RiDeleteBinLine } from "react-icons/ri";
import { RiEdit2Fill } from "react-icons/ri";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
const Card = ({ contact, handleDelete, handleEdit }) => {
  const [name, surname] = contact.name.split(" ");

  return (
    <div className="card">
      <div className="buttons">
        <button onClick={() => handleEdit(contact)}>
          <RiEdit2Fill />
        </button>
        <button onClick={() => handleDelete(contact.id)}>
          <RiDeleteBinLine />
        </button>
      </div>
      <h1>
        {name[0]} {surname[0]}
      </h1>
      <h3>{contact.name}</h3>
      <p>{contact.positon}</p>
      <p>{contact.company}</p>

      <div className="bottom">
        <div>
          <span>
            <FaPhone />
          </span>
          <span>{contact.phone}</span>
        </div>
        <div>
          <span>
            <MdEmail />
          </span>
          <span>{contact.email}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
