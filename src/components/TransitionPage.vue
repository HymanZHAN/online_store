<template>
  <transition
    :name="transitionName"
    :mode="transitionMode"
    :enter-active-class="transitionEnterActiveClass"
    :leave-active-class="transitionLeaveActiveClass"
    @beforeLeave="beforeLeave"
    @enter="enter"
    @afterEnter="afterEnter"
  >
    <slot/>
  </transition>
</template>

<script>
const DEFAULT_TRANSITION = "fade";
const DEFAULT_TRANSITION_MODE = "out-in";

export default {
  name: "TransitionPage",
  data() {
    return {
      prevHeight: 0,
      transitionName: DEFAULT_TRANSITION,
      transitionMode: DEFAULT_TRANSITION_MODE,
      transitionEnterActiveClass: "",
      transitionLeaveActiveClass: ""
    };
  },
  created() {
    this.$router.beforeEach((to, from, next) =>
      this.setTransition(to, from, next)
    );
  },
  methods: {
    setTransition(to, from, next) {
      let toTransitionName = to.meta.transitionName;
      let fromTransitionName = from.meta.transitionName;

      if (toTransitionName === "slide" && fromTransitionName === "slide") {
        let toPosition = to.meta.position;
        let fromPosition = from.meta.position;
        if (toPosition instanceof Object) {
          toPosition = toPosition[to.params.gender];
        }
        if (fromPosition instanceof Object) {
          fromPosition = fromPosition[from.params.gender];
        }
        this.transitionName =
          toPosition < fromPosition ? "slide-right" : "slide-left";
        this.transitionEnterActiveClass = `${this.transitionName}-enter-active`;
        this.transitionLeaveActiveClass = `${this.transitionName}-leave-active`;
      }

      if (to.meta.transitionName === "zoom") {
        this.transitionEnterActiveClass = "zoom-enter-active";
        this.transitionLeaveActiveClass = "fade-leave-active";
        document.body.style.overflow = "hidden";
        this.transitionName = "zoom";
      }

      if (from.meta.transitionName === "zoom") {
        this.transitionLeaveActiveClass = "zoom-leave-active";
        this.transitionEnterActiveClass = "fade-enter-active";
        document.body.style.overflow = null;
        this.transitionName = "zoom";
      }

      next();
    },
    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height;
    },
    enter(element) {
      const { height } = getComputedStyle(element);

      element.style.height = this.prevHeight;

      setTimeout(() => {
        element.style.height = height;
      });
    },
    afterEnter(element) {
      element.style.height = "auto";
    }
  }
};
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.1s;
  transition-property: height, opacity;
  transition-timing-function: ease;
  overflow: hidden;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.2s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
}

.zoom-enter-active,
.zoom-leave-active {
  animation-duration: 0.3s;
  animation-fill-mode: both;
  animation-name: zoom;
}

.zoom-leave-active {
  animation-direction: reverse;
}

@keyframes zoom {
  from {
    opacity: 0;
    transform: scale3d(0.5, 0.5, 0.5);
  }

  100% {
    opacity: 1;
  }
}
</style>