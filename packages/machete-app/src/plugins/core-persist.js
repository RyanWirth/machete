import {CoreService, EventType} from 'machete-core';
import store from '@/store';

export const CorePersistPlugin = {
  install() {
    const getters = store.getters;
    const currentQueue = getters['persist/currentQueue'];
    const currentSong = getters['persist/currentSong'];
    const currentTimestamp = getters['persist/currentTimestamp'];

    // If the user had items in a playback queue, restore it.
    if (currentQueue && currentQueue.items) {
      const {items, index} = currentQueue;
      CoreService.queue(items, true, index);
    }

    // If the user was listening to a song, restore it.
    if (currentSong && currentSong.uri) {
      CoreService.play(currentSong, currentTimestamp);
    }

    // Hook up event listeners to update the store.
    CoreService.on(EventType.CURRENT_PLAYLIST,
        (playlist) => store.dispatch('persist/setCurrentPlaylist', playlist));

    CoreService.on(EventType.CURRENT_QUEUE,
        (queue) => store.dispatch('persist/setCurrentQueue', queue));

    CoreService.on(EventType.CURRENT_SONG,
        (song) => store.dispatch('persist/setCurrentSong', song));

    CoreService.on(EventType.PLAYBACK_TIMESTAMP,
        (time) => store.dispatch('persist/setCurrentTimestamp', time));
  },
};
