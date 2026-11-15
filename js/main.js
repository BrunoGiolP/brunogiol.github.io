(function ($) {
    "use strict";

    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });


    // Typed Initiate
    if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Scroll to Bottom
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scroll-to-bottom').fadeOut('slow');
        } else {
            $('.scroll-to-bottom').fadeIn('slow');
        }
    });


    // Skills
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Lightbox: block body scroll when open, restore when closed
    // Lightbox2 doesn't fire events, so we use a MutationObserver on #lightbox
    $(document).ready(function () {
        var lightboxObserver = new MutationObserver(function () {
            var $lb = $('#lightbox');
            if ($lb.length) {
                if ($lb.css('display') !== 'none') {
                    $('body').css('overflow', 'hidden');
                } else {
                    $('body').css('overflow', '');
                }
            }
        });

        // #lightbox is injected dynamically by the lib, so wait for it
        var waitForLightbox = setInterval(function () {
            var lb = document.getElementById('lightbox');
            if (lb) {
                clearInterval(waitForLightbox);
                lightboxObserver.observe(lb, { attributes: true, attributeFilter: ['style'] });
            }
        }, 200);
    });


    // Portfolio Video Modal
    $(document).ready(function () {
        // Reset chatbot slider to first slide on close
        $('#chatbotSliderModal').on('hidden.bs.modal', function () {
            $('#chatbotCarousel').carousel(0);
        });

        $('#portfolioVideoModal').on('show.bs.modal', function (e) {
            var videoSrc = $(e.relatedTarget).data('video');
            var $video = $('#portfolioVideo');
            var $source = $('#portfolioVideoSource');
            // Set src based on file type
            var ext = videoSrc.split('.').pop().toLowerCase();
            var mimeType = ext === 'mov' ? 'video/mp4' : 'video/' + ext;
            $source.attr('src', videoSrc).attr('type', mimeType);
            $video[0].load();
        });

        $('#portfolioVideoModal').on('hidden.bs.modal', function () {
            var $video = $('#portfolioVideo');
            $video[0].pause();
            $video[0].currentTime = 0;
            $('#portfolioVideoSource').attr('src', '');
            $video[0].load();
        });
    });



    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        items: 1
    });
    
})(jQuery);


/* =========================================
   CHATBOT v3 — Frictionless UX Architecture
   ========================================= */
