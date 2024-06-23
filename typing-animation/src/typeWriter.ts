type QueueItem = () => Promise<void>;

export default class TypeWriter {
  private queue: QueueItem[] = [];
  private element: HTMLElement;
  private loop: boolean;
  private typingSpeed: number;
  private deleteSpeed: number;

  constructor(
    parent: HTMLElement,
    { loop = false, typingSpeed = 50, deleteSpeed = 50 } = {}
  ) {
    this.element = document.createElement("div");
    parent.append(this.element);
    this.loop = loop;
    this.typingSpeed = typingSpeed;
    this.deleteSpeed = deleteSpeed;
  }

  typeString(string: string) {
    this.addToQueue((resolve) => {
      let stringCharIndex = 0;
      const interval = setInterval(() => {
        this.element.append(string[stringCharIndex]);
        stringCharIndex++;

        if (stringCharIndex >= string.length) {
          clearInterval(interval);
          resolve();
        }
      }, this.typingSpeed);
    });

    return this;
  }

  deleteChars(amount: number) {
    this.addToQueue((resolve) => {
      let stringCharIndex = 0;
      const interval = setInterval(() => {
        this.element.innerText = this.element.innerText.substring(
          0,
          this.element.innerText.length - 1
        );
        stringCharIndex++;

        if (stringCharIndex >= amount) {
          clearInterval(interval);
          resolve();
        }
      }, this.deleteSpeed);
    });

    return this;
  }

  deleteAll(deleteSpeed = this.deleteSpeed) {
    this.addToQueue((resolve) => {
      const interval = setInterval(() => {
        this.element.innerText = this.element.innerText.substring(
          0,
          this.element.innerText.length - 1
        );

        if (this.element.innerText.length === 0) {
          clearInterval(interval);
          resolve();
        }
      }, deleteSpeed);
    });

    return this;
  }

  pauseFor(duration: number) {
    this.addToQueue((resolve) => {
      setTimeout(resolve, duration);
    });

    return this;
  }

  async start() {
    let cb = this.queue.shift();
    while (cb != null) {
      await cb();
      if (this.loop) this.queue.push(cb);
      cb = this.queue.shift();
    }

    return this;
  }

  private addToQueue(cb: (resolve: () => void) => void) {
    this.queue.push(() => new Promise(cb));
  }
}
