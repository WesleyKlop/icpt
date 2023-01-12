import nl.hsleiden.icpt.opdrachten.DataTypes.{hoeveelHeidHondenZijnEen, hoeveelheidHonden, totaleLeeftijdHonden, totaleLeeftijdLabradors}
import nl.hsleiden.icpt.opdrachten.{Dier, Hond, Kat}
import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should

class DataTypeTests  extends AnyFlatSpec with should.Matchers {
  val data = Seq[Dier](
    Kat("Minoes", 1),
    Kat("Kareltje", 2),
    Hond("Jip", "duitse herder", 1),
    Hond("Buddy", "Labrador", 11),
    Hond("Buddy", "Labrador", 1)
  )

  "De functie hoeveelheid honden" should " kloppen " in {
    hoeveelheidHonden(data) should be (3)

  }

  "de functie hoeveelheidHondenzijneen" should "kloppen" in {
    hoeveelHeidHondenZijnEen(data) should be (2)
  }

  "de functie totale leeftijd honden " should " kloppen " in {
    totaleLeeftijdHonden(data) should be (13)
  }

  "de functie totale leeftijd labradors" should " kloppen " in {
    totaleLeeftijdLabradors(data) should be (12)
  }
}