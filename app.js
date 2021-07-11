var express = require("express");
var fs = require("fs");
const pug = require("pug");
var app = express();
var puerto = 3000;

camisetasLista = [
  {
    color: "Naranja",
    imagen:
      "https://jumbocolombiafood.vteximg.com.br/arquivos/ids/3483642-1000-1000/2.naranja.jpg?v=637171155307870000",
  },
  {
    color: "Azul",
    imagen:
      "https://static3.elcorreo.com/www/multimedia/202002/14/media/cortadas/cieloazul1-k1zG-U100155473657HzH-984x608@RC.jpg",
  },
  {
    color: "Rojo",
    imagen:
      "https://sc01.alicdn.com/kf/Hbdee3a4ff1054837a39f5b978830763br/238989452/Hbdee3a4ff1054837a39f5b978830763br.jpg_.webp",
  },
];

app.use(express.static(__dirname + "/public")); //cada vez qu busca un archivo busca en public

app.get("/", (peticion, respuesta) => {
  respuesta.render("index.pug", {
    titulo: "Mi pagina",
    textoParrafo: "Bienvenidos a mi pagina",
  });
});

app.get("/tienda", (peticion, respuesta) => {
  respuesta.render("tienda.pug", {
    camisetas: camisetasLista,
  });
});

app.get("/tienda/comprar/:color", (peticion, respuesta) => {
  let datosDeCamiseta = camisetasLista.filter((item) => {
    if (peticion.params.color == item.color) {
      return item;
    }
  })[0];

  respuesta.render("detalles.pug", {
    color: peticion.params.color,
    datos: datosDeCamiseta,
  });
});

app.use((peticion, respuesta) => {
  respuesta.status(400);

  let urlError = peticion.originalUrl;

  respuesta.render("404.pug", { textoError: urlError });
});

app.listen(puerto, () => {
  console.log(`Puerto: ${puerto}`);
});
