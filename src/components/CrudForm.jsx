import React, { useState, useEffect } from 'react'

const initialForm = {
  name: '',
  constellation: '',
  id: null,
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
      [e.target.name]: e.target.value,
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
      <form onSubmit={handleSubmit} className='form'>
        <div>
          <label htmlFor='name'>Nombre Caballero</label>
          <input
            type='text'
            id='name'
            name='name'
            placeholder='Ingrese el nombre'
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='constellation'>Constelación</label>
          <input
            type='text'
            name='constellation'
            placeholder='Ingrese la Constelacion'
            value={form.constellation}
            onChange={handleChange}
          />
        </div>
        <input
          type='submit'
          value={form.id === null ? 'Agregar' : 'Guardar Cambios'}
          className='submit'
        />
        <input
          type='reset'
          value='Limpiar'
          onClick={handleReset}
          className='reset'
        />
      </form>
    </div>
  )
}

export default CrudForm

//
