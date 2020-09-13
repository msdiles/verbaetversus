<template>
  <div class="main-layout">
    <Navbar />
    <main class="app-content">
      <div class="app-page"><router-view /></div>
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
export default {
  components: {
    Navbar,
    Footer,
  },
}
</script>

<style lang="scss" scoped>
@import "@/styles/mixins";

.main-layout {
  min-height: 100vh;
  position: relative;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

main {
  flex: 1 0 auto;
}

.app-content {
  position: relative;
  padding: 64px 10% 3rem 10%;
  height: 100%;
  @include for-phone-only {
    padding: 54px 0 3rem 0;
  }

  @include for-tablet-portrait-up {
    padding: 64px 0 3rem 0;
  }
  @include for-desktop-up {
    padding: 64px 10% 3rem 10%;
  }
  @include for-big-desktop-up {
    padding: 64px 20% 0 20%;
  }
}

.app-page {
  @include for-phone-only {
    padding: 0 2rem 0;
  }

  @include for-tablet-portrait-up {
    padding: 0 2rem 0;
  }
  @include for-desktop-up {
    padding: 0 2rem 0;
  }

  @include for-big-desktop-up {
    padding: 0 10% 3rem;
  }
}
</style>
