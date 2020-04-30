<template>
  <button @click="login">Login</button>
</template>

<script>
export default {
    auth: 'guest',
    methods: {
        async login() {
            await this.$auth.loginWith('facebook');
        }
    }
}
</script>

<style>

</style>