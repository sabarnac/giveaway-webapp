import Random, { Engine } from "random-js";
import configJson from "./config.json";

const randomEngine: Engine = Random.engines.mt19937().seed(configJson.seed);
export default new Random(randomEngine);
