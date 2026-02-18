import { AsyncEventEmitter } from "./src/AsyncEventEmitter.ts";

const emitter = new AsyncEventEmitter();

function greet(name: string, name1: string) {
  console.log("Radhe Radhe by ", name, name1);
}

emitter.on("greet", greet);

emitter.emit("greet", "hari", "ji");

emitter.off("greet", greet);
