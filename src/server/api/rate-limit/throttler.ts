type ThrottlingCounter = {
  timeout: number;
  updatedAt: number;
};

/**
 * Throttler class to limit the rate of operations.
 * Provides progressive timeouts for repeated operations.
 * The progression of timeouts is defined when instantiating the class.
 */
class Throttler<_Key> {
  public timeoutSeconds: number[];

  private storage = new Map<_Key, ThrottlingCounter>();

  constructor(timeoutSeconds: number[]) {
    this.timeoutSeconds = timeoutSeconds;
  }

  /**
   * Attempt to perform an operation if not rate limited.
   * Increases timeout for new requests.
   * @param key The key to identify the operation.
   * @returns Boolean indicating if the operation can be performed and the key is not rate limited.
   */
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

  /**
   * Reset the throttling counter for a specific key.
   * @param key The key to reset.
   */
  public reset(key: _Key): void {
    this.storage.delete(key);
  }
}

export { Throttler };
