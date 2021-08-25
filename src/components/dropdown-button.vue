<template>
	<div class="dropdown-wrapper">
		<button class="button dropdown" @click="toggleMenu">{{ buttonText }}</button>
		<div class="dropdown-menu" v-show="!collapsed">
			<ul>
				<li v-for="(item, index) in items" @click="selectItem(item)" :key="index">{{ itemDisplay(item, itemDisplayProp) }}</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'dropdown-button',
	props: {
		items: {
			type: Array,
			required: true,
		},
		buttonText: {
			type: String,
			required: true,
		},
		itemDisplayProp: {
			type: String,
		},
	},
	data() {
		return {
			collapsed: true,
		};
	},
	methods: {
		itemDisplay(item, itemDisplayProp) {
			return item instanceof Object ? item[itemDisplayProp] : item;
		},
		toggleMenu() {
			this.collapsed = !this.collapsed;
		},
		selectItem(item) {
			this.collapsed = true;
			this.$emit('select-item', item);
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
