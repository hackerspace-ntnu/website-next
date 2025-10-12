type ExpiringBucket = {
  count: number;
  createdAt: number;
};

/**
 * Expiring token bucket implementation.
 * This bucket allows a certain number of tokens to be consumed in a given time frame.
 * When the time frame passes, tokens are reset, so new operations can be performed.
 */
class ExpiringTokenBucket<_Key> {
  public max: number;
  public expiresInSeconds: number;

  private storage = new Map<_Key, ExpiringBucket>();

  constructor(max: number, expiresInSeconds: number) {
    this.max = max;
    this.expiresInSeconds = expiresInSeconds;
  }

  /**
   * Check if an operation with the specified cost can be consumed from the token bucket.
   * @param key The key to check.
   * @param cost The cost of the operation.
   * @returns Boolean indicating whether the specified cost can be consumed,
   * therefore indicating if the operation can be performed.
   */
  public check(key: _Key, cost: number): boolean {
    const bucket = this.storage.get(key) ?? null;
    const now = Date.now();
    if (bucket === null) {
      return true;
    }
    if (now - bucket.createdAt >= this.expiresInSeconds * 1000) {
      return true;
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
        createdAt: now,
      };
      this.storage.set(key, bucket);
      return true;
    }
    if (now - bucket.createdAt >= this.expiresInSeconds * 1000) {
      bucket.count = this.max;
    }
    if (bucket.count < cost) {
      return false;
    }
    bucket.count -= cost;
    this.storage.set(key, bucket);
    return true;
  }

  /**
   * Reset the token bucket for a specific key.
   * @param key The key to reset.
   */
  public reset(key: _Key): void {
    this.storage.delete(key);
  }
}

export { ExpiringTokenBucket };
