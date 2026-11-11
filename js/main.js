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
   CHATBOT
   ========================================= */
(function () {
    "use strict";

    // ── Knowledge base ──────────────────────────────────────────────
    var KB = {
        greeting: {
            patterns: ["hola", "hi", "hello", "buenas", "buenos dias", "buen dia", "hey", "saludos", "que tal", "como estas", "buenas tardes", "buenas noches"],
            responses: [
                "Hola! Soy el asistente virtual de Bruno. Que te gustaria saber?",
                "Hey! Que bueno que estes por aca. En que te puedo ayudar?",
                "Hola! Encantado de saludarte. Puedo contarte sobre Bruno, su experiencia, servicios o como contactarlo."
            ],
            chips: ["Quien es Bruno?", "Servicios", "Experiencia", "Contacto"]
        },
        about: {
            patterns: ["quien es", "quien eres", "sobre bruno", "cuentame", "presentate", "presentacion", "acerca", "de que trata", "que es esto", "info", "mas sobre"],
            responses: [
                "Bruno Giol es un UX/UI Designer, Web Developer y Scrum Master con mas de 8 anios de experiencia creando productos digitales centrados en el usuario.\n\nHa trabajado en empresas como Belcorp, Stefanini LATAM, ONPE y Wasi Mikuna, liderando diseno de interfaces, prototipos y ceremonias agiles.",
                "Bruno es un profesional creativo y versatil. Combina diseno de experiencias (UX/UI), desarrollo web frontend y gestion agil como Scrum Master. Con mas de 8 anios en el rubro, ha trabajado tanto en agencias como en grandes empresas del Peru."
            ],
            chips: ["Servicios", "Experiencia", "Habilidades", "Contacto"]
        },
        services: {
            patterns: ["servicio", "servicios", "que hace", "que ofrece", "en que ayuda", "que puede hacer", "para que sirve", "como puede ayudar"],
            responses: [
                "Bruno ofrece estos servicios:\n\n UX/UI Design — diseno de interfaces y experiencias de usuario\n Web Development — frontend con HTML, CSS y JS\n Scrum Master — gestion agil de equipos y sprints\n Service Design — diseno de servicios centrados en el cliente\n\nTe interesa alguno en particular?",
                "Dependiendo de lo que necesites, Bruno puede ayudarte con:\n\n- Diseno de productos digitales (apps, webs)\n- Prototipado en Figma\n- Desarrollo frontend\n- Implementacion de metodologias agiles\n\nTienes algun proyecto en mente?"
            ],
            chips: ["Portfolio", "Experiencia", "Contacto", "Esta disponible?"]
        },
        experience: {
            patterns: ["experiencia", "donde trabajo", "donde ha trabajado", "empresas", "trayectoria", "carrera", "trabajo en", "historial", "cv", "curriculum"],
            responses: [
                "Bruno tiene mas de 8 anios de experiencia. Su trayectoria incluye:\n\n ONPE — UX/UI Designer (03/2025 - actualidad)\n Wasi Mikuna — Senior UX/UI + Scrum Master (12/2024 - 02/2025)\n Stefanini LATAM — Senior UX/UI + Scrum Master (11/2022 - 11/2024)\n Belcorp — UI Designer / Front-End (09/2019 - 11/2022)\n Clinica Internacional — Digital Designer (10/2018 - 09/2019)\n\nQuieres saber mas de alguna empresa?",
                "Ha pasado por empresas muy diversas: desde agencias y corporativos hasta organismos del Estado. Que empresa te interesa conocer?"
            ],
            chips: ["ONPE", "Stefanini", "Belcorp", "Contacto"]
        },
        onpe: {
            patterns: ["onpe", "elecciones", "gobierno", "estado", "publico", "sector publico", "electoral"],
            responses: [
                "Actualmente Bruno trabaja en la ONPE (Oficina Nacional de Procesos Electorales) como UX/UI Designer desde marzo del 2025.\n\nAhi esta trabajando en el diseno de interfaces para sistemas internos y externos vinculados a los procesos electorales del Peru, aplicando UX Research, prototipado y pruebas con usuarios.",
                "En la ONPE, Bruno aplica todo su expertise en UX/UI para mejorar sistemas criticos del organismo electoral peruano. Es su rol mas reciente y esta enfocado en crear experiencias claras y accesibles para un contexto de alto impacto ciudadano."
            ],
            chips: ["Otras empresas", "Habilidades", "Portfolio", "Contacto"]
        },
        stefanini: {
            patterns: ["stefanini", "scharff", "courier", "facturacion"],
            responses: [
                "En Stefanini LATAM (2022-2024) Bruno trabajo como Senior UX/UI Designer y Scrum Master. Sus principales logros:\n\n- Diseno del nuevo sistema Courier y de Facturacion para Scharff\n- Elaboracion de Customer Journey Maps y User Flows\n- Gestion de ceremonias Scrum con el equipo y el PO\n- Pruebas de usuario y metricas de producto"
            ],
            chips: ["ONPE", "Belcorp", "Habilidades", "Contacto"]
        },
        belcorp: {
            patterns: ["belcorp", "esika", "cyzone", "lbel", "mailing", "sap"],
            responses: [
                "En Belcorp (2019-2022) Bruno fue UI Designer y Front-End Developer. Trabajo en:\n\n- Entrevistas a usuarios y creacion de User Personas\n- Diseno de interfaces para usuarias finales (Esika, Cyzone, L'Bel)\n- Desarrollo de mailings en SAP Marketing Cloud\n- Prototipado de paginas web internas\n\nPuedes ver algunos de esos disenos en la seccion Portfolio de esta pagina."
            ],
            chips: ["Ver portfolio", "ONPE", "Stefanini", "Contacto"]
        },
        wasimikuna: {
            patterns: ["wasi mikuna", "qaliwarma", "wasi", "mikuna", "alimentacion"],
            responses: [
                "En Wasi Mikuna -antes conocido como Qaliwarma- (12/2024 - 02/2025), Bruno fue Senior UX/UI + Scrum Master. Trabajo en:\n\n- Diseno de un nuevo modulo de quejas y call center\n- Prototipado web con foco en accesibilidad\n- Gestion de backlog junto al Product Owner\n- Ceremonias Scrum: Planning, Daily, Review y Retro"
            ],
            chips: ["ONPE", "Stefanini", "Habilidades", "Contacto"]
        },
        skills: {
            patterns: ["habilidad", "habilidades", "skill", "skills", "tecnologia", "tecnologias", "herramienta", "herramientas", "sabe", "conoce", "domina", "maneja", "usa"],
            responses: [
                "Bruno maneja un stack bastante completo:\n\nDiseno: Figma, Adobe XD, Photoshop, Illustrator\nDev: HTML5, CSS3, JavaScript, Bootstrap\nAgile: Scrum, gestion de backlog, metricas\nUX: Customer Journey Map, User Persona, User Flow\nTesting: pruebas de usuario, iteracion\n\nAlgo en particular te interesa?",
                "En herramientas de diseno domina Figma principalmente, ademas de toda la suite de Adobe. En desarrollo maneja el frontend clasico y Bootstrap. Y en metodologias agiles esta certificado como Scrum Master por Scrum Alliance."
            ],
            chips: ["Educacion", "Experiencia", "Portfolio", "Contacto"]
        },
        education: {
            patterns: ["educacion", "estudio", "estudios", "certificacion", "titulo", "formacion", "universidad", "carrera", "donde estudio", "grado"],
            responses: [
                "La formacion de Bruno:\n\nDiseno Grafico — ISIL (2011-2015)\nHTML5/CSS3/JS — Area 51 (2016)\nUX/UI/CX — Miami Ad School (2018)\nCertified Scrum Master — Scrum Alliance (2024)\nDesign Thinking — Fundacion Telefonica (2025)\nCertified Project Manager — Ingenium (2025)",
                "Tiene una base solida en diseno grafico (ISIL) y la complemento con certificaciones internacionales en UX/UI (Miami Ad School), Scrum Master (Scrum Alliance) y recientemente en Design Thinking y Project Management. Siempre en modo aprendizaje."
            ],
            chips: ["Habilidades", "Experiencia", "Contacto"]
        },
        portfolio: {
            patterns: ["portfolio", "portafolio", "proyecto", "proyectos", "trabajo", "trabajos", "diseno", "ver trabajo", "muestra"],
            responses: [
                "Puedes verlo en esta misma pagina, en la seccion Portfolio. Encontraras:\n\n- Disenos animados para Esika, Cyzone y L'Bel (Belcorp)\n- Prototipos UX de Scharff, Mapfre y Clinica Internacional\n- El prototipo web de Wasi Mikuna\n- Videos del trabajo en ONPE\n\nQuieres mas detalles de algun proyecto?",
                "El portfolio esta justo arriba en esta pagina. Puedes filtrar por 'Design' o 'Ux/Ui' para ver cada tipo de trabajo."
            ],
            chips: ["Belcorp", "Stefanini", "ONPE", "Contacto"]
        },
        availability: {
            patterns: ["disponible", "disponibilidad", "freelance", "contratar", "hire", "colaborar", "trabajar juntos", "proyecto nuevo", "propuesta"],
            responses: [
                "Si, Bruno esta disponible para proyectos freelance! Si tienes algo en mente, lo mejor es escribirle directamente para conversar sobre el proyecto. Te paso sus datos?",
                "Actualmente esta trabajando en ONPE, pero tambien esta abierto a proyectos freelance. Que tipo de proyecto tienes en mente?"
            ],
            chips: ["Contacto", "Servicios", "Portfolio"]
        },
        contact: {
            patterns: ["contacto", "contactar", "email", "correo", "telefono", "linkedin", "redes", "escribir", "mensaje", "hablar", "comunicar", "donde lo encuentro"],
            responses: [
                "Claro! Puedes contactar a Bruno por:\n\nEmail: brunogiol78@gmail.com\nTelefono: +51-999-971-342\nLinkedIn: linkedin.com/in/bruno-giol-4a81b477\n\nEl responde rapido!",
                "La forma mas rapida es por email o LinkedIn:\n\nbrunogiol78@gmail.com\nlinkedin.com/in/bruno-giol-4a81b477\n\nNecesitas algo mas antes de escribirle?"
            ],
            chips: ["Servicios", "Esta disponible?", "Portfolio"]
        },
        thanks: {
            patterns: ["gracias", "thank", "genial", "excelente", "perfecto", "ok", "bien", "chevere", "buenisimo", "increible", "copado", "bacano", "estuvo bien", "muy bien"],
            responses: [
                "De nada! Fue un placer. Si necesitas algo mas, aqui estare.",
                "Con gusto! Espero haberte ayudado. Hay algo mas que quieras saber?",
                "Que bueno! Si en algun momento quieres retomar, solo escribeme."
            ],
            chips: ["Servicios", "Contacto", "Portfolio"]
        },
        farewell: {
            patterns: ["adios", "bye", "chao", "hasta luego", "nos vemos", "hasta pronto", "me voy", "ciao"],
            responses: [
                "Hasta luego! Fue un placer charlar contigo.",
                "Chao! Espero haberte ayudado. Vuelve cuando quieras.",
                "Nos vemos! Si necesitas algo, aqui estare."
            ],
            chips: []
        },
        negative: {
            patterns: ["no me ayudo", "no entiendo", "no sirve", "mal", "error", "fallo", "no funciona", "no es lo que buscaba"],
            responses: [
                "Ups, lo siento. Soy un chatbot sencillo, asi que a veces me pierdo. Te recomiendo contactar directamente a Bruno. Te paso sus datos?",
                "Entiendo, puede que no tenga informacion sobre eso. Lo mejor seria escribirle directamente a Bruno."
            ],
            chips: ["Contacto", "Quien es Bruno?", "Servicios"]
        }
    };

    var defaultResponses = [
        { text: "Mmm, no estoy seguro de como responder eso. Puedo contarte sobre Bruno, sus servicios, experiencia o como contactarlo.", chips: ["Quien es Bruno?", "Servicios", "Contacto", "Portfolio"] },
        { text: "No tengo info sobre eso, pero puedo ayudarte con otras cosas. Que quieres saber de Bruno?", chips: ["Experiencia", "Habilidades", "Contacto"] }
    ];

    var lastKey = null;
    var lastResponse = "";

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
        var bestKey = null;
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
                bestKey = key;
            }
        }

        if (bestKey) {
            var responses = KB[bestKey].responses;
            var text;
            if (responses.length > 1 && lastKey === bestKey) {
                var filtered = responses.filter(function(r) { return r !== lastResponse; });
                text = pickRandom(filtered.length ? filtered : responses);
            } else {
                text = pickRandom(responses);
            }
            lastKey = bestKey;
            lastResponse = text;
            return { text: text, chips: KB[bestKey].chips || [] };
        }

        return pickRandom(defaultResponses);
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

    // ── Render functions ─────────────────────────────────────────────
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

    // ── Send logic ───────────────────────────────────────────────────
    function sendMessage(text) {
        if (isTyping) return;
        text = text.trim();
        if (!text) return;

        appendMessage(text, "user");
        input.value = "";
        chips.innerHTML = "";

        isTyping = true;
        showTyping();

        var delay = 700 + Math.random() * 700;
        setTimeout(function () {
            hideTyping();
            var res = getResponse(text);
            appendMessage(res.text, "bot");
            renderChips(res.chips);
            isTyping = false;
        }, delay);
    }

    // ── Events ───────────────────────────────────────────────────────
    toggle.addEventListener("click", function () {
        isOpen = !isOpen;
        window_.style.display = isOpen ? "flex" : "none";
        iconOpen.style.display  = isOpen ? "none"  : "inline";
        iconClose.style.display = isOpen ? "inline" : "none";

        if (isOpen && messages.children.length === 0) {
            setTimeout(function () {
                appendMessage("Hola! Soy el asistente virtual de Bruno Giol. Puedo contarte sobre su experiencia, servicios, habilidades y mas. Por donde empezamos?", "bot");
                renderChips(["Quien es Bruno?", "Servicios", "Experiencia", "Contacto"]);
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
