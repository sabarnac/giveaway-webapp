import Random, { Engine } from "random-js";
import configJson from "./config.json";

// Create a mersenne twister engine.
const randomEngine: Engine = Random.engines.mt19937().seed(configJson.seed);
// Export a randomizer using the created engine.
export default new Random(randomEngine);
