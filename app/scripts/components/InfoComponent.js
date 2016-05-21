'use strict';

var React = require('react');

var styles ={
	container: {
	  margin: auto;
	  display: flex;
	  flex-direction: row;
	  flex-wrap: wrap;
	  width: 90%;
	  max-width: 960px;
	}

	article={
	   padding: 20px;
	   text-align: center;
	}

	img={
	  width: 200px;
	  height: 200px;
	  border-radius: 50%;
	}
}

function InfoComponent() {

var App = React.createClass({
  getInitialState: function () {
    return {
      coders: {
        'brian': {
          "name": "Brian J.",
          "location": "Oakland, CA",
          "thumbnail": "http://builtbybrian.net/img/BrianPoint.jpg",
          "github":"github.io"
        },
        'justin': {
          "name": "Justin",
          "location": "Daly City, CA",
          "thumbnail": "http://builtbybrian.net/img/BrianPoint.jpg"
        },
        'tim': {
          "name": "Tim Jr.",
          "location": "San Francisco, CA",
          "thumbnail": "http://builtbybrian.net/img/BrianPoint.jpg"
        }
      }
    }
  },
  renderArticle: function (key) {
    return (
      <div style={style.container} className="column">
        <Article key={key} index={key} details={this.state.coders[key]} />
      </div>
    )
  },
  render: function () {
    return (
      <div className="app">
        <div className="container">
          {Object.keys(this.state.coders).map(this.renderArticle)}
        </div>
      </div>
    )
  }
});
             
/*
  Article
  <Article />
*/
var Article = React.createClass({
  render: function () {
    var details = this.props.details
    
    return (
      <article style={style.article} className="article">
        <h2 className="article__title">{details.name}</h2>
        <h2 className="article__title">{details.location}</h2>
        <img style={style.img} src={details.thumbnail} />
        <a href={details.github}>Github</a>
      </article>
    )
  }
});



}

module.exports = InfoComponent;


