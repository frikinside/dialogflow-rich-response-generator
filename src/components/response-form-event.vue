<template>
	<label v-html="content.title"></label>
	<fieldset>
		<label :for="`button_event_name_${id}`">{{ content.name }}</label>
		<input :id="`button_event_name_${id}`" type="text" :placeholder="content.name" v-model="response.event.name" />

		<label :for="`button_event_language_${id}`">{{ content.language }}</label>
		<input :id="`button_event_language_${id}`" type="text" :placeholder="content.language" v-model="response.event.languageCode" />

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
		this.response.event = this.response.event ?? { parameters: {} };
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
				language: 'Event language code',
				parameters: 'Event parameters',
				parameters_key: 'Key',
				parameters_value: 'Value',
				parameters_delete: 'delete',
			},
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
