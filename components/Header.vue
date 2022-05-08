<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow mb-5">
        <a class="navbar-brand" href="#">Auth İşlemleri</a>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <nuxt-link active-class="active" exact to="/" class="nav-item" tag="li">
                    <a class="nav-link" href="#">Anasayfa</a>
                </nuxt-link>
                <nuxt-link active-class="active" to="/about" class="nav-item" tag="li">
                    <a class="nav-link" href="#">Hakkımda</a>
                </nuxt-link>
            </ul>
            <ul class="navbar-nav my-2 my-lg-0" v-if="this.$store.getters.isAuthenticated">
                <li class="nav-item">
                    <a  @click.prevent="logOut" class="nav-link" href="#">Çıkış Yap</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
  methods : {
    logOut(){
      this.$store.dispatch("logOut")
      this.$router.push("/auth")
    }
  }
}
</script>