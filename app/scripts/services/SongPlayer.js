(function() {
    function SongPlayer($rootScope, Fixtures) {
         var SongPlayer = {};

         /**
         * @desc Storagee of album information
         * @type {Object}
         */
         var currentAlbum = Fixtures.getAlbum();

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
         * @function stopSong
         * @desc Stops the current Buzz object and sets the property to null
         */
         var stopSong = function(song){
             currentBuzzObject.stop();
             SongPlayer.currentSong.playing = null;
         };

         /**
         * @function getSongIndex
         * @desc index of the song playing
         * @param {Object} song
         */
         var getSongIndex = function(song) {
             return currentAlbum.songs.indexOf(song);
         };

         /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
         var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });

            SongPlayer.currentSong = song;
         };

         /**
         * @desc Active song object from list of songs
         * @type {Object}
         */
         SongPlayer.currentSong = null;

         /**
         * @desc Current playback time (in seconds) of currently playing song
         * @type {Number}
         */
         SongPlayer.currentTime = null;

         /**
         * @function play
         * @desc Play current or new song
         * @param {Object} song
         */
         SongPlayer.play = function(song) {
             song = song || SongPlayer.currentSong;
             if (SongPlayer.currentSong !== song) {
                 setSong(song);
                 playSong(song);
             } else if (SongPlayer.currentSong === song) {
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
             song = song || SongPlayer.currentSong;
             currentBuzzObject.pause();
             song.playing = false;
         };

         /**
         * @function previous
         * @desc plays previous song
         */
         SongPlayer.previous = function() {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex--;

             if (currentSongIndex < 0) {
                stopSong(song);
             } else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
             }
         };

         /**
         * @function next
         * @desc plays next song
         */
         SongPlayer.next = function() {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex++;

             var lastSongIndex = currentAlbum.songs.length-1;

             if (currentSongIndex > lastSongIndex){
                 stopSong(song);
             } else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
             }
         };

         /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };


         return SongPlayer;
    }


    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
