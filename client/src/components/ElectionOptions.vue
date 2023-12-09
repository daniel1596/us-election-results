<script setup>
    import { computed, onMounted, ref } from 'vue';
    
    const analysis = ref({})
    const selected = ref({ stateName: 'Alabama' })
    const voteShares = ref({
        nationwide: {},
        statewide: {}
    })

    const currentStateAnalysis = computed(() => analysis.value[selected.value.stateName])
    const currentStateVoteShares = computed(() => {
        console.log(voteShares.value.statewide[selected.value.stateName])
        return voteShares.value.statewide[selected.value.stateName]
    })

    onMounted(() => {
        loadDataFromApi()
    })

    function loadDataFromApi() {
        Promise.all(['/analysis', '/votes']
            .map(endpoint => 
                fetch(`http://localhost:3000/api/v0${endpoint}`)
                    .then(response => response.json()) 
                ))
            .then(data => {
                analysis.value = data[0]["statewideAnalysis"]
                const voteShareData = data[1]
                voteShares.value.nationwide = voteShareData.nationwide_vote_shares
                voteShares.value.statewide = voteShareData.statewide_vote_shares

                selectRandomState()
            })
    }

    function selectRandomState() {
        // It might seem silly to calculate the number of states dynamically, but this could change - 
        // e.g. if one day we can calculate Maine's 2nd separately from statewide
        const stateNames = Object.keys(voteShares.value.statewide)
        if (!stateNames.length)
            return

        const randomIndex = Math.round(Math.random() * stateNames.length)
        
        selected.value.stateName = stateNames[randomIndex]
    }
</script>

<template>
    <div>
        <div class="mb-3">
            <label class="me-2">State:</label>
            <select v-model="selected.stateName">
                <option v-for="stateName of Object.keys(voteShares.statewide)" :key="stateName">
                    {{ stateName }}
                </option>
            </select>
        </div>
        <div class="mb-4">
            <!-- For now, a very basic table will suffice. I will likely try to make this fancier later, though. -->
            <table>
                <tr>
                    <th>Year</th>
                    <th>Avg Offset D</th>
                    <th>Avg Offset R</th>
                    <th>Avg Offset 3rd</th>
                    <th>%D</th>
                    <th>%R</th>
                    <th>%3rd</th>
                </tr>
                <tr v-for="election of currentStateVoteShares" :key="election.Year">
                    <td>{{ election.Year }}</td>
                    <td>{{ +election.OffsetFromNationalAvgD.toFixed(2) }}</td>
                    <td>{{ +election.OffsetFromNationalAvgR.toFixed(2) }}</td>
                    <td>{{ +election.OffsetFromNationalAvg3rd.toFixed(2) }}</td>
                    <td>{{ +election.PctD.toFixed(2) }}</td>
                    <td>{{ +election.PctR.toFixed(2) }}</td>
                    <td>{{ +election.PctThirdParty.toFixed(2) }}</td>
                </tr>
            </table>
        </div>
        <div>
            <h4>Daniel's Analysis</h4>
            <p>{{ currentStateAnalysis  || "(No analysis yet)" }}</p>
        </div>
    </div>
</template>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
</style>