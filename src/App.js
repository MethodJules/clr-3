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
          conceptName: 'Concept Maps',
          label: ''
        },
        {
          id: 2,
          conceptName: 'Mental structure of long term memory',
          label: ''
        },
        {
          id: 3,
          conceptName: 'Relatedness structure',
          label: ''
        }
      ],
      links: [
        {
          source: 1, target: 2, type: "probe"
        },
        {
          source: 1, target: 3, type: "which assumed to have"
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
        conceptName: 'Concept 6',
        label: ''
      }
    ],
    links: [],
  }
];




const App = () => {

  /* Modal */
  const [show, setShow] = React.useState(false);
  const [showLinkModal, setShowLinkModal] = React.useState(false);

  const handleLinkClose = () => setShowLinkModal(false);

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
    const nodes = conceptMap[0].nodes; //Hole die Nodes aus der Concept Map
    const node = {id: item.id, conceptName: item.conceptName}; //Speichere den neuen Node in einer Variable
    const newNodes = [...nodes.concat(node)];
    const newConceptMap = [{nodes: newNodes, links: conceptMap[0].links}]; //Konstruiere neue ConceptMap
    setShowLinkModal(true); //TODO: Modal für Links hier hinbauen
  }

  const handleConceptRemove = (item) => {
    console.log('Remove...');
    console.log(conceptMap);
    console.log(item.id);

    const nodeId = item.id; //Speichere die Node die geloescht werden soll in Variable
    const newLinks = conceptMap[0].links; //Hole die Links aus der ConceptMap
    const nodes = conceptMap[0].nodes;

    //Loesche den Node
    const newNodes = conceptMap[0].nodes.filter(
      concept => item.id !== concept.id
    );

    const findLinks = (item, index) => {
      console.log('Find items...');
      console.log(item, index, nodeId);
      if (item.source === nodeId) {
        console.log(`Node ist mit ${nodeId} als Quelle verlinkt!`);
      }

      if(item.target === nodeId) {
        console.log(`Node ist mit ${nodeId} als Ziel verlinkt! Der Index wert für diese Verbindung lautet: ${index}`);
        newLinks.splice(index, 1); //Loesche Verknuepfung

        //console.log(links);
        const newConceptMap = [{nodes: newNodes, links: newLinks}];
        setConceptMap(newConceptMap);
      }
    }

    conceptMap[0].links.forEach((item, index) => findLinks(item, index));
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
            <Button variant="primary" onClick={handleShow}>Create Concept</Button>
            <ConceptList concepts={allConcepts} onRemoveConcept={handleConceptListRemove} handleConceptAdd={handleConceptAdd} isInConceptMap={false} />
            <CreateRelationshipForm />
          </Col>
          <Col xs={8} style={styleConceptMapContainer}>
          <MyGraph conceptMap={conceptMap}/>

            <ConceptMap concepts={conceptMap} onRemoveConcept={handleConceptRemove} isInConceptMap={true}/>
            <CreateConceptModal show={show} handleClose={handleClose} handleShow={handleShow} handleSaveConcept={handleSaveConcept}/>
            <CreateLinkModal showLinkModal={showLinkModal} handleClose={handleLinkClose} handleShow={handleShow} />
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
        : <Button style={styleLittleButton} variant="secondary" onClick={() => handleConceptAdd(concept)}>Add</Button>  } {/* TODO: Modal öffnen und Relation abfragen */}

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
    <div id="create-concept-modal">
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
    </div>
  );
}

const CreateLinkModal = ({showLinkModal, handleShow, handleClose}) => {
  return (
    <div id="create-concept-modal">
      <Modal show={showLinkModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>Hier kommt die Lnik Form hin</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
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
        <Form.Label>Description</Form.Label>
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
    directed: true,
    node: {
        color: "#dc3545",
        size: 600,
        highlightStrokeColor: "blue",
        labelProperty: "conceptName"
    },
    link: {
        highlightColor: "lightblue",
        renderLabel: true,
        labelProperty: "type",
        markerHeight: 10,
        markerWidth: 10,
    },
  };
  return(
    <Graph id="graph-id" data={data} config={myConfig} />
  );
}




export default App;
