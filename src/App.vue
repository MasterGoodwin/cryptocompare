<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>CRYPTO</span>
        <span class="font-weight-light">COMPARE</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/MasterGoodwin/cryptocompare"
        target="_blank"
      >
        <span class="mr-2">BY MASTERGOODWIN</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <CryptoCoinsTopList/>
    </v-content>
  </v-app>
</template>

<script>
import CryptoCoinsTopList from './components/CryptoCoinsToplist'

export default {
  name: 'App',
  components: {
    CryptoCoinsTopList
  },
  data () {
    return {
      //
    }
  }
}
</script>
