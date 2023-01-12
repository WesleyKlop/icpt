import nl.hsleiden.icpt.opdrachten.HelloWorld.{appendHi, maakNegatief, maakPositief, vermenigvuldigGeenNul}
import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should

class HelloWorldTests  extends AnyFlatSpec with should.Matchers {

  "Append hi " should " moet hallo voor input plakken" in {
    appendHi("Heiko") should be ("hallo Heiko")
  }

  "MaakNegatief" should "een positief getal negatief maken" in {
    maakNegatief(1) should be (-1)
  }

  "MaakNegatief" should "Een negatief negatief houden" in {
    maakNegatief(-1) should be (-1)
  }

  "Maak positief" should "Een negatief getal postief maken" in {
    maakPositief(-1) should be (1)
  }

  "Maak positief" should "Een positief getal positief houden " in {
    maakPositief(1) should be (1)
  }

  "vermenigvuldigGeen nul" should "twee niet nullen vermenigvuldigen met elkaar" in {
    vermenigvuldigGeenNul(3, 3) should be (9)
  }

  "vermenigvuldigGeen nul" should "als er een nul is, 1 terug geven" in {
    vermenigvuldigGeenNul(0, 3) should be (1)
  }

}