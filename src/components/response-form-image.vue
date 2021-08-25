<template>
	<fieldset>
		<label for="image_rawUrl">{{ content.rawUrl }}</label>
		<input id="image_rawUrl" type="text" :class="{ error: !$utils.validUrl(response.rawUrl) }" :placeholder="content.rawUrl_placeholder" v-model="response.rawUrl" />

		<label for="image_accessibilityText">{{ content.accessibilityText }}</label>
		<input id="image_accessibilityText" type="text" :placeholder="content.accessibilityText" v-model="response.accessibilityText" />
	</fieldset>
</template>

<script>
export default {
	name: 'response-form-image',
	props: {
		response: {
			type: Object,
			required: true,
		},
	},
	created() {},
	data() {
		return {
			content: {
				rawUrl: 'Public URL for image',
				rawUrl_placeholder: 'https://example.com/path/to/image.png',
				accessibilityText: 'Alt text for image',
			},
		};
	},
	methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
