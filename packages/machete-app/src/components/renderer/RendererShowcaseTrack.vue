<template>
  <TrackWrapper
    class="renderer-showcase-track"
    :width="200"
    :height="270"
    v-bind="data"
  >
    <template v-slot:default="props">
      <Artwork
        class="artwork"
        :url="props.thumbnail"
        :radius="3"
        :show-hovering="props.isHovering"
        :show-playing="props.isPlaying"
        :size="200"
      />
      <div class="details">
        <span class="title color-text">{{ props.title }}</span>
        <span class="artist color-navigation">{{ props.subtitle }}</span>
      </div>
    </template>

    <template v-slot:skeleton>
      <rect
        x="0"
        y="0"
        rx="3"
        ry="3"
        width="200"
        height="200"
      />
      <rect
        x="0"
        y="216"
        rx="3"
        ry="3"
        width="192"
        height="18"
      />
      <rect
        x="0"
        y="238"
        rx="3"
        ry="3"
        width="128"
        height="15"
      />
    </template>
  </TrackWrapper>
</template>

<script>
import Artwork from '@/components/artwork';
import TrackWrapper from './RendererTrackWrapper.vue';

export default {
  name: 'RendererShowcaseTrack',
  components: {
    Artwork,
    TrackWrapper,
  },
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/variables.scss';

.renderer-showcase-track {
  display: flex;
  flex-direction: column;

  width: 200px;
  height: 270px;
  padding-right: 40px;

  .details {
    display: flex;
    flex-direction: column;
    justify-content: center;

    padding-top: 16px;

    > span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      &.title {
        font-weight: 600;
        margin-bottom: 4px;
      }

      &.artist {
        font-weight: 700;
        font-size: 12px;
      }
    }
  }
}

body:not([dark]) .artwork {
  box-shadow: 0px 12px 16px -8px $navigation-light;
}

body[dark] .marquee:after {
  box-shadow: 0px 12px 16px -8px $navigation-dark;
}
</style>
