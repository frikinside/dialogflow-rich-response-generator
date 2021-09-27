<template>
	<form @submit.prevent>
		<response-form-info v-if="response.type == 'info'" :response="response" :id="id" />
		<response-form-description v-if="response.type == 'description'" :response="response" :id="id" />
		<response-form-image v-if="response.type == 'image'" :response="response" :id="id" />
		<response-form-button v-if="response.type == 'button'" :response="response" :id="id" />
		<response-form-list v-if="response.type == 'list'" :response="response" :id="id" />
		<response-form-accordion v-if="response.type == 'accordion'" :response="response" :id="id" />
		<response-form-chips v-if="response.type == 'chips'" :response="response" :id="id" />
		<response-form-divider v-if="response.type == 'divider'" :response="response" :id="id" />
	</form>
</template>

<script>
import ResponseFormInfo from './response-form-info.vue';
import ResponseFormDescription from './response-form-description.vue';
import ResponseFormImage from './response-form-image.vue';
import ResponseFormButton from './response-form-button.vue';
import ResponseFormList from './response-form-list.vue';
import ResponseFormAccordion from './response-form-accordion.vue';
import ResponseFormChips from './response-form-chips.vue';
import ResponseFormDivider from './response-form-divider.vue';

export default {
	name: 'response-form',
	components: {
		ResponseFormInfo,
		ResponseFormDescription,
		ResponseFormImage,
		ResponseFormButton,
		ResponseFormList,
		ResponseFormAccordion,
		ResponseFormChips,
		ResponseFormDivider,
	},
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
};
</script>
