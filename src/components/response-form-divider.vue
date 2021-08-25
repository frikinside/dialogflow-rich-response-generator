<template>
	<fieldset>
		<div class="text-center" v-html="content.info"></div>
	</fieldset>
</template>

<script>
export default {
	name: 'response-form-divider',
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
				info: 'Add a <strong>divisory line</strong> between response types. Tipically used with the <code>list</code> type.',
			},
		};
	},
	methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
