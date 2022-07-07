import React, { useState, useEffect } from 'react'
import CrudForm from './CrudForm'
import CrudTable from './CrudTable'

const initialDb = [
  {
    id: 1,
    name: 'Seiya',
    constellation: 'Pegaso',
  },
  {
    id: 2,
    name: 'Shiryu',
    constellation: 'Dragón',
  },
  {
    id: 3,
    name: 'Hyoga',
    constellation: 'Cisne',
  },
  {
    id: 4,
    name: 'Shun',
    constellation: 'Andrómeda',
  },
  {
    id: 5,
    name: 'Ikki',
    constellation: 'Fénix',
  },
]

const CrudApp = () => {
  //
  const [db, setDb] = useState(initialDb)
  const [dataToEdit, setDataToEdit] = useState(null)

  useEffect(() => {
    const obtenerLS = () => {
      const caballerosLS =
        JSON.parse(localStorage.getItem(caballeros)) ?? initialDb
      setDb(caballerosLS)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('caballeros', JSON.stringify(db))
  }, [db])

  const createData = (data) => {
    data.id = Date.now()
    setDb([...db, data])
  }

  const updateData = (data) => {
    let newData = db.map((el) => (el.id === data.id ? data : el))
    setDb(newData)
  }

  const deleteData = (id) => {
    let isDeleted = confirm(
      `Estas seguro que quieres eliminar el registro: ${id}`
    )

    if (isDeleted) {
      let newData = db.filter((el) => el.id !== id)
      setDb(newData)
    } else {
      return
    }
  }

  return (
    <>
      <h2>Crud App</h2>
      <article className='grid-1-2'>
        <CrudForm
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
        <CrudTable
          db={db}
          setDataToEdit={setDataToEdit}
          deleteData={deleteData}
        />
      </article>
    </>
  )
}

export default CrudApp
