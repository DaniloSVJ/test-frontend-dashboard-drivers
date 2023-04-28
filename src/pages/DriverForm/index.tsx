import {useState,FormEvent} from "react";
import api from "../../service/api"
import './DriverForm.css'


function DriverForm() {

  const [name, setName] = useState("");
  const [birth_date, setBirth_date] = useState("");
  const [license, setLicense] = useState("");
  const [car_model, setCar_model] = useState("");
  const [license_plate, setLicense_plate] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await api.post('drivers',
      {
        name,
        birth_date,
        license,
        car_model,
        license_plate,
      }
    )
    setName("");
    setBirth_date("");
    setLicense("");
    setCar_model("");
    setLicense_plate("");
  };




  return (
    <div className="conteudo">

      <form id="form_cadastro" onSubmit={handleSubmit}>
        <div >
          <h1>CADASTRO DE MOTORISTAS</h1>
          <div id="divname">
            <div>
              <label className="form-label" htmlFor="name">Nome:</label>
              <input
                className="form-input"
                type="text"
                id="name"
                value={name}
                placeholder="Nome do Motorista"
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
          </div>
          <div id="div_com_info_pessoais">
            <div className="div_info_pessoais">
              <label className="form-label" htmlFor="email">Data de Nascimento:</label>
              <input
                className="form-input"
                type="text"
                id="nascimento"
                value={birth_date}
                placeholder="__/__/____"
                onChange={(event) => setBirth_date(event.target.value)}
                required
              />
            </div>
            <div className="div_info_pessoais">
              <label className="form-label" htmlFor="email">Nº Carteira de Motorista:</label>
              <input
                className="form-input"
                type="text"
                id="n_carteira"
                placeholder="Carteira de Motorista"
                value={license}
                onChange={(event) => setLicense(event.target.value)}
                required
              />
            </div>
          </div>
          <div id="div_com_info_carro">
            <div className="div_info_carro">
              <label className="form-label" htmlFor="email">Modelo Carro:</label>
              <input
                className="form-input"
                type="text"
                id="modelo_carro"
                placeholder="Modelo do Carro"

                value={car_model}
                onChange={(event) => setCar_model(event.target.value)}
                required
              />
            </div>
            <div className="div_info_carro">
              <label className="form-label" htmlFor="email">Placa do Carro:</label>
              <input
                className="form-input"
                type="text"
                id="placa_carro"
                placeholder="Placa do Carro"

                value={license_plate}
                onChange={(event) => setLicense_plate(event.target.value)}
                required
              />

            </div>

          </div>
          <button
            className="form-button"
            type="submit"
          >
            Cadastrar
          </button>

        </div>
      </form>
    </div>
  );
}

export default DriverForm;
