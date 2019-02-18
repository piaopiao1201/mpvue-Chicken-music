import { mapGetters, mapMutations, mapActions } from 'vuex'
import { playMode } from 'common/js/config'
// import { shuffle } from 'common/js/util'

export const playerMixin={
	computed: {
		...mapGetters([
			'sequenceList',
			'currentSong',
			'playList',
			'playMode',
			'favoriteList',
			'currentIndex'
		]),
		iconMode(){
			switch(this.playMode){
				case playMode.sequence:
					return 'icon-sequence';
					break;
				case playMode.loop:
					return 'icon-loop';
					break;
				case playMode.random:
					return 'icon-random';
					break;
			}
		},
	},
	methods:{
		changeMode(){
			var mode=(this.playMode+1)%3;
			// console.log(mode)
			this.setPlayMode(mode);
		},
	}
}