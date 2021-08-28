<template>
	<div class="dropdown-wrapper" v-click-away="hideMenu">
		<button class="button dropdown" @click="toggleMenu">{{ buttonText }}</button>
		<div class="dropdown-menu" v-show="!collapsed">
			<ul>
				<li v-for="(item, index) in items" @click="selectItem(item)" :key="index"><i v-show="itemIconProp" :class="itemIcon(item)" aria-hidden="true"></i> {{ itemDisplay(item) }}</li>
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
		itemIconProp: {
			type: String,
		},
	},
	data() {
		return {
			collapsed: true,
		};
	},
	methods: {
		itemDisplay(item) {
			return item instanceof Object && this.itemDisplayProp ? item[this.itemDisplayProp] : item;
		},
		itemIcon(item) {
			return `fa fa-${item instanceof Object && this.itemIconProp ? item[this.itemIconProp] : item}`;
		},
		toggleMenu() {
			this.collapsed = !this.collapsed;
		},
		hideMenu() {
			this.collapsed = true;
		},
		selectItem(item) {
			this.collapsed = true;
			this.$emit('select-item', item);
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dropdown-menu li > i {
	width: 20px;
	text-align: center;
}
</style>
