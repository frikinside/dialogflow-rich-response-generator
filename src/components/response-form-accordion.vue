<template>
	<fieldset>
		<label :for="`accordion_title_${id}`">{{ content.title }}</label>
		<input :id="`accordion_title_${id}`" type="text" :placeholder="content.title" v-model="response.title" />

		<label :for="`accordion_subtitle_${id}`">{{ content.subtitle }}</label>
		<input :id="`accordion_subtitle_${id}`" type="text" :placeholder="content.subtitle" v-model="response.subtitle" />

		<label :for="`accordion_image_${id}`">{{ content.image_url }}</label>
		<input :id="`accordion_image_${id}`" type="text" :class="{ error: !$utils.validUrl(response.image.src.rawUrl) }" :placeholder="content.image_placeholder" v-model="response.image.src.rawUrl" />

		<label :for="`accordion_text_${id}`">{{ content.title }}</label>
		<textarea :id="`accordion_text_${id}`" :placeholder="content.text" v-model="response.text" v-autosize></textarea>
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
		id: {
			type: String,
			required: true,
		},
	},
	created() {
		this.response.image = this.response.image ?? {
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
