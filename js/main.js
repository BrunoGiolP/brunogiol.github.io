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
            patterns: ["hola", "hi", "hello", "buenas", "buenos", "buen dia", "hey", "saludos"],
            responses: [
                "¡Hola! 👋 Soy el asistente virtual de Bruno. ¿En qué te puedo ayudar?",
                "¡Hola! Encantado de saludarte. ¿Qué quieres saber sobre Bruno?"
            ],
            chips: ["¿Quién es Bruno?", "Servicios", "Experiencia", "Contacto"]
        },
        about: {
            patterns: ["quien es", "quien eres", "sobre bruno", "cuentame", "presentate", "presentacion", "acerca"],
            responses: [
                "Bruno Giol es un UX/UI Designer, Web Developer y Scrum Master con más de 8 años de experiencia. Ha trabajado en empresas como Belcorp, Stefanini LATAM y Wasi Mikuna, creando experiencias digitales centradas en el usuario. 🎨"
            ],
            chips: ["Servicios", "Experiencia", "Habilidades", "Contacto"]
        },
        services: {
            patterns: ["servicio", "servicios", "que hace", "que ofrece", "ayuda"],
            responses: [
                "Bruno ofrece los siguientes servicios:\n\n🎨 UX/UI Design — diseño de interfaces y experiencias de usuario\n💻 Web Development — desarrollo frontend con HTML, CSS y JS\n🔄 Scrum Master — gestión ágil de equipos y proyectos\n🧩 Service Design — diseño de servicios centrados en el cliente"
            ],
            chips: ["Ver portfolio", "Experiencia", "Contacto", "¿Está disponible?"]
        },
        experience: {
            patterns: ["experiencia", "donde trabajo", "empresas", "trayectoria", "carrera"],
            responses: [
                "Bruno tiene más de 8 años de experiencia. Algunos highlights:\n\n🏢 Stefanini LATAM — Senior UX/UI + Scrum Master (2022–2024)\n🏢 Belcorp — UI Designer / Front-End (2019–2022)\n🏢 Clínica Internacional — Digital Designer (2018–2019)\n🏢 Banco Financiero / Nativos Digitales — UI + Frontend (2016–2018)"
            ],
            chips: ["Habilidades", "Educación", "Contacto"]
        },
        skills: {
            patterns: ["habilidad", "habilidades", "skill", "skills", "tecnologia", "herramienta", "sabe", "conoce", "domina"],
            responses: [
                "Las principales habilidades de Bruno son:\n\n🖌️ Figma, Adobe XD, Photoshop, Illustrator\n💻 HTML5, CSS3, JavaScript, Bootstrap\n📋 Scrum, metodologías ágiles\n🗺️ Customer Journey Map, User Persona, User Flow\n🧪 Pruebas de usuario"
            ],
            chips: ["Educación", "Servicios", "Portfolio", "Contacto"]
        },
        education: {
            patterns: ["educacion", "estudio", "estudios", "certificacion", "titulo", "formacion", "universidad"],
            responses: [
                "La formación de Bruno incluye:\n\n🎓 Diseño Gráfico — ISIL (2011–2015)\n🌐 HTML5/CSS3/JS — Área 51 (2016)\n🖥️ UX/UI/CX — Miami Ad School (2018)\n🏅 Certified Scrum Master — Scrum Alliance (2024)\n💡 Design Thinking — Fundación Telefónica (2025)\n📊 Certified Project Manager — Ingenium (2025)"
            ],
            chips: ["Habilidades", "Experiencia", "Contacto"]
        },
        portfolio: {
            patterns: ["portfolio", "portafolio", "proyecto", "proyectos", "disenos", "ver"],
            responses: [
                "Puedes ver el portfolio de Bruno en esta misma página 👆 en la sección Portfolio. Incluye proyectos de diseño gráfico (Belcorp/Esika/Cyzone), prototipos UX/UI (Scharff, Mapfre, Clínica Internacional) y más. ¿Quieres saber algo específico?"
            ],
            chips: ["Servicios", "Contacto", "¿Está disponible?"]
        },
        availability: {
            patterns: ["disponible", "disponibilidad", "freelance", "contratar", "hire", "colaborar"],
            responses: [
                "¡Sí! Bruno está disponible para proyectos freelance. 🚀 Si tienes un proyecto en mente, escríbele directamente. ¿Te paso los datos de contacto?"
            ],
            chips: ["Contacto", "Servicios", "Portfolio"]
        },
        contact: {
            patterns: ["contacto", "contactar", "email", "correo", "telefono", "linkedin", "redes", "escribir", "mensaje"],
            responses: [
                "Puedes contactar a Bruno por:\n\n📧 brunogiol78@gmail.com\n📱 +51-999-971-342\n💼 LinkedIn: linkedin.com/in/bruno-giol-4a81b477\n\n¡No dudes en escribirle! 😊"
            ],
            chips: ["Servicios", "¿Está disponible?", "Portfolio"]
        },
        thanks: {
            patterns: ["gracias", "thank", "genial", "excelente", "perfecto", "ok", "bien", "chevere", "buenisimo"],
            responses: [
                "¡De nada! 😊 Si necesitas algo más, aquí estaré.",
                "¡Con gusto! Si tienes más preguntas, no dudes en preguntar. 🙌"
            ],
            chips: ["Servicios", "Contacto", "Portfolio"]
        },
        farewell: {
            patterns: ["adios", "bye", "chao", "hasta luego", "nos vemos", "hasta pronto"],
            responses: [
                "¡Hasta luego! Fue un placer. Si necesitas algo, aquí estaré. 👋",
                "¡Chao! Espero haberte ayudado. 😊"
            ],
            chips: []
        }
    };

    var defaultResponse = {
        text: "Hmm, no estoy seguro de cómo responder eso. 🤔 Puedo contarte sobre Bruno, sus servicios, experiencia o cómo contactarlo.",
        chips: ["¿Quién es Bruno?", "Servicios", "Contacto", "Portfolio"]
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
        for (var key in KB) {
            var entry = KB[key];
            for (var i = 0; i < entry.patterns.length; i++) {
                if (norm.indexOf(entry.patterns[i]) !== -1) {
                    return {
                        text: pickRandom(entry.responses),
                        chips: entry.chips || []
                    };
                }
            }
        }
        return defaultResponse;
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

        var delay = 800 + Math.random() * 600;
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
                appendMessage("¡Hola! 👋 Soy el asistente virtual de Bruno Giol. ¿En qué te puedo ayudar?", "bot");
                renderChips(["¿Quién es Bruno?", "Servicios", "Experiencia", "Contacto"]);
            }, 300);
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

