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

  concurrency = 1;

  taskQueue = [];

  constructor({ concurrency }: { concurrency: number }) {
    this.concurrency = concurrency;
  }

  // register a event with listeners
  on(event: string, handler: any) {
    const eventObj = this.eventMap.get(event);
    if (eventObj) {
      eventObj.add(handler);
      return;
    }

    this.eventMap.set(event, new Set(handler));
  }

  emit(event: string, ...args: any[]) {}

  off(event: string, handler: any) {
    this.eventMap.set(event, new Set());
  }

  //   once(event: string, handler: any) {
  //     const eventObj = { event };

  //     this.onceEventMap.set(eventObj, handler);
  //   }
}
