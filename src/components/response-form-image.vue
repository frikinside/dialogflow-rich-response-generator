<template>
	<fieldset>
		<label :for="`image_rawUrl_${id}`">{{ $t('rawUrl') }}</label>
		<input :id="`image_rawUrl_${id}`" type="text" :class="{ error: !$utils.validUrl(response.rawUrl) }" :placeholder="$t('rawUrl_placeholder')" v-model="response.rawUrl" />

		<label :for="`image_accessibilityText_${id}`">{{ $t('accessibilityText') }}</label>
		<input :id="`image_accessibilityText_${id}`" type="text" :placeholder="$t('accessibilityText')" v-model="response.accessibilityText" />
	</fieldset>
</template>

<i18n>
{ 
	"en": {
		"rawUrl": "Public URL for image",
		"rawUrl_placeholder": "https://example.com/path/to/image.png",
		"accessibilityText": "Alt text for image"
	},
	"es": {
		"rawUrl": "Url pública de la imagen",
		"rawUrl_placeholder": "https://ejemplo.com/ruta/a/la/imagen.png",
		"accessibilityText": "Texto alternativo para la imagen"
	}
}
</i18n>

<script>
export default {
	name: 'response-form-image',
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
