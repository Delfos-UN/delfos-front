<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { X } from 'lucide-svelte';

    let isModalVisible = false;
    const dispatch = createEventDispatcher();

    export function openModal() {
        isModalVisible = true;
    }

    function closeModal() {
        isModalVisible = false;
        dispatch('close');
    }
</script>

{#if isModalVisible}
<div class="modal-overlay">
    <div class="modal">
        <div class="modal-header">
            <h1>Tratamiento de Datos Personales</h1>
            <button class="close" on:click={closeModal}><X /></button>
        </div>
        <div class="modal-body">
            <p> 
                De acuerdo con la normativa vigente en Colombia, en particular la Ley 1581 de 2012 y sus
                decretos reglamentarios, sobre la protección de datos personales, se establece el siguiente
                texto de tratamiento de datos:
            </p>

            <ol>
                <li>
                    Responsable del Tratamiento de Datos El responsable del tratamiento de los datos
                    personales será Juan Sebastian Duran Roldan, con correo electrónico de contacto 
                    <a href="mailto:juduranr@unal.edu.co">juduranr@unal.edu.co</a>.
                </li>
                <li>
                    Datos Personales Solicitados En el marco del tratamiento de datos personales, se
                    solicita exclusivamente el siguiente dato de contacto:
                    <ul>
                        <li>
                            Correo electrónico: Este dato será usado únicamente para fines de contacto y en caso de
                            ser necesario, para notificaciones relacionadas con el proyecto. Además, se recolectarán
                            datos relacionados con el desempeño académico, los cuales no son considerados como datos
                            personales, ya que no permiten la identificación directa del titular. Los datos recolectados serán:
                            <ul>
                                <li>Nombre de la materia.</li>
                                <li>Código de la materia.</li>
                                <li>Tipología de la materia.</li>
                                <li>Periodo de la materia.</li>
                                <li>Calificación obtenida en la materia.</li>
                                <li>Profesor de la materia, si está disponible.</li>
                                <li>Calificación del profesor, si está disponible.</li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>
                    <span>Finalidad del Tratamiento</span> 
                    Los datos serán utilizados exclusivamente para el desarrollo y
                    entrenamiento de un modelo de inteligencia artificial orientado a crear una solución de
                    código abierto (opensource) que ayude a mejorar el proceso de matrícula y la toma de
                    decisiones sobre qué materias cursar. Este proyecto tiene como objetivo agregar valor
                    práctico y resolver problemáticas relacionadas con la elección de materias y su desempeño.
                    El tratamiento de datos no es de carácter meramente académico y tiene un enfoque en el
                    beneficio directo de los usuarios en el ámbito educativo.
                </li>
                <li>
                    Uso Exclusivo y No Transmisión de Datos Los datos recolectados serán de uso exclusivo del
                    proyecto mencionado y no serán transmitidos, cedidos, compartidos ni vendidos a terceros
                    bajo ninguna circunstancia. La información será tratada de forma estrictamente confidencial
                    y únicamente con fines relacionados con el proyecto de inteligencia artificial en cuestión.
                </li>
                <li>
                    Principios del Tratamiento El tratamiento de los datos personales se realizará bajo los
                    principios de legalidad, finalidad, libertad, veracidad o calidad, transparencia, acceso y
                    circulación restringida, seguridad y confidencialidad, conforme a lo establecido en la Ley
                    1581 de 2012.
                </li>
                <li>
                    Almacenamiento y Seguridad de los Datos Los datos serán almacenados en sistemas seguros que
                    cuentan con medidas de protección física, técnica y administrativa para evitar su acceso,
                    uso o divulgación no autorizada. Se tomarán todas las medidas razonables para mantener la
                    integridad de la información y protegerla contra riesgos.
                </li>
                <li>
                    Derechos del Titular De acuerdo con la ley colombiana, los titulares de los datos personales
                    tienen derecho a: Conocer, actualizar y rectificar sus datos personales. Solicitar prueba de
                    la autorización otorgada para el tratamiento de sus datos. Ser informados sobre el uso que
                    se les ha dado a sus datos personales. Revocar la autorización o solicitar la supresión de
                    sus datos cuando no se respeten los principios, derechos y garantías constitucionales y
                    legales.
                </li>
                <li>
                    Autorización del Titular La recolección del correo electrónico requerirá la autorización
                    expresa del titular, la cual se obtendrá mediante un checkbox en el sitio web del proyecto.
                    Al marcar dicho checkbox, el titular manifestará su consentimiento informado para el
                    tratamiento de sus datos en el marco del proyecto mencionado.
                </li>
                <li>
                    Contacto Para ejercer los derechos mencionados o resolver cualquier duda sobre el
                    tratamiento de los datos personales, el titular puede ponerse en contacto a través del
                    correo electrónico juduranr@unal.edu.co.
                </li>
            </ol>
            <p>
                Este documento de tratamiento de datos podrá ser actualizado conforme a cambios normativos o
                requerimientos del proyecto, siempre con la debida notificación a los titulares de los datos.
            </p>
        </div>
    </div>
</div>
{/if}

<style>
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    }

    .modal {
        background-color: #010604;
        border: solid 2px #004034;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        max-width: 500px;
        width: 90%;
        max-height: 80%;
        overflow-y: auto;
        color: #e0e4e2;
        animation: fade-in 0.3s;
    }

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background-color: #010604;
        color: #e0e4e2;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }

    .modal-body {
        padding: 1rem;
        line-height: 1.5;
    }

    ol, ul {
        padding-left: 20px;
        margin-top: 10px;
    }

    ol li, ul li {
        margin-bottom: 8px;
    }

    a {
        color: #00a77e;
        text-decoration: underline;
    }

    a:hover {
        color: #ff6b6b;
    }

    .close {
        background: none;
        border: none;
        color: #e0e4e2;
        font-size: 1.5rem;
        cursor: pointer;
    }

    .close:hover {
        color: #ff6b6b;
    }

    @keyframes fade-in {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
</style>
