<template>
	<label v-html="content.title"></label>
	<fieldset>
		<label :for="`button_event_name_${id}`">{{ content.name }}</label>
		<input :id="`button_event_name_${id}`" type="text" :placeholder="content.name" v-model="response.event.name" />

		<label :for="`button_event_language_${id}`">{{ content.language }}</label>
		<select :id="`button_event_language_${id}`" v-model="response.event.languageCode">
			<option selected :value="null">{{ content.language_placeholder }}</option>
			<option disabled> -------------------------------------------------- </option>
			<option v-for="language in languages" :key="language.code" :value="language.code">
				{{ language.name }}
			</option>
		</select>

		<label :for="`list_event_parameters_${id}`">{{ content.parameters }}</label>
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
							:placeholder="content.parameters_key"
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
							:placeholder="content.parameters_value"
							v-model="parameter.value"
						/>
						<span class="icon-button delete input-group-addon" @click="removeEventParameter(index)" :title="content.parameters_delete"><i class="fa fa-window-close" aria-hidden="true"></i></span>
					</div>
				</div>
			</div>
		</transition-group>
		<button type="button" class="button" @click="addEventParameter()"><i class="fa fa-plus" aria-hidden="true"></i></button>
	</fieldset>
</template>

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
			content: {
				title:
					'<a href="https://cloud.google.com/dialogflow/docs/events-overview" target="_blank">Dialogflow event</a> that is triggered when the button is clicked, see the <a href="https://cloud.google.com/dialogflow/es/docs/reference/rest/v2/QueryInput#eventinput" target="_blank">EventInput</a> REST reference',
				name: 'Event name',
				language: 'Event language',
				language_placeholder: 'None',
				parameters: 'Event parameters',
				parameters_key: 'Key',
				parameters_value: 'Value',
				parameters_delete: 'delete',
			},
			languages: [
				{ name: 'Bengali', code: 'bn' },
				{ name: 'Bengali - Bangladesh', code: 'bn-BD' },
				{ name: 'Bengali - India', code: 'bn-IN' },
				{ name: 'Chinese - Cantonese', code: 'zh-HK' },
				{ name: 'Chinese - Simplified', code: 'zh-CN' },
				{ name: 'Chinese - Traditional', code: 'zh-TW' },
				{ name: 'Danish', code: 'da' },
				{ name: 'Dutch', code: 'nl' },
				{ name: 'English', code: 'en' },
				{ name: 'English - Australia', code: 'en-AU' },
				{ name: 'English - Canada', code: 'en-CA' },
				{ name: 'English - Great Britain', code: 'en-GB' },
				{ name: 'English - India', code: 'en-IN' },
				{ name: 'English - US', code: 'en-US' },
				{ name: 'Filipino', code: 'fil' },
				{ name: 'Filipino - The Philippines', code: 'fil-PH' },
				{ name: 'Finnish', code: 'fi' },
				{ name: 'French', code: 'fr' },
				{ name: 'French - Canada', code: 'fr-CA' },
				{ name: 'French - France', code: 'fr-FR' },
				{ name: 'German', code: 'de' },
				{ name: 'Hindi', code: 'hi' },
				{ name: 'Indonesian', code: 'id' },
				{ name: 'Italian', code: 'it' },
				{ name: 'Japanese', code: 'ja' },
				{ name: 'Korean', code: 'ko' },
				{ name: 'Malay', code: 'ms' },
				{ name: 'Malay - Malaysia', code: 'ms-MY' },
				{ name: 'Marathi', code: 'mr' },
				{ name: 'Marathi - India', code: 'mr-IN' },
				{ name: 'Norwegian', code: 'no' },
				{ name: 'Polish', code: 'pl' },
				{ name: 'Portuguese - Brazil', code: 'pt-BR' },
				{ name: 'Portuguese - Portugal', code: 'pt' },
				{ name: 'Romanian', code: 'ro' },
				{ name: 'Romanian - Romania', code: 'ro-RO' },
				{ name: 'Russian', code: 'ru' },
				{ name: 'Sinhala', code: 'si' },
				{ name: 'Sinhala - Sri Lanka', code: 'si-LK' },
				{ name: 'Spanish', code: 'es' },
				{ name: 'Spanish - Latin America', code: 'es-419' },
				{ name: 'Spanish - Spain', code: 'es-ES' },
				{ name: 'Swedish', code: 'sv' },
				{ name: 'Tamil', code: 'ta' },
				{ name: 'Tamil - India', code: 'ta-IN' },
				{ name: 'Tamil - Sri Lanka', code: 'ta-LK' },
				{ name: 'Tamil - Malaysia', code: 'ta-MY' },
				{ name: 'Tamil - Singapore', code: 'ta-SG' },
				{ name: 'Telugu', code: 'te' },
				{ name: 'Telugu - India', code: 'te-IN' },
				{ name: 'Thai', code: 'th' },
				{ name: 'Turkish', code: 'tr' },
				{ name: 'Ukrainian', code: 'uk' },
				{ name: 'Vietnamese', code: 'vi' },
				{ name: 'Vietnamese - Vietnam', code: 'vi-VN' },
			],
			event_parameters: [],
		};
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
