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
  async emit(event: string, ...args: any[]) {
    const eventObj = this.eventMap.get(event);

    if (eventObj) {
      for (const obj of eventObj!) {
        if (obj.isOnce) {
          await obj.fn(...args);

          // remove handler after emitted once
          eventObj.delete(obj);
        } else {
          await obj.fn(...args);
        }
      }
    }
  }

  // register a event with listener (once only)
  once(event: string, handler: any) {
    const eventObj = this.eventMap.get(event);
    if (eventObj) {
      eventObj.add({
        fn: handler,
        isOnce: true,
      });

      return;
    }

    // register new event
    this.eventMap.set(event, new Set([{ fn: handler, isOnce: true }]));
  }

  off(event: string, handler: any) {
    const eventObj = this.eventMap.get(event);
    console.log("Before:", eventObj!.size);

    if (eventObj) {
      for (const obj of eventObj!) {
        if (handler === obj.fn) {
          eventObj.delete(obj);
          break;
        }
      }
    }
    console.log("After:", eventObj!.size);
  }
}
