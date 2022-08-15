import { useState, useEffect } from 'react'
import { helpHttp } from '../helper/helpHttp'
import CrudForm from './CrudForm'
import CrudTable from './CrudTable'
import Loader from './Loader'
import Message from './Message'

const CrudApi = () => {
  //
  const [db, setDb] = useState(null)
  const [dataToEdit, setDataToEdit] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  let api = helpHttp()
  let url = 'http://localhost:5500/santos'

  useEffect(() => {
    setLoading(true)
    helpHttp()
      .get(url)
      .then((res) => {
        if (!res.err) {
          setDb(res)

          setError(null)
        } else {
          setError(res)
          setDb(null)
        }
        setLoading(false)
      })
  }, [url])

  const createData = (data) => {
    data.id = Date.now()

    let options = {
      body: data,
      headers: { 'content-type': 'application/json' },
    }

    api.post(url, options).then((res) => {
      console.log(res)
      if (!res.err) {
        setDb([...db, res])
        console.log(options.headers)
      } else {
        setError(res)
      }
    })
  }

  const updateData = (data) => {
    let endpoint = `${url}/${data.id}`

    console.log(data, endpoint)

    let options = {
      body: data,
      headers: { 'content-type': 'application/json' },
    }
    api.put(endpoint, options).then((res) => {
      //console.log(res)
      if (!res.err) {
        //console.log(options.headers)
        let newData = db.map((el) => (el.id === data.id ? data : el))
        setDb(newData)
      } else {
        setError(res)
      }
    })
  }

  const deleteData = (id) => {
    let isDeleted = confirm(
      `Estas seguro que quieres eliminar el registro: ${id}`
    )

    if (isDeleted) {
      let endpoint = `${url}/${id}`
      let options = {
        headers: { 'content-type': 'application/json' },
      }
      api.del(endpoint, options).then((res) => {
        if (!res.err) {
          //console.log(options.headers)
          let newData = db.filter((el) => el.id !== id)
          setDb(newData)
        } else {
          setError(res)
        }
      })
    } else {
      return
    }
  }

  return (
    <>
      <h2>Crud Api</h2>
      <article className='grid-1-2'>
        <CrudForm
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
        {loading && <Loader />}
        {error && (
          <Message
            msg={`Error ${error.status} : ${error.statusText}`}
            bgColor={'#d81d1d'}
          />
        )}
        {db && (
          <CrudTable
            db={db}
            setDataToEdit={setDataToEdit}
            deleteData={deleteData}
          />
        )}
      </article>
    </>
  )
}

export default CrudApi
