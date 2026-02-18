import { AsyncEventEmitter } from "./src/AsyncEventEmitter.ts";

console.log("Radhe Radhe");

const emitter = new AsyncEventEmitter();

emitter.on("greet", (name: string, name1: string) => {
  console.log("Radhe Radhe by ", name, name1);
});

emitter.emit("greet", "hari", "ji");
