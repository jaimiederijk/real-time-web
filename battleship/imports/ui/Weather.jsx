import React, { Component, PropTypes } from 'react';

class CanvasComponent extends Component {
    componentDidMount() {
        this.updateCanvas();
    }
    updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.translate(110/2, 110/2);

        ctx.rotate(this.props.weather.wind.deg*Math.PI/180);
        ctx.translate(-110/2, -110/2);
        ctx.beginPath();
        
        ctx.arc(55,55,40,0,2*Math.PI);
        ctx.stroke();

        function canvas_arrow(context, fromx, fromy, tox, toy){
            var headlen = 10;   // length of head in pixels
            var angle = Math.atan2(toy-fromy,tox-fromx);
            context.beginPath();
            context.moveTo(fromx, fromy);
            context.lineTo(tox, toy);
            context.lineTo(tox-headlen*Math.cos(angle-Math.PI/6),toy-headlen*Math.sin(angle-Math.PI/6));
            context.moveTo(tox, toy);
            context.lineTo(tox-headlen*Math.cos(angle+Math.PI/6),toy-headlen*Math.sin(angle+Math.PI/6));
            context.stroke();
        }
        canvas_arrow(ctx,55,55,55,1);
        
    }
    render() {
        return (
            <canvas ref="canvas" width={110} height={110}/>
        );
    }
}

export default class LocalWeather extends Component {
  render() {
    return (
      <div>
      	<h3>{this.props.weather.main.temp}</h3>
        <h3>{this.props.weather.wind.speed}</h3>
        <CanvasComponent weather={this.props.weather}/>
      </div>
    );
  }
}

LocalWeather.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required<p><span>x:{this.props.ship.position.x}</span><span>y:{this.props.position.ship.y}</span></p>
  weather: PropTypes.object.isRequired,
};