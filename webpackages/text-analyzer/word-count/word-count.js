(function () {
  'use strict';
  /**
   * Get help:
   * > Lifecycle callbacks:
   * https://www.polymer-project.org/1.0/docs/devguide/registering-elements.html#lifecycle-callbacks
   *
   * Access the Cubbles-Component-Model:
   * > Access slot values:
   * slot 'a': this.getA(); | this.setA(value)
   */
  CubxPolymer({
    is: 'word-count',

    /**
     * Manipulate an element’s local DOM when the element is created.
     */
    created: function () {
    },

    /**
     * Manipulate an element’s local DOM when the element is created and initialized.
     */
    ready: function () {
    },

    /**
     * Manipulate an element’s local DOM when the element is attached to the document.
     */
    attached: function () {
    },

    /**
     * Manipulate an element’s local DOM when the cubbles framework is initialized and ready to work.
     */
    cubxReady: function () {
    },

    /**
     *  Observe the Cubbles-Component-Model: If value for slot 'text' has changed ...
     */
    modelTextChanged: function (newText) {
      this._setCountSlots(newText);
    },

    /**
     *  Observe the Cubbles-Component-Model: If value for slot 'whitelist' has changed ...
     */
    modelWhitelistChanged: function (whitelist) {
      this._setCountSlots(this.getText());
    },

    /**
     *  Observe the Cubbles-Component-Model: If value for slot 'blacklist' has changed ...
     */
    modelBlacklistChanged: function (blacklist) {
      this._setCountSlots(this.getText());
    },

    _countWords: function (text) {
      var splitText = text.trim().split(/\s+/);
      var wordCount = {};
      if (Array.isArray(this.getWhitelist())) {
        initWordCount.call(this);
      }
      var overallCount = 0;
      splitText.forEach(function (word) {
        if (Array.isArray(this.getWhitelist()) && this.getWhitelist().length > 0) {
          if (isWhiteWord.call(this, word) && !isBlackWord.call(this, word)) {
            increaseCount(word);
          }
          return;
        }
        if (!this.getBlacklist() || !isBlackWord.call(this, word)) {
          increaseCount(word);
        }
      }.bind(this));

      function increaseCount(word) {
        overallCount++;
        if (!wordCount.hasOwnProperty(word)) {
          wordCount[word] = 1;
        } else {
          wordCount[word]++;
        }
      }

      function initWordCount() {
        var self = this;
        this.getWhitelist().forEach(function (word) {
          if (!isBlackWord.call(self, word)){
            wordCount[word] = 0;
          }
        });
      }

      function isBlackWord(word) {
        return Array.isArray(this.getBlacklist()) && this.getBlacklist().indexOf(word) > -1;
      }

      function isWhiteWord(word) {
        return Array.isArray(this.getWhitelist()) && this.getWhitelist().indexOf(word) > -1;
      }

      return {wordCount: wordCount, overallCount: overallCount};
    },

    _setCountSlots: function (text) {
      var wordCounts = this._countWords(text);
      this.setOverallCount(wordCounts.overallCount);
      this.setWordCount(this._wordCountObjectToWordCountArray(wordCounts.wordCount));
    },

    _wordCountObjectToWordCountArray: function (wordCountObject) {
      var wordCountArray = [];
      Object.keys(wordCountObject).forEach(function (word) {
        this._binaryInsert({ term: word, count: wordCountObject[word] }, wordCountArray);
      }.bind(this));
      return wordCountArray;
    },

    /**
     * Example :
     * var a = [2,7,9];
     * _binaryInsert(8, a);
     *
     * It will output a = [2,7,8,9]
     * Adapted from: https://machinesaredigging.com/2014/04/27/binary-insert-how-to-keep-an-array-sorted-as-you-insert-data-in-it/
     */

    _binaryInsert: function (value, array, startVal, endVal){
      var length = array.length;
      var start = typeof(startVal) !== 'undefined' ? startVal : 0;
      var end = typeof(endVal) !== 'undefined' ? endVal : length - 1;//!! endVal could be 0 don't use || syntax
      var m = start + Math.floor((end - start)/2);

      if(length === 0){
        array.push(value);
        return;
      }

      if(value.count <= array[end].count){
        array.splice(end + 1, 0, value);
        return;
      }

      if(value.count >= array[start].count){
        array.splice(start, 0, value);
        return;
      }

      if(start >= end){
        return;
      }

      if(value.count > array[m].count){
        this._binaryInsert(value, array, start, m - 1);
        return;
      }

      if(value.count < array[m].count){
        this._binaryInsert(value, array, m + 1, end);
        return;
      }
    }
  });
}());
