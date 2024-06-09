// 1.Módulo IIFE utilizando ES6, esta función se ejecuta inmediatamente después de ser definida. Encierra el código en un ámbito privado//

const showVideo = (() => {
  //Esta función privada cambia el atributo src del elemento con el id especificado, estableciéndolo en la URL del video//
  function insertVideoUrl(url, id) {
    const videoBox = document.getElementById(id);
    videoBox.setAttribute("src", url);
  }
  //Retorna un objeto con un método público moduleVideo que invoca la función configureVideoUrl.//
  return {
    playVideo: (url, id) => {
      insertVideoUrl(url, id);
    },
  };
})();

// 2.Clase padre Multimedia //
class Multimedia {
  //"#" Almacena la URL del video de forma privada.//
  #url;
  //Inicializa #url con el valor proporcionado.//
  constructor(url) {
    this.#url = url;
  }
  //Permite acceder a la URL almacenada de manera controlada y actua como un closure//
  get url() {
    return this.#url;
  }
  //Este método no presenta funcionalidad específica, por ahora//
  setInicio() {
    return "Este método es para realizar un cambio en la URL del video";
  }
}

// 3.Clase hija Reproductor //
class Reproductor extends Multimedia {
  //"#" Almacena la URL del video de forma privada.//
  #id;
  //Llama al constructor de la clase padre Multimedia con la URL, además inicializa #id.//
  constructor(url, id) {
    super(url);
    this.#id = id;
  }
  //Este método utiliza videoBox.moduleVideo para configurar la URL del iframe con la url del video actual.//
  playMultimedia() {
    videoBox.playVideo(this.url, this.#id);
  }
  //Modifica la URL para incluir un parámetro de inicio (start) y llama a moduleVideo para actualizar el iframe.//
  setInicio(tiempo) {
    `${this.url}&start=${tiempo}`;
    showVideo.playVideo(`${this.url}&start=${tiempo}`, this.#id);
  }
}

//4.Instancias de Reproductor para música, película y serie, cada una con su URL (link embed de Youtube) y el ID del iframe ("musica,peliculas,series") correspondiente.//
showVideo.playVideo(
  "https://www.youtube.com/embed/-6G6AW7oApA?si=4Tq-K4vSCMy6P_FB",
  "musica"
);
showVideo.playVideo(
  "https://www.youtube.com/embed/eZYkNkL7VFo?si=oRb29xHP5K8E2w0v",
  "peliculas"
);
showVideo.playVideo(
  "https://www.youtube.com/embed/ZHZG6UArE3I?si=ADSPY9-26D_ytWoY",
  "series"
);

//Instanciar las clases hijas con las URLs y los IDs de los iframes//
const musica = new Reproductor(
  "https://www.youtube.com/embed/-6G6AW7oApA?si=4Tq-K4vSCMy6P_FB",
  "musica"
);
const pelicula = new Reproductor(
  "https://www.youtube.com/embed/eZYkNkL7VFo?si=oRb29xHP5K8E2w0v",
  "peliculas"
);
const serie = new Reproductor(
  "https://www.youtube.com/embed/ZHZG6UArE3I?si=ADSPY9-26D_ytWoY",
  "series"
);

// 5.Invocar el método playMultimedia (url, id) para mostrar los videos //
musica.playMultimedia();
pelicula.playMultimedia();
serie.playMultimedia();

// 6.Usar el método setInicio para modificar el tiempo de inicio del video de música, este inicia al segundo 30) //
musica.setInicio(30);
