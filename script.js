ZOHO.embeddedApp.on("PageLoad", function(data) {
    // Si quieres traer automáticamente un valor del Lead (opcional)
    ZOHO.CRM.API.getRecord({Entity:"Leads",RecordID:data.EntityId})
    .then(function(response){
        let inmueble = response.data[0].Valor_Inmueble; // Asegúrate que este sea el nombre del campo correcto en Leads
        if(inmueble){
            document.getElementById('valorInmueble').value = inmueble;
        }
    });
});

ZOHO.embeddedApp.init();

document.getElementById('calcular').addEventListener('click', function() {
    const valorInmueble = parseFloat(document.getElementById('valorInmueble').value);
    const cuotaInicial = parseFloat(document.getElementById('cuotaInicial').value);
    const tasaInteres = parseFloat(document.getElementById('tasaInteres').value) / 100;
    const plazo = parseInt(document.getElementById('plazo').value);

    if (isNaN(valorInmueble) || isNaN(cuotaInicial) || isNaN(tasaInteres) || isNaN(plazo)) {
        alert('Por favor completa todos los campos correctamente.');
        return;
    }

    const valorCredito = valorInmueble - (valorInmueble * (cuotaInicial / 100));
    const tasaMensual = tasaInteres / 12;
    const numCuotas = plazo * 12;

    const cuotaMensual = (valorCredito * tasaMensual) / (1 - Math.pow((1 + tasaMensual), -numCuotas));

    document.getElementById('resultado').innerText = 
        `Cuota Mensual: $${cuotaMensual.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
});
