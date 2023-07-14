import React, { useState, useEffect, useContext, useRef } from 'react';
import { Card, Row, Col, Button, Modal } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ListContext } from '../Context/ListContext'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from '../Context/AuthContext';
interface Props {
  data: any;

}


const List: React.FC<Props> = ({ data }) => {
  const { addItem, deleteItem, findItem, updateItem } = useContext(ListContext);

  const [show, setShow] = useState(false);
  const [showedit, setEditShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [description, setDescription] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleEditClose = () => setEditShow(false);
  const handleEditShow = () => setEditShow(true);


  useEffect(() => {
    try {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 5000);


    } catch (error) {

    }

  }, [])


  const handleSubmit = (values: FormValues) => {
    addItem(
      values.name,
      values.description
    )

  };
  const handleEditSubmit = () => {

    updateItem(
      Number(id),
      name,
      description
    )

  }

  interface FormValues {
    name: string;
    description: string;
  }

  const initialValues: FormValues = {
    name: '',
    description: ''
  };

  const validate = (values: FormValues) => {
    const errors: Partial<FormValues> = {};

    if (!values.name) {
      errors.name = 'Name is required';
    }
    if (!values.description) {
      errors.description = 'Description is required';
    }
    return errors;
  };
  const handleEditForm = async (id: number) => {
    let data = await findItem(id)

    setName(data.name)
    setDescription(data.description)
    setId(data.id)

  }

  if (loading) {
    return <div className='text-center' style={{ marginTop: "50px" }}>Loading...</div>;
  }


  return (
    <div>
      <Row>
        {data.items.map((item: any) => (
          <Col md={4} key={item.id} className='d-flex align-items-stretch'>
            <Card>
              <Card.Body className='d-flex flex-column'>
                <Card.Title className='card-title'>Name</Card.Title>
                <Card.Subtitle className="mb-2 text-muted name">{item.name}</Card.Subtitle>
                <Card.Title className='card-title'>Description</Card.Title>
                <Card.Text className='desc'>
                  {item.description}
                </Card.Text>
                <div className="d-flex justify-content-end mt-10 cs" style={{ marginTop: "20px" }}>
                  <a className="btn btn-primary me-2 edit" onClick={() => {
                    handleEditForm(item.id);
                    handleEditShow()
                  }}>Edit</a>
                  <a className="btn btn-secondary delete" onClick={() => deleteItem(item.id)}>Delete</a>
                </div>
              </Card.Body>
            </Card>

          </Col>

        ))}




      </Row>
      <Modal show={show} style={{ marginTop: "120px" }}>
        <Modal.Header >
          <p className="control-label">Create Item</p>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSubmit}
          >
            <Form className="row g-3">
              <div className="col-12">
                <label className="form-label">Name</label>
                <Field
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Input item here"
                  name="name"



                />
                <ErrorMessage name="name" component="div" className="error" />

              </div>
              <div className="col-12">
                <label className="form-label">Add Note</label>
                <Field
                  type="text"
                  as="textarea"
                  className="form-control textarea"
                  id="description"
                  name="description"
                  placeholder="Type here"
                />
                <ErrorMessage name="description" component="div" className="error"></ErrorMessage>

              </div>

              <div className="d-flex justify-content-end cs">
                <a className="btn btn-secondary btn1" onClick={handleClose}>Cancel</a>
                <button className="btn btn-primary me-2 btn2" onClick={handleShow}>Create Event</button>
              </div>
            </Form>

          </Formik>
        </Modal.Body>

      </Modal>



      <Modal show={showedit} style={{ marginTop: "120px" }}>
        <Modal.Header >
          <p className="control-label">Edit Item</p>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            onSubmit={handleEditSubmit}
          >
            <Form className="row g-3">
              <div className="col-12">
                <label className="form-label">Name</label>
                <Field
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Input item here"
                  name="name"
                  value={name}
                  onChange={(e: any) => setName(e.target.value)}
                />
                <ErrorMessage name="name" component="div" className="error" />

              </div>
              <div className="col-12">
                <label className="form-label">Add Note</label>
                <Field
                  type="text"
                  as="textarea"
                  className="form-control textarea"
                  id="description"
                  name="description"
                  placeholder="Type here"
                  value={description}
                  onChange={(e: any) => setDescription(e.target.value)}
                />
                <ErrorMessage name="description" component="div" className="error"></ErrorMessage>

              </div>

              <div className="d-flex justify-content-end cs">
                <a className="btn btn-secondary btn1" onClick={handleEditClose}>Cancel</a>
                <button className="btn btn-primary me-2 btn2">Edit Event</button>
              </div>
            </Form>

          </Formik>
        </Modal.Body>

      </Modal>
      <div className="contain">
        <button className="round-button">
          <FontAwesomeIcon icon={faPlus} onClick={handleShow} fontSize={30} />
        </button>
      </div>
    </div>
  );
};

export default List;