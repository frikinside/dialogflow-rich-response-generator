<template>
  <df-messenger
    intent="WELCOME"
    :chat-title="current_content.dialogflow_messenger.chat_title"
    wait-open="true"
    agent-id="f2edf0e3-bb82-4227-906e-672c07f8a5a5"
    :language-code="current_language"
  ></df-messenger>
  <header>
    <section class="container">
        <section class="title">
            <h1 class="icon-title">{{ current_content.brand_name }}</h1>
            <p>
                Este sería el texto introductorio a esta mierda, con un par de frases sería suficiente lo más probable.
                No obstante, ahora vamos a utilizar esta sección a modo de placeholder para acelerar en el resto e ir añadiendo 
                los puntos a tratar y a tener en cuenta, con la lista de cosas por hacer.
            </p>
            <ul>
                <li>
                    <span class="strike">Diseño base, planteamiento y paneles:</span>
                    <ul>
                        <li class="strike">Cabecera</li>
                        <li class="strike">Main con paneles dinámicos</li>
                        <li class="strike">Resultado con el JSON final y con opción a copiar</li>
                        <li class="strike">Footer</li>
                    </ul>
                </li>
                <li class="strike">
                    Crear los formularios uno a uno
                    <ul>
                        <li class="strike">info</li>
                        <li class="strike">description</li>
                        <li class="strike">image</li>
                        <li class="strike">button</li>
                        <li class="strike">list</li>
                        <li class="strike">accordion</li>
                        <li class="strike">chips</li>
                        <li class="strike">separator</li>
                    </ul>
                </li>
                <li class="strike">Colapsar paneles</li>
                <li class="strike">Añadir opción de copiar el JSON</li>
                <li class="strike">Añadir botón para eliminar un panel</li>
                <li class="strike">Añadir validación de url en los campos de url</li>
                <li>Añadir iconos a las opciones</li>
                <li>Crear preview en dialog flow, seguramente haciendo uso de la API</li>
                <li>Plantear la opción de vista previa "fuera de dialogflow"</li>
                <li>Quizás plantear crear respuestas para que sean compuestas o no? Utilizando el array de arrays que es rich content</li>
                <li class="strike">Cambiar todos los textos por un json de contenido y literales</li>
                <li>Internacionalización, planteamos ES y EN únicamente</li>
                <li>Añadir opción de tema oscuro (Con el aspecto de opera ligeramente modificado)</li>
                <li>Animate css</li>
                <li>Duplicado de paneles</li>
                <li>Selector de colores</li>
                <li>En los ueventos usar un selector para el languageCode?</li>
                <li>Revisar comportamiento de la lista de parámetros. Tiene algunos bugs al cambiar la key.</li>
                <li>Usar $event para los add line text o add parameter</li>
                <li>Añadir una función para que el JSON se esté mostrando con una limpieza de elementos vacíos.</li>
                <li>Añadir índice a los ids de cada panel para que sea único y funcionen los eventos y labels for [NOTA Si dividimos cada sección en componente puede que sea innecesario?]</li>
                <li>Revisar los parámetros opcionales que son objetos o listas para que se inicialicen y activen por eventos de un check (como event en button)</li>
                <li>Seleccionar los iconos de la librería de material con asistente</li>
                <li>Evitar el submit al hacer intro en cualquier input</li>
                <li class="strike">Añadir enlaces de ayuda a DialogFlow para los tipos de respuesta</li>
                <li>Estudiar posibilidad de tener una “superentidad” con metainformación de los paneles? En lugar de que estén “duplicados” en dos listas sincronizadas</li>
            </ul>
        </section>
    </section>
  </header>

  <main>
    <section class="container">

        <section>
            <p class="text-center" v-if="payload.richContent[0].length == 0" v-html="current_content.responses_empty_message"></p>
            <div class="panel" v-for="(response, index) in payload.richContent[0]" :key="index">
                <div class="panel-title">
                    <div class="float-left"><span class="icon-button" @click="collapsed_panels[index] = !collapsed_panels[index]" :title="collapsed_panels[index] ? current_content.expand : current_content.collapse"><i class="fa" :class="{ 'fa-plus': collapsed_panels[index], 'fa-minus': !collapsed_panels[index] }" aria-hidden="true"></i></span></div>
                    {{ findType(response.type).text }} <a class="icon-button" :href="findType(response.type).link" target="_blank" :title="content.help_link_alt_text"><i class="fa fa-question-circle" aria-hidden="true"></i></a>
                    <div class="float-right"><span class="icon-button" @click="deleteItem(index)" :title="current_content.delete"><i class="fa fa-window-close" aria-hidden="true"></i></span></div>
                </div>
                <div v-show="!collapsed_panels[index]" class="panel-body">
                    <response-form :response="response"></response-form>
                </div>
            </div>

            <div class="clearfix">
                <div class="float-right">
                    <dropdown-button :items="current_content.types" :button-text="current_content.add_button" :item-display-prop="'text'" @select-item="selectItem"></dropdown-button>
                </div>
            </div>
        </section>

        <section>
            <pre id="response_json"><span id="copy_button" class="float-right"><code class="highlight" v-show="json_payload_copied">{{current_content.json_payload_copied}}</code> <span class="icon-button" @click="copyJSON()" :title="current_content.copy"><i class="fa fa-clipboard" aria-hidden="true"></i></span></span><code>{{ payloadJSON }}</code></pre>
        </section>
    </section>
  </main>

  <footer>
    <section class="container">
        <p>{{ current_content.brand_name }} | © 2021</p>
        <p class="social-links">
            <a href="https://github.com/frikinside" target="_blank" alt="GitHub"><i class="fa fa-github" aria-hidden="true"></i></a>
            <a href="https://twitter.com/friki_inside" target="_blank" alt="twitter"><i class="fa fa-twitter" aria-hidden="true"></i></a>
            <a :href="contact_email_href" :alt="current_content.contact_email_alt"><i class="fa fa-envelope" aria-hidden="true"></i></a>
        </p>
    </section>
  </footer>
