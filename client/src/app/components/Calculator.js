import './Calculator.css';
import React from 'react';
import { Event } from 'react-socket-io';

class Calculator extends React.Component {

	constructor(props) {
		super(props);
		this.sendExpression = this.sendExpression.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleEnterKey = this.handleEnterKey.bind(this);
		this.receiveHistory = this.receiveHistory.bind(this);
		this.receiveCalculation = this.receiveCalculation.bind(this);

		this.calculationsBottom = React.createRef();

		this.state = {
			calcInput: '',
			history: []
		}
	}
  
	sendExpression() {
		if (!this.context || this.context.status !== 'connected') {
			console.warn('Socket is unavailable!');
			return;
		}

		this.context.emit("calculate", this.state.calcInput);
		console.log(this.state.calcInput);
		this.setState({ calcInput: '' });
	}

	handleInputChange(event) {
		this.setState({ calcInput: event.target.value });
	}

	handleEnterKey(event) {
		if (event.key == 'Enter') {
			this.sendExpression();
		}
	}

	receiveHistory(data) {
		this.setState({ history: data });
	}

	receiveCalculation(data) {
		if (this.state.history.length == 10) {
			this.setState({ history: [...this.state.history.slice(1), data] });
		} else {
			this.setState({ history: [...this.state.history, data] });
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.history !== this.state.history) {
			setTimeout(() => {
				this.calculationsBottom.current.scrollIntoView({ behavior: 'smooth' })
			}, 10);
		}
	}

	render() {
		return (
			<div>
				<Event event='history' handler={this.receiveHistory} />
				<Event event='calculate' handler={this.receiveCalculation} />
				<h1>Calculator</h1>
				<div className="calculator">
					<div className="calculations">
						{
							this.state.history.map((result,index) => (
								<div key={index} className="calculation">
									<div className="calculation-result">{result}</div>
								</div>
							))
						}
						<div ref={this.calculationsBottom}></div>
					</div>
					<div className="calc-input">
						<input value={this.state.calcInput} onChange={this.handleInputChange} onKeyPress={this.handleEnterKey} type="text"></input>
						<button type="button" onClick={this.sendExpression}>Submit</button>
					</div>
				</div>
			</div>
		)
	}
}

export default Calculator;