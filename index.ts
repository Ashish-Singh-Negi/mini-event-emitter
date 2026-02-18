import { AsyncEventEmitter } from "./src/AsyncEventEmitter.ts";

const emitter = new AsyncEventEmitter();

emitter.on("greet", (name: string, name1: string) => {
  console.log("Radhe Radhe by ", name, name1);
});

emitter.once("greet", (name: string) => {
  console.log("Hare krishna ", name);
});

emitter.emit("greet", "hari", "ji");
emitter.emit("greet", "krishna");
