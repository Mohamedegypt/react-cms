import React, { Component } from 'react';
import './ContentTypePanel.css';
import AddEntrie from './AddEntrie/AddEntrie';
import EditEntrie from './EditEntrie/EditEntrie';
import ViewTable from '../ViewTable/ViewTable'
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, FormFeedback, FormText, Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

 
  class ContentTypePanel extends Component {
 
    constructor(props) {
      super(props);
        this.state = {
          entries:[],
          entriesKeys :{},
          modal: false
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
      this.setState({
        modal: !this.state.modal
     });
    }

    bringEntries = nextProps => {
      let entries = [];
      let contentObj;
      let entriesKeys = {};

      axios.get(`http://localhost:5000/api/entries/${nextProps.id}`)
     .then((response) => {
      response.data.map((entrie) => {
        contentObj = {...entrie.content}
        contentObj.id = entrie._id
        entries.push(contentObj)
      })
      this.setState({
        entries: entries,
        entriesKeys: entries[0]
      })
      }).catch(function(error) {
        console.error("Error: ", error);
      });
    }

    componentWillMount = () => {
      this.bringEntries(this.props)
     }

    componentWillReceiveProps = (nextProps, prevState) => {
      this.bringEntries(nextProps)
    }
 
    addEntrie = content => {
     let stateEntries = this.state.entries 
     stateEntries.push(content)
     this.setState({
      entries: stateEntries
    })
   }

    editEntrie = (entrie, index) => {
      let newEntries = [...this.state.entries];
      let editedEntrie = entrie;
      newEntries[index] = editedEntrie;
      this.setState({
        entrie: newEntries
    })
   }

   deleteEntrie = index => {
    console.log(index)
    let entries = [...this.state.entries]   
    entries.splice(index,1)
    this.setState({entries})
  }

  bringEntrieId = id => {
    this.editingItem.id = id
  }
   
    editingItem = {
      item: {},
      id: ''
    };

    bringItem = (item) => {
      this.editingItem.item = item; 
     }
 
  render() {    
 
    console.log(this.state.entries)
 
    return (
      <div className="ContentTypePanel">
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            <EditEntrie toggle={this.toggle} bringItem={this.bringItem} editingItem={this.editingItem} fields={this.props.fields} />
          </ModalBody>
        </Modal>

        <h1>Hoii </h1>
        {this.state.entries.length > 0 && 
        <ViewTable
        bringEntrieId={this.bringEntrieId}
        deleteEntrie={this.deleteEntrie}
        toggle={this.toggle}
        items={this.state.entries}
        keys={this.state.entriesKeys}/>
        }
        <AddEntrie fields={this.props.fields} contentTypeId={this.props.id} addEntrie={this.addEntrie}/>
      </div>
    );
  }
}

export default ContentTypePanel;