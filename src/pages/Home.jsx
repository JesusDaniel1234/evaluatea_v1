import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRef, useState } from "react";
import * as Animatable from "react-native-animatable";
import CircularButton from "../components/common/CircularButton";

export default function Inicio() {
  const imagen = require("../../assets/autism_image.jpg");
  const [offsetYState, setOffsetYState] = useState(0);
  const [showButton, setShowButton] = useState(false);

  const scroll = useRef();
  const handleScroll = (e) => {
    const offsetY = Math.floor(e.nativeEvent.contentOffset.y);
    if (offsetYState === 0 && offsetY >= 100) setOffsetYState(offsetY);
    if ((offsetY >= 100 && !showButton) || (offsetY < 100 && showButton)) {
      setShowButton(!showButton);
    }
  };

  const scrollTo = () => {
    scroll.current.scrollTo({ y: 0, animated: true });
  };

  return (
    <View>
      {offsetYState != 0 && (
        <CircularButton onPress={scrollTo}>
          <Animatable.View
            style={styles.buttonStyle}
            animation={showButton ? "fadeIn" : "fadeOut"}
          >
            <Text style={styles.textoButton}>
              <AntDesign name="up" size={30} color="white" />
            </Text>
          </Animatable.View>
        </CircularButton>
      )}

      <ScrollView
        contentContainerStyle={styles.contenedorPrincipal}
        ref={scroll}
        onScroll={handleScroll}
      >
        <Text style={styles.textoTitulo}>
          ¿Qué es el trastorno del espectro autista (TEA)?
        </Text>
        <View>
          <View style={styles.imagenContenedor}>
            <Image resizeMode="cover" style={styles.imagen} source={imagen} />
            <Text style={styles.textoURL}>Día Mundial de la Concientización sobre el Autismo: generando conciencia y comprensión. (Foto: DIFUSIÓN)</Text>
          </View>
          <Text style={styles.textoParrafo}>
            Los trastornos del espectro autista (TEA) son discapacidades del
            desarrollo causadas por diferencias en el cerebro. Algunas personas
            con TEA tienen una diferencia conocida, como una afección genética.
            Todavía no se conocen otras causas. Los científicos creen que los
            TEA tienen múltiples causas que, al actuar juntas, cambian las
            maneras más comunes en las que las personas se desarrollan. Todavía
            tenemos mucho que aprender sobre estas causas y cómo estas afectan a
            las personas con TEA.
          </Text>
          <Text style={styles.textoParrafo}>
            Puede que las personas con TEA se comporten, comuniquen, interactúen
            y aprendan de maneras que son distintas a las de la mayoría de las
            personas. Muchas veces no hay nada en su apariencia que las distinga
            de las demás. Las capacidades de las personas con TEA pueden variar
            de manera significativa. Por ejemplo, algunas personas con TEA
            podrían tener destrezas de conversación avanzadas, mientras que
            otras podrían no expresarse verbalmente. Algunas personas con TEA
            necesitan mucha ayuda en su vida diaria; otras pueden trabajar y
            vivir con poca ayuda o nada de ayuda.
          </Text>
          <Text style={styles.textoParrafo}>
            Los TEA aparecen antes de los tres años de edad y pueden durar toda
            la vida, aunque los síntomas podrían mejorar con el tiempo. Algunos
            niños muestran síntomas de TEA en los primeros 12 meses de vida. En
            otros, puede que los síntomas no aparezcan hasta los 24 meses o
            después. Algunos niños con TEA adquieren nuevas destrezas y alcanzan
            indicadores del desarrollo hasta alrededor de los 18 a 24 meses de
            edad, y después dejan de adquirir nuevas destrezas o pierden las que
            ya tenían.
          </Text>
          <Text style={styles.textoParrafo}>
            Los TEA aparecen antes de los tres años de edad y pueden durar toda
            la vida, aunque los síntomas podrían mejorar con el tiempo. Algunos
            niños muestran síntomas de TEA en los primeros 12 meses de vida. En
            otros, puede que los síntomas no aparezcan hasta los 24 meses o
            después. Algunos niños con TEA adquieren nuevas destrezas y alcanzan
            indicadores del desarrollo hasta alrededor de los 18 a 24 meses de
            edad, y después dejan de adquirir nuevas destrezas o pierden las que
            ya tenían.
          </Text>
          <Text style={styles.textoParrafo}>
            A medida que los niños con TEA se convierten en adolescentes y
            adultos jóvenes, podrían tener dificultades para formar y mantener
            amistades, para comunicarse con personas de la misma edad y adultos,
            o para entender qué conductas se esperan de ellos en la escuela o el
            trabajo. Puede que lleguen a proveedores de atención médica porque
            también tienen afecciones, como ansiedad, depresión o trastorno por
            déficit de atención e hiperactividad, que se presentan con más
            frecuencia en personas con TEA que en personas sin TEA.
          </Text>
        </View>
        <View>
          <Text style={styles.textoTitulo}>Signos y síntomas</Text>
          <Text style={styles.textoParrafo}>
            Las personas con TEA con frecuencia tienen problemas con la
            comunicación y la interacción sociales, y conductas o intereses
            restrictivos o repetitivos. Las personas con TEA también podrían
            tener maneras distintas de aprender, moverse o prestar atención. Es
            importante señalar que algunas personas sin TEA también podrían
            presentar algunos de estos síntomas. Estas características pueden
            dificultar mucho la vida de las personas con TEA.
          </Text>
          <Text style={styles.textoParrafo}>
            La siguiente lista ofrece algunos ejemplos de tipos de
            comportamientos que se observan con frecuencia en personas
            diagnosticadas con este tipo de trastornos. No todas las personas
            con estos trastornos tendrán todos los comportamientos que se
            mencionan a continuación, pero la mayoría tendrán varios de estos.
          </Text>
          <Text style={styles.textoSubtitulo}>
            Los comportamientos de comunicación e interacción social pueden
            incluir:
          </Text>
          <Text style={styles.textoLista}>
            🌀 - Hacer poco contacto visual o hacerlo de manera inconsistente.
          </Text>
          <Text style={styles.textoLista}>
            🌀 - Parecer como si no mirara o escuchara a las personas que están
            hablando.
          </Text>
          <Text style={styles.textoLista}>
            🌀 - Compartir con poca frecuencia algún interés, emoción u objetos
            o actividades que disfrutan (lo que incluye rara vez señalar o
            mostrar cosas a los demás).
          </Text>
          <Text style={styles.textoLista}>
            🌀 - No responder o demorarse en responder cuando se les llama por
            su nombre o mediante otros intentos verbales para captar su
            atención.
          </Text>
          <Text style={styles.textoLista}>
            🌀 - Tener dificultad para seguir las conversaciones.
          </Text>
          <Text style={styles.textoLista}>
            🌀 - A menudo, hablar largo rato sobre un tema que prefieren, sin
            permitir que otros tengan la oportunidad de responder o sin darse
            cuenta cuando los demás reaccionan con indiferencia.
          </Text>
          <Text style={styles.textoLista}>
            🌀 - Tener expresiones faciales, movimientos y gestos que no
            coinciden con lo que están diciendo.
          </Text>
          <Text style={styles.textoLista}>
            🌀 - Tener un tono inusual de voz que puede sonar como si estuvieran
            cantando, o un tono monótono y similar al de un robot.
          </Text>
          <Text style={styles.textoLista}>
            🌀 - Tener problemas para comprender el punto de vista de otra
            persona, o no poder predecir o entender las acciones de otros.
          </Text>
          <Text style={styles.textoLista}>
            🌀 - Tener problemas para adaptar su comportamiento a diferentes
            situaciones sociales.
          </Text>
          <Text style={styles.textoLista}>
            🌀 - Tener dificultad para compartir en un juego imaginativo o para
            hacer amigos.
          </Text>

          <Text style={styles.textoSubtitulo}>
            Los comportamientos restringidos o repetitivos pueden incluir:
          </Text>
          <Text style={styles.textoLista}>
            🌀 - Repetir ciertas conductas o tener comportamientos inusuales,
            como repetir palabras o frases (un comportamiento llamado ecolalia).
          </Text>
          <Text style={styles.textoLista}>
            🌀 - Mostrar un interés intenso y duradero en temas específicos,
            como números, detalles o datos.
          </Text>
          <Text style={styles.textoLista}>
            🌀 - Mostrar demasiado interés en cosas específicas, como objetos en
            movimiento o partes de algunos objetos.
          </Text>
          <Text style={styles.textoLista}>
            🌀 - Molestarse por cambios pequeños en una rutina y tener
            dificultad con las transiciones.
          </Text>
          <Text style={styles.textoLista}>
            🌀 - Ser más sensibles o menos sensibles que otras personas a la
            información sensorial, como la luz, el sonido, la ropa o la
            temperatura.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedorPrincipal: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  textoButton: {
    textAlign: "center",
    justifyContent: "center",
    fontSize: 30,
  },
  touchableOpacity: {
    width: 50,
    borderRadius: 50,
    height: 50,
    position: "absolute",
    zIndex: 10,
    bottom: 10,
    right: 10,
  },
  buttonStyle: {
    backgroundColor: "#181818",
    justifyContent: "center",
    width: 60,
    borderRadius: 50,
    height: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  textoTitulo: {
    fontSize: 30,
    lineHeight: 36,
    marginBottom: 12,
    fontWeight: "600",
  },
  textoParrafo: {
    fontSize: 20,
    lineHeight: 28,
    marginBottom: 12,
  },
  textoLista: { fontSize: 17, lineHeight: 25, marginBottom: 8, marginLeft: 10 },
  textoSubtitulo: {
    fontSize: 20,
    lineHeight: 28,
    marginBottom: 12,
    fontWeight: "500",
  },
  textoURL: {
    fontSize: 10,
    lineHeight: 20,
    fontStyle: "italic",
    fontWeight: "300",
    paddingLeft: 10,
  },
  imagenContenedor: {
    marginBottom: 12,
  },
  imagen: { width: "auto", height: 250, borderRadius: 20 },
});
