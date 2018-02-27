<template>
	<div class="m-search-drop">
		<IconFolderPlus class="m-search-drop__icon"></IconFolderPlus>
		<span class="m-search-drop__text">Drop your movie folders, Your movie itself, Or click to choose...</span>
		<input class="m-search-drop__input" type="file" ref="openFileDialog" title=" "
			webkitdirectory mozdirectory msdirectory odirectory directory
			@change="fileChange"
			@dragenter.prevent="dragEnter"
			@dragleave.prevent="dragLeave"
			@drop.stop="drop"
		>
	</div>
</template>

<script>
import IconFolderPlus from './icons/FolderPlus.vue';

export default {
	name: 'SearchDrop',
	data() {
		return {
			isDragging: false
		};
	},
	components: {
		IconFolderPlus
	},
	methods: {
		dragEnter() {
			this.isDragging = true;
		},
		dragLeave() {
			this.isDragging = false;
		},
		drop(event) {
			this.isDragging = false;
			this.isDropped = true;
		},
		fileChange(event) {
			if (event.target.files) {
				const folderNames = this.$_.flatMap(event.target.files, (folder) => {
					return folder.name.substr(0, folder.name.lastIndexOf('.'));
				});
				this.$emit('gotMovies', folderNames);
			}
		}
	}
};
</script>
