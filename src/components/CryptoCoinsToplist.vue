<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs12>
        <v-data-table
                :headers="headers"
                :items="coins"
                :hide-actions=true
                class="elevation-1"
        >
          <template v-slot:items="props">
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.displayPrice }}</td>
            <td class="text-xs-right">{{ props.item.mktcap }}</td>
          </template>
        </v-data-table>
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10"></div>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  import axios from 'axios';
  import infiniteScroll from 'vue-infinite-scroll';

  const API_KEY = 'c6cb118a86c3383c2d5f58c210951295a510b60efd6058ad58817a99d98ab3d3';
  const API_URL = 'https://min-api.cryptocompare.com/data/top/mktcapfull';

  export default {
    directives: {infiniteScroll},
    data () {
      return {
        timer: '',
        page: 0,
        headers: [
          {
            text: 'Name',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          {
            text: 'Price',
            align: 'right',
            sortable: false,
            value: 'price'
          },
          {
            text: 'Market Cap',
            align: 'right',
            sortable: false,
            value: 'mktcap'
          },
        ],
        coins: [],
        busy: true,
      }
    },
    created: function() {
      this.fetchCoinsList(true);
      this.timer = setInterval(() => {
        this.coins = [];
        this.page = 0;
        this.fetchCoinsList(true);
      }, 120000);
    },
    methods: {
      fetchCoinsList: function(sort) {
        this.busy = true;
        axios.get(API_URL, {
          params: {
            limit: '100',
            tsym: 'USD',
            api_key: API_KEY,
            page: this.page,
          },
        }).then((response) => {
          let coinsList = response.data.Data.map((coin) => {
            return {
              name: coin.CoinInfo.FullName,
              price: coin.RAW !== undefined ? coin.RAW.USD.PRICE : 0,
              displayPrice: coin.DISPLAY !== undefined ? coin.DISPLAY.USD.PRICE : 0,
              mktcap: coin.DISPLAY !== undefined ? coin.DISPLAY.USD.MKTCAP : 0,
            }
          });
          if (sort) coinsList.sort((a, b) => b.price - a.price);
          this.coins = this.coins.concat(coinsList);
          this.page += 1;
          this.busy = false;
        });
      },
      loadMore: function() {
        this.busy = true;
        setTimeout(() => {
          this.fetchCoinsList(false);
        }, 1000);
      }
    },
    computed: {
      //First planned to use computed sort of coins list, but it crushes if coin has no RAW or DISPLAY
      // sortedCoinsList: function() {
      //   let coins = this.coins;
      //   return coins.sort((a,b) => {return a.price > b.price ? 1 : -1});
      // },
    },
    beforeDestroy() {
      clearInterval(this.timer)
    }
  }
</script>

<style>

</style>
