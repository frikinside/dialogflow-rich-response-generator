<template>
	<fieldset>
		<label for="accordion_title">{{ content.title }}</label>
		<input id="accordion_title" type="text" :placeholder="content.title" v-model="response.title" />

		<label for="accordion_subtitle">{{ content.subtitle }}</label>
		<input id="accordion_subtitle" type="text" :placeholder="content.subtitle" v-model="response.subtitle" />

		<label for="accordion_image">{{ content.image_url }}</label>
		<input id="accordion_image" type="text" :class="{ error: !$utils.validUrl(response.image.src.rawUrl) }" :placeholder="content.image_placeholder" v-model="response.image.src.rawUrl" />

		<label for="accordion_text">{{ content.title }}</label>
		<textarea id="accordion_text" :placeholder="content.text" v-model="response.text" v-autosize></textarea>
	</fieldset>
</template>

<script>
export default {
	name: 'response-form-accordion',
	props: {
		response: {
			type: Object,
			required: true,
		},
	},
	created() {
		this.response.image = {
			src: {},
		};
	},
	data() {
		return {
			content: {
				title: 'Accordion title',
				subtitle: 'Accordion subtitle',
				image_url: 'Public URL for image',
				image_placeholder: 'https://example.com/path/to/image.png',
				text: 'Accordion text',
			},
		};
	},
	methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
