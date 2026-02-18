// Implement a class called AsyncEventEmitter that supports:

// .on(event, handler) — register async or sync listeners
// .emit(event, ...args) — runs all handlers in sequence, awaiting each one
// .off(event, handler) — remove a specific listener
// .once(event, handler) — fires only once, then auto-removes
// A task queue with concurrency control: new AsyncEventEmitter({ concurrency: 2 }) — at most 2 handlers run in parallel per emit

export class AsyncEventEmitter {
  eventMap: Map<
    string,
    Set<{
      fn: any;
      isOnce: boolean;
    }>
  > = new Map();

  constructor() {}

  // register a event with listeners
  on(event: string, handler: any) {
    // check if event name already registered
    const eventObj = this.eventMap.get(event);
    if (eventObj) {
      eventObj.add({
        fn: handler,
        isOnce: false,
      });
      return;
    }

    // register new event
    this.eventMap.set(event, new Set([{ fn: handler, isOnce: false }]));
  }

  // emit all handlers with registered event name
  emit(event: string, ...args: any[]) {
    const eventObj = this.eventMap.get(event);

    console.log(eventObj);

    if (eventObj) {
      for (const obj of eventObj!) {
        if (obj.isOnce) {
          obj.fn(...args);

          // remove handler after emitted once
          eventObj.delete({ fn: obj.fn, isOnce: obj.isOnce });
        } else {
          obj.fn(...args);
        }
      }
    }

    console.log(eventObj);
  }
}
