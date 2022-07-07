import React, { useState, useEffect } from 'react'

const initialForm = {
  name: '',
  constellation: '',
  id: null
}

const CrudForm = ({ createData, updateData, dataToEdit, setDataToEdit }) => {
  const [form, setForm] = useState(initialForm)

  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit)
    }
  }, [dataToEdit])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.name || !form.constellation) {
      alert('Todos los campos son requeridos')
      return
    }

    if (form.id === null) {
      //Creacion de datos
      createData(form)
    } else {
      //Actualizacion de datos
      updateData(form)
    }

    handleReset()
  }

  const handleReset = (e) => {
    setForm(initialForm)
    setDataToEdit(null)
  }

  return (
    <div>
      <h3>{form.id ? 'Editando' : 'Agregar'}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Ingrese el nombre"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="constellation"
          placeholder="Ingrese la Constelacion"
          value={form.constellation}
          onChange={handleChange}
        />
        <input type="submit" value="Agregar" />
        <input type="reset" value="Limpiar" onClick={handleReset} />
      </form>
    </div>
  )
}

export default CrudForm

//
