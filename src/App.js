import React from "react";
import "./App.css";

const drumKit = [
	{
		name: "Heater-1",
		key: "Q",
		src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
	},

	{
		name: "Heater-2",
		key: "W",
		src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
	},

	{
		name: "Heater-3",
		key: "E",
		src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
	},

	{
		name: "Heater-4",
		key: "A",
		src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
	},

	{
		name: "Clap",
		key: "S",
		src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
	},

	{
		name: "Open-HH",
		key: "D",
		src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
	},

	{
		name: "Kick-'n-Hat",
		key: "Z",
		src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
	},

	{
		name: "Kick",
		key: "X",
		src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
	},

	{
		name: "Closed-HH",
		key: "C",
		src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
	},
];

class Drums extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			soundName: "",
		};
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick = (e) => {
		this.setState({
			soundName: e.target.id,
		});
		const id = e.target.innerText.trim();
		const audio = this.refs[id];
		audio.play();
	};
	handleKeyPress = (e) => {
		if (e.key) {
			const checkKey = (obj) => obj.key === e.key.toUpperCase();

			let name = this.props.drumKit.some(checkKey);
			if (name) {
				this.setState({
					soundName: name,
				});
				document.getElementById("error").innerHTML = "";
			} else {
				// console.log("Key Doesn't exist");
				document.getElementById("error").innerHTML =
					e.key + " " + "key doesn't exist";
			}

			const audio = document.getElementById(e.key.toUpperCase());

			if (audio) {
				audio.play();
			} else {
				console.log("Audio with that key doesn't exist");
			}
		}
	};
	componentDidMount() {
		document.addEventListener("keydown", this.handleKeyPress);
	}
	componentWillUnmount() {
		document.removeEventListener("keydown", this.handleKeyPress);
	}
	render() {
		let drumPad = this.props.drumKit.map((item) => (
			<div className="drum-pad" onClick={this.handleClick} id={item.name}>
				{item.key}
				<audio
					className="clip"
					ref={item.key}
					id={item.key}
					src={item.src}
				></audio>
			</div>
		));

		return (
			<div id="drum-machine">
				<h1>Drum Machine</h1>
				<div id="display">{this.state.soundName}</div>
				<div id="content">{drumPad}</div>
				<div id="error"></div>
			</div>
		);
	}
}

class App extends React.Component {
	render() {
		return <Drums drumKit={drumKit} />;
	}
}

export default App;
