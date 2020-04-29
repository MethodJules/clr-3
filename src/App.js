import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Background from './assets/images/resized_background.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Graph}from 'react-d3-graph';




const initialConceptMap = [
    {
      nodes:[
        {
          id: 1,
          conceptName: 'Concept 1',
        },
        {
          id: 2,
          conceptName: 'Concept 2'
        },
        {
          id: 3,
          conceptName: 'Concept 3'
        }
      ],
      links: [
        {
          source: 1, target: 2
        },
        {
          source: 1, target: 3
        }
      ]
    }
];


const initialAllConcepts = [
  {
    nodes:[
      {
        id: 4,
        conceptName: 'Concept 4',
      },
      {
        id: 5,
        conceptName: 'Concept 5'
      },
      {
        id: 6,
        conceptName: 'Concept 6'
      }
    ],
    links: [],
  }
];




const App = () => {

  /* Modal */
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  /* Concept Map */
  const [conceptMap, setConceptMap] = React.useState(initialConceptMap);
  const [allConcepts, setAllConcepts] = React.useState(initialAllConcepts);

  //console.log('Start...');
  //console.log(typeof conceptMap);
  /* Concept */
  const handleConceptAdd = (item) => {
    console.log('handleConceptAdd....');
    //console.log(conceptMap);
    //console.log(item);

    const nodes = conceptMap[0].nodes;
    //console.log(typeof nodes);
    const node = {id: item.id, conceptName: item.conceptName};
    const newNodes = {...nodes.concat(node)};
    //console.log(newNodes);
    const newConceptMap = [{nodes: newNodes, links: conceptMap[0].links}];

    console.log(newConceptMap);
    //setConceptMap(newConceptMap);
    //setConceptMap(conceptMap.concat(newConcept)); //concat ist hier die Loesung statt array.push()
    //handleConceptListRemove(item);
  }

  const handleConceptRemove = (item) => {
    console.log('Remove...');
    console.log(conceptMap);
    const newConceptMap = conceptMap.filter(
      concept => item.id !== concept.id
    );

    setConceptMap(newConceptMap);
    //console.log(conceptMap);
    handleConceptListAdd(item);

  }

  const handleConceptListAdd = (item) => {
    console.log('Adding...');
    const newConceptList = {
      id: item.id,
      conceptName: item.conceptName
    }

    setAllConcepts(allConcepts.concat(newConceptList));
  }

  const handleConceptListRemove = (item) => {
    console.log('Remove...');
    console.log(allConcepts);
    const newAllConcepts = allConcepts.filter(
      concept => item.id !== concept.id
    );

    setAllConcepts(newAllConcepts);
    console.log(allConcepts);
  }

  const handleSaveConcept = () => {
    const newConcept = {
      id: 4,
      conceptName: 'Concept 4',
      isRelatedTo: 1,
    };

    setConceptMap(conceptMap.concat(newConcept));
    setShow(false);
  }

  const style = {
    borderStyle: 'dotted',
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    margin: '10px',
  }

  const styleConceptMapContainer = {
    backgroundColor: 'white'
  }

  return (
    <div id="main">
      <Container fluid>
        <Row style={style}>
          <Col>
            <button type="button" onClick={handleConceptAdd}>Concept hinzufügen</button> {/*TODO: Methode anpassen */}
            <Button variant="primary" onClick={handleShow}>Create Concept</Button>
            <ConceptList concepts={allConcepts} onRemoveConcept={handleConceptListRemove} handleConceptAdd={handleConceptAdd} isInConceptMap={false} />
            <CreateRelationshipForm />
          </Col>
          <Col xs={8} style={styleConceptMapContainer}>
          <MyGraph conceptMap={conceptMap}/>

            {/* <ConceptMap concepts={conceptMap} onRemoveConcept={handleConceptRemove} isInConceptMap={true}/> */}
            <CreateConceptModal show={show} handleClose={handleClose} handleShow={handleShow} handleSaveConcept={handleSaveConcept}/>
          </Col>
          <Col>
            <Navigation />
          </Col>

        </Row>
      </Container>
    </div>


  );
}

