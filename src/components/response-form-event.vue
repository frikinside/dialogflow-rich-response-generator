<template>
	<label v-html="$t('title')"></label>
	<fieldset>
		<label :for="`button_event_name_${id}`">{{ $t('name') }}</label>
		<input :id="`button_event_name_${id}`" type="text" :placeholder="$t('name')" v-model="response.event.name" />

		<label :for="`button_event_language_${id}`">{{ $t('language') }}</label>
		<select :id="`button_event_language_${id}`" v-model="response.event.languageCode">
			<option selected :value="null">{{ $t('language_placeholder') }}</option>
			<option disabled> -------------------------------------------------- </option>
			<option v-for="language in languages" :key="language.code" :value="language.code">
				{{ language.name }}
			</option>
		</select>

		<label :for="`list_event_parameters_${id}`">{{ $t('parameters') }}</label>
		<transition-group name="flip-list">
			<div class="row" v-for="(parameter, index) in event_parameters" :key="index">
				<div class="column">
					<div class="input-group">
						<span class="input-group-addon">{{ index + 1 }}</span>
						<input
							:data-index="index"
							@keydown.delete="!parameter.key && removeEventParameter(index)"
							@keyup.enter="focusOn({ index, suffix: 'value' })"
							:id="`${id}_list_event_parameter_${index}_key`"
							type="text"
							:placeholder="$t('parameters_key')"
							v-model="parameter.key"
							:input="refreshParameters()"
							:class="{ error: parameterExists(parameter.key) }"
						/>
					</div>
				</div>
				<div class="column">
					<div class="input-group">
						<input
							:data-index="index"
							:disabled="!parameter.key || parameterExists(parameter.key)"
							@keydown.delete="!parameter.value && focusOn({ index, suffix: 'key' })"
							@keyup.enter="addEventParameter(index)"
							:id="`${id}_list_event_parameter_${index}_value`"
							type="text"
							:placeholder="$t('parameters_value')"
							v-model="parameter.value"
						/>
						<span class="icon-button delete input-group-addon" @click="removeEventParameter(index)" :title="$t('parameters_delete')"><i class="fa fa-window-close" aria-hidden="true"></i></span>
					</div>
				</div>
			</div>
		</transition-group>
		<button type="button" class="button" @click="addEventParameter()"><i class="fa fa-plus" aria-hidden="true"></i></button>
	</fieldset>
</template>

