import React, { Component } from 'react';
import './MachineLearning.scss';

require('@tensorflow/tfjs');
const toxicity = require('@tensorflow-models/toxicity');

class MachineLearning extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: '',
            level: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        let toxicLevel = [];

        // The minimum prediction confidence.
        const threshold = 0.7;

        // Load the model. Users optionally pass in a threshold and an array of
        // labels to include.
        toxicity.load(threshold).then(model => {
        const sentences = this.state.value;

        model.classify(sentences).then(predictions => {
            // `predictions` is an array of objects, one for each prediction head,
            // that contains the raw probabilities for each input along with the
            // final prediction in `match` (either `true` or `false`).
            // If neither prediction exceeds the threshold, `match` is `null`.
            console.log(sentences);
            console.log(predictions);

            predictions.map((prediction) => {
                if(prediction.results[0].match){
                    toxicLevel.push({'label': prediction.label});
                }  

                return null;
            })

            console.log(toxicLevel);
            this.setState({level: toxicLevel});

        });
        });

        console.log(toxicLevel);
    }

    render(){
        const { level } = this.state;
        const toxicDiv = [];

        level.forEach((lvl) =>
            toxicDiv.push(
                <div style={{background: 'black', color: 'white', padding: '1rem', margin: '1rem', width: '20rem'}}>
                    <h1>{lvl.label}</h1>
                </div>
            )
        );

        return (
            <div className="section2">
                <h1>Machine Learning</h1>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type="text"
                        value={this.state.value}
                        onChange={(event) => this.setState({value: event.target.value })} 
                    />
                    <input 
                        type="submit"
                        value="Click!"
                    ></input>      
                </form>
                {toxicDiv}
            </div>
        )
}
    }


export default MachineLearning;


