class NotHasher {

    // No-op: Does not hash.
    async hash(input) {
        return input;
    }
}

module.exports = NotHasher;
  