//

const CrudTableRow = ({ el, setDataToEdit, deleteData }) => {
  const { name, constellation, id } = el

  return (
    <>
      <tr>
        <td>{name}</td>
        <td>{constellation}</td>
        <td className='flex'>
          <button className='edit' onClick={() => setDataToEdit(el)}>
            Editar
          </button>
          <button className='delete' onClick={() => deleteData(id)}>
            Eliminar
          </button>
        </td>
      </tr>
    </>
  )
}

export default CrudTableRow
