import { Image, StyleSheet, Text, View, ScrollView } from "react-native";

export default function Inicio() {
  const imagen = require("../../assets/autism_image.jpg");

  return (
    <ScrollView style={styles.contenedorPrincipal}>
      <Text style={styles.textoTitulo}>
        ¿Qué es el trastorno del espectro autista (TEA)?
      </Text>
      <View>
        <View style={styles.imagenContenedor}>
          <Image resizeMode="cover" style={styles.imagen} source={imagen} />
          <Text style={styles.textoURL}>https//autism_image-bla-bla-bla</Text>
        </View>
        <Text style={styles.textoParrafo}>
          Los trastornos del espectro autista (TEA) son discapacidades del
          desarrollo causadas por diferencias en el cerebro. Algunas personas
          con TEA tienen una diferencia conocida, como una afección genética.
          Todavía no se conocen otras causas. Los científicos creen que los TEA
          tienen múltiples causas que, al actuar juntas, cambian las maneras más
          comunes en las que las personas se desarrollan. Todavía tenemos mucho
          que aprender sobre estas causas y cómo estas afectan a las personas
          con TEA.
        </Text>
        <Text style={styles.textoParrafo}>
          Puede que las personas con TEA se comporten, comuniquen, interactúen y
          aprendan de maneras que son distintas a las de la mayoría de las
          personas. Muchas veces no hay nada en su apariencia que las distinga
          de las demás. Las capacidades de las personas con TEA pueden variar de
          manera significativa. Por ejemplo, algunas personas con TEA podrían
          tener destrezas de conversación avanzadas, mientras que otras podrían
          no expresarse verbalmente. Algunas personas con TEA necesitan mucha
          ayuda en su vida diaria; otras pueden trabajar y vivir con poca ayuda
          o nada de ayuda.
        </Text>
        <Text style={styles.textoParrafo}>
          Los TEA aparecen antes de los tres años de edad y pueden durar toda la
          vida, aunque los síntomas podrían mejorar con el tiempo. Algunos niños
          muestran síntomas de TEA en los primeros 12 meses de vida. En otros,
          puede que los síntomas no aparezcan hasta los 24 meses o después.
          Algunos niños con TEA adquieren nuevas destrezas y alcanzan
          indicadores del desarrollo hasta alrededor de los 18 a 24 meses de
          edad, y después dejan de adquirir nuevas destrezas o pierden las que
          ya tenían.
        </Text>
        <Text style={styles.textoParrafo}>
          Los TEA aparecen antes de los tres años de edad y pueden durar toda la
          vida, aunque los síntomas podrían mejorar con el tiempo. Algunos niños
          muestran síntomas de TEA en los primeros 12 meses de vida. En otros,
          puede que los síntomas no aparezcan hasta los 24 meses o después.
          Algunos niños con TEA adquieren nuevas destrezas y alcanzan
          indicadores del desarrollo hasta alrededor de los 18 a 24 meses de
          edad, y después dejan de adquirir nuevas destrezas o pierden las que
          ya tenían.
        </Text>
        <Text style={styles.textoParrafo}>
          A medida que los niños con TEA se convierten en adolescentes y adultos
          jóvenes, podrían tener dificultades para formar y mantener amistades,
          para comunicarse con personas de la misma edad y adultos, o para
          entender qué conductas se esperan de ellos en la escuela o el trabajo.
          Puede que lleguen a proveedores de atención médica porque también
          tienen afecciones, como ansiedad, depresión o trastorno por déficit de
          atención e hiperactividad, que se presentan con más frecuencia en
          personas con TEA que en personas sin TEA.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedorPrincipal: {
    paddingTop: 10,
    paddingHorizontal: 15,
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
