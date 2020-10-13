<template>
  <div class="quiz">
    <div class="page-title">
      <h3>
        {{ "Quiz/Title" | localize }}
      </h3>
    </div>
    <div class="animation-body">
      <transition name="fade">
        <div v-if="!isStarted" class="quiz-card card">
          <div class="card-content">
            <h5 class="title">{{ "Quiz/Message" | localize }}</h5>
            <button
              type="button"
              class="btn green waves-effect waves-light"
              @click="isStarted = !isStarted"
            >
              {{ "Quiz/Button" | localize }}
            </button>
          </div>
        </div>
      </transition>
      <transition name="appear">
        <QuizContent v-if="isStarted" />
      </transition>
    </div>
  </div>
</template>

<script>
import QuizContent from "@/components/QuizContent"
export default {
  data: () => ({
    isStarted: false,
  }),
  components: {
    QuizContent,
  },
}
</script>

<style lang="scss" scoped>
@import "@/styles/mixins";
.card-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10rem 5rem;
  height: 40.5rem;
  .title {
    margin-bottom: 3rem;
  }
}

@include for-phone-only {
  .card-content {
    padding: 5rem 2.5rem;
    height: 40.5rem;
  }
}

.animation-body {
  position: relative;
  margin-top: 1rem;
  min-height: 41rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 1s;
  position: relative;
  top: 0;
  left: 0;
  right: -100%;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  position: relative;
  top: 0;
  left: -100%;
  right: 0;
}

.appear-enter-active,
.appear-leave-active {
  transition: all 1s;
  top: 0;
  left: 0;
  right: 0;
  position: absolute;
  opacity: 1;
}
.appear-enter,
.appear-leave-to {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 100%;
  right: -100%;
}
</style>
