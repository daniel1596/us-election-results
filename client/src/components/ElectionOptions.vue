<template>
  <div>
    <div class="mb-3">
      <label class="me-2">Choose your state</label>
      <select v-model="selected.stateName">
        <option v-for="stateName of Object.keys(statewideVoteShares)" :key="stateName">
          {{ stateName }}
        </option>
      </select>
    </div>
    <div>
      <p>The election data is this:</p>
      <div>
        <div class="row">
          <div v-for="header in ['Year', 'OffsetFromNationalAvgD', 'OffsetFromNationalAvgR', 'OffsetFromNationalAvg3rd']" 
            :key="header" class="col">
            {{ header }}
          </div>
        </div>
        <div class="row" v-for="election of statewideVoteShares[selected.stateName]" :key="election.Year">
          <div class="col">{{ election.Year }}</div>
          <div class="col">{{ +election.OffsetFromNationalAvgD.toFixed(2) }}</div>
          <div class="col">{{ +election.OffsetFromNationalAvgR.toFixed(2) }}</div>
          <div class="col">{{ +election.OffsetFromNationalAvg3rd.toFixed(2) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ElectionOptions',
  data: function () {
    return {
      selected: {
        stateName: "Alabama"
      }
    }
  },
  computed: {
    ...mapState(['nationwideVoteShares', 'statewideVoteShares'])
  },
  methods: {
    ...mapActions(['setVoteShares']),
    loadData: function () {
      fetch('http://localhost:3000/api/v0/votes')
        .then(response => response.json())
        .then(data => {
          this.setVoteShares(data)
        })
    }
  },
  mounted: function () {
    this.loadData()
  }
}
</script>