<i18n>
{ 
	"en": {
		"title": "<a href=\"https://cloud.google.com/dialogflow/docs/events-overview\" target=\"_blank\">Dialogflow event</a> that is triggered when the button is clicked, see the <a href=\"https://cloud.google.com/dialogflow/es/docs/reference/rest/v2/QueryInput#eventinput\" target=\"_blank\">EventInput</a> REST reference",
		"name": "Event name",
		"language": "Event language",
		"language_placeholder": "None",
		"parameters": "Event parameters",
		"parameters_key": "Key",
		"parameters_value": "Value",
		"parameters_delete": "delete",
		"languages": {
			"bn": "Bengali",
			"bn-BD": "Bengali - Bangladesh",
			"bn-IN": "Bengali - India",
			"zh-HK": "Chinese - Cantonese",
			"zh-CN": "Chinese - Simplified",
			"zh-TW": "Chinese - Traditional",
			"da": "Danish",
			"nl": "Dutch",
			"en": "English",
			"en-AU": "English - Australia",
			"en-CA": "English - Canada",
			"en-GB": "English - Great Britain",
			"en-IN": "English - India",
			"en-US": "English - US",
			"fil": "Filipino",
			"fil-PH": "Filipino - The Philippines",
			"fi": "Finnish",
			"fr": "French",
			"fr-CA": "French - Canada",
			"fr-FR": "French - France",
			"de": "German",
			"hi": "Hindi",
			"id": "Indonesian",
			"it": "Italian",
			"ja": "Japanese",
			"ko": "Korean",
			"ms": "Malay",
			"ms-MY": "Malay - Malaysia",
			"mr": "Marathi",
			"mr-IN": "Marathi - India",
			"no": "Norwegian",
			"pl": "Polish",
			"pt-BR": "Portuguese - Brazil",
			"pt": "Portuguese - Portugal",
			"ro": "Romanian",
			"ro-RO": "Romanian - Romania",
			"ru": "Russian",
			"si": "Sinhala",
			"si-LK": "Sinhala - Sri Lanka",
			"es": "Spanish",
			"es-419": "Spanish - Latin America",
			"es-ES": "Spanish - Spain",
			"sv": "Swedish",
			"ta": "Tamil",
			"ta-IN": "Tamil - India",
			"ta-LK": "Tamil - Sri Lanka",
			"ta-MY": "Tamil - Malaysia",
			"ta-SG": "Tamil - Singapore",
			"te": "Telugu",
			"te-IN": "Telugu - India",
			"th": "Thai",
			"tr": "Turkish",
			"uk": "Ukrainian",
			"vi": "Vietnamese",
			"vi-VN": "Vietnamese - Vietnam"
		}
	},
	"es": {
		"title": "<a href=\"https://cloud.google.com/dialogflow/docs/events-overview\" target=\"_blank\">Evento Dialogflow</a> que se lanza al pulsar el botón, consulte la referencia REST de <a href=\"https://cloud.google.com/dialogflow/es/docs/reference/rest/v2/QueryInput#eventinput\" target=\"_blank\">EventInput</a>",
		"name": "Nombre del evento",
		"language": "Lenguaje del evento",
		"language_placeholder": "Ninguno",
		"parameters": "Parámetros del evento",
		"parameters_key": "Nombre",
		"parameters_value": "Valor",
		"parameters_delete": "borrar",
		"languages": {
			"bn": "Bengalí",
			"bn-BD": "Bengalí - Bangladesh",
			"bn-IN": "Bengalí - India",
			"zh-HK": "Chino - Cantonés",
			"zh-CN": "Chino - Simplificado",
			"zh-TW": "Chino - Tradicional",
			"da": "Danés",
			"nl": "Holandés",
			"en": "Inglés",
			"en-AU": "Inglés - Australia",
			"en-CA": "Inglés - Canadá",
			"en-GB": "Inglés - Gran Bretaña",
			"en-IN": "Inglés - India",
			"en-US": "Inglés - US",
			"fil": "Filipino",
			"fil-PH": "Filipino - Las Filipinas",
			"fi": "Finlandés",
			"fr": "Francés",
			"fr-CA": "Francés - Canadá",
			"fr-FR": "Francés - Francia",
			"de": "Alemán",
			"hi": "Hindi",
			"id": "Indonesio",
			"it": "Italiano",
			"ja": "Japonés",
			"ko": "Coreano",
			"ms": "Malayo",
			"ms-MY": "Malayo - Malasia",
			"mr": "Marathi",
			"mr-IN": "Marathi - India",
			"no": "Noruego",
			"pl": "Polaco",
			"pt-BR": "Portugués - Brazil",
			"pt": "Portugués - Portugal",
			"ro": "Rumano",
			"ro-RO": "Rumano - Rumanía",
			"ru": "Ruso",
			"si": "Cingalés",
			"si-LK": "Cingalés - Sri Lanka",
			"es": "Español",
			"es-419": "Español - America latina",
			"es-ES": "Español - España",
			"sv": "Sueco",
			"ta": "Tamil",
			"ta-IN": "Tamil - India",
			"ta-LK": "Tamil - Sri Lanka",
			"ta-MY": "Tamil - Malasia",
			"ta-SG": "Tamil - Singapur",
			"te": "Telugu",
			"te-IN": "Telugu - India",
			"th": "Tailandés",
			"tr": "Turco",
			"uk": "Ucraniano",
			"vi": "Vietnamita",
			"vi-VN": "Vietnamita - Vietnam"
		}
	}
}
</i18n>

