<template>
	<fieldset>
		<div class="text-center" v-html="$t('info')"></div>
	</fieldset>
</template>

<i18n>
{ 
	"en": {
		"info": "Add a <strong>divisory line</strong> between response types. Tipically used with the <code>list</code> type."
	},
	"es": {
		"info": "Añade una <strong>línea divisoria</strong> entre los tipos de respuesta. Se utiliza habitualmente en conjunción con las respuestas de tipo <code>lista</code>."
	}
}
</i18n>

<script>
export default {
	name: 'response-form-divider',
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