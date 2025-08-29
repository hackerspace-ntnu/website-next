type RefillBucket = {
  count: number;
  refilledAt: number;
};

/**
 * Refilling token bucket implementation.
 * This bucket allows a certain number of tokens to be consumed,
 * and tokens are refilled continuously over time.
 * Tokens can be used in a rapid burst, but require time to refill.
 */
class RefillingTokenBucket<_Key> {
  public max: number;
  public refillIntervalSeconds: number;

  private storage = new Map<_Key, RefillBucket>();

  constructor(max: number, refillIntervalSeconds: number) {
    this.max = max;
    this.refillIntervalSeconds = refillIntervalSeconds;
  }

  /**
   * Check if an operation with the specified cost can be consumed from the token bucket.
   * @param key The key to check.
   * @param cost The cost to check.
   * @returns Boolean indicating whether the specified cost can be consumed,
   * therefore indicating if the operation can be performed.
   */
  public check(key: _Key, cost: number): boolean {
    const bucket = this.storage.get(key) ?? null;
    if (bucket === null) {
      return true;
    }
    const now = Date.now();
    const refill = Math.floor(
      (now - bucket.refilledAt) / (this.refillIntervalSeconds * 1000),
    );
    if (refill > 0) {
      return Math.min(bucket.count + refill, this.max) >= cost;
    }
    return bucket.count >= cost;
  }

  /**
   * Consume a specified cost from the token bucket.
   * @param key The key to identify the bucket.
   * @param cost The cost to consume.
   * @returns True if the operation was successful, false otherwise.
   */
  public consume(key: _Key, cost: number): boolean {
    let bucket = this.storage.get(key) ?? null;
    const now = Date.now();
    if (bucket === null) {
      bucket = {
        count: this.max - cost,
        refilledAt: now,
      };
      this.storage.set(key, bucket);
      return true;
    }
    const refill = Math.floor(
      (now - bucket.refilledAt) / (this.refillIntervalSeconds * 1000),
    );
    bucket.count = Math.min(bucket.count + refill, this.max);
    bucket.refilledAt = now;
    if (bucket.count < cost) {
      return false;
    }
    bucket.count -= cost;
    this.storage.set(key, bucket);
    return true;
  }
}

export { RefillingTokenBucket };
