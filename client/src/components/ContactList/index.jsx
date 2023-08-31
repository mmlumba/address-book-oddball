import React from "react"
import Contact from "../Contact"

const ContactList = (props) => {
    const { contacts, 
      currentContact, 
      setCurrentContact, 
      editing, 
      isEditing,
      editedContact,
      setEditedContact,
      error,
      setError,
      retrieveAllContacts
    } = props

    return <div className="contact-list-container">
      {(!contacts || contacts.length === 0) && <p>No contacts found.</p>}
      {contacts.map(contact => 
      <Contact 
        {...contact} 
        key={contact.id}
        currentContact={currentContact}
        retrieveAllContacts={retrieveAllContacts}
        isCurrentContact={currentContact.id === contact.id}
        viewContactInfo={() => setCurrentContact(contact)}
        editing={editing} 
        isEditing={isEditing}
        setCurrentContact={setCurrentContact}
        editedContact={editedContact}
        setEditedContact={setEditedContact}
        error={error}
        setError={setError}
      />)}
    </div>
  }

  export default ContactList