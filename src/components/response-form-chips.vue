<template>
	<fieldset>
		<label for="chips_options">{{ content.options }}</label>
		<fieldset v-for="(option, index) in response.options" :key="index">
			<span class="chips-option-delete-icon icon-button delete float-right" @click="removeOption(index)" :title="content.delete"><i class="fa fa-window-close" aria-hidden="true"></i></span>

			<label :for="'chips_text_' + index">{{ content.text }}</label>
			<input :id="'chips_text_' + index" type="text" :placeholder="content.text" v-model="option.text" />

			<label :for="'chips_image_' + index">{{ content.image_url }}</label>
			<input :id="'chips_image_' + index" type="text" :class="{ error: !$utils.validUrl(option.image.src.rawUrl) }" :placeholder="content.image_placeholder" v-model="option.image.src.rawUrl" />

			<label :for="'chips_link_' + index">{{ content.link }}</label>
			<input :id="'chips_link_' + index" type="text" :class="{ error: !$utils.validUrl(option.link) }" :placeholder="content.link_placeholder" v-model="option.link" />
		</fieldset>
		<button type="button" class="button" @click="addOption()"><i class="fa fa-plus" aria-hidden="true"></i></button>
	</fieldset>
</template>

<script>
export default {
	name: 'response-form-chips',
	props: {
		response: {
			type: Object,
			required: true,
		},
	},
	created() {
		this.response.options = [];
	},
	data() {
		return {
			content: {
				options: 'Options',
				text: 'Option text',
				image_url: 'Option public URL for image',
				image_placeholder: 'https://example.com/path/to/image.png',
				link: 'URL to follow when option is clicked',
				link_placeholder: 'https://example.com',
				delete: 'delete',
			},
		};
	},
	methods: {
		addOption() {
			this.response.options.push({ image: { src: {} } });
		},
		removeOption(index) {
			this.response.options.splice(index, 1);
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