(function () {
    "use strict";

    // ── Estado de sesion ────────────────────────────────────────────
    var lastKey      = null;   // ultima intencion resuelta
    var lastResponse = "";     // ultima respuesta enviada
    var fallbackCount = 0;     // contador de fallbacks consecutivos

    // ── Knowledge Base ──────────────────────────────────────────────
    var KB = {

        // ── 2. Intencion y Acceso ──────────────────────────────────

        greeting: {
            patterns: ["hola", "hi", "hello", "buenas", "buenos dias", "buen dia", "hey", "saludos", "que tal", "como estas", "buenas tardes", "buenas noches", "inicio", "empezar", "comenzar"],
            responses: [
                "Hola! Soy el asistente de Bruno Giol, UX/UI Designer con 8+ anios de experiencia. Con que puedo ayudarte?",
                "Hey! Que bueno que estes por aca. Soy el bot de Bruno. Puedo contarte sobre su trayectoria, servicios o ayudarte a contactarlo.",
                "Hola! Encantado. Cuento con info sobre la experiencia, habilidades y servicios de Bruno. Por donde empezamos?"
            ],
            chips: ["Soy reclutador", "Busco freelancer", "Quien es Bruno?", "Ver experiencia"]
        },

        // Ruta Reclutador — acceso express
        recruiter: {
            patterns: ["soy reclutador", "recursos humanos", "rrhh", "seleccion", "busco candidato", "busco perfil", "head hunter", "reclutador", "reclutadora", "hiring", "contratacion"],
            responses: [
                "Perfecto! Aqui el resumen ejecutivo de Bruno:\n\nUX/UI Designer + Scrum Master · 8 anios exp.\nActual: ONPE (03/2025)\nAnterior: Stefanini LATAM, Belcorp, Clinica Internacional\nCertificaciones: CSM (Scrum Alliance), UX/UI (Miami Ad School), PM (Ingenium)\n\nPuedes descargar su CV completo o ver su portfolio ahora mismo.",
                "Hola! Para perfiles de seleccion, Bruno tiene:\n\nSenior UX/UI Designer | Scrum Master certificado\n8+ anios · Lima, Peru · Disponible\n\nTe recomiendo descargar el CV o escribirle directo al LinkedIn."
            ],
            chips: ["Descargar CV", "Ver portfolio", "Contacto directo", "Ver experiencia"]
        },

        // Ruta Cliente / Freelance
        client: {
            patterns: ["soy cliente", "busco freelancer", "busco freelance", "necesito diseñador", "necesito disenador", "necesito ux", "necesito ui", "tengo un proyecto", "quiero contratar", "presupuesto", "cotizacion", "cuanto cobra", "tarifa"],
            responses: [
                "Genial! Bruno esta disponible para proyectos freelance. Trabaja en:\n\n- Diseno UX/UI (apps, webs, sistemas)\n- Prototipado en Figma\n- Service Design y flujos conversacionales\n- Desarrollo frontend (HTML/CSS/JS)\n\nCuentame un poco de tu proyecto y te paso sus datos para coordinar.",
                "Bruno esta abierto a proyectos freelance. Para darte mas detalle sobre disponibilidad y tarifas, lo mejor es escribirle directamente. Tiene respuesta rapida!"
            ],
            chips: ["Ver servicios", "Ver portfolio", "Contacto directo", "Descargar CV"]
        },

        // ── Sobre Bruno ───────────────────────────────────────────
        about: {
            patterns: ["quien es", "quien eres", "sobre bruno", "cuentame", "presentate", "presentacion", "acerca", "de que trata", "que es esto", "info", "mas sobre", "resume", "resumen"],
            responses: [
                "Bruno Giol es un UX/UI Designer, Web Developer y Scrum Master con mas de 8 anios de experiencia creando productos digitales centrados en el usuario.\n\nActualmente trabaja en la ONPE y ha pasado por Belcorp, Stefanini LATAM y Wasi Mikuna, liderando diseno de interfaces, prototipos y ceremonias agiles.",
                "Bruno combina diseno de experiencias (UX/UI), desarrollo frontend y gestion agil como Scrum Master. Con 8+ anios en el rubro, ha trabajado en corporativos, agencias y organismos del Estado peruano."
            ],
            chips: ["Ver experiencia", "Servicios", "Habilidades", "Contacto directo"]
        },

        // ── 3. Trayectoria y Casos ─────────────────────────────────

        experience: {
            patterns: ["experiencia", "donde trabajo", "donde ha trabajado", "empresas", "trayectoria", "carrera", "trabajo en", "historial", "cv", "curriculum", "todas las empresas", "todas"],
            responses: [
                "Bruno tiene 8+ anios de experiencia:\n\nONPE — UX/UI Designer (03/2025 · actual)\nWasi Mikuna — Sr. UX/UI + SM (12/2024-02/2025)\nStefanini LATAM — Sr. UX/UI + SM (11/2022-11/2024)\nBelcorp — UI Designer / FE (09/2019-11/2022)\nClinica Internacional — Digital Designer (10/2018-09/2019)\nNativos Digitales — UI + FE (08/2016-10/2018)\n\nQue empresa te interesa?",
                "Ha trabajado en 6 empresas distintas, desde agencias hasta el sector publico. Cual quieres conocer mejor?"
            ],
            chips: ["ONPE", "Stefanini", "Belcorp", "Wasi Mikuna", "Clinica Internacional"]
        },

        onpe: {
            patterns: ["onpe", "elecciones", "gobierno", "estado", "publico", "sector publico", "electoral", "procesos electorales"],
            responses: [
                "Bruno trabaja actualmente en la ONPE (Oficina Nacional de Procesos Electorales) como UX/UI Designer desde marzo 2025.\n\nDiseña interfaces para sistemas internos y externos vinculados a procesos electorales del Peru, aplicando UX Research, prototipado en Figma y pruebas con usuarios reales.",
                "Su rol actual en la ONPE es de alto impacto ciudadano: mejora la experiencia de sistemas electorales criticos del pais. Es su posicion mas reciente y sigue activo ahi."
            ],
            chips: ["Todas las empresas", "Stefanini", "Habilidades", "Ver portfolio"]
        },

        stefanini: {
            patterns: ["stefanini", "scharff", "courier", "facturacion"],
            responses: [
                "En Stefanini LATAM (11/2022-11/2024) fue Senior UX/UI Designer y Scrum Master:\n\n- Diseno del sistema Courier y Facturacion para Scharff\n- Customer Journey Maps y User Flows\n- Gestion de ceremonias Scrum (Planning, Daily, Review, Retro)\n- Pruebas de usuario y metricas de producto",
                "Stefanini fue donde Bruno consolido su rol dual: disenador + Scrum Master. El proyecto estrella fue el rediseno completo de los sistemas de Scharff Courier y Facturacion."
            ],
            chips: ["Todas las empresas", "ONPE", "Belcorp", "Ver portfolio"]
        },

        belcorp: {
            patterns: ["belcorp", "esika", "cyzone", "lbel", "mailing", "sap"],
            responses: [
                "En Belcorp (09/2019-11/2022) fue UI Designer y Front-End Developer:\n\n- Entrevistas a usuarios y User Personas\n- Diseno de interfaces para Esika, Cyzone y L'Bel\n- Desarrollo de mailings en SAP Marketing Cloud\n- Prototipado de paginas web internas\n\nPuedes ver estos disenos en la seccion Portfolio.",
                "Belcorp fue su mayor etapa en diseno grafico-digital: 3 anios creando campanas para las marcas Esika, Cyzone y L'Bel a nivel Latinoamerica."
            ],
            chips: ["Ver portfolio", "Todas las empresas", "ONPE", "Stefanini"]
        },

        wasimikuna: {
            patterns: ["wasi mikuna", "qaliwarma", "wasi", "mikuna", "alimentacion"],
            responses: [
                "En Wasi Mikuna (ex Qaliwarma) (12/2024-02/2025) fue Senior UX/UI + Scrum Master:\n\n- Nuevo modulo de quejas y call center\n- Prototipado web con foco en accesibilidad\n- Gestion de backlog con el PO\n- Ceremonias Scrum completas"
            ],
            chips: ["Todas las empresas", "ONPE", "Habilidades", "Contacto directo"]
        },

        clinica: {
            patterns: ["clinica", "clinica internacional", "clinica int", "salud", "reserva de citas", "citas medicas"],
            responses: [
                "En Clinica Internacional (10/2018-09/2019) fue Digital Designer:\n\n- Piezas graficas para campanas de marketing digital\n- Prototipado de paginas web internas\n- Creacion del flujo de reserva de citas web\n- Prototipado de app mobile"
            ],
            chips: ["Todas las empresas", "Belcorp", "Habilidades", "Ver portfolio"]
        },

        // ── 4. Servicios y Habilidades ─────────────────────────────

        services: {
            patterns: ["servicio", "servicios", "que hace", "que ofrece", "en que ayuda", "que puede hacer", "para que sirve", "como puede ayudar", "valor", "servicios y valor"],
            responses: [
                "Bruno ofrece:\n\nUX/UI Design — investigacion, wireframes, prototipos en Figma\nService Design y Bots — diseno de flujos conversacionales\nFront-End — HTML, CSS, JS, Bootstrap\nScrum Master — ceremonias, backlog, metricas agiles\n\nTe interesa alguno en particular?",
                "Su propuesta de valor combina diseno centrado en el usuario con capacidad de desarrollo e implementacion agil. No solo diseña: tambien prototipa, itera y acompana al equipo de desarrollo."
            ],
            chips: ["UX/UI y Prototipado", "Service Design y Bots", "Front-End", "Esta disponible?"]
        },

        uxui: {
            patterns: ["ux", "ui", "ux ui", "prototipo", "prototipado", "figma", "wireframe", "investigacion", "user research", "diseno de interfaces", "diseno de experiencias"],
            responses: [
                "El core de Bruno es el UX/UI:\n\n- UX Research: entrevistas, User Persona, Journey Map\n- Arquitectura de informacion y User Flow\n- Wireframes y prototipado en Figma\n- Pruebas de usuario e iteracion\n- Diseno accesible (WCAG awareness)\n\nTiene proyectos en banca, salud, logistica, gobierno y retail."
            ],
            chips: ["Ver portfolio", "Service Design y Bots", "Habilidades", "Contacto directo"]
        },

        servicedesign: {
            patterns: ["service design", "bot", "bots", "chatbot", "flujo conversacional", "conversacional", "arquitectura conversacional", "diseno de servicios"],
            responses: [
                "Bruno tiene experiencia en Service Design y diseno de chatbots conversacionales:\n\n- Mapeo de flujos de alta conversion\n- Arquitectura conversacional (como este mismo chatbot!)\n- Customer Journey Map end-to-end\n- Diseno de touchpoints digitales y fisicos\n\nEste chatbot que estas usando fue disenado y desarrollado por el."
            ],
            chips: ["Ver flujo del chatbot", "UX/UI y Prototipado", "Ver portfolio", "Contacto directo"]
        },

        frontend: {
            patterns: ["frontend", "front end", "desarrollo web", "html", "css", "javascript", "bootstrap", "codigo", "programacion", "web developer", "desarrollo"],
            responses: [
                "Bruno tambien desarrolla frontend:\n\n- HTML5, CSS3, JavaScript\n- Bootstrap y responsive design\n- Accesibilidad web\n- Mailing en SAP Marketing Cloud\n\nCombina diseno e implementacion, lo que reduce friccion entre el equipo de diseno y desarrollo."
            ],
            chips: ["UX/UI y Prototipado", "Habilidades", "Ver portfolio", "Contacto directo"]
        },

        skills: {
            patterns: ["habilidad", "habilidades", "skill", "skills", "tecnologia", "tecnologias", "herramienta", "herramientas", "sabe", "conoce", "domina", "maneja", "usa", "stack"],
            responses: [
                "Stack completo de Bruno:\n\nDiseno: Figma, Adobe XD, Photoshop, Illustrator\nDev: HTML5, CSS3, JavaScript, Bootstrap\nAgile: Scrum, backlog, metricas\nUX: CJM, User Persona, User Flow, pruebas\nBots: arquitectura conversacional, flujos NLP\n\nQue area te interesa mas?",
                "Su diferencial es la combinacion: diseña, prototipa, desarrolla e implementa metodologias agiles. Es un perfil T-shaped con profundidad en UX/UI."
            ],
            chips: ["UX/UI y Prototipado", "Front-End", "Service Design y Bots", "Formacion"]
        },

        education: {
            patterns: ["educacion", "estudio", "estudios", "certificacion", "titulo", "formacion", "universidad", "carrera", "donde estudio", "grado", "estudios"],
            responses: [
                "Formacion de Bruno:\n\nDiseno Grafico — ISIL (2011-2015)\nHTML5/CSS3/JS — Area 51 (2016)\nUX/UI/CX — Miami Ad School (2018)\nCertified Scrum Master — Scrum Alliance (2024)\nDesign Thinking — Fundacion Telefonica (2025)\nCertified Project Manager — Ingenium (2025)",
                "Siempre en modo aprendizaje: combina una base solida en diseno (ISIL) con certificaciones internacionales en UX (Miami Ad School), agilidad (Scrum Alliance) y gestion de proyectos (Ingenium 2025)."
            ],
            chips: ["Habilidades", "Ver experiencia", "Descargar CV", "Contacto directo"]
        },

        // ── 5. Evidencia y Rescate ─────────────────────────────────

        portfolio: {
            patterns: ["portfolio", "portafolio", "proyecto", "proyectos", "trabajo", "trabajos", "diseno", "ver trabajo", "muestra", "evidencia", "ejemplo"],
            responses: [
                "El portfolio esta en esta pagina, seccion Portfolio. Incluye:\n\n- Disenos animados Esika, Cyzone, L'Bel (Belcorp)\n- Prototipos UX: Scharff, Mapfre, Clinica Internacional\n- Web Wasi Mikuna\n- Video del trabajo en ONPE\n- Diseno de este chatbot\n\nQue proyecto te interesa?",
                "Puedes ver el portfolio arriba filtrando por 'Design' o 'Ux/Ui'. Cada item muestra el trabajo real entregado."
            ],
            chips: ["Belcorp", "Stefanini", "ONPE", "Ver flujo del chatbot"]
        },

        chatbotflow: {
            patterns: ["flujo del chatbot", "flujo conversacional", "diagrama", "arquitectura del bot", "como funciona el bot", "como funciona el chatbot"],
            responses: [
                "El flujo conversacional de este chatbot fue disenado por Bruno siguiendo principios de Frictionless UX:\n\n- 6 columnas: entrada, intencion, trayectoria, servicios, evidencia y conversion\n- Clasificador ponderado por puntaje (NLP simple)\n- Rutas diferenciadas: reclutador vs cliente\n- Fallback de 2 niveles\n- Guardia anti-repeticion\n\nPuedes ver el diagrama completo en la seccion Portfolio."
            ],
            chips: ["Ver portfolio", "Service Design y Bots", "Contacto directo"]
        },

        availability: {
            patterns: ["disponible", "disponibilidad", "freelance", "contratar", "hire", "colaborar", "trabajar juntos", "proyecto nuevo", "propuesta", "laboral", "trabajo nuevo"],
            responses: [
                "Bruno esta disponible para proyectos freelance en paralelo a su rol en ONPE. Para coordinar disponibilidad y alcance, lo mejor es escribirle directo.",
                "Actualmente trabaja en ONPE pero esta abierto a proyectos freelance. Que tipo de proyecto tienes?"
            ],
            chips: ["Contacto directo", "Ver servicios", "Descargar CV"]
        },

        // ── 6. Conversion Agil ─────────────────────────────────────

        cv: {
            patterns: ["cv", "curriculum", "hoja de vida", "descargar cv", "bajar cv", "cv pdf", "descargar curriculum", "ver cv", "curriculum vitae", "donde esta el cv", "donde encuentro el cv", "donde puedo encontrar", "encontrar cv", "encontrar el cv", "como descargo", "descarga", "download"],
            responses: [
                "Puedes descargar el CV de Bruno aqui mismo!\n\nVe a la seccion de inicio (la primera pantalla con la foto de Bruno) y encontraras el boton 'Download CV' en color blanco. Al hacer clic se descarga el PDF directamente.",
                "El CV esta disponible para descarga en la parte superior de esta pagina. En la seccion Hero (inicio), hay un boton que dice 'Download CV'. Hacele clic y se descarga el PDF actualizado."
            ],
            chips: ["Contacto directo", "Ver portfolio", "Ver experiencia"]
        },

        contact: {
            patterns: ["contacto", "contactar", "email", "correo", "telefono", "linkedin", "redes", "escribir", "mensaje", "hablar", "comunicar", "donde lo encuentro", "contacto directo", "multicanal", "whatsapp"],
            responses: [
                "Contacto directo con Bruno:\n\nEmail: brunogiol78@gmail.com\nTelefono / WhatsApp: +51-999-971-342\nLinkedIn: linkedin.com/in/bruno-giol-4a81b477\n\nResponde rapido por todos los canales!",
                "La via mas rapida es LinkedIn o WhatsApp:\n\n+51-999-971-342\nlinkedin.com/in/bruno-giol-4a81b477\n\nAlgo mas en que pueda ayudarte?"
            ],
            chips: ["Descargar CV", "Ver portfolio", "Esta disponible?"]
        },

        // ── Cierre y estados especiales ───────────────────────────

        thanks: {
            patterns: ["gracias", "thank", "genial", "excelente", "perfecto", "bien", "chevere", "buenisimo", "increible", "copado", "muy bien", "estuvo bien", "buenaza"],
            responses: [
                "De nada! Un placer. Algo mas en que pueda ayudarte?",
                "Con gusto! Espero haberte ayudado. Hay algo mas?",
                "Que bueno! Si necesitas algo mas, aqui estoy."
            ],
            chips: ["Ver servicios", "Contacto directo", "Ver portfolio"]
        },

        farewell: {
            patterns: ["adios", "bye", "chao", "hasta luego", "nos vemos", "hasta pronto", "me voy", "ciao", "cerrar", "reiniciar"],
            responses: [
                "Hasta luego! Fue un placer. Vuelve cuando quieras.",
                "Chao! Si necesitas algo mas de Bruno, aqui estare.",
                "Nos vemos! Puedes reiniciar la conversacion cuando quieras."
            ],
            chips: ["Reiniciar chat"]
        }
    };

    // ── Fallbacks de 2 niveles ──────────────────────────────────────
    var fallback1 = {
        text: "Mmm, no capto bien la pregunta. Puedes reformularla? O elige una opcion:",
        chips: ["Ver experiencia", "Servicios", "Contacto directo", "Descargar CV"]
    };
    var fallback2 = {
        text: "Parece que no encuentro lo que buscas. Te recomiendo escribirle directamente a Bruno, el podra ayudarte mejor.",
        chips: ["Contacto directo", "Descargar CV", "Ver portfolio", "Reiniciar chat"]
    };

    // ── Helpers ─────────────────────────────────────────────────────
    function normalize(str) {
        return str.toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9 ]/g, " ")
            .trim();
    }

    function pickRandom(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function getResponse(input) {
        var norm = normalize(input);

        // Accion especial: reiniciar chat
        if (norm.indexOf("reiniciar") !== -1 || norm === "reiniciar chat") {
            resetChat();
            return null;
        }

        // Clasificador ponderado por puntaje
        var bestKey   = null;
        var bestScore = 0;

        for (var key in KB) {
            var entry = KB[key];
            var score = 0;
            for (var i = 0; i < entry.patterns.length; i++) {
                if (norm.indexOf(entry.patterns[i]) !== -1) {
                    score += entry.patterns[i].length;
                }
            }
            if (score > bestScore) {
                bestScore = score;
                bestKey   = key;
            }
        }

        if (bestKey) {
            fallbackCount = 0; // reset contador al tener exito
            var responses = KB[bestKey].responses;
            var text;
            // Guardia anti-repeticion
            if (responses.length > 1 && lastKey === bestKey) {
                var filtered = responses.filter(function(r) { return r !== lastResponse; });
                text = pickRandom(filtered.length ? filtered : responses);
            } else {
                text = pickRandom(responses);
            }
            lastKey      = bestKey;
            lastResponse = text;
            return { text: text, chips: KB[bestKey].chips || [] };
        }

        // Fallback nivel 1 y 2
        fallbackCount++;
        if (fallbackCount === 1) return fallback1;
        fallbackCount = 0;
        return fallback2;
    }

    // ── DOM refs ─────────────────────────────────────────────────────
    var toggle    = document.getElementById("chatbot-toggle");
    var window_   = document.getElementById("chatbot-window");
    var messages  = document.getElementById("chatbot-messages");
    var input     = document.getElementById("chatbot-input");
    var sendBtn   = document.getElementById("chatbot-send");
    var chips     = document.getElementById("chatbot-suggestions");
    var iconOpen  = document.getElementById("chatbot-icon-open");
    var iconClose = document.getElementById("chatbot-icon-close");

    var isOpen   = false;
    var isTyping = false;

    // ── Render ───────────────────────────────────────────────────────
    function appendMessage(text, sender) {
        var div = document.createElement("div");
        div.className = "chatbot-msg " + sender;
        div.innerHTML = text.replace(/\n/g, "<br>");
        messages.appendChild(div);
        scrollToBottom();
    }

    function showTyping() {
        var div = document.createElement("div");
        div.className = "chatbot-typing";
        div.id = "chatbot-typing-indicator";
        div.innerHTML = "<span></span><span></span><span></span>";
        messages.appendChild(div);
        scrollToBottom();
    }

    function hideTyping() {
        var el = document.getElementById("chatbot-typing-indicator");
        if (el) el.remove();
    }

    function renderChips(chipList) {
        chips.innerHTML = "";
        if (!chipList || !chipList.length) return;
        chipList.forEach(function (label) {
            var btn = document.createElement("button");
            btn.className = "chatbot-chip";
            btn.textContent = label;
            btn.addEventListener("click", function () {
                sendMessage(label);
            });
            chips.appendChild(btn);
        });
    }

    function scrollToBottom() {
        messages.scrollTop = messages.scrollHeight;
    }

    function resetChat() {
        messages.innerHTML = "";
        chips.innerHTML    = "";
        lastKey            = null;
        lastResponse       = "";
        fallbackCount      = 0;
        setTimeout(function () {
            appendMessage("Chat reiniciado. Como puedo ayudarte?", "bot");
            renderChips(["Soy reclutador", "Busco freelancer", "Quien es Bruno?", "Ver experiencia"]);
        }, 300);
    }

    // ── Send logic ────────────────────────────────────────────────────
    function sendMessage(text) {
        if (isTyping) return;
        text = text.trim();
        if (!text) return;

        appendMessage(text, "user");
        input.value = "";
        chips.innerHTML = "";

        isTyping = true;
        showTyping();

        var delay = 650 + Math.random() * 650;
        setTimeout(function () {
            hideTyping();
            var res = getResponse(text);
            if (res) {
                appendMessage(res.text, "bot");
                renderChips(res.chips);
            }
            isTyping = false;
        }, delay);
    }

    // ── Events ────────────────────────────────────────────────────────
    toggle.addEventListener("click", function () {
        isOpen = !isOpen;
        window_.style.display  = isOpen ? "flex"   : "none";
        iconOpen.style.display  = isOpen ? "none"   : "inline";
        iconClose.style.display = isOpen ? "inline" : "none";

        if (isOpen && messages.children.length === 0) {
            setTimeout(function () {
                appendMessage("Hola! Soy el asistente de Bruno Giol. Soy reclutador, cliente o simplemente curioso?", "bot");
                renderChips(["Soy reclutador", "Busco freelancer", "Quien es Bruno?", "Ver experiencia"]);
            }, 350);
        }
        if (isOpen) input.focus();
    });

    sendBtn.addEventListener("click", function () {
        sendMessage(input.value);
    });

    input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") sendMessage(input.value);
    });

}());
