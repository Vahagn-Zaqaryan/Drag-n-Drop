import React, { Component } from 'react';
import Input from './input.js'
import './App.css';
import uuid from 'uuid';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      words: [],
      targetProject: null,
      color: {r: 200, g: 1 , b:19},
      mixed: false,
      errMassage: null
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
        color: {r: 200, g: 1 , b:19},
        mixed: true
      })
    }else{
      this.setState({
        color: {r: 7, g:101 , b:189},
        mixed: false
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

  shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
  }

  textToWords(text){
    if(text === ''){
      this.setState({ errMassage: "You have to add at least 3 words!" })
    }else{
      text = text.charAt(0).toUpperCase() + text.slice(1);
      let wordsArr = text.split(" ");
      let words = [];
      
      if(wordsArr.length <= 2){
        if(wordsArr.length === 1)
          this.setState({ errMassage: "You have to add at least 2 more words!" })
        else
          this.setState({ errMassage: "You have to add at least 1 more word!" })
      }else{
        for (let i in wordsArr){
          words.push({id: uuid.v4(), name: wordsArr[i], order: parseInt(i)});
        }
        words = this.shuffle(words);
        this.setState({
          words: words,
          mixed: true,
          errMassage: null
        })
      }
    }
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
          <div className="error">{this.state.errMassage}</div>
            {this.state.mixed? null : <Input textGetter={this.textToWords.bind(this)}/> }
            <div className="words"> 
              {project} 
            </div>
        </div>
      </div>
    );
  }
}

export default App;
