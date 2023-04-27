import React from "react";
import api from "../service/api"
import './UserForm.css'


function UserForm() {

  const [name, setName] = React.useState("");
  const [birth_date, setBirth_date] = React.useState("");
  const [license, setLicense] = React.useState("");
  const [car_model, setCar_model] = React.useState("");
  const [license_plate, setLicense_plate] = React.useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(">>>>>>>>>")
    console.log( name)
    console.log(birth_date)
      console.log(license)
        console.log(car_model)
          console.log(license_plate)
    await api.post('drivers',
      {
        name,
        birth_date,
        license,
        car_model,
        license_plate,
      }
    )
    console.log("<<<<<<<<<<<<<<<")
    setName("");
    setBirth_date("");
    setLicense("");
    setCar_model("");
    setLicense_plate("");
  };




  return (
    <div>
      <h1>Cadastro de Usuário</h1>
      <form onSubmit={handleSubmit}>
        <div className="conteudo">

          <div id="divname">
            <div>
              <label className="form-label" htmlFor="name">Nome:</label>
              <input
                className="form-input"
                type="text"
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
          </div>
          <div className="div_com_info_pessoais">
            <div className="div_info_pessoais">
              <label className="form-label" htmlFor="email">Data de Nascimento:</label>
              <input
                className="form-input"
                type="text"
                id="nascimento"
                value={birth_date}
                onChange={(event) => setBirth_date(event.target.value)}
              />
            </div>
            <div className="div_info_pessoais">
              <label className="form-label" htmlFor="email">Nº Carteira de Motorista:</label>
              <input
                className="form-input"
                type="text"
                id="n_carteira"
                value={license}
                onChange={(event) => setLicense(event.target.value)}
              />
            </div>
          </div>
          <div className="div_com_info_carro">
            <div className="div_info_carro">
              <label className="form-label" htmlFor="email">Modelo Carro:</label>
              <input
                className="form-input"
                type="text"
                id="modelo_carro"
                value={car_model}
                onChange={(event) => setCar_model(event.target.value)}
              />
            </div>
            <div className="div_info_carro">
              <label className="form-label" htmlFor="email">Placa do Carro:</label>
              <input
                className="form-input"
                type="text"
                id="placa_carro"
                value={license_plate}
                onChange={(event) => setLicense_plate(event.target.value)}
              />
            </div>
          </div>
          <button
            className="form-button"
            type="submit">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
