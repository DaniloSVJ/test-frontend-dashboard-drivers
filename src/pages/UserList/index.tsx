import { useEffect, useState } from 'react'
import Modal from 'react-modal';
import api from '../service/api'
import { RiFilterLine, RiEdit2Fill, RiDeleteBin5Line } from "react-icons/ri"
import { IoMdClose } from "react-icons/io"
import './UserList.css'
interface IDriver {
  id?: number;
  name: string;
  birth_date: string;
  license: string;
  car_model: string;
  license_plate: string;
  created_at?: Date;
  updated_at?: Date;

}



Modal.setAppElement("#root")
function UserList() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpenFilter, setIsOpenFilter] = useState(false);
  const [idDriver, setIdDriver] = useState("")
  const [driverData, setdriverData] = useState<IDriver[]>([])
  const [filterName, setFilterName] = useState("")
  const [filterLicense, setFilterLicense] = useState("")
  const [filterLicense_plate, setFilterLicense_plate] = useState("")

  function openModal() {
    setIsOpen(true);
  }
  function openModalFilter() {
    setIsOpenFilter(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  function closeModalFilter() {
    setIsOpenFilter(false);
  }
  async function onfilterName(name: string) {
    const drivers = await api.get(`drivers/search?name=${name}`)
    setdriverData(drivers.data)

  }
  async function onfilterLicense(license: string) {
    const drivers = await api.get(`drivers/search?license=${license}`)
    setdriverData(drivers.data)
  }
  async function onfilterLicensePlate(license_plate: string) {
    const drivers = await api.get(`drivers/search?license_plate=${license_plate}`)
    setdriverData(drivers.data)
  }
  async function onfilterGeneral() {
    let drivers = await api.get(`drivers`)
    if (filterName !== "" && filterLicense !== "" && filterLicense_plate !== "") {

      drivers = await api.get(`drivers/search?name=${filterName}&license=${filterLicense}&license_plate=${filterLicense_plate}`)
    }
    if (filterName === "" && filterLicense !== "" && filterLicense_plate !== "") {
      drivers = await api.get(`drivers/search?license=${filterLicense}&license_plate=${filterLicense_plate}`)

    }

    if (filterName === "" && filterLicense === "" && filterLicense_plate !== "") {
      drivers = await api.get(`drivers/search?license_plate=${filterLicense_plate}`)

    }
    if (filterName !== "" && filterLicense === "" && filterLicense_plate === "") {
      drivers = await api.get(`drivers/search?name=${filterName}`)

    }
    if (filterName === "" && filterLicense !== "" && filterLicense_plate === "") {
      drivers = await api.get(`drivers/search?license=${filterLicense}`)

    }
    if (filterName !== "" && filterLicense === "" && filterLicense_plate !== "") {
      drivers = await api.get(`drivers/search?name=${filterName}&license_plate=${filterLicense_plate}`)

    }
    if (filterName !== "" && filterLicense !== "" && filterLicense_plate === "") {
      drivers = await api.get(`drivers/search?name=${filterName}&license=${filterLicense}`)

    }
    console.log(filterName)
    console.log(filterLicense)
    console.log(filterLicense_plate)
    console.log(drivers.data)
    setdriverData(drivers.data)

  }


  async function deleteDriver(id:string) {
     await api.delete(`/drivers/${id}`)
     
     const drivers = api.get('drivers')

     setdriverData((await drivers).data)

  }
    
  



  useEffect(() => {

    async function load() {
      const driverAll = await api.get('drivers')
      //setdriverData(driverAll)

      setdriverData(driverAll.data)
    }

    load()

  }, [])


  return (
    <div>

      <div className="conteudo2">
        <h1>LISTA DE MOTORISTAS</h1>
        <div id="pesquisa">
          <div className="divfil">
            <input
              className="input_filter"
              type="text"
              placeholder="Filtrar Nome"
              value={filterName}
              onChange={(event) => setFilterName(event.target.value)}
            />
            <div className="iconefilter"><RiFilterLine className='iconeFilter' onClick={() => onfilterName(filterName)} size={18} color="#FFFFFF" /></div>
          </div>
          <div className="divfil">
            <input
              className="input_filter"
              type="text"
              placeholder="Filtrar Nº Carteira"
              value={filterLicense}
              onChange={(event) => setFilterLicense(event.target.value)}
            />
            <div className="iconefilter"><RiFilterLine className='iconeFilter' onClick={() => onfilterLicense(filterLicense)} size={18} color="#FFFFFF" /></div>
          </div>
          <div className="divfil">
            <input
              className="input_filter"
              type="text"
              placeholder="Filtrar Nº Placa"
              value={filterLicense_plate}
              onChange={(event) => setFilterLicense_plate(event.target.value)}
            />
            <div className="iconefilter"><RiFilterLine className='iconeFilter' onClick={() => onfilterLicensePlate(filterLicense_plate)} size={18} color="#FFFFFF" /></div>
          </div>
          <div>
            <button id="filtrar-todos" onClick={onfilterGeneral}>Filtrar Todos</button>
          </div>

        </div>
        <div id="divopenfiltroModal">
          <button id="openfiltroModal" onClick={openModalFilter}>Abrir Filtro</button>
        </div>
        <div>
          <table>
            <thead>
              <tr>

                <th>Nome</th>
                <th>Nascimento</th>
                <th>Nº Carteira</th>
                <th>Carro</th>
                <th>Placa do Carro</th>
                <th className="iconestable">Editar</th>
                <th className="iconestable">Excluir</th>
              </tr>
            </thead>
            <tbody>

              {driverData.map((driver) => (
                <tr key={driver.id}>

                  <td>{driver.name}</td>
                  <td>{driver.birth_date}</td>
                  <td>{driver.license}</td>
                  <td>{driver.car_model}</td>
                  <td>{driver.license_plate}</td>
                  <td className="iconestable"><button className='buttonTd' onClick={() => (openModal(), setIdDriver(String(driver.id)))}><RiEdit2Fill color='#66CDAA' size={12} /></button></td>
                  <td className="iconestable"><button className='buttonTd' onClick={()=>deleteDriver(String(driver.id))}><RiDeleteBin5Line color='#FA8072' size={12} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      <Modal
        isOpen={modalIsOpenFilter}
        onRequestClose={closeModalFilter}
        overlayClassName={'modal-overlay-filter'}
        className={'modal-content-filter'}
        closeTimeoutMS={1000}
      >
        <div id="div_btn_close">
          <button id="btn_close" onClick={closeModalFilter}><IoMdClose size={20} color="#FFFFFF" /></button>
        </div>

        <h1>Filtrar Motoristas</h1>
        <div id="pesquisaModal">
          <div className="divfilModal">
            <input className="input_filterModal" value={filterName}
              onChange={(event) => setFilterName(event.target.value)}
              type="text"
              placeholder="Filtrar Nome"
            />
            <RiFilterLine size={18} onClick={() => (closeModalFilter(),onfilterName(filterName))}  color="#FFFFFF" />
          </div>
          <div className="divfilModal">
            <input
              className="input_filterModal"
              type="text"
              placeholder="Filtrar Nº Carteira"
              value={filterLicense}
              onChange={(event) =>(closeModalFilter(), setFilterLicense(event.target.value))}
            />
            <RiFilterLine size={18} onClick={() => onfilterLicense(filterLicense)}  color="#FFFFFF" />
          </div>
          <div className="divfilModal">
            <input
              className="input_filterModal"
              type="text"
              placeholder="Filtrar Nº Placa"
              value={filterLicense_plate}
              onChange={(event) =>
                setFilterLicense_plate(event.target.value)}

            />
            <RiFilterLine size={18} onClick={() =>(closeModalFilter(), onfilterLicensePlate(filterLicense_plate))}   color="#FFFFFF" />
          </div>
          <div>
            <button id="filtrar-todos" onClick={() =>(closeModalFilter(),onfilterGeneral())}>Filtrar Todos</button>
          </div>

        </div>
      </Modal>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName={'modal-overlay'}
        className={'modal-content'}
        closeTimeoutMS={1000}
      >
        <div id="div_btn_close">
          <button id="btn_close" onClick={closeModal}><IoMdClose size={20} color="#FFFFFF" /></button>
        </div>

        <form >
          <h2>EDIÇÃO DE INFORMAÇÕES MOTORISTA</h2>

          <div>
            <div>
              <label className="form-label-edit" htmlFor="name">Nome:</label>
              <input
                className="form-input-edit"
                type="text"
                id="name-edit"
              />
            </div>

            <div >
              <label className="form-label-edit" htmlFor="email">Data de Nascimento:</label>
              <input
                className="form-input-edit"
                type="text"
                id="nascimento-edit"

              />
            </div>
            <div >
              <label className="form-label-edit" htmlFor="email">Nº Carteira de Motorista:</label>
              <input
                className="form-input-edit"
                type="text"
                id="n_carteira_edit"
              />
            </div>


            <div >
              <label className="form-label-edit" htmlFor="email">Modelo Carro:</label>
              <input
                className="form-input-edit"
                type="text"
                id="modelo_carro_edit"

              />
            </div>
            <div >
              <label className="form-label" htmlFor="email">Placa do Carro:</label>
              <input
                className="form-input-edit"
                type="text"
                id="placa_carro"

              />
            </div>
            <button
              className="form-button"
              type="submit">
              Salvar
            </button>
          </div>
        </form>
      </Modal>
    </div>

  );
}

export default UserList;
