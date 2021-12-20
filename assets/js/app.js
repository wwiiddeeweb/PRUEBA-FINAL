$(document).ready(function () {



  $("form").submit(function (event) {
    event.preventDefault();



// FUNCIÓN INPUT DATOS
    let valueInput;
    function formInput(){
      valueInput = parseInt($("#ingresoPokemon").val());
      console.log(valueInput);

      if (valueInput > 0 && valueInput < 999999) {
        return;
      } else {
        /* alert("ERROR! Por favor, ingresa un número entre 1 y 999999"); */
        $("#heroInfo").html(`<h5>ERROR! Por favor, ingresa un número entre 1 y 999999</h5>`)
      }
    }
    formInput();



// CONSULTA AJAX

    $.ajax({
      type: "GET",
      url: "https://superheroapi.com/api.php/3083921371856142/" + valueInput,
      dataType: "json",
      success: function (d) {

      // FUNCIÓN QUE SE EJECUTA CUANDO LA CONSULTA SE REALIZA CON ÉXITO
        
        let heroName = d.name;
        let heroFullName = d.biography['full-name'];
        let heroPicture = d.image.url;
        let heroRelatives = d.connections.relatives;
        let heroPublisher = d.biography['publisher'];
        let heroOcupation = d.work.occupation;
        let heroFirstAppearance = d.biography['first-appearance'];
        let heroHeight = d.appearance.height;
        let heroWeight = d.appearance.weight;
        let heroGroupAfilliation = d.connections['group-affiliation'];
        
/* 
        $("#heroInfo").html(`
        
        <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${heroPicture}" class="img-fluid rounded-start">
          </div>
          <div class="col-md-8">
            <div class="card-body text-start">
              <h5 class="card-title">Nombre: ${heroName}</h5>
              <p class="card-title fw-lighter">Nombre Completo: ${heroFullName}</p>
              <p class="card-text">Familia: ${heroRelatives}</p>
              <p class="card-text"><small class="text-muted">Publicado por: ${heroPublisher}</small></p>

              <ul class="list-group list-group-flush">
                <li class="list-group-item">Ocupación: ${heroOcupation}</li>
                <li class="list-group-item">Primera Aparición: ${heroFirstAppearance}</li>
                <li class="list-group-item">Altura: ${heroHeight}</li>
                <li class="list-group-item">Peso: ${heroWeight}</li>
                <li class="list-group-item">Alianzas: ${heroGroupAfilliation}</li>
              </ul>


            </div>
          </div>
        </div>
      </div> `) */

      // IMPRESIÓN HTML DE LA TARJETA
      $("#heroInfo").html(` 
      <div class="card text-start">
      <img src="${heroPicture}" class="card-img-top" alt="${heroName}">
      <div class="card-body">
        <h5 class="card-title">Nombre: ${heroName}</h5>
        <p class="card-title fw-lighter">Nombre Completo: ${heroFullName}</p>
        <p class="card-text"><b>Familia:</b> ${heroRelatives}</p>
        <p class="card-text"><small class="text-muted">Publicado por: ${heroPublisher}</small></p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item"><b>Ocupación:</b> ${heroOcupation}</li>
        <li class="list-group-item"><b>Primera Aparición:</b> ${heroFirstAppearance}</li>
        <li class="list-group-item"><b>Altura:</b> ${heroHeight}</li>
        <li class="list-group-item"><b>Peso:</b> ${heroWeight}</li>
        <li class="list-group-item"><b>Alianzas:</b> ${heroGroupAfilliation}</li>
      </ul>
      <div class="card-body">
        <a href="https://www.google.com/search?q=${heroName}" class="card-link" target="_blank">Buscar en Google</a>
      </div>
    </div>
      `)

      let heroIntelligence = parseInt(d.powerstats.intelligence);
      let heroStrength = parseInt(d.powerstats.strength);
      let heroSpeed = parseInt(d.powerstats.speed);
      let heroDurability = parseInt(d.powerstats.durability);
      let heroPower = parseInt(d.powerstats.power);
      let heroCombat = parseInt(d.powerstats.combat);
      console.log(heroIntelligence);

      var chart = new CanvasJS.Chart("chartContainer", {
        theme: "light2", // "light1", "light2", "dark1", "dark2"
        exportEnabled: true,
        animationEnabled: true,
        title: {
          text: `Estadísticas de poder para ${heroName}`
        },
        data: [{
          type: "pie",
          startAngle: 25,
          toolTipContent: "<b>{label}</b>: {y}pts",
          showInLegend: "true",
          legendText: "{label}",
          indexLabelFontSize: 16,
          indexLabel: "{label} - {y}pts",
          dataPoints: [
            { y: `${heroIntelligence}`, label: "Inteligencia" },
            { y: `${heroStrength}`, label: "Fuerza" },
            { y: `${heroSpeed}`, label: "Velocidad" },
            { y: `${heroDurability}`, label: "Durabilidad" },
            { y: `${heroPower}`, label: "Poder" },
            { y: `${heroCombat}`, label: "Combate" }
          ]
        }]
      });
      chart.render();


// FINALIZA AJAX SUCCESS
      },

  
    });
  });
});
 