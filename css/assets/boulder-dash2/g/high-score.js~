"use strict";

window.HighScore = function() {
  /**
   * Les  high-scores  sont  stoqués  sous forme  d'un  tableau  de  8
   * éléments.  Chaque  élément  est  lui-même un  tableau  avec  deux
   * éléments : le nom du joueur et son score.
   */
  var DEFAULT_HIGH_SCORES = [
    ['Daisy', 4750],
    ['John', 3900],
    ['Samantha', 3900],
    ['Henry', 2600],
    ['Virginia', 1300],
    ['William', 1050],
    ['Natalia', 900],
    ['Paul', 650]
  ];

  /**
   * Lire les scores depuis le local storage.
   */
  function loadFromLocalStorage() {
    var scores = window.localStorage.getItem( "boulder-dash/scores" );
    if( !scores ) {
      return DEFAULT_HIGH_SCORES;
    } else {
      try {
        scores = JSON.parse( scores );
        if( !Array.isArray( scores ) ) return DEFAULT_HIGH_SCORES;
      } catch( ex ) {
        console.error( ex );
        return DEFAULT_HIGH_SCORES;
      }
    }
    return scores;
  };

  /**
   * Sauvegarder les scores dans le local storage.
   */
  function saveToLocalStorage( scores ) {
    window.localStorage.setItem( "boulder-dash/scores", JSON.stringify( scores ) );
  }

  /**
   * Classe de gestion des high-scores.
   */
  var HighScore = function() {
    this._scores = loadFromLocalStorage();
    this._lastNewHighScore = -1;
  };

  /**
   * Retourner une copie des scores.
   */
  HighScore.prototype.getScores = function() {    
    return this._scores.slice();
  };

  /**
   * 
   */
  HighScore.prototype.getLastHighScoreIndex = function() {
    return this._lastNewHighScore;
  };

  /**
   * Vérifier si le score donné peut figurer parmi les 8 meilleurs.
   */
  HighScore.prototype.isAnHighScore = function( score ) {
    return score > this._scores[this._scores.length - 1];
  };

  /**
   * @param {string} name - Nom du joueur.
   * @param {number} score - Son score.
   */
  HighScore.prototype.addScore = function( name, score ) {
    var k;
    var scores = this._scores;
    for( k = 0; k < scores.length; k++ ) {
      if( score > scores[k][1] ) {
        // Mémorisons l'emplacement du dernier score inséré
        // ça permettra de le mettre en évidence.
        this._lastNewHighScore = k;
        // On insère le score à sa place.
        score.splice( k, 0, [name, score] );
        // On s'assure qu'il n'y en a pas plus que 8.
        while( score.length > 8) score.pop();
        saveToLocalStorage( score );
        return true;
      }
    }
    return false;
  };
  
  return HighScore;
}();
