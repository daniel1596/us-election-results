<template>
  <div>
    <div class="mb-3">
      <label class="me-2">State:</label>
      <select v-model="selected.stateName">
        <option v-for="stateName of Object.keys(statewideVoteShares)" :key="stateName">
          {{ stateName }}
        </option>
      </select>
    </div>
    <div class="mb-4">
      <div class="row">
        <div v-for="header in ['Year', 'Avg Offset D', 'Avg Offset R', 'Avg Offset 3rd', '%D', '%R', '%3rd']" 
          :key="header" class="col">
          <strong>{{ header }}</strong>
        </div>
      </div>
      <!-- For now, a very basic table will suffice. I will likely try to make this fancier later, though. -->
      <div class="row" v-for="election of statewideVoteShares[selected.stateName]" :key="election.Year">
        <div class="col">{{ election.Year }}</div>
        <div class="col">{{ +election.OffsetFromNationalAvgD.toFixed(2) }}</div>
        <div class="col">{{ +election.OffsetFromNationalAvgR.toFixed(2) }}</div>
        <div class="col">{{ +election.OffsetFromNationalAvg3rd.toFixed(2) }}</div>
        <div class="col">{{ +election.PctD.toFixed(2) }}</div>
        <div class="col">{{ +election.PctR.toFixed(2) }}</div>
        <div class="col">{{ +election.PctThirdParty.toFixed(2) }}</div>
      </div>
    </div>
    <div>
      <h4>Daniel's Analysis</h4>
      <p>
        {{ analysis[selected.stateName] ? analysis[selected.stateName] : "(No analysis yet)" }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ElectionOptions',
  data: function () {
    return {
      analysis: {},
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
    loadDataFromApi: function () {
      Promise.all(['/analysis', '/votes'].map(endpoint =>
        fetch(`http://localhost:3000/api/v0${endpoint}`).then(response => response.json())
      ))
        .then(data => {
          this.analysis = data[0]["statewideAnalysis"]
          
          const voteShareData = data[1]
          this.setVoteShares(voteShareData)

          this.selectRandomState()
        })
    },
    selectRandomState: function () {
      // It might seem silly to calculate the number of states dynamically, but this could change - 
      // e.g. if one day we can calculate Maine's 2nd separately from statewide
      const stateNames = Object.keys(this.statewideVoteShares)
      const randomIndex = Math.round(Math.random() * stateNames.length)
      
      this.selected.stateName = stateNames[randomIndex]
    }
  },
  mounted: function () {
    this.loadDataFromApi()
  }
}
</script>
