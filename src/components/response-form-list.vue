<template>
	<fieldset>
		<label :for="`list_title_${id}`">{{ $t('title') }}</label>
		<input :id="`list_title_${id}`" type="text" :placeholder="$t('title')" v-model="response.title" />

		<label :for="`list_subtitle_${id}`">{{ $t('subtitle') }}</label>
		<input :id="`list_subtitle_${id}`" type="text" :placeholder="$t('subtitle')" v-model="response.subtitle" />

		<response-form-event :response="response" :id="id" />
	</fieldset>
</template>

<i18n>
{ 
	"en": {
		"title": "Option title",
		"subtitle": "Option subtitle"
	},
	"es": {
		"title": "Título de la opción",
		"subtitle": "Subtítulo de la opción"
	}
}
</i18n>

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
};
</script>
