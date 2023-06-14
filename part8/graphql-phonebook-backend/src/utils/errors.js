class UniquenessError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UniquenessError';
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

module.exports = { UniquenessError, ValidationError };
