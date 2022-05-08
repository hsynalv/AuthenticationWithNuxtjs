<template>
  <div class="container pt-3">

    <div class="row">
      <div class="col-md-6 offset-3 pt-3 card border border-success shadow">
        <h3 class="text-center mb-3 mt-3">localStorage Kullanımı</h3>
        <input type="text" class="form-control" v-model="storageValue">
        <div class="button-container mt-3 mb-3">
          <button @click="setValue" class="btn btn-success">Set Value</button>
          <button @click="getValue" class="btn btn-success">Get Value</button>
          <button @click="deleteValue" class="btn btn-danger">Delete Value</button>
        </div>
        <div class="border p-1 mb-3 border-secondary d-flex justify-content-center align-items-center">
          <p class="m-0"> <strong>localStorage Değeri :</strong> {{ fromStorage }}</p>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-6 offset-3 pt-3 card border border-primary shadow">
        <h3 class="text-center mb-3 mt-3">Cookie Kullanımı</h3>
        <input type="text" class="form-control" v-model="cookieValue">
        <div class="button-container mt-3 mb-3">
          <button @click="setCookie" class="btn btn-primary">Set Cookie Value</button>
          <button @click="getCookie" class="btn btn-primary">Get Cookie Value</button>
          <button @click="deleteCookie" class="btn btn-danger">Delete Cookie Value</button>
        </div>
        <div class="border p-1 mb-3 border-secondary d-flex justify-content-center align-items-center">
          <p class="m-0"> <strong>Cookie Değeri :</strong> {{ fromCookie }}</p>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import cookie from "js-cookie"
  export default {
    middleware : ["session-control","auth"],
    data() {
      return {
        storageValue : null,
        cookieValue: null,
        fromStorage: null,
        fromCookie : null,
        isAuthenticated : false
      }
    },
    methods: {
      setValue() {
        localStorage.setItem("authKey",this.storageValue);
      },
      getValue() {
        this.fromStorage = localStorage.getItem("authKey");
      },
      deleteValue(){
        localStorage.clear();
        this.fromStorage = "";
      },
      deleteCookie(){
        //cookie.remove("authKey");
        this.$store.commit("clearAuthKey")
        this.fromCookie = "";
      },
      setCookie(){
        //cookie.set("authKey",this.cookieValue);
        this.$store.commit("setAuthKey",this.cookieValue);
      },
      getCookie(){
        //this.fromCookie = cookie.get("authKey");
        this.fromCookie = this.$store.getters.getAuthKey;
        this.isAuthenticated = this.$store.getters.isAuthenticated
      }
    }
  }

</script>
