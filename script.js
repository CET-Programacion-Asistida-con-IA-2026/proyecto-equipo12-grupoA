// ===== MAPA INTERACTIVO =====
const markers = document.querySelectorAll('.glacier-marker');
const tooltip  = document.getElementById('mapaTooltip');
const ttName   = document.getElementById('ttName');
const ttEstado = document.getElementById('ttEstado');
const ttDesc   = document.getElementById('ttDesc');
const glaciarItems = document.querySelectorAll('.glaciar-item');

markers.forEach((marker, i) => {
  marker.addEventListener('mouseenter', () => {
    ttName.textContent   = marker.dataset.name;
    ttEstado.textContent = marker.dataset.estado;
    ttDesc.textContent   = marker.dataset.desc;
    tooltip.style.display = 'flex';
  });
  marker.addEventListener('mouseleave', () => {
    tooltip.style.display = 'none';
  });
});

glaciarItems.forEach(item => {
  item.addEventListener('click', () => {
    glaciarItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});

// ===== NOTIF BAR rotación de mensajes =====
const notifMessages = [
  '🔔 Alerta: Se detectaron nuevas actividades mineras en zona de glaciares patagónicos — <strong>Leer más</strong>',
  '🧊 Dato: El glaciar Upsala retrocedió 5 km en los últimos 10 años — <strong>Ver mapa</strong>',
  '📋 Ley de Glaciares: Solo el 40% de las zonas protegidas tienen monitoreo activo — <strong>Informate</strong>',
  '💧 ¿Sabías? Los glaciares abastecen de agua dulce a más de 2 millones de argentinos — <strong>Más info</strong>',
];
let notifIdx = 0;
const notifText = document.getElementById('notifText');

setInterval(() => {
  notifIdx = (notifIdx + 1) % notifMessages.length;
  if (notifText) {
    notifText.style.opacity = '0';
    setTimeout(() => {
      notifText.innerHTML = notifMessages[notifIdx];
      notifText.style.opacity = '1';
    }, 300);
  }
}, 6000);

if (notifText) {
  notifText.style.transition = 'opacity 0.3s';
}

// ===== CALCULADORA DE AGUA =====
function calcularAgua() {
  const duchas  = parseInt(document.getElementById('duchas').value)  || 0;
  const inodoro = parseInt(document.getElementById('inodoro').value) || 0;
  const manos   = parseInt(document.getElementById('manos').value)   || 0;
  const platos  = parseInt(document.getElementById('platos').value)  || 0;

  const total = (duchas * 60) + (inodoro * 9) + (manos * 2) + (platos * 15);

  const resultEl = document.getElementById('calcResult');
  resultEl.classList.add('show');
  resultEl.className = 'calc-result show';

  let mensaje = '';
  let nivel   = '';

  if (total < 120) {
    nivel   = 'bajo';
    mensaje = `¡Excelente! Usás un consumo eficiente. Ayudás a preservar el agua que algún día viene de los glaciares.`;
  } else if (total < 200) {
    nivel   = 'medio';
    mensaje = `Consumo promedio. Con pequeños ajustes podés reducirlo significativamente.`;
  } else {
    nivel   = 'alto';
    mensaje = `Consumo elevado. Cada litro extra presiona nuestras reservas de agua dulce, incluyendo los glaciares.`;
  }

  resultEl.classList.add(nivel);
  resultEl.innerHTML = `<strong>${total} litros / día</strong> ${mensaje}`;
}

// ===== SOLUCIONES: toggle active =====
function toggleActive(id) {
  const card = document.getElementById(id);
  if (!card) return;
  const wasActive = card.classList.contains('active');
  document.querySelectorAll('.solution-card').forEach(c => c.classList.remove('active'));
  if (!wasActive) card.classList.add('active');
}

// ===== FORMULARIO =====
function enviarFormulario() {
  const nombre    = document.getElementById('nombre').value.trim();
  const comentario = document.getElementById('comentario').value.trim();
  const btn       = document.getElementById('submitBtn');
  const msg       = document.getElementById('formMsg');

  msg.className = 'form-msg';
  msg.textContent = '';

  if (!nombre) {
    msg.className = 'form-msg error';
    msg.textContent = 'Por favor ingresá tu nombre.';
    return;
  }
  if (!comentario || comentario.length < 10) {
    msg.className = 'form-msg error';
    msg.textContent = 'El comentario debe tener al menos 10 caracteres.';
    return;
  }

  btn.disabled = true;
  document.getElementById('btnText').textContent = 'Enviando...';

  // Simulación de envío
  setTimeout(() => {
    msg.className = 'form-msg success';
    msg.textContent = `¡Gracias, ${nombre}! Tu comentario fue recibido. Cada voz suma en la defensa de nuestros glaciares. 💙`;
    document.getElementById('nombre').value    = '';
    document.getElementById('comentario').value = '';
    btn.disabled = false;
    document.getElementById('btnText').textContent = 'Enviar comentario';
  }, 1400);
}

// ===== SCROLL REVEAL suave =====
const revealEls = document.querySelectorAll('.problem-card, .solution-card, .stat-card, .glaciar-item');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`;
  observer.observe(el);
});
document.getElementById('notif-close').addEventListener('click',function(){
  document.getElementById('notifBar').style.display='none';
})
document.getElementById('CompartirInfo').addEventListener('click',function(){
  "window.location.href='#problematica'";
});
document.getElementById('CumplimientoLegal').addEventListener('click',function(){
  onclick="window.location.href='#formulario'";
});
document.getElementById('ReduciHuella').addEventListener('click',function(){
  onclick="window.location.href='#calculadora-de-agua'";
});
document.getElementById('ApoyaOrganizaciones').addEventListener('click',function(){
  onclick="window.location.href='#ongs'";
});
document.getElementById('submitBtn').addEventListener('click',function(){
  onclick="enviarFormulario()";
});
document.getElementById('calcularAgua').addEventListener('click',function(){
  onclick="calcularAgua()";
});