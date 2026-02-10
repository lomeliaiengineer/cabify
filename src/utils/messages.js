const messages = {
    welcome: `Hola, te saluda tu ejecutivo IA de Cabify👋. 

Estoy aquí para darte una respuesta inmediata y que no pierdas tiempo esperando.`,
    welcome_options: `¿Cómo podemos ayudarte hoy?,Elige una opción:,,Menu,Dudas con plataforma,Cuenta bloqueada,Carga de facturas,¿Nuevo en la plataforma?,Solicitud Plantilla`,
    
    accountblocked:`🤔 Podrías facilitarnos el RUC de empresa`,
    invoinces:(invoices)=>{return `🔍 Hemos identificado que las siguientes facturas estan bloqueando tu cuenta: 
        
${invoices}                                                               
Para reactivarla rápido:

✉️ Si ya pagaste: por favor envía el comprobante a facturacion.empresas.pe@cabify.zendesk.com para la captura.

❗Si ya lo enviaste y sigues sin acceso: por favor escribe *incidente*`},
    askIncident: '🚩 Facilítanos tu número de incidencia para que podamos insistir internamente y solucionarlo de inmediato',
    invoiceincident:`🤝 Gracias por la información.
    
Una persona de nuestro equipo se comunicará contigo en breve para ayudarte con tu incidencia.`,
    billingupload:`Para que podamos cargar tus facturas en la plataforma, por favor envía todos los sustentos necesarios a facturacion.empresas.pe@cabify.zendesk.com. 
    
⚠️ Si algo falló en la carga, alzalo igualmente por este buzón comentando el motivo de rechazo.`,

    newuser:`¡Bienvenido a Cabify!🙌
    
Para que tu empresa aproveche al máximo Cabify, queremos que gestiones tu movilidad de la forma más eficiente, entonces aquí tienes todas nuestras funcionalidades explicadas en un solo lugar:link`,

    plantillarequest:`Escoge una el tipo de plantilla:,Carga Masiva,Politica de Viaje`,

    masivepantilla:`Plantilla de carga masiva: link`,
    travelpolicyplantilla:`Plantilla de política de viaje: link`,
    douts_options:`Dudas con plataforma,Elige una opción:,,Menu,Login,Gestión usuarios y Viajes,Control de gastos,Canal de ayuda,Otros`,
    login:`Para que ingreses a tu cuenta ahora mismo, elige la opción que más te convenga,Desde el celular,Desde la computadora`,
    loginapp:`1500392188174836,📱 Para ingresar a tu cuenta desde la app, sigue este paso a paso:`,
    loginweb:`2390780324676166,💻 Para ingresar a tu cuenta desde la web, sigue este paso a paso:`,
//Gestión usuarios y Viajes
    usertravels_options:`Gestion de usuarios y viajes, Elige una opción:,,MenuGestión usuarios,Politicas de viajes,Centro de coste,Reportes de viajes`,
    usermanagement:`🏃‍♂️ Para que tu equipo empiece a moverse ahora mismo, solo tienes que darlos de alta en la plataforma. 

Hacerlo así te permite tener el control total de tu cuenta de forma sencilla.`,
    newuservideo:`1552379126067493,Sigue este paso a paso para crearlos:`,
    travelpolicy:`📢 Configura las políticas de viaje para que tus usuarios viajen siempre dentro de los parámetros que tu empresa necesita. Sigue este paso a paso para configurarlas:

Configurar políticas de viaje: VIDEO`,
    costcenter:`💲 Organiza los gastos de tu empresa creando centros de coste. Así podrás asignar presupuestos y controlar el gasto de cada área. Sigue este paso a paso para crearlos:

Crear centros de coste: VIDEO`,
    travelreports:`📈 Genera reportes detallados de los viajes realizados por tu equipo. Así podrás analizar el gasto y optimizar el uso de Cabify en tu empresa. Sigue este paso a paso para generarlos:
    
Generar reportes de viajes: VIDEO`,

//Control de gastos
    expensecontrol_options:`Elige una opción:,Facturación`,
    billing:`➡️ ¿Ya pagaste? Si tu factura figura como pendiente, envía el comprobante a facturacion.empresas.pe@cabify.zendesk.com para que tu cuenta siga activa y sin bloqueos.`,
    billingvideo:`926158120097438,🧾 Para descargar tus reportes facturación, sigue el paso a paso: `,

//Canal de ayuda
    helpchannel_options:`Elige una opción:,Reporte incidencias,Certificado carbono`,
    incidentreport:`⛔Para que podamos ayudarte a resolver cualquier inconveniente con tus trayectos, es fundamental que sepamos qué ocurrió.`,
    incidentvideo:`884847111047526,Aquí tienes cómo reportarlo de forma sencilla para que podamos darte una solución`,
    carboncertificate:`💨 Cabify te ayuda a compensar la huella de carbono de tus viajes. Descarga tu certificado de carbono siguiendo este paso a paso: link`,

//Otros
    others:`Te conectamos con nuestro equipo humano, ya que así podemos darte una solución más personalizada. 
    
👨🏻‍💻 Un especialista te responderá por aquí en unos minutos`,

    fallback: `🔴 Lo siento, no entendí tu mensaje. Por favor, elige una opción del menú o escribe "Cabify" para empezar de nuevo.`

}

module.exports = messages;