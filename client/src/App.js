import React, { useState, useEffect } from 'react';
import './App.css';
import ContactList from './components/ContactList';

const App = () => {
  const [contacts, setContacts] = useState([])
  const [search, setSearch] = useState('')
  const [currentContact, setCurrentContact] = useState({})
  const [editedContact, setEditedContact] = useState({})
  const [editing, isEditing] = useState(false)
  const [error, setError] = useState({status: false})
  const [currentPage, setCurrentPage] = useState(0)

  const retrieveAllContacts = () => fetch('api/oddballs').then(resp => resp.json()).then(data => {
    setContacts(data)
  })

  useEffect(() => {
    retrieveAllContacts()
  }, [])

  const searchList = () => {
    if (search === '') {
      fetch('api/oddballs').then(resp => resp.json()).then(data => {
        setContacts(data)
      })
    }
    else {
      fetch(`api/search?q=${search}`).then(resp => resp.json()).then(data => {
        setContacts(data)
      })
    }
  }

  const viewPreviousPage = () => {
    const offset = (currentPage - 1) * 100
    fetch(`api/oddballs?offset=${offset}`).then(resp => resp.json()).then(data => {
      setContacts(data)
      setCurrentContact({})
      setCurrentPage(prevState => prevState - 1)
    })
  }

  const viewNextPage = () => {
    const offset = (currentPage + 1) * 100
    fetch(`api/oddballs?offset=${offset}`).then(resp => resp.json()).then(data => {
      setContacts(data)
      setCurrentContact({})
      setCurrentPage(prevState => prevState + 1)
    })
  }
  
    return (
      <div className="App">
          <div>
            <input
              className="search-input"
              type="text"
              name="search"
              style={{minWidth: 230}}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={searchList}>Search</button>
          </div>
          <ContactList 
            contacts={contacts} 
            setContacts={setContacts}
            currentContact={currentContact}
            setCurrentContact={setCurrentContact}
            editing={editing} 
            isEditing={isEditing}
            editedContact={editedContact}
            setEditedContact={setEditedContact}
            error={error}
            setError={setError}
            retrieveAllContacts={retrieveAllContacts}
        />
        <div className='footer'>
          {currentPage > 0 && <button onClick={viewPreviousPage}>View Previous 100</button>}
          <p style={{textAlign: 'center'}}>Page {currentPage+1}</p>
          {currentPage < 50 && <button onClick={viewNextPage}>View Next 100</button>}
        </div>
      </div>
    );
}

export default App;
