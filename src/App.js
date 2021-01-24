import React from "react";
// import logo from './logo.svg';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const data = [
  // { id: 1, personaje: "naruto", anime: "Naruto" },
  // { id: 2, personaje: "Goku", anime: "DBZ" },
];

class App extends React.Component {
  state = {
    data: data,
    form: {
      id: "",
      personaje: "",
      anime: "",
    },
    modalInsertar: false,
    modalEditar: false,
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  mostrarModalInsertar = () => {
    this.setState({ modalInsertar: true });
  };

  ocultarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  mostrarModalEditar = (registro) => {
    this.setState({ modalEditar: true, form: registro });
  };

  ocultarModalEditar = () => {
    this.setState({ modalEditar: false });
  };

  insertar = () => {
    var valorNuevo = { ...this.state.form };
    valorNuevo.id = this.state.data.length + 1;
    var lista = this.state.data;
    lista.push(valorNuevo);
    this.setState({
      data: lista,
      modalInsertar: false,
    });
  };

  editar = (dato) => {
    var contador = 0;
    var lista = this.state.data;
    lista.map((registro) => {
      if (dato.id == registro.id) {
        lista[contador].personaje = dato.personaje;
        lista[contador].anime = dato.anime;
      }
      contador++;
    });
    this.setState({ data: lista, modalEditar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm(
      "Realmente desea eliminar el registro con el persosaje: " +
        dato.personaje +
        "?"
    );
    if (opcion) {
      var contador = 0;
      var lista = this.state.data;
      lista.map((registro) => {
        if ((registro.id = dato.id)) {
          lista.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: lista });
    }
  };

  render() {
    return (
      <>
        <Container>
          <br />
          <Button color="success" onClick={() => this.mostrarModalInsertar()}>
            Insertar Contenido
          </Button>
          <br />
          <br />

          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>personaje</th>
                <th>anime</th>
                <th>acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((elemento) => (
                <tr>
                  <th>{elemento.id}</th>
                  <th>{elemento.personaje}</th>
                  <th>{elemento.anime}</th>
                  <th>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalEditar(elemento)}
                    >
                      Editar
                    </Button>
                    {"  "}
                    <Button
                      color="danger"
                      onClick={() => this.eliminar(elemento)}
                    >
                      Eliminar
                    </Button>
                  </th>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div>
              <h3>Insertar registro</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>id:</label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length + 1}
              />
            </FormGroup>

            <FormGroup>
              <label>personaje:</label>
              <input
                className="form-control"
                name="personaje"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>anime:</label>
              <input
                className="form-control"
                name="anime"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={() => this.insertar()}>
              Insertar
            </Button>
            <Button color="danger" onClick={() => this.ocultarModalInsertar()}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalEditar}>
          <ModalHeader>
            <div>
              <h3>Editar registro</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>id:</label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>

            <FormGroup>
              <label>personaje:</label>
              <input
                className="form-control"
                name="personaje"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.personaje}
              />
            </FormGroup>

            <FormGroup>
              <label>anime:</label>
              <input
                className="form-control"
                name="anime"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.anime}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button color="danger" onClick={() => this.ocultarModalEditar()}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default App;
