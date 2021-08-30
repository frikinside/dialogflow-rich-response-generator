<template>
	<fieldset>
		<label :for="`list_title_${id}`">{{ content.title }}</label>
		<input :id="`list_title_${id}`" type="text" :placeholder="content.title" v-model="response.title" />

		<label :for="`list_subtitle_${id}`">{{ content.subtitle }}</label>
		<input :id="`list_subtitle_${id}`" type="text" :placeholder="content.subtitle" v-model="response.subtitle" />

		<response-form-event :response="response" :id="id" />
	</fieldset>
</template>

<script>
import ResponseFormEvent from './response-form-event.vue';

export default {
	name: 'response-form-list',
	components: { ResponseFormEvent },
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
	created() {},
	data() {
		return {
			content: {
				title: 'Option title',
				subtitle: 'Option subtitle',
			},
		};
	},
	methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
