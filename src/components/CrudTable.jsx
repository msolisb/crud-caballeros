import React from 'react'
import CrudTableRow from './CrudTableRow'

const CrudTable = ({ db, setDataToEdit, deleteData }) => {
  return (
    <>
      <h3>Tabla de Datos</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Constelacion</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {db.length === 0 ? (
            <tr>
              <td>No hay Datos para mostrar</td>
            </tr>
          ) : (
            db.map((el) => (
              <CrudTableRow
                el={el}
                key={el.id}
                setDataToEdit={setDataToEdit}
                deleteData={deleteData}
              />
            ))
          )}
        </tbody>
      </table>
    </>
  )
}

export default CrudTable
