import React, { Component } from 'react';
import Input from './input.js'
import './App.css';
import uuid from 'uuid';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      words: [ ],
      targetProject: null,
      color: {r: 7, g:101 , b:189}
    };
  }

  hendleDragOver(e, id){
    e.preventDefault();
  }

  hendleDragStart(e, project){
    this.setState({
      targetProject: project
    });
  }

  checkOrder(){
    let i = 0;
    let checking = false;
    this.state.words.map( project => {
      if(i === project.order){
        i++;
      }else{
        checking = true;
      }
      return true;
    });
    if(checking){
      this.setState({
        color: {r: 200, g: 1 , b:19}
      })
    }else{
      this.setState({
        color: {r: 7, g:101 , b:189}
      })
    }
    
  }

  hendleDrop(e, dropProject){
    let dragProject = this.state.targetProject
    if(dragProject.id !== dropProject.id){
      const drag  = dragProject.name;
      const drop = dropProject.name;
      const orderDrag  = dragProject.order;
      const orderDrop = dropProject.order;
      let updateProject = this.state.words.filter(project => {
        if(dropProject.id === project.id){
          project.name = drag;
          project.order = orderDrag;
        }
        return project;
      });
      updateProject = this.state.words.filter(project => {
        if(dragProject.id === project.id){
          project.name = drop;
          project.order = orderDrop;
        }
        return project;
      });
      this.setState({
        ...this.state,
        updateProject
      }); 
      this.checkOrder(); 
    }
  }

  textToWords(text){
    let wordsArr = text.split(" ");
    let words = [];
    for (let i in wordsArr){
      words.push({id: uuid.v4(), name: wordsArr[i], order: parseInt(i)});
    }
    this.setState({
      words: words
    })
  }

  render() {
    let project;
    let { r, g, b } = this.state.color;
    project = this.state.words.map(project => {
      return (
        <div className="box-conteiner" key={project.id} onDragOver={(e) => this.hendleDragOver(e, project.id)} onDrop={(e) => this.hendleDrop(e, project)}>
          <div className="box" style={{"backgroundColor": `rgb(${r}, ${g}, ${b})`}} draggable onDragStart={(e) => this.hendleDragStart(e, project)}>
            {project.name}
          </div>
        </div>
      );
    })
    return (
      <div className="App">
          <div className="inner-App">
            <Input textGetter={this.textToWords.bind(this)}/>
              <div className="words"> 
                {project} 
              </div>
          </div>
      </div>
    );
  }
}

export default App;