const ConceptList = ({concepts, onRemoveConcept, handleConceptAdd, isInConceptMap}) => {
    return concepts[0].nodes.map((item) => <Concept key={item.id} concept={item} onRemoveConcept={onRemoveConcept}
              handleConceptAdd={handleConceptAdd} isInConceptMap={isInConceptMap} />);
}


const Concept = ({concept, onRemoveConcept, handleConceptAdd, isInConceptMap}) => {

  const styleLittleButton = {
    backgroundColor: '#C93E37',
    border: 'none',
    color: 'white',
    marginLeft: '2px',
    width: '100px',
  }

  const styleButtonGroup = {
    borderStyle: 'dotted',
    borderColor: 'purple'
  }

  return(
    <div style={styleButtonGroup}>
      <Button style={styleLittleButton} variant="secondary" onClick={() => onRemoveConcept(concept)}>Dismiss</Button>
        <span>{concept.conceptName}</span>
        {isInConceptMap ? <Button style={styleLittleButton} variant="secondary" onClick={() => onRemoveConcept(concept)}>Remove</Button>
        : <Button style={styleLittleButton} variant="secondary" onClick={() => handleConceptAdd(concept)}>Add</Button>  }

    </div>
    );
  }

const ConceptMap = ({concepts, onRemoveConcept, isInConceptMap}) => {

  const style = {
    height: '700px',
    borderStyle: 'dotted',
    borderColor: 'green',
  }
  return(
      <div style={style}>
      <h1>Concept Map</h1>
      <ConceptList concepts={concepts} onRemoveConcept={onRemoveConcept} isInConceptMap={isInConceptMap}/>
      </div>
  );
}

const CreateConceptModal = ({show, handleShow, handleClose, handleSaveConcept}) => {



  return (
    <>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Concept</Modal.Title>
        </Modal.Header>
        <Modal.Body><CreateConceptForm /></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveConcept}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const CreateConceptForm = () => {
  return(
    <Form>
      <Form.Group controlId="formConceptName">
        <Form.Label>Concept</Form.Label>
        <Form.Control type="text" placeholder="Enter concept name" />
      </Form.Group>
      <Form.Group controlId="formConceptDescription">
        <Form.Label>Concept</Form.Label>
        <Form.Control as="textarea" row="3" placeholder="Enter the description for the concept name" />
      </Form.Group>

</Form>
  );
}

const CreateRelationshipForm = () => {

  const style = {
    borderStyle: 'dotted',
    borderColor: 'yellow',
  }

  return(
    <Form style={style}>
      <Form.Row>
        <Col>
          <Form.Group controlId="formRelationshipA">
            <Form.Label>Concept A</Form.Label>
            <Form.Control as="select" placeholder="Choose...">
              <option>Concept 1 (Dummy)</option>
              <option>Concept 2 (Dummy)</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formRelationshipB">
            <Form.Label>Concept B</Form.Label>
            <Form.Control as="select" placeholder="Choose...">
              <option>Concept 1 (Dummy)</option>
              <option>Concept 2 (Dummy)</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Form.Row>
    </Form>
  );
}


const MyGraph = ({conceptMap}) => {
  console.log('Graph...');
  console.log(conceptMap);
  const data = {
    nodes: conceptMap[0].nodes,
    links: conceptMap[0].links,
  };

  //console.log(data);

  // the graph configuration, you only need to pass down properties
  // that you want to override, otherwise default ones will be used
  const myConfig = {
    nodeHighlightBehavior: true,
    node: {
        color: "lightgreen",
        size: 600,
        highlightStrokeColor: "blue",
        labelProperty: "conceptName"
    },
    link: {
        highlightColor: "lightblue",
    },
  };
  return(
    <Graph id="graph-id" data={data} config={myConfig} />
  );
}




export default App;
