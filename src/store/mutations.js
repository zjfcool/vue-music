import * as types from './mutationTypes'

const mutations = {
    [types.SINGER_LIST](state,val){
        state.singer=val;
    }
}

export default mutations