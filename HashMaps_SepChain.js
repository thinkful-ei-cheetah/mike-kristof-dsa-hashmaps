class HashMap_SepChain {
  constructor(initialCapacity = 8) {
    this.length = 0; // how many spots taken
    this._hashTable = []; // the actual data storage
    this._capacity = initialCapacity; // max amount it can hold
  }

  get(key) { // merged with _findSlot
    const hash = HashMap_SepChain._hashString(key);
    const index = hash % this._capacity;
    const slot = this._hashTable[index];

    if (slot === undefined) {
      throw new Error('Key Error');
    }

    for (let i = 0; i < slot.length; i++) {
      if (slot[i].key === key) {
        return slot[i].value;
      }
    }
  }

  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMap_SepChain.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap_SepChain.SIZE_RATIO);
    }

    // merged with _findSlot
    const hash = HashMap_SepChain._hashString(key);
    const index = hash % this._capacity;

    if (!this._hashTable[index]) {
      this._hashTable[index] = [];
    }

    for (let i = 0; i < this._hashTable[index].length; i++) {
      if (this._hashTable[index][i].key === key) {
        return (this._hashTable[index][i].value = value);
      }
    }

    this.length++;
    this._hashTable[index].push({
      key,
      value
    });
  }

  delete(key) { // merged with _findSlot
    const hash = HashMap_SepChain._hashString(key);
    const index = hash % this._capacity;
    const slot = this._hashTable[index];

    if (slot === undefined) {
      throw new Error('Key Error');
    }

    for (let i = 0; i < slot.length; i++) {
      if (slot[i].key === key) {
        this.length--;
        this._hashTable[index].splice(i, 1);
        break;
      }
    }
  }

  _resize(size) {
    const oldSlots = this._hashTable;
    this._capacity = size;
    this.length = 0;
    this._hashTable = [];

    for (const slot of oldSlots) {
      if (slot !== undefined) {
        slot.forEach(obj => this.set(obj.key, obj.value));
      }
    }
  }

  // function that takes a string and hashes it
  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }
}

module.exports = { HashMap_SepChain };