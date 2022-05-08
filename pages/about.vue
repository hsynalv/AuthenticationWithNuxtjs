<template>
  <div class="container-fluid">
    <div class="row mt-5">
      <div class="col-md-6 offset-3">
        <h3>Nuxt.js | Auth İşlemleri</h3>
        <p>Bu bölge çok gizli bölgedir.. Ancak giriş yapanların görmesi gerekir. Ondan dolayı lütfen ilk olarak giriş yapınız..</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  middleware : ["session-control","auth"]
}
</script>
