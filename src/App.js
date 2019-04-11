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

  hendleDragStart(e, project){
    this.setState({ targetProject: project });
  }

  checkOrder(){
    let i = 0, checking = false;
    this.state.words.map( project => {
      i === project.order? i++ : checking = true
      return true;
    });
    if(checking){
      this.setState({ color: {r: 200, g: 1 , b:19}, mixed: true})
    }else{
      this.setState({ color: {r: 7, g:101 , b:189}, mixed: false })
    }
  }

  hendleDrop(e, dropProject){
    let dragProject = this.state.targetProject
    if(dragProject.id !== dropProject.id){

      const drag  = {...dragProject};
      const drop = {...dropProject};

      let updateProject = this.state.words.filter(project => {
        if(dropProject.id === project.id){
          project.name = drag.name;
          project.order = drag.order;
        }else if(dragProject.id === project.id){
          project.name = drop.name;
          project.order = drop.order;
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
    let j, x, i;
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
          this.setState({ errMassage: "Ok.. type at least 2 more words!" })
        else
          this.setState({ errMassage: "Humm... type at least 1 more word!" })
      }else{
        for (let i in wordsArr){
          words.push({id: uuid.v4(), name: wordsArr[i], order: parseInt(i)});
        }
        words = this.shuffle(words);
        this.setState({
          words: words, mixed: true, errMassage: null, color: {r: 200, g: 1 , b:19}
        })
      }
    }
  }

  render() {
    let project;
    let { r, g, b } = this.state.color;
    project = this.state.words.map(project => {
      return (
        <div className="box-conteiner" key={project.id} onDragOver={(e) => e.preventDefault()} onDrop={(e) => this.hendleDrop(e, project)}>
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
            {this.state.mixed? null : <Input textGetter={this.textToWords.bind(this)} text={this.state.text}/> }
            <div className="words"> 
              {project} 
            </div>
        </div>
      </div>
    );
  }
}

export default App;