<template>
  <div
    :class="classes"
    @click="onClick"
  >
    <BaseIcon
      width="16"
      height="16"
    >
      <slot />
    </BaseIcon>
    <span class="label">{{ label }}</span>
  </div>
</template>

<script>
import BaseIcon from '@/components/BaseIcon.vue';

export default {
  name: 'SidebarSectionButton',
  components: {
    BaseIcon,
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      default: '/',
    },
  },
  computed: {
    active() {
      return this.$route.path === this.path;
    },
    classes() {
      return {
        'sidebar-section-button': true,
        'color-text': !this.active,
        'color-background': this.active,
        'color-background-hover': true,
        'color-accent-bg': this.active,
        'color-accent-bg-hover': true,
      };
    },
  },
  methods: {
    onClick() {
      this.$router.push(this.path);
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar-section-button {
  display: flex;
  align-items: center;

  margin-bottom: 2px;
  padding: 12px 16px;
  border-radius: 3px;
  cursor: pointer;

  .label {
    font-size: 12px;
    font-weight: 600;

    padding-left: 12px;
  }
}
</style>
