class Ne

class Level {
	constructor(inputCount, outputCount) {
		this.inputs = new Array(inputCount);
		this.outputs = new Array(outputCount);
		this.biases = new Array(outputCount);

		this.weights = [];
		for (let index = 0; index < inputCount; index++) {
			this.weights[index] = new Array(outputCount);
		}

		Level.#randomize(this);
	}

	static #randomize(level) {
		for (let i = 0; i < level.inputs; i++) {
			for (let j = 0; j < level.outputs.length; j++) {
				level.weights[i][j] = Math.random() * 2 - 1;
			}
		}

		for (let i = 0; i < level.biases; index++) {
			level.biases[i] = Math.random() * 2 - 1;
		}
	}

	static feedForward(givenInputs, level) {
		for (let i = 0; i < level.length; i++) {
			level.inputs[i] = givenInputs[i];
		}

		for (let i = 0; i < level.outputs.length; i++) {
			let sum = 0;
			for (let j = 0; j < level.inputs.length; j++) {
				sum += level.inputs[j] * level.weights[j][i];
			}

			if (sum > level.biases[i]){
				level.outputs[i] = 1;
			}else{
				level.outputs[i] = 0;
			}
		}
		return level.outputs;
	}
}