<script>
export default {
	name: 'response-form-event',
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
		this.response.event = this.response.event ?? { languageCode: null, parameters: {} };
		this.event_parameters = Object.keys(this.response.event.parameters).map((x) => {
			return { key: x, value: this.response.event.parameters[x] };
		});
	},
	data() {
		return {
			event_parameters: [],
		};
	},
	computed: {
		languages(){
			return [{name:this.$t('languages.bn'),code:'bn'},{name:this.$t('languages.bn-BD'),code:'bn-BD'},{name:this.$t('languages.bn-IN'),code:'bn-IN'},{name:this.$t('languages.zh-HK'),code:'zh-HK'},{name:this.$t('languages.zh-CN'),code:'zh-CN'},{name:this.$t('languages.zh-TW'),code:'zh-TW'},{name:this.$t('languages.da'),code:'da'},{name:this.$t('languages.nl'),code:'nl'},{name:this.$t('languages.en'),code:'en'},{name:this.$t('languages.en-AU'),code:'en-AU'},{name:this.$t('languages.en-CA'),code:'en-CA'},{name:this.$t('languages.en-GB'),code:'en-GB'},{name:this.$t('languages.en-IN'),code:'en-IN'},{name:this.$t('languages.en-US'),code:'en-US'},{name:this.$t('languages.fil'),code:'fil'},{name:this.$t('languages.fil-PH'),code:'fil-PH'},{name:this.$t('languages.fi'),code:'fi'},{name:this.$t('languages.fr'),code:'fr'},{name:this.$t('languages.fr-CA'),code:'fr-CA'},{name:this.$t('languages.fr-FR'),code:'fr-FR'},{name:this.$t('languages.de'),code:'de'},{name:this.$t('languages.hi'),code:'hi'},{name:this.$t('languages.id'),code:'id'},{name:this.$t('languages.it'),code:'it'},{name:this.$t('languages.ja'),code:'ja'},{name:this.$t('languages.ko'),code:'ko'},{name:this.$t('languages.ms'),code:'ms'},{name:this.$t('languages.ms-MY'),code:'ms-MY'},{name:this.$t('languages.mr'),code:'mr'},{name:this.$t('languages.mr-IN'),code:'mr-IN'},{name:this.$t('languages.no'),code:'no'},{name:this.$t('languages.pl'),code:'pl'},{name:this.$t('languages.pt-BR'),code:'pt-BR'},{name:this.$t('languages.pt'),code:'pt'},{name:this.$t('languages.ro'),code:'ro'},{name:this.$t('languages.ro-RO'),code:'ro-RO'},{name:this.$t('languages.ru'),code:'ru'},{name:this.$t('languages.si'),code:'si'},{name:this.$t('languages.si-LK'),code:'si-LK'},{name:this.$t('languages.es'),code:'es'},{name:this.$t('languages.es-419'),code:'es-419'},{name:this.$t('languages.es-ES'),code:'es-ES'},{name:this.$t('languages.sv'),code:'sv'},{name:this.$t('languages.ta'),code:'ta'},{name:this.$t('languages.ta-IN'),code:'ta-IN'},{name:this.$t('languages.ta-LK'),code:'ta-LK'},{name:this.$t('languages.ta-MY'),code:'ta-MY'},{name:this.$t('languages.ta-SG'),code:'ta-SG'},{name:this.$t('languages.te'),code:'te'},{name:this.$t('languages.te-IN'),code:'te-IN'},{name:this.$t('languages.th'),code:'th'},{name:this.$t('languages.tr'),code:'tr'},{name:this.$t('languages.uk'),code:'uk'},{name:this.$t('languages.vi'),code:'vi'},{name:this.$t('languages.vi-VN'),code:'vi-VN'}].sort((a, b) => a.name.localeCompare(b.name));
		}
	},
	methods: {
		focusOn(params) {
			var id = this.id;
			setTimeout(function() {
				document.getElementById(`${id}_list_event_parameter_${params.index}_${params.suffix}`).focus();
			});
		},
		parameterExists(key) {
			return (
				this.event_parameters.filter((x) => {
					return x.key == key;
				}).length > 1
			);
		},
		refreshParameters() {
			const parameters = {};
			this.event_parameters.forEach((parameter) => {
				if (parameter.key) {
					parameters[parameter.key] = parameter.value;
				}
			});
			this.response.event.parameters = parameters;
		},
		addEventParameter(index) {
			var id = this.id;
			var position = index ?? this.event_parameters.length - 1;
			if (index === undefined) {
				this.event_parameters.push({ key: '', value: '' });
			} else if (this.event_parameters[position]) {
				this.event_parameters.splice(position + 1, 0, { key: '', value: '' });
			}
			setTimeout(function() {
				document.getElementById(`${id}_list_event_parameter_${position + 1}_key`).focus();
			});
		},
		removeEventParameter(index) {
			var parameters = this.event_parameters;
			var id = this.id;
			setTimeout(function() {
				parameters.splice(index, 1);
				setTimeout(function() {
					if (parameters.length) {
						document.getElementById(`${id}_list_event_parameter_${(index == 0 ? index + 1 : index) - 1}_value`).focus();
					}
				});
			});
		},
	},
};
</script>
