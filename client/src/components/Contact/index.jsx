import React from "react"
import Avatar from "../Avatar"

const Contact = (props) => {
    const { 
      firstName, 
      isCurrentContact, 
      lastName, 
      email, 
      phone, 
      viewContactInfo,
      street, 
      city, 
      state, 
      zip,
      editing,
      isEditing,
      setCurrentContact,
      currentContact,
      editedContact,
      setEditedContact,
      error,
      setError,
      retrieveAllContacts
     } = props
    
    const updateContactInfo = (e) => {
      e.persist()
      e.preventDefault()
      setEditedContact(prevState => ({ ...prevState, [e.target.name]: e.target.value}))
    }
  
    const cancelEdit = () => {
      setCurrentContact({})
      setEditedContact({})
      isEditing(false)
    }
  
    const updateContact = (obj) => {
      fetch(`api/oddballs/${obj.id}`, { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      }).then(resp => resp.json()).then(data => {
        if (data.message) {
          setError({message: data.message, status: true})
          setTimeout(() => setError({status: false}), 5000)
        }
        else {
          setCurrentContact(data)
          isEditing(false)
        }
      })
    }

    const deleteContact = (obj) => {
        fetch(`api/oddballs/${obj.id}`, { 
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(obj)
        }).then(resp => resp.json()).then(data => {
          if (data.message) {
            setError({message: data.message, status: true})
          }
          else if (data === 0) {
            setError({message: 'Could not delete record', status: true})
            setTimeout(() => setError({status: false}), 5000)
          }
          else {
            setCurrentContact({})
            retrieveAllContacts()
            isEditing(false)
          }
        })
      }
  
    const formInputs = [
      {
        label: 'First Name',
        name: 'firstName',
        value: editedContact.firstName
      },
      {
        label: 'Last Name',
        name: 'LastName',
        value: editedContact.lastName
      },
      {
        label: 'Email',
        name: 'email',
        value: editedContact.email
      },
      {
        label: 'Phone',
        name: 'phone',
        value: editedContact.phone
      },
      {
        label: 'Street',
        name: 'street',
        value: editedContact.street
      },
      {
        label: 'City',
        name: 'city',
        value: editedContact.city
      },
      {
        label: 'State',
        name: 'state',
        value: editedContact.state
      },
      {
        label: 'Zip Code',
        name: 'zip',
        value: editedContact.zip
      }
    ]
  
    return <div className="contact-container" onClick={!editing ? viewContactInfo : undefined}>
      {isCurrentContact && error.status && <p className="error">Unable to update contact on backend! Error: {error.message}</p>}
      <div style={{display: 'flex', alignItems: 'center'}}>
      <Avatar firstName={firstName}/>
      <span>
      <p>{firstName} {lastName}</p>
      <p className="email">{email}</p>
      </span>
      </div>
      
      {isCurrentContact && <div className="expanded">
        <p className='address-key'>{street}</p>
        <p className='address-key'>{city}, {state} {zip}</p>
        <p className='address-key'>{phone}</p>
        {!editing && <div className="action-buttons"><button onClick={() => {
          isEditing(true)
          setEditedContact(currentContact)
        }}>Edit</button>
        <button onClick={() => deleteContact(currentContact)}>Delete</button>
        </div>}
        </div>}
      {editing && isCurrentContact && <div className="editing">
        <p style={{fontWeight: 'bold'}}>Edit Information</p>
        {formInputs.map(input => <div key={input.name} style={{display: 'flex'}}>
          <label style={{flex: 1}}>{input.label}</label>
        <input type="text" label={input.label} name={input.name} className='form-input' value={input.value} onChange={(e) => updateContactInfo(e)}></input>
        </div>)}
        <div className='button-container'>
        <button onClick={() => {
          const updatedObj = Object.assign(currentContact, editedContact)
          updateContact(updatedObj)
        }}>Update Contact</button>
        <button onClick={cancelEdit}>Cancel</button>
        </div>
        </div>}
    </div>
  }

export default Contact