</template>

<script>
import ResponseForm from './components/response-form.vue'
import DropdownButton from './components/dropdown-button.vue'

export default {
  name: 'App',
  components: {
    ResponseForm,
    DropdownButton
  },
  data() {
        return {
            current_language: 'en',
            languages: [{ name:'English', lang:'en' }, { name:'Español', lang:'es' }],
            content: {
                brand_name: "Dialogflow Messenger Rich Response Generator",
                dialogflow_messenger: {
                    chat_title: "Preview"
                },
                responses_empty_message: "You don't have any response yet. Use the <code>Add</code> button to add a response type to your custom payload.",
                add_button:"Add",
                help_link_alt_text: "Go to dialogflow messenger documentation",
                types: [
                    {
                        name: "info",
                        text: "Info",
                        link: "https://cloud.google.com/dialogflow/es/docs/integrations/dialogflow-messenger#info_response_type"
                    },
                    {
                        name: "description",
                        text: "Description",
                        link: "https://cloud.google.com/dialogflow/es/docs/integrations/dialogflow-messenger#description_response_type"
                    },
                    {
                        name: "image",
                        text: "Image",
                        link: "https://cloud.google.com/dialogflow/es/docs/integrations/dialogflow-messenger#image_response_type"
                    },
                    {
                        name: "button",
                        text: "Button",
                        link: "https://cloud.google.com/dialogflow/es/docs/integrations/dialogflow-messenger#button_response_type"
                    },
                    {
                        name: "list",
                        text: "List",
                        link: "https://cloud.google.com/dialogflow/es/docs/integrations/dialogflow-messenger#list_response_type"
                    },
                    {
                        name: "accordion",
                        text: "Accordion",
                        link: "https://cloud.google.com/dialogflow/es/docs/integrations/dialogflow-messenger#accordion_response_type"
                    },
                    {
                        name: "chips",
                        text: "Suggestion chips",
                        link: "https://cloud.google.com/dialogflow/es/docs/integrations/dialogflow-messenger#suggestion_chip_response_type"
                    },
                    {
                        name: "divider",
                        text: "Divider",
                        link: "https://cloud.google.com/dialogflow/es/docs/integrations/dialogflow-messenger#list_response_type"
                    }
                ],
                delete: "delete",
                copy: "copy",
                json_payload_copied: "copied!",
                contact_email_subject: "¡Hello! I like your tool, prepare to read",
                contact_email_alt: "Email me"
            },
            collapsed_panels: [],
            payload: {
                richContent: [
                    [

                    ]
                ]
            },
            json_payload_copied: false
        }
    },
    computed: {
        current_content() {
            return this.content;
        },
        contact_email_href() {
            return "mailto:friki.inside@gmail.com?subject="+this.current_content.contact_email_subject;
        },
        payloadJSON() {
            return JSON.stringify(this.payload, null, 4);
        }
    },
    methods: {
        findType(type_name) {
            return this.current_content.types.find(x => { return x.name == type_name });
        },
        selectItem(item) {
            console.log(item);

            var response = { type: item.name };
            if(response.type == 'description') {
                response.text = [];
            } else if(response.type == 'button') {
                response.icon = {};
                response.event = {};
                response.event.parameters = [];
            } else if(response.type == 'list') {
                response.event = {};
                response.event.parameters = [];
            } else if(response.type == 'accordion') {
                response.image = {
                    src: {}
                };
            } else if(response.type == 'chips') {
                response.options = [];
            }

            this.payload.richContent[0].push(response);
            this.collapsed_panels.push(false);
        },
        deleteItem(index) {
            this.payload.richContent[0].splice(index, 1);
            this.collapsed_panels.splice(index, 1);
        },
        copyJSON() {
            this.json_payload_copied = true;

            var textarea_with_text_to_copy = document.createElement("textarea");
            textarea_with_text_to_copy.style.display = "none";
            document.body.appendChild(textarea_with_text_to_copy);
            textarea_with_text_to_copy.value = this.payloadJSON;
            textarea_with_text_to_copy.style.display = "block";
            textarea_with_text_to_copy.select();
            document.execCommand("copy");
            document.body.removeChild(textarea_with_text_to_copy);

            setTimeout(() => { this.json_payload_copied = false }, 1000);
        }
    }
}
</script>

<style>

</style>
