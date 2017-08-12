(function() {
    function SongPlayer() {
         var SongPlayer = {};

         /**
         * @desc status of current song
         * @type {string}
         */
         var currentSong = null;

         /**
        * @desc Buzz object audio file
        * @type {Object}
        */
         var currentBuzzObject = null;

         /**
         * @function playSong
         * @desc plays song and sets its paying status as true
         * @param {Object} song
         */
         var playSong = function(song){
             currentBuzzObject.play();
             song.playing = true;
         };

         /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
         var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentSong = song;
         };

         /**
         * @function play
         * @desc Play current or new song
         * @param {Object} song
         */
         SongPlayer.play = function(song) {
             if (currentSong !== song) {
                 setSong(song);
                 playSong(song);
             } else if (currentSong === song) {
                 if (currentBuzzObject.isPaused()) {
                     playSong(song);
                 }
             }
         };

         /**
         * @function pause
         * @desc stops current song
         * @param {Object} song
         */
         SongPlayer.pause = function(song) {
             currentBuzzObject.pause();
             song.playing = false;
         };



         return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
