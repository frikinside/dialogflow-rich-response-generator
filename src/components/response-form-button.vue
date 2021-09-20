<template>
	<fieldset>
		<label :for="`button_icon_${id}`" v-html="content.icon.type_label"></label>
		<div class="input-group material-icons-selector-wrapper">
			<span class="input-group-addon">
				<span class="material-icons">{{ response.icon.type }}</span>
			</span>
			<!-- <input :id="`button_icon_${id}`" type="text" :placeholder="content.icon.type_placeholder" v-model="response.icon.type" @input="response.icon.type = $event.target.value.toLowerCase()" /> -->
			<typeahead :id="`button_icon_${id}`" :placeholder="content.icon.type_placeholder" :items="material_icons" @selectItem="selectMaterialIcon" @onInput="selectMaterialIcon" />
		</div>

		<label :for="`button_color_${id}`">{{ content.icon.color }}</label>
		<div v-click-away="hideColorPicker">
			<div class="input-group">
				<span class="input-group-addon" :style="{ background: response.icon.color }"></span>
				<input :id="`button_color_${id}`" type="text" :placeholder="content.icon.color" :value="response.icon.color" @click="toggleColorPicker" readonly />
			</div>
			<ColorPicker v-show="color_picker_active" theme="dark" :color="response.icon.color" @changeColor="changeColor" />
		</div>

		<label :for="`button_text_${id}`">{{ content.text }}</label>
		<input :id="`button_text_${id}`" type="text" :placeholder="content.text" v-model="response.text" />

		<label :for="`button_link_${id}`">{{ content.link }}</label>
		<input :id="`button_link_${id}`" type="text" :class="{ error: !$utils.validUrl(response.link) }" :placeholder="content.link_placeholder" v-model="response.link" />

		<response-form-event :response="response" :id="id" />
	</fieldset>
</template>

<script>
import { ColorPicker } from 'vue-color-kit';
//import 'vue-color-kit/dist/vue-color-kit.css'; //cannot make it work on production build because the library has set the sideEffects: false
import typeahead from 'vue3-simple-typeahead';
import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css';

import ResponseFormEvent from './response-form-event.vue';

export default {
	components: {
		ColorPicker,
		typeahead,
		ResponseFormEvent,
	},
	name: 'response-form-button',
	props: {
		response: {
			type: Object,
			required: true,
		},
		id: {
			type: String,
			required: true,
		},
	},
	created() {
		this.response.icon = this.response.icon ?? {};
		if (!this.$cache.material_icons?.length) {
			fetch('https://raw.githubusercontent.com/google/material-design-icons/master/font/MaterialIcons-Regular.codepoints')
				.then((response) => response.text())
				.then((data) => {
					let material_icons = data.split('\n').map((x) => {
						return x.split(' ')[0];
					});
					if (!material_icons.length) {
						material_icons = this.$cache.material_icons_offline;
					}
					this.material_icons = this.$cache.material_icons = material_icons;
				})
				.catch((error) => {
					console.error(error);
					this.material_icons = this.$cache.material_icons_offline;
				});
		}
		this.material_icons = this.$cache.material_icons;
	},
	data() {
		return {
			content: {
				icon: {
					type_label: 'Icon from the <a href="https://fonts.google.com/icons?selected=Material+Icons" target="_blank">Material icon library</a>. The default icon is an arrow',
					type_placeholder: 'Icon name from Material design library',
					color: 'Color hexcode',
				},
				text: 'Button text',
				link: 'URL to follow when button is clicked',
				link_placeholder: 'https://example.com',
			},
			color_picker_active: false,
			material_icons: [],
		};
	},
	methods: {
		toggleColorPicker() {
			this.color_picker_active = !this.color_picker_active;
		},
		hideColorPicker() {
			this.color_picker_active = false;
		},
		changeColor(color) {
			this.response.icon.color = color.hex;
		},
		selectMaterialIcon(icon) {
			this.response.icon.type = icon;
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- <style src="vue-color-kit/dist/vue-color-kit.css"></style> // Not working on production, using import directly from unpkg -->
<style scoped>
@import 'https://fonts.googleapis.com/css2?family=Material+Icons';
@import 'https://unpkg.com/vue-color-kit@1.0.5/dist/vue-color-kit.css';
</style>
<style scoped>
.hu-color-picker {
	box-sizing: content-box;
	position: absolute;
	border: 0.1rem solid #d1d1d1;
	margin-top: -10px;
}
.input-group-addon .material-icons {
	line-height: 38px;
	width: 24px;
	overflow: hidden;
}
.material-icons-selector-wrapper:deep() .simple-typeahead-list-item-text:before {
	content: attr(data-text);
	font-family: 'Material Icons';
	vertical-align: bottom;
	display: inline-block;
	width: 25px;
}
/* Dark Mode */
.dark-mode .hu-color-picker {
	border: 0.1rem solid #3e3e3e;
}
.dark-mode .simple-typeahead .simple-typeahead-list {
	border-color: #313131;
}
.dark-mode .simple-typeahead .simple-typeahead-list .simple-typeahead-list-item.simple-typeahead-list-item-active {
	background-color: #313131;
}
.dark-mode .simple-typeahead .simple-typeahead-list .simple-typeahead-list-item {
	background-color: #121212;
	border-color: #313131;
}
</style>
