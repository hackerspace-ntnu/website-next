type ThrottlingCounter = {
  timeout: number;
  updatedAt: number;
};

class Throttler<_Key> {
  public timeoutSeconds: number[];

  private storage = new Map<_Key, ThrottlingCounter>();

  constructor(timeoutSeconds: number[]) {
    this.timeoutSeconds = timeoutSeconds;
  }

  public consume(key: _Key): boolean {
    let counter = this.storage.get(key) ?? null;
    const now = Date.now();
    if (counter === null) {
      counter = {
        timeout: 0,
        updatedAt: now,
      };
      this.storage.set(key, counter);
      return true;
    }
    const allowed =
      now - counter.updatedAt >=
      (this.timeoutSeconds[counter.timeout] ?? 0) * 1000;
    if (!allowed) {
      return false;
    }
    counter.updatedAt = now;
    counter.timeout = Math.min(
      counter.timeout + 1,
      this.timeoutSeconds.length - 1,
    );
    this.storage.set(key, counter);
    return true;
  }

  public reset(key: _Key): void {
    this.storage.delete(key);
  }
}

export { Throttler };
