<template>
	<fieldset>
		<label for="list_title">{{ content.title }}</label>
		<input id="list_title" type="text" :placeholder="content.title" v-model="response.title" />

		<label for="list_subtitle">{{ content.subtitle }}</label>
		<input id="list_subtitle" type="text" :placeholder="content.subtitle" v-model="response.subtitle" />

		<label v-html="content.event.title"></label>
		<fieldset>
			<label for="button_event_name">{{ content.event.name }}</label>
			<input id="button_event_name" type="text" :placeholder="content.event.name" v-model="response.event.name" />

			<label for="button_event_language">{{ content.event.language }}</label>
			<input id="button_event_language" type="text" :placeholder="content.event.language" v-model="response.event.languageCode" />

			<label for="list_event_parameters">{{ content.event.parameters }}</label>
			<div class="row" v-for="(parameter, index) in response.event.parameters" :key="index">
				<div class="column">
					<div class="input-group">
						<span class="input-group-addon">{{ index + 1 }}</span>
						<input
							:data-index="index"
							@keydown.delete="!event_parameters[index] && removeEventParameter(index)"
							:id="'list_event_parameter_' + index + '_key'"
							type="text"
							:placeholder="content.event.parameters_key"
							v-model="event_parameters[index]"
						/>
					</div>
				</div>
				<div class="column">
					<div class="input-group">
						<input
							:data-index="index"
							:disabled="!event_parameters[index]"
							@keyup.enter="addEventParameter(index)"
							:id="'list_event_parameter_' + index + '_value'"
							type="text"
							:placeholder="content.event.parameters_value"
							v-model="parameter[eventParameterKey(index)]"
						/>
						<span class="icon-button delete input-group-addon" @click="removeEventParameter(index)" :title="content.event.parameters_delete"
							><i class="fa fa-window-close" aria-hidden="true"></i
						></span>
					</div>
				</div>
			</div>
			<button type="button" class="button" @click="addEventParameter()"><i class="fa fa-plus" aria-hidden="true"></i></button>
		</fieldset>
	</fieldset>
</template>

<script>
export default {
	name: 'response-form-list',
	props: {
		response: {
			type: Object,
			required: true,
		},
		id: {
			type: Number,
			required: true,
		},
	},
	created() {
		this.response.event = {};
		this.response.event.parameters = [];
	},
	data() {
		return {
			content: {
				title: 'Option title',
				subtitle: 'Option subtitle',
				event: {
					title:
						'<a href="https://cloud.google.com/dialogflow/docs/events-overview" target="_blank">Dialogflow event</a> that is triggered when the button is clicked, see the <a href="https://cloud.google.com/dialogflow/es/docs/reference/rest/v2/QueryInput#eventinput" target="_blank">EventInput</a> REST reference',
					name: 'Event name',
					language: 'Event language code',
					parameters: 'Event parameters',
					parameters_key: 'Key',
					parameters_value: 'Value',
					parameters_delete: 'delete',
				},
			},
			event_parameters: [],
		};
	},
	methods: {
		addEventParameter(index) {
			if (index === undefined) {
				this.response.event.parameters.push({});
				this.event_parameters.push('');
			} else if (this.response.event.parameters[index][this.eventParameterKey(index)]) {
				this.response.event.parameters.splice(index + 1, 0, {});
				this.event_parameters.splice(index + 1, 0, '');
				setTimeout(function() {
					document.querySelector("input[data-index='" + (index + 1) + "']").focus();
				});
			}
		},
		removeEventParameter(index) {
			var array = this.response.event.parameters;
			setTimeout(function() {
				array.splice(index, 1);
				setTimeout(function() {
					if (array.length) {
						document.querySelector("input[data-index='" + ((index == 0 ? index + 1 : index) - 1) + "']").focus();
					}
				});
			});
		},
		eventParameterKey(index) {
			return this.event_parameters[index];
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
