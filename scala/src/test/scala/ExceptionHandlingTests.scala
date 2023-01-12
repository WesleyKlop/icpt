
import nl.hsleiden.icpt.opdrachten.ExceptionHandling.{appendHi, division, divisionAddOne, doeAppendHiMetToUpper, maakNegatief, maakNegatiefAppend1}
import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should

class ExceptionHandlingTests  extends AnyFlatSpec with should.Matchers {


  "division" should "Division door nul moet links zijn met foutmelding 'Kan niet delen door nul'" in {
    division(1,0) should be (Left("Kan niet delen door nul"))
  }

  "division" should "Divisie moet ook werken" in {
    division(9, 3) should be (Right(9/3))
  }

  "divisionAddOne" should "een increment doen na divisie van twee getallen" in {
    divisionAddOne(9,3) should be (Right((9/3) + 1))
  }

  "DivisionaddOne" should "Left geven met fout 'Kan niet delen door nul' bij delen door nul " in {
    divisionAddOne(1, 0) should be (Left("Kan niet delen door nul"))
  }

  "appendHi" should "left geven met de text 'Naam is leeg' indien naam parameter leeg is" in {
    appendHi("") should be (Left("Naam is leeg"))
  }

  "AppendHi" should " hallo voor een naam zetten" in {
    appendHi("Heiko") should be (Right("hallo Heiko"))
  }


  "DoeAppendHiMetToUpper" should "Na een appendHi gelijk toupper doen" in {
    doeAppendHiMetToUpper("Heiko") should be (Right("HALLO HEIKO"))
  }

  "DoeAppendHiMetToUpper" should "met een lege string een left geven met 'Naam is Leeg'" in {
    doeAppendHiMetToUpper("") should be (Left("Naam is leeg"))
  }

  "Maak negatief" should "None geven bij een negatief getal" in {
    maakNegatief(-1) should be (None)
  }

  "Maak negatief" should "een (Some) negatief geven bij een positief getal" in {
    maakNegatief(1) should be (Some(-1))
  }

  "Maak negatief append 1" should "Maak van positief getal 1 en increment deze met 1" in {
    maakNegatiefAppend1(1) should be (Some(0))
  }

  "Maak negatief append 1" should "Geef None bij een negatief getal" in {
    maakNegatiefAppend1(-1) should be(None)
  }

}
