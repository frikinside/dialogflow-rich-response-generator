<template>
	<fieldset>
		<label :for="`button_icon_${id}`" v-html="content.icon.type_label"></label>
		<input :id="`button_icon_${id}`" type="text" :placeholder="content.icon.type_placeholder" v-model="response.icon.type" />

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
import 'vue-color-kit/dist/vue-color-kit.css';

import ResponseFormEvent from './response-form-event.vue';

export default {
	components: {
		ColorPicker,
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
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hu-color-picker {
	box-sizing: content-box;
	position: absolute;
	border: 0.1rem solid #d1d1d1;
	margin-top: -10px;
}
</style